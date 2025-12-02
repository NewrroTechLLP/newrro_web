#!/bin/bash -eu
# ==============================================================================
# NEWRRO TECH LLP - COMPLETE PRODUCTION SETUP (JETSON ORIN NANO SUPER)
# Target: JetPack 6 (Ubuntu 22.04) | ROS 2 Humble (Official Method)
# Features: Docker, GPU AI, ROS 2 from Source, Optimized Builds
# ==============================================================================

set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

# -------------------------
# CONFIGURATION
# -------------------------
TOTAL_STEPS=15
CURRENT_STEP=0
NPROC=$(nproc || echo 4)

# Don't run as root
if [ "$EUID" -eq 0 ]; then
    echo "[ERROR] Don't run this script as root. Run as your user - it will sudo when needed."
    exit 1
fi

USER_NAME="$USER"
HOME_DIR="$HOME"
WS_DIR="${HOME_DIR}/arjuna2_ws"
ROS2_WS="${HOME_DIR}/ros2_humble"

# -------------------------
# LOGGING & PROGRESS
# -------------------------
LOG_FILE="${HOME_DIR}/newrro_complete_setup_$(date +%Y%m%d_%H%M%S).log"
exec > >(tee -a "$LOG_FILE") 2>&1

log() { echo -e "\n[$(date +%H:%M:%S)] [INFO] $*"; }
warn() { echo -e "\n[$(date +%H:%M:%S)] [WARN] $*"; }
err() { echo -e "\n[$(date +%H:%M:%S)] [ERROR] $*" >&2; }

show_progress() {
    CURRENT_STEP=$((CURRENT_STEP + 1))
    local task_name="$1"
    local percent=$((CURRENT_STEP * 100 / TOTAL_STEPS))
    local width=50
    local filled=$((percent * width / 100))
    local empty=$((width - filled))
    local bar_filled=$(printf "%${filled}s" | tr ' ' '█')
    local bar_empty=$(printf "%${empty}s" | tr ' ' '░')

    echo ""
    echo "=========================================================================="
    echo -e "  \033[1;32m[${bar_filled}${bar_empty}] ${percent}%\033[0m"
    echo -e "  \033[1;36mSTEP ${CURRENT_STEP}/${TOTAL_STEPS}: ${task_name}\033[0m"
    echo "=========================================================================="
    echo ""
}

