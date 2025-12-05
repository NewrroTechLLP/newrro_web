#!/bin/bash
# ==============================================================================
# NEWRRO TECH LLP - COMPLETE PRODUCTION SETUP (JETSON ORIN NANO SUPER)
# Target: JetPack 6 (Ubuntu 22.04) | ROS 2 Humble (Official Debs)
# Features: Docker, GPU AI, ROS 2 Binary Install, Optimized
# ==============================================================================

set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

# -------------------------
# CONFIGURATION
# -------------------------
TOTAL_STEPS=13
CURRENT_STEP=0
NPROC=$(nproc || echo 4)

# Don't run as root
if [ "$EUID" -eq 0 ]; then
    echo "[ERROR] Don't run this script as root. Run as your user - it will sudo when needed."
    exit 1
fi

USER_NAME="$USER"
HOME_DIR="$HOME"
WS_DIR="${HOME_DIR}/arjuna_ros2/arjuna2_ws"

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
echo " ROS Version:    ROS 2 Humble (Binary Install)"
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
if [ -f /etc/nv_tegra_release ]; then
    JP_VERSION=$(dpkg-query --showformat='${Version}' --show nvidia-l4t-core 2>/dev/null | cut -d- -f1 | cut -d. -f1-2 || echo "unknown")
    log "JetPack detected: L4T ${JP_VERSION}"
else
    warn "Not running on Jetson - continuing anyway"
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

log "Build parallelism: ${BUILD_JOBS} jobs"

# ------------------------------------------------------------------------------
# STEP 2: SYSTEM PREPARATION
# ------------------------------------------------------------------------------
show_progress "System Preparation: Swap, Locale, Tools"

# Create swap
if ! grep -q '/swapfile' /etc/fstab 2>/dev/null; then
    log "Creating 8GB swap file"
    if [ ! -f /swapfile ]; then
        sudo fallocate -l 8G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=8192
        sudo chmod 600 /swapfile
        sudo mkswap /swapfile
    fi
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
    log "Swap created"
else
    log "Swap already configured"
fi

# Set locale (ROS 2 requirement)
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
    software-properties-common ca-certificates \
    htop nano vim net-tools iputils-ping wget unzip \
    chrony usbutils libusb-1.0-0-dev ccache \
    openssh-server python3-dev pkg-config python3-pip python3-venv

# CRITICAL: System upgrade with allow-downgrades
log "Upgrading system packages..."
sudo apt-get upgrade -y --allow-downgrades
sudo apt-get autoremove -y

# Upgrade pip
python3 -m pip install --user --upgrade pip setuptools wheel

# Enable ccache
export PATH="/usr/lib/ccache:$PATH"

# Time sync
sudo chronyc -a makestep || warn "Time sync failed (non-critical)"

log "System preparation complete"

# ------------------------------------------------------------------------------
# STEP 3: JETSON OPTIMIZATIONS
# ------------------------------------------------------------------------------
show_progress "Applying Jetson Performance Optimizations"

if [ -f /etc/nv_tegra_release ]; then
    log "Configuring Jetson for maximum performance..."
    sudo nvpmodel -m 0 || warn "nvpmodel failed"
    sudo systemctl enable nvpmodel 2>/dev/null || true
    
    if command -v jetson_clocks &>/dev/null; then
        sudo jetson_clocks || warn "jetson_clocks failed"
    fi
    
    for cpu_gov in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
        [ -f "$cpu_gov" ] && echo performance | sudo tee "$cpu_gov" >/dev/null 2>&1
    done
    
    log "Jetson optimizations applied"
else
    log "Skipping Jetson-specific optimizations"
fi

# ------------------------------------------------------------------------------
# STEP 4: DOCKER & NVIDIA CONTAINER TOOLKIT
# ------------------------------------------------------------------------------
show_progress "Installing Docker & NVIDIA Container Toolkit"

if ! command -v docker &>/dev/null; then
    log "Installing Docker..."
    sudo apt-get install -y docker.io
    sudo systemctl enable --now docker
    sudo usermod -aG docker "${USER_NAME}"
    log "Docker installed"
else
    log "Docker already installed"
fi