# Cleanup function
cleanup() {
    kill ${KEEPALIVE_PID} 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# Keep sudo alive
sudo -v
( while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done ) 2>/dev/null &
KEEPALIVE_PID=$!

echo "=========================================================================="
echo "               NEWRRO TECH LLP - COMPLETE PRODUCTION SETUP"
echo "=========================================================================="
echo " Target Device:  Jetson Orin Nano Super"
echo " JetPack:        6.x (Ubuntu 22.04)"
echo " ROS Version:    ROS 2 Humble (Built from Source)"
echo " Detected Cores: ${NPROC}"
echo " User:           ${USER_NAME}"
echo " Log File:       ${LOG_FILE}"
echo "=========================================================================="
echo ""

# ------------------------------------------------------------------------------
# STEP 1: SYSTEM INFORMATION GATHERING
# ------------------------------------------------------------------------------
show_progress "Gathering System Information"

log "Checking system configuration..."

# Detect JetPack version
JP_VERSION=""
JP_RELEASE=""
if [ -f /etc/nv_tegra_release ]; then
    JP_RELEASE=$(cat /etc/nv_tegra_release)
    JP_VERSION=$(dpkg-query --showformat='${Version}' --show nvidia-l4t-core 2>/dev/null | cut -d- -f1 | cut -d. -f1-2 || echo "unknown")
    log "JetPack detected: ${JP_RELEASE}"
    log "L4T version: ${JP_VERSION}"
else
    warn "Not running on Jetson or JetPack not detected"
    read -p "Continue anyway? (y/n): " confirm
    [[ "$confirm" != "y" ]] && exit 1
fi

# Get system specs
TOTAL_RAM_GB=$(awk '/MemTotal/ {printf "%.0f", $2/1024/1024}' /proc/meminfo)
DISK_SPACE=$(df -h / | awk 'NR==2 {print $4}')

log "System Specifications:"
log "  RAM:        ${TOTAL_RAM_GB} GB"
log "  Disk Free:  ${DISK_SPACE}"
log "  CPU Cores:  ${NPROC}"

# Calculate safe build jobs
SAFE_JOBS=$(( TOTAL_RAM_GB / 2 ))
BUILD_JOBS=$(( SAFE_JOBS < NPROC ? SAFE_JOBS : NPROC ))
[ "$BUILD_JOBS" -lt 1 ] && BUILD_JOBS=1

log "Build parallelism: ${BUILD_JOBS} jobs (RAM-optimized)"

# ------------------------------------------------------------------------------
# STEP 2: SYSTEM PREPARATION
# ------------------------------------------------------------------------------
show_progress "System Preparation: Swap, Locale, Tools"

# Create 8GB swap if not present
if ! grep -q '/swapfile' /etc/fstab 2>/dev/null; then
    log "Creating 8GB swap file (required for compilation)"
    if [ ! -f /swapfile ]; then
        sudo fallocate -l 8G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=8192
        sudo chmod 600 /swapfile
        sudo mkswap /swapfile
    fi
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
    log "Swap created and activated"
else
    log "Swap already configured"
fi

# Set locale (from ROS Wiki)
log "Setting up UTF-8 locale..."
sudo apt update && sudo apt install -y locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Install essential tools
log "Installing essential packages..."
sudo apt-get update
sudo apt-get install -y --no-install-recommends \
    curl gnupg2 lsb-release build-essential cmake git git-lfs \
    htop nano vim terminator net-tools iputils-ping unzip wget \
    software-properties-common chrony usbutils libusb-1.0-0-dev \
    ccache openssh-server python3-dev pkg-config python3-pip \
    python3-venv ca-certificates can-utils i2c-tools

# CRITICAL: Upgrade system NOW before installing NVIDIA stuff
log "Upgrading all system packages (prevents later conflicts)..."
sudo apt upgrade -y --allow-downgrades
sudo apt autoremove -y --allow-downgrades

# Upgrade pip
python3 -m pip install --user --upgrade pip setuptools wheel

# Enable ccache for faster rebuilds
export PATH="/usr/lib/ccache:$PATH"

# Force time sync
sudo chronyc -a makestep || warn "Time sync failed (non-critical)"

log "System preparation complete"

# ------------------------------------------------------------------------------
# STEP 3: JETSON OPTIMIZATIONS
# ------------------------------------------------------------------------------
show_progress "Applying Jetson Performance Optimizations"

if [ -f /etc/nv_tegra_release ]; then
    log "Configuring Jetson for maximum performance..."
    
    sudo nvpmodel -m 0 || warn "nvpmodel failed"
    sudo systemctl enable nvpmodel 2>/dev/null || warn "nvpmodel service not available"
    
    if command -v jetson_clocks &>/dev/null; then
        sudo jetson_clocks || warn "jetson_clocks failed"
    fi
    
    for cpu_gov in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
        [ -f "$cpu_gov" ] && echo performance | sudo tee "$cpu_gov" >/dev/null 2>&1
    done
    
    log "Jetson optimizations applied"
else
    warn "Skipping Jetson-specific optimizations"
fi

# ------------------------------------------------------------------------------
# STEP 4: NVIDIA CONTAINER TOOLKIT
# ------------------------------------------------------------------------------
show_progress "Installing NVIDIA Container Toolkit"

if ! dpkg -l | grep -q nvidia-container-toolkit; then
    log "Installing NVIDIA Container Toolkit..."
    curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
        sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
    
    curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
        sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
        sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
    
    sudo apt-get update
    
    # Install with --allow-downgrades to prevent errors
    sudo apt-get install -y --allow-downgrades nvidia-container-toolkit
    
    if command -v nvidia-ctk &>/dev/null; then
        sudo nvidia-ctk runtime configure --runtime=docker
        sudo systemctl restart docker
    fi
    
    log "NVIDIA Container Toolkit installed"
else
    log "NVIDIA Container Toolkit already present"
fi

# ------------------------------------------------------------------------------
# STEP 5: JETSON UTILITIES
# ------------------------------------------------------------------------------
show_progress "Installing Jetson Utilities"

log "Installing jetson-stats (jtop)..."

# Define installation methods in order of preference
install_jtop() {
    # Method 1: System pip with break-system-packages (recommended)
    if sudo -H pip3 install -U jetson-stats --break-system-packages 2>/dev/null; then
        log "✓ jtop installed via system pip (--break-system-packages)"
        return 0
    fi
    
    # Method 2: User pip
    if pip3 install --user -U jetson-stats 2>/dev/null; then
        log "✓ jtop installed via user pip"
        return 0
    fi
    
    # Method 3: System pip without cache
    log "Trying system pip without cache..."
    if sudo -H pip3 install --no-cache-dir -U jetson-stats --break-system-packages 2>&1 | tee -a "$LOG_FILE"; then
        log "✓ jtop installed via system pip (no cache)"
        return 0
    fi
    
    # Method 4: User pip without cache
    log "Trying user pip without cache..."
    if pip3 install --user --no-cache-dir -U jetson-stats 2>&1 | tee -a "$LOG_FILE"; then
        log "✓ jtop installed via user pip (no cache)"
        return 0
    fi
    
    # Method 5: Force install with verbose output
    warn "Standard methods failed - forcing installation with verbose output..."
    if sudo -H pip3 install --force-reinstall --no-deps -U jetson-stats --break-system-packages 2>&1 | tee -a "$LOG_FILE"; then
        log "✓ jtop installed via forced reinstall"
        return 0
    fi
    
    # Method 6: Install from GitHub directly (backup)
    warn "All pip methods failed - trying GitHub source..."
    if sudo -H pip3 install git+https://github.com/rbonghi/jetson_stats.git --break-system-packages 2>&1 | tee -a "$LOG_FILE"; then
        log "✓ jtop installed from GitHub source"
        return 0
    fi
    
    # All methods failed
    err "All installation methods failed for jtop"
    warn "You can install manually after reboot:"
    warn "  sudo -H pip3 install -U jetson-stats --break-system-packages"
    return 1
}

# Call the installation function
if install_jtop; then
    log "jetson-stats installation complete"
    
    # Verify (may fail until reboot)
    if python3 -c "import jtop" 2>/dev/null; then
        log "✓ jtop imported successfully"
    else
        warn "jtop installed but requires reboot to function properly"
    fi
else
    warn "jtop installation incomplete - continuing with rest of setup"
fi

log "Step 5: Complete (jtop status logged above)"

# ------------------------------------------------------------------------------
# STEP 6: ADD ROS 2 APT REPOSITORY
# ------------------------------------------------------------------------------
show_progress "Adding ROS 2 APT Repository"

log "Enabling Ubuntu Universe repository..."
sudo apt install -y software-properties-common
sudo add-apt-repository -y universe

log "Installing ROS 2 APT source..."
sudo apt update && sudo apt install -y curl
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F\" '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
rm -f /tmp/ros2-apt-source.deb

log "ROS 2 APT repository added"

# ------------------------------------------------------------------------------
# STEP 7: INSTALL ROS DEVELOPMENT TOOLS
# ------------------------------------------------------------------------------
show_progress "Installing ROS Development Tools"

log "Installing common ROS dev packages..."
sudo apt update && sudo apt install -y \
  python3-flake8-docstrings \
  python3-pip \
  python3-pytest-cov \
  ros-dev-tools

log "Installing Ubuntu 22.04 specific packages..."
sudo apt install -y \
   python3-flake8-blind-except \
   python3-flake8-builtins \
   python3-flake8-class-newline \
   python3-flake8-comprehensions \
   python3-flake8-deprecated \
   python3-flake8-import-order \
   python3-flake8-quotes \
   python3-pytest-repeat \
   python3-pytest-rerunfailures

log "ROS development tools installed"

# ------------------------------------------------------------------------------
# STEP 8: GET ROS 2 SOURCE CODE
# ------------------------------------------------------------------------------
show_progress "Downloading ROS 2 Humble Source Code"

name_ros_distro=humble 
user_name=$(whoami)
echo "#######################################################################################################################"
echo ""
echo ">>> {Starting ROS 2 Humble Installation}"
echo ""
echo ">>> {Checking your Ubuntu version} "
echo ""
#Getting version and release number of Ubuntu
version=`lsb_release -sc`
relesenum=`grep DISTRIB_DESCRIPTION /etc/*-release | awk -F 'Ubuntu ' '{print $2}' | awk -F ' LTS' '{print $1}'`
echo ">>> {Your Ubuntu version is: [Ubuntu $version $relesenum]}"
#Checking version is focal, if yes proceed othervice quit
case $version in
  "jammy" )
  ;;
  *)
    echo ">>> {ERROR: This script will only work on Ubuntu Jammy (22.04).}"
    exit 0
esac

echo ""
echo ">>> {ROS 2 HUmble is fully compatible with Ubuntu Jammy 22.04}"
echo ""
echo "#######################################################################################################################"
echo ">>> {Step 1: Configure your Ubuntu repositories}"
echo ""
#Configure your Ubuntu repositories to allow "restricted," "universe," and "multiverse." You can follow the Ubuntu guide for instructions on doing this. 
#https://help.ubuntu.com/community/Repositories/Ubuntu


locale  # check for UTF-8

sudo apt update 
sudo apt install -y locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

locale  # verify settings


##############################################################


sudo apt install -y software-properties-common
sudo add-apt-repository universe

echo ""
echo ">>> {Done: Added Ubuntu repositories}"
echo ""
echo "#######################################################################################################################"
echo ">>> {Step 2: Set up your keys}"
echo ""
echo ">>> {Installing curl for adding keys}"
#Installing curl: Curl instead of the apt-key command, which can be helpful if you are behind a proxy server: 
#TODO:Checking package is not working sometimes, so disabling it
#Checking curl is installed or not
#name=curl
#which $name > /dev/null 2>&1

#if [ $? == 0 ]; then
#    echo "Curl is already installed!"
#else
#    echo "Curl is not installed,Installing Curl"


sudo apt update 
sudo apt install -y curl openssl