if ! dpkg -l | grep -q nvidia-container-toolkit; then
    log "Installing NVIDIA Container Toolkit..."
    curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | \
        sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg
    
    curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
        sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
        sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
    
    sudo apt-get update
    sudo apt-get install -y --allow-downgrades nvidia-container-toolkit
    
    if command -v nvidia-ctk &>/dev/null; then
        sudo nvidia-ctk runtime configure --runtime=docker
        sudo systemctl restart docker
    fi
    log "NVIDIA Container Toolkit installed"
fi

if ! docker --version &>/dev/null; then
    err "Docker installation failed"
    exit 1
fi

# ------------------------------------------------------------------------------
# STEP 5: JETSON UTILITIES
# ------------------------------------------------------------------------------
show_progress "Installing Jetson Utilities"

log "Installing jetson-stats (jtop)..."
if sudo -H pip3 install -U jetson-stats --break-system-packages 2>/dev/null; then
    log "✓ jtop installed"
elif pip3 install --user -U jetson-stats 2>/dev/null; then
    log "✓ jtop installed (user)"
else
    warn "jtop installation failed - install manually: sudo -H pip3 install -U jetson-stats --break-system-packages"
fi

# ------------------------------------------------------------------------------
# STEP 6: ROS 2 HUMBLE - SETUP SOURCES
# ------------------------------------------------------------------------------
show_progress "Setting Up ROS 2 Humble Repository"

log "Enabling Ubuntu Universe repository..."
sudo apt install -y software-properties-common
sudo add-apt-repository -y universe

log "Cleaning old ROS GPG keys..."
# Remove old ROS keys to prevent conflicts
sudo rm -f /usr/share/keyrings/ros-archive-keyring.gpg 2>/dev/null || true
sudo rm -f /etc/apt/sources.list.d/ros2.list 2>/dev/null || true
sudo rm -f /etc/apt/sources.list.d/ros2-latest.list 2>/dev/null || true

log "Adding ROS 2 APT source..."
sudo apt update && sudo apt install -y curl
export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F\" '{print $4}')
curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
sudo dpkg -i /tmp/ros2-apt-source.deb
rm -f /tmp/ros2-apt-source.deb

sudo apt update

log "ROS 2 repository configured"

# ------------------------------------------------------------------------------
# STEP 7: ROS 2 HUMBLE - INSTALL PACKAGES
# ------------------------------------------------------------------------------
show_progress "Installing ROS 2 Humble Packages"

log "Checking ROS 2 package availability..."

# Try to install desktop first
if sudo apt install -y ros-humble-desktop 2>&1 | tee -a "$LOG_FILE"; then
    log "✓ ROS 2 Desktop installed"
else
    warn "Desktop install failed - trying ROS Base..."
    
    # Fallback to ros-base if desktop fails
    if sudo apt install -y ros-humble-ros-base 2>&1 | tee -a "$LOG_FILE"; then
        log "✓ ROS 2 Base installed (without GUI tools)"
    else
        err "ROS 2 installation failed - packages not available for this system"
        err "This might be a JetPack 6.0 compatibility issue"
        
        log "Attempting alternative installation method..."
        
        # Try installing core packages individually
        sudo apt install -y \
            ros-humble-ros-core \
            ros-humble-geometry2 \
            ros-humble-rosbag2 \
            python3-colcon-common-extensions || {
            err "Alternative installation also failed"
            err "You may need to build ROS 2 from source"
            exit 1
        }
    fi
fi

# Install dev tools
log "Installing ROS development tools..."
sudo apt install -y ros-dev-tools || warn "ros-dev-tools install had issues"

# Initialize rosdep
if [ ! -f /etc/ros/rosdep/sources.list.d/20-default.list ]; then
    sudo rosdep init || warn "rosdep already initialized"
fi

# Source and update rosdep
if [ -f /opt/ros/humble/setup.bash ]; then
    source /opt/ros/humble/setup.bash
    rosdep update || warn "rosdep update failed"
    
    # Verify installation
    if ros2 --version &>/dev/null; then
        log "✓ ROS 2 Humble installed successfully"
    else
        err "ROS 2 installed but ros2 command not found"
        exit 1
    fi
else
    err "ROS 2 installation failed - setup.bash not found"
    exit 1
fi

# ------------------------------------------------------------------------------
# STEP 8: GPU-ACCELERATED PYTHON LIBRARIES
# ------------------------------------------------------------------------------
show_progress "Installing GPU-Accelerated Python Libraries"