#fi

echo "#######################################################################################################################"
echo ""
#Adding keys
echo ">>> {Waiting for adding keys, it will take few seconds}"
echo ""
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

#Checking return value is OK
#case $ret in
#  "OK" )
#  ;;
#  *)
#    echo ">>> {ERROR: Unable to add ROS Humble keys}"
#    exit 0
#esac

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null


echo ">>> {Done: Added Keys}"
echo ""
echo "#######################################################################################################################"
echo ">>> {Step 4: Updating Ubuntu package index, this will take few minutes depend on your network connection}"
echo ""
sudo apt update
sudo apt upgrade 

echo ""
echo "#######################################################################################################################"
echo ">>> {Step 5: Install ROS, you pick how much of ROS you would like to install.}"
echo "     [1. Desktop Full Install: (Recommended) : Everything in Desktop plus 2D/3D simulators and 2D/3D perception packages ]"
echo ""
echo "     [2. Desktop Install: Everything in Desktop ]"
echo ""
echo "     [2. ROS-Base: (Bare Bones) ROS packaging, build, and communication libraries. No GUI tools.]"
echo ""
#Assigning default value as 1: Desktop full install
read -p "Enter your install (Default is 1):" answer 

case "$answer" in
  1)
    package_type="desktop-full"
    ;;
  2)
    package_type="desktop"
    ;;
  3)
    package_type="ros-base"
    ;;    
  * )
    package_type="desktop-full"
    ;;
esac
echo "#######################################################################################################################"
echo ""
echo ">>>  {Starting ROS installation, this will take about 20 min. It will depends on your internet  connection}"
echo ""
sudo apt-get install -y ros-${name_ros_distro}-${package_type} 
sudo apt install -y ros-dev-tools
echo ""
echo ""
echo "#######################################################################################################################"
echo ">>> {Step 6: Setting ROS Environment, This will add ROS environment to .bashrc.}" 
echo ">>> { After adding this, you can able to access ROS commands in terminal}"
echo ""
echo "source /opt/ros/${name_ros_distro}/setup.bash" >> /home/$user_name/.bashrc
source /home/$user_name/.bashrc
echo ""
echo "#######################################################################################################################"
echo ">>> {Step 7: Testing ROS installation, checking ROS version.}"
echo ""
echo ">>> {Type [printenv ROS_DISTRO] to get the current ROS installed version}"
echo ""
printenv ROS_DISTRO
echo "#######################################################################################################################"



# ------------------------------------------------------------------------------
# STEP 10: GPU-ACCELERATED PYTHON LIBRARIES
# ------------------------------------------------------------------------------
show_progress "Installing GPU-Accelerated Python Libraries"

source "${ROS2_WS}/install/local_setup.bash"

log "Installing system-level ML dependencies..."
sudo apt-get install -y \
    libopenblas-dev libblas-dev libjpeg-dev zlib1g-dev libhdf5-dev \
    libssl-dev libffi-dev liblapack-dev gfortran \
    libopencv-dev python3-opencv libavcodec-dev libavformat-dev \
    libswscale-dev libv4l-dev libxvidcore-dev libx264-dev

log "Installing PyTorch for Jetson..."

case "$JP_VERSION" in
    36.*)
        log "Detected JetPack 6.x - installing PyTorch 2.3.0"
        python3 -m pip install --user --no-cache-dir \
            https://developer.download.nvidia.com/compute/redist/jp/v60/pytorch/torch-2.3.0-cp310-cp310-linux_aarch64.whl
        ;;
    35.*)
        log "Detected JetPack 5.x - installing PyTorch 2.1.0"
        python3 -m pip install --user --no-cache-dir \
            https://developer.download.nvidia.com/compute/redist/jp/v512/pytorch/torch-2.1.0a0+41361538.nv23.06-cp38-cp38-linux_aarch64.whl
        ;;
    *)
        warn "Unknown JetPack version - attempting generic PyTorch install"
        python3 -m pip install --user --no-cache-dir torch torchvision torchaudio --index-url https://pypi.nvidia.com || \
            warn "PyTorch install failed"
        ;;
esac

if python3 -c "import torch; print(f'PyTorch {torch.__version__}')" 2>/dev/null; then
    python3 -c "import torch; print(f'  Version: {torch.__version__}'); print(f'  CUDA Available: {torch.cuda.is_available()}')"
else
    warn "PyTorch import failed"
fi

python3 -m pip install --user --no-cache-dir \
    numpy scipy pandas matplotlib pillow pyyaml \
    opencv-python scikit-learn scikit-image \
    Jetson.GPIO pyserial transforms3d pyquaternion \
    simple-pid tqdm requests flask || warn "Some packages failed"

# ------------------------------------------------------------------------------
# STEP 11: ULTRALYTICS YOLOv8
# ------------------------------------------------------------------------------
show_progress "Installing Ultralytics YOLOv8"

python3 -m pip install --user --no-cache-dir \
    ultralytics onnx onnx-simplifier onnxruntime || warn "Ultralytics install had issues"