log "Installing system ML dependencies..."
sudo apt-get install -y \
    libopenblas-dev libblas-dev libjpeg-dev zlib1g-dev libhdf5-dev \
    libssl-dev libffi-dev liblapack-dev gfortran \
    libopencv-dev python3-opencv

log "Installing PyTorch for Jetson..."
case "$JP_VERSION" in
    36.*)
        log "JetPack 6.x - PyTorch 2.3.0"
        python3 -m pip install --user --no-cache-dir \
            https://developer.download.nvidia.com/compute/redist/jp/v60/pytorch/torch-2.3.0-cp310-cp310-linux_aarch64.whl
        ;;
    35.*)
        log "JetPack 5.x - PyTorch 2.1.0"
        python3 -m pip install --user --no-cache-dir \
            https://developer.download.nvidia.com/compute/redist/jp/v512/pytorch/torch-2.1.0a0+41361538.nv23.06-cp38-cp38-linux_aarch64.whl
        ;;
    *)
        warn "Unknown JetPack - attempting generic install"
        python3 -m pip install --user --no-cache-dir torch torchvision torchaudio --index-url https://pypi.nvidia.com || true
        ;;
esac

if python3 -c "import torch; print(f'PyTorch {torch.__version__}')" 2>/dev/null; then
    python3 -c "import torch; print(f'  CUDA: {torch.cuda.is_available()}')"
fi

python3 -m pip install --user --no-cache-dir \
    numpy scipy pandas matplotlib pillow pyyaml \
    opencv-python scikit-learn scikit-image \
    Jetson.GPIO pyserial transforms3d pyquaternion \
    simple-pid tqdm requests flask || warn "Some packages failed"

# ------------------------------------------------------------------------------
# STEP 9: ULTRALYTICS YOLOv8
# ------------------------------------------------------------------------------
show_progress "Installing Ultralytics YOLOv8"

python3 -m pip install --user --no-cache-dir \
    ultralytics onnx onnx-simplifier || warn "Ultralytics had issues"

mkdir -p "${HOME_DIR}/models"
for model in yolov8n.pt yolov8s.pt; do
    if [ ! -f "${HOME_DIR}/models/${model}" ]; then
        wget -q "https://github.com/ultralytics/assets/releases/download/v0.0.0/${model}" \
            -O "${HOME_DIR}/models/${model}" || true
    fi
done

# ------------------------------------------------------------------------------
# STEP 10: ROS 2 ROBOTICS PACKAGES
# ------------------------------------------------------------------------------
show_progress "Installing ROS 2 Navigation & Robotics Packages"

source /opt/ros/humble/setup.bash

sudo apt install -y \
    ros-humble-navigation2 \
    ros-humble-nav2-bringup \
    ros-humble-slam-toolbox \
    ros-humble-robot-localization \
    ros-humble-cartographer \
    ros-humble-cartographer-ros \
    ros-humble-teleop-twist-keyboard \
    ros-humble-teleop-twist-joy \
    ros-humble-xacro \
    ros-humble-robot-state-publisher \
    ros-humble-joint-state-publisher \
    ros-humble-vision-opencv \
    ros-humble-cv-bridge \
    ros-humble-image-transport \
    ros-humble-compressed-image-transport \
    ros-humble-foxglove-bridge \
    ros-humble-diagnostic-updater

log "ROS 2 packages installed"

# ------------------------------------------------------------------------------
# STEP 11: ARJUNA WORKSPACE & SENSOR DRIVERS
# ------------------------------------------------------------------------------
show_progress "Setting Up Arjuna Workspace"

mkdir -p "${WS_DIR}/src"
cd "${WS_DIR}/src"

# Clone sensor drivers
if [ ! -d "depthai-ros" ]; then
    git clone --depth 1 -b humble https://github.com/luxonis/depthai-ros.git
fi

if [ ! -d "sllidar_ros2" ]; then
    git clone --depth 1 -b humble https://github.com/Slamtec/sllidar_ros2.git
fi

if [ ! -d "ros-imu-bno055" ]; then
    git clone --depth 1 -b humble https://github.com/dheera/ros-imu-bno055.git
fi

# USB rules
echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | \
    sudo tee /etc/udev/rules.d/80-movidius.rules >/dev/null
sudo udevadm control --reload-rules
sudo udevadm trigger

cd "${WS_DIR}"
source /opt/ros/humble/setup.bash
rosdep install --from-paths src --ignore-src -r -y || warn "Some rosdep failed"