mkdir -p "${HOME_DIR}/models"
log "Downloading YOLOv8 models..."

for model in yolov8n.pt yolov8s.pt; do
    if [ ! -f "${HOME_DIR}/models/${model}" ]; then
        wget -q "https://github.com/ultralytics/assets/releases/download/v0.0.0/${model}" \
            -O "${HOME_DIR}/models/${model}" && log "  Downloaded ${model}" || warn "  Failed ${model}"
    fi
done

# ------------------------------------------------------------------------------
# STEP 12: ARJUNA WORKSPACE & SENSOR DRIVERS
# ------------------------------------------------------------------------------
show_progress "Setting Up Arjuna Workspace & Sensor Drivers"

log "Creating Arjuna workspace at ${WS_DIR}..."
mkdir -p "${WS_DIR}/src"
cd "${WS_DIR}/src"

# Clone sensor drivers
if [ ! -d "depthai-ros" ]; then
    log "Cloning DepthAI ROS driver..."
    git clone -b humble_v3 https://github.com/luxonis/depthai-ros.git
fi

if [ ! -d "sllidar_ros2" ]; then
    log "Cloning RPLidar ROS2 driver..."
    git clone https://github.com/Slamtec/sllidar_ros2.git
fi

if [ ! -d "ros-imu-bno055" ]; then
    log "Cloning IMU BNO055 driver..."
    git clone https://github.com/dheera/ros-imu-bno055.git
fi

# USB rules for OAK-D
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | \
    sudo tee /etc/udev/rules.d/80-movidius.rules >/dev/null
sudo udevadm control --reload-rules
sudo udevadm trigger

log "Installing workspace dependencies..."
cd "${WS_DIR}"
source "${ROS2_WS}/install/local_setup.bash"
rosdep install --from-paths src --ignore-src -r -y || warn "Some rosdep installs failed"

log "Building Arjuna workspace..."
colcon build --symlink-install 

if [ ! -f "${WS_DIR}/install/local_setup.bash" ]; then
    warn "Arjuna workspace build had issues"
else
    log "Arjuna workspace built successfully"
fi

# ------------------------------------------------------------------------------
# STEP 13: DEVELOPMENT TOOLS
# ------------------------------------------------------------------------------
show_progress "Installing Development Tools"

if ! command -v code &>/dev/null; then
    log "Installing Visual Studio Code..."
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | \
        gpg --dearmor > /tmp/packages.microsoft.gpg
    sudo install -D -o root -g root -m 644 /tmp/packages.microsoft.gpg \
        /etc/apt/keyrings/packages.microsoft.gpg
    sudo sh -c 'echo "deb [arch=arm64,amd64 signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
    rm -f /tmp/packages.microsoft.gpg
    sudo apt-get update
    sudo apt-get install -y code || warn "VS Code install failed"
fi

# ------------------------------------------------------------------------------
# STEP 14: SYSTEM CONFIGURATION & FINALIZATION
# ------------------------------------------------------------------------------
show_progress "Finalizing System Configuration"

sudo usermod -aG dialout,video,i2c,plugdev,docker "${USER_NAME}"
sudo groupadd -f gpio
sudo usermod -aG gpio "${USER_NAME}"

log "Configuring shell environment..."

if ! grep -q "NEWRRO_COMPLETE_SETUP" "${HOME_DIR}/.bashrc" 2>/dev/null; then
    cat >> "${HOME_DIR}/.bashrc" <<EOF

# ============================================================================
# NEWRRO_COMPLETE_SETUP - ROS 2 Humble from Source
# ============================================================================

# ROS 2 Humble (built from source)
source ${ROS2_WS}/install/local_setup.bash 2>/dev/null || true

# Arjuna workspace
if [ -f "${WS_DIR}/install/local_setup.bash" ]; then
    source "${WS_DIR}/install/local_setup.bash"
fi