log "Building workspace..."
colcon build \
    --symlink-install \
    --parallel-workers "${BUILD_JOBS}" \
    --cmake-args -DCMAKE_BUILD_TYPE=Release \
    --event-handlers console_direct+ || warn "Some packages failed"

if [ -f "${WS_DIR}/install/setup.bash" ]; then
    log "Arjuna workspace built"
fi

# ------------------------------------------------------------------------------
# STEP 12: DEVELOPMENT TOOLS
# ------------------------------------------------------------------------------
show_progress "Installing Development Tools"

if ! command -v code &>/dev/null; then
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | \
        gpg --dearmor > /tmp/packages.microsoft.gpg
    sudo install -D -o root -g root -m 644 /tmp/packages.microsoft.gpg \
        /etc/apt/keyrings/packages.microsoft.gpg
    sudo sh -c 'echo "deb [arch=arm64,amd64 signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
    rm -f /tmp/packages.microsoft.gpg
    sudo apt-get update
    sudo apt-get install -y code || warn "VS Code failed"
fi

# ------------------------------------------------------------------------------
# STEP 13: FINALIZATION
# ------------------------------------------------------------------------------
show_progress "Finalizing Configuration"

sudo usermod -aG dialout,video,i2c,plugdev,docker "${USER_NAME}"
sudo groupadd -f gpio
sudo usermod -aG gpio "${USER_NAME}"

if ! grep -q "NEWRRO_COMPLETE_SETUP" "${HOME_DIR}/.bashrc" 2>/dev/null; then
    cat >> "${HOME_DIR}/.bashrc" <<'EOF'

# ============================================================================
# NEWRRO_COMPLETE_SETUP
# ============================================================================
source /opt/ros/humble/setup.bash
if [ -f "$HOME/arjuna_ros2/arjuna2_ws/install/setup.bash" ]; then
    source "$HOME/arjuna_ros2/arjuna2_ws/install/setup.bash"
fi
export ROS_DOMAIN_ID=0
export PATH="/usr/lib/ccache:$PATH"
export PATH=/usr/local/cuda/bin:${PATH}
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:${LD_LIBRARY_PATH}
export PATH="$HOME/.local/bin:$PATH"

alias ws='cd ~/arjuna_ros2/arjuna2_ws'
alias ros2build='cd ~/arjuna_ros2/arjuna2_ws && colcon build --symlink-install --cmake-args -DCMAKE_BUILD_TYPE=Release'
alias ros2src='source ~/arjuna_ros2/arjuna2_ws/install/setup.bash'
alias ros2test='ros2 topic list && ros2 node list'
alias check_usb='lsusb && ls -la /dev/ttyUSB* /dev/ttyACM* 2>/dev/null'
alias jtop='jtop'
alias max_power='sudo nvpmodel -m 0 && sudo jetson_clocks'
alias check_temp='cat /sys/devices/virtual/thermal/thermal_zone*/temp | awk "{printf \"%.1f°C\n\", \$1/1000}"'
alias docker_gpu='docker run --rm --runtime=nvidia --gpus all ubuntu nvidia-smi'
# ============================================================================
EOF
fi

# Cleanup
rm -rf "${WS_DIR}/build" "${WS_DIR}/log"
sudo apt-get clean
sudo apt-get autoremove -y

# Verification
log "Running verification..."
FAILED_CHECKS=()

command -v docker >/dev/null 2>&1 || FAILED_CHECKS+=("docker")
command -v ros2 >/dev/null 2>&1 || FAILED_CHECKS+=("ros2")
[ -f "${WS_DIR}/install/setup.bash" ] || FAILED_CHECKS+=("workspace")
python3 -c "import torch" 2>/dev/null || FAILED_CHECKS+=("pytorch")

clear
echo ""
echo "=========================================================================="
echo "                    ✓ SETUP COMPLETE!"
echo "=========================================================================="
echo ""
if [ ${#FAILED_CHECKS[@]} -eq 0 ]; then
    echo "🎉 All components installed successfully!"
else
    echo "⚠️  Some checks failed: ${FAILED_CHECKS[*]}"
fi
echo ""
echo "📋 NEXT STEPS:"
echo "  1. sudo reboot"
echo "  2. ros2 run demo_nodes_cpp talker"
echo "  3. check_usb"
echo ""
echo "Workspace: ${WS_DIR}"
echo "Log: ${LOG_FILE}"
echo "=========================================================================="