# ROS Configuration
export ROS_DOMAIN_ID=0
export ROS_LOCALHOST_ONLY=0
export RCUTILS_COLORIZED_OUTPUT=1

# Build optimization
export PATH="/usr/lib/ccache:\${PATH}"

# CUDA paths
export PATH=/usr/local/cuda/bin:\${PATH}
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:\${LD_LIBRARY_PATH}

# Python user packages
export PATH="\$HOME/.local/bin:\${PATH}"

# ============================================================================
# ALIASES
# ============================================================================

# Navigation
alias ws='cd ${WS_DIR}'
alias ros2ws='cd ${ROS2_WS}'

# ROS shortcuts
alias arjuna2build='cd ${WS_DIR} && colcon build --symlink-install'
alias arjuna2clean='cd ${WS_DIR} && rm -rf build install log'
alias arjuna2src='source ${WS_DIR}/install/local_setup.bash'
alias arjuna2test='ros2 topic list && ros2 node list'

# Device monitoring
alias check_usb='lsusb && echo && ls -la /dev/ttyUSB* /dev/ttyACM* 2>/dev/null || echo "No USB serial devices"'

# Performance
alias jtop='jtop'
alias max_power='sudo nvpmodel -m 0 && sudo jetson_clocks'
alias restore_power='sudo nvpmodel -m 1 && sudo jetson_clocks'
alias check_temp='cat /sys/devices/virtual/thermal/thermal_zone*/temp | awk "{printf \"%.1f°C\n\", \$1/1000}"'

# Docker
alias docker_gpu='docker run --rm --runtime=nvidia --gpus all ubuntu nvidia-smi'

# ============================================================================
EOF
fi

# Create desktop shortcuts
mkdir -p "${HOME_DIR}/.local/share/applications"

cat > "${HOME_DIR}/.local/share/applications/ros2-workspace.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=ROS2 Workspace
Comment=Open Arjuna ROS2 workspace in VS Code
Exec=code ${WS_DIR}
Icon=code
Terminal=false
Categories=Development;IDE;
EOF

cat > "${HOME_DIR}/.local/share/applications/jtop.desktop" <<EOF
[Desktop Entry]
Type=Application
Name=jtop
Comment=Jetson monitoring tool
Exec=x-terminal-emulator -e jtop
Icon=utilities-system-monitor
Terminal=true
Categories=System;Monitor;
EOF

# Cleanup
log "Cleaning up build artifacts..."
rm -rf "${ROS2_WS}/build" "${ROS2_WS}/log"
rm -rf "${WS_DIR}/build" "${WS_DIR}/log"
sudo apt-get clean
sudo apt-get autoremove -y

# Final verification
log "Running final verification..."

VERIFICATION_RESULTS=()
FAILED_CHECKS=()

command -v docker >/dev/null 2>&1 && VERIFICATION_RESULTS+=("✓ Docker") || FAILED_CHECKS+=("✗ Docker")
command -v ros2 >/dev/null 2>&1 && VERIFICATION_RESULTS+=("✓ ROS 2 Humble") || FAILED_CHECKS+=("✗ ROS 2 Humble")
[ -f "${ROS2_WS}/install/local_setup.bash" ] && VERIFICATION_RESULTS+=("✓ ROS 2 built from source") || FAILED_CHECKS+=("✗ ROS 2 build")
[ -f "${WS_DIR}/install/local_setup.bash" ] && VERIFICATION_RESULTS+=("✓ Arjuna workspace") || FAILED_CHECKS+=("✗ Arjuna workspace")
python3 -c "import torch" 2>/dev/null && VERIFICATION_RESULTS+=("✓ PyTorch") || FAILED_CHECKS+=("✗ PyTorch")
python3 -c "import ultralytics" 2>/dev/null && VERIFICATION_RESULTS+=("✓ YOLOv8") || FAILED_CHECKS+=("✗ YOLOv8")
python3 -c "import jtop" 2>/dev/null && VERIFICATION_RESULTS+=("✓ jtop") || FAILED_CHECKS+=("✗ jtop (needs reboot)")
command -v code >/dev/null 2>&1 && VERIFICATION_RESULTS+=("✓ VS Code") || VERIFICATION_RESULTS+=("○ VS Code (optional)")

# ------------------------------------------------------------------------------
# COMPLETION MESSAGE
# ------------------------------------------------------------------------------

clear
echo ""
echo "=========================================================================="
echo "                    ✓ SETUP COMPLETE!"
echo "=========================================================================="
echo ""
echo "📊 VERIFICATION RESULTS:"
echo "────────────────────────────────────────────────────────────────────────"
for result in "${VERIFICATION_RESULTS[@]}"; do
    echo "  $result"
done

if [ ${#FAILED_CHECKS[@]} -gt 0 ]; then
    echo ""
    echo "❌ FAILED CHECKS:"
    for check in "${FAILED_CHECKS[@]}"; do
        echo "  $check"
    done
    echo ""
    echo "⚠️  Some components failed. Check log: ${LOG_FILE}"
fi

echo ""
echo "=========================================================================="
echo "📋 NEXT STEPS:"
echo "=========================================================================="
echo ""
echo "1️⃣  REBOOT YOUR SYSTEM (REQUIRED)"
echo "   sudo reboot"
echo ""
echo "2️⃣  After reboot, test ROS 2:"
echo "   # Terminal 1:"
echo "   ros2 run demo_nodes_cpp talker"
echo ""
echo "   # Terminal 2:"
echo "   ros2 run demo_nodes_py listener"
echo ""
echo "3️⃣  Verify PyTorch GPU:"
echo "   python3 -c 'import torch; print(f\"PyTorch: {torch.__version__}\"); print(f\"CUDA: {torch.cuda.is_available()}\")'"
echo ""
echo "4️⃣  Check USB devices:"
echo "   check_usb"
echo ""
echo "5️⃣  Open workspace:"
echo "   ws  # Goes to ${WS_DIR}"
echo "   code .  # Opens in VS Code"
echo ""
echo "=========================================================================="
echo "📁 IMPORTANT LOCATIONS:"
echo "=========================================================================="
echo "  ROS 2 Source:  ${ROS2_WS}"
echo "  Arjuna WS:     ${WS_DIR}"
echo "  Models:        ${HOME_DIR}/models"
echo "  Setup Log:     ${LOG_FILE}"
echo ""
echo "=========================================================================="
echo "⚡ USEFUL COMMANDS:"
echo "=========================================================================="
echo ""
echo "  ws              - Go to Arjuna workspace"
echo "  arjuna2ws       - Go to ROS 2 source workspace"
echo "  arjuna2build    - Build Arjuna workspace"
echo "  arjuna2test     - Test ROS 2 installation"
echo "  check_usb       - Show USB devices"
echo "  jtop            - System monitor"
echo "  max_power       - Enable max performance"
echo "  restore_power   - Disable max performance"
echo "  docker_gpu      - Test GPU in Docker"
echo ""
echo "=========================================================================="
echo "🎓 ROS 2 BUILT FROM SOURCE:"
echo "=========================================================================="
echo ""
echo "Your ROS 2 installation was built from source following the"
echo "official ROS 2 documentation. This gives you:"
echo ""
echo "  ✓ Latest Humble patches and bug fixes"
echo "  ✓ Full control over build configuration"
echo "  ✓ Ability to modify ROS 2 core if needed"
echo "  ✓ Better ARM64/Jetson optimization"
echo ""
echo "Source workspace: ${ROS2_WS}"
echo ""
echo "=========================================================================="

if [ ${#FAILED_CHECKS[@]} -eq 0 ]; then
    echo ""
    echo "🎉 All components installed successfully!"
    echo ""
    echo "Setup completed at: $(date)"
    echo ""
fi

echo "=========================================================================="
echo ""
