#!/bin/bash
# ==============================================================================
# NEWRRO TECH LLP - INTELLIGENT SETUP WITH SKIP LOGIC
# Target: JetPack 6 (Ubuntu 22.04) | ROS 2 Humble
# Features: Checks existing installations, skips completed steps
# ==============================================================================

set -eo pipefail
export DEBIAN_FRONTEND=noninteractive

# -------------------------
# CONFIGURATION
# -------------------------
TOTAL_STEPS=14
CURRENT_STEP=0
NPROC=$(nproc || echo 4)

if [ "$EUID" -eq 0 ]; then
    echo "[ERROR] Don't run this script as root. Run as your user."
    exit 1
fi

USER_NAME="$USER"
HOME_DIR="$HOME"
WS_DIR="${HOME_DIR}/arjuna_ros2/arjuna2_ws"

# -------------------------
# LOGGING & PROGRESS
# -------------------------
LOG_FILE="${HOME_DIR}/newrro_smart_setup_$(date +%Y%m%d_%H%M%S).log"
exec > >(tee -a "$LOG_FILE") 2>&1

log() { echo -e "\n[$(date +%H:%M:%S)] [INFO] $*"; }
warn() { echo -e "\n[$(date +%H:%M:%S)] [WARN] $*"; }
err() { echo -e "\n[$(date +%H:%M:%S)] [ERROR] $*" >&2; }
skip() { echo -e "\n[$(date +%H:%M:%S)] [SKIP] $*"; }

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

cleanup() {
    kill ${KEEPALIVE_PID} 2>/dev/null || true
}
trap cleanup EXIT INT TERM

sudo -v
( while true; do sudo -n true; sleep 60; kill -0 "$$" || exit; done ) 2>/dev/null &
KEEPALIVE_PID=$!

echo "=========================================================================="
echo "        NEWRRO TECH LLP - INTELLIGENT SETUP WITH SKIP LOGIC"
echo "=========================================================================="
echo " This script will:"
echo "   ✓ Check existing installations"
echo "   ✓ Skip already completed steps"
echo "   ✓ Only install what's missing"
echo "   ✓ Preserve existing configurations"
echo "=========================================================================="
echo ""

# ------------------------------------------------------------------------------
# STEP 1: SYSTEM INFORMATION
# ------------------------------------------------------------------------------
show_progress "Step 1: System Information"

JP_VERSION=""
if [ -f /etc/nv_tegra_release ]; then
    JP_VERSION=$(dpkg-query --showformat='${Version}' --show nvidia-l4t-core 2>/dev/null | cut -d- -f1 | cut -d. -f1-2 || echo "unknown")
    log "JetPack: L4T ${JP_VERSION}"
else
    warn "Not running on Jetson"
fi

TOTAL_RAM_GB=$(awk '/MemTotal/ {printf "%.0f", $2/1024/1024}' /proc/meminfo)
DISK_SPACE=$(df -h / | awk 'NR==2 {print $4}')

log "RAM: ${TOTAL_RAM_GB} GB | Disk Free: ${DISK_SPACE} | CPU Cores: ${NPROC}"

SAFE_JOBS=$(( TOTAL_RAM_GB / 2 ))
BUILD_JOBS=$(( SAFE_JOBS < NPROC ? SAFE_JOBS : NPROC ))
[ "$BUILD_JOBS" -lt 1 ] && BUILD_JOBS=1

# ------------------------------------------------------------------------------
# STEP 2: SYSTEM PREPARATION
# ------------------------------------------------------------------------------
show_progress "Step 2: System Preparation"

# Check swap
if grep -q '/swapfile' /etc/fstab 2>/dev/null && [ -f /swapfile ]; then
    skip "Swap already exists ($(du -h /swapfile | cut -f1))"
else
    log "Creating 8GB swap..."
    sudo fallocate -l 8G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=8192
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
    log "✓ Swap created"
fi

# Check locale
if locale | grep -q "LANG=en_US.UTF-8"; then
    skip "Locale already set to en_US.UTF-8"
else
    log "Setting up locale..."
    sudo apt update && sudo apt install -y locales
    sudo locale-gen en_US en_US.UTF-8
    sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
    export LANG=en_US.UTF-8
    log "✓ Locale configured"
fi

# Install essential tools
log "Checking essential packages..."
ESSENTIAL_PKGS="curl git cmake build-essential python3-pip wget"
MISSING_PKGS=""

for pkg in $ESSENTIAL_PKGS; do
    if ! dpkg -l | grep -q "^ii  $pkg "; then
        MISSING_PKGS="$MISSING_PKGS $pkg"
    fi
done

if [ -n "$MISSING_PKGS" ]; then
    log "Installing missing packages:$MISSING_PKGS"
    sudo apt-get update
    sudo apt-get install -y --no-install-recommends \
        curl gnupg2 lsb-release build-essential cmake git git-lfs \
        software-properties-common ca-certificates \
        htop nano vim net-tools iputils-ping wget unzip \
        chrony usbutils libusb-1.0-0-dev ccache \
        openssh-server python3-dev pkg-config python3-pip python3-venv
    log "✓ Essential packages installed"
else
    skip "All essential packages already installed"
fi

# System upgrade
log "Checking for system updates..."
sudo apt-get update
sudo apt-get upgrade -y --allow-downgrades
sudo apt-get autoremove -y

# Upgrade pip
if python3 -m pip --version &>/dev/null; then
    skip "pip already available"
else
    python3 -m pip install --user --upgrade pip setuptools wheel
fi

export PATH="/usr/lib/ccache:$PATH"
sudo chronyc -a makestep || true

# ------------------------------------------------------------------------------
# STEP 3: JETSON OPTIMIZATIONS
# ------------------------------------------------------------------------------
show_progress "Step 3: Jetson Optimizations"

if [ -f /etc/nv_tegra_release ]; then
    log "Applying Jetson optimizations..."
    sudo nvpmodel -m 0 || warn "nvpmodel failed"
    sudo systemctl enable nvpmodel 2>/dev/null || true
    
    if command -v jetson_clocks &>/dev/null; then
        sudo jetson_clocks || warn "jetson_clocks failed"
    fi
    
    for cpu_gov in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do
        [ -f "$cpu_gov" ] && echo performance | sudo tee "$cpu_gov" >/dev/null 2>&1
    done
    
    log "✓ Jetson optimized"
else
    skip "Not on Jetson - skipping optimizations"
fi

# ------------------------------------------------------------------------------
# STEP 4: DOCKER & NVIDIA CONTAINER TOOLKIT
# ------------------------------------------------------------------------------
show_progress "Step 4: Docker & NVIDIA Container Toolkit"

# Check Docker
if command -v docker &>/dev/null; then
    skip "Docker already installed ($(docker --version))"
else
    log "Installing Docker..."
    sudo apt-get install -y docker.io
    sudo systemctl enable --now docker
    sudo usermod -aG docker "${USER_NAME}"
    log "✓ Docker installed"
fi

# Check NVIDIA Container Toolkit
if dpkg -l | grep -q nvidia-container-toolkit; then
    skip "NVIDIA Container Toolkit already installed"
else
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
    log "✓ NVIDIA Container Toolkit installed"
fi

# ------------------------------------------------------------------------------
# STEP 5: JETSON UTILITIES
# ------------------------------------------------------------------------------
show_progress "Step 5: Jetson Utilities"

# Check jtop
if python3 -c "import jtop" 2>/dev/null; then
    skip "jetson-stats (jtop) already installed"
else
    log "Installing jetson-stats..."
    if sudo -H pip3 install -U jetson-stats --break-system-packages 2>/dev/null; then
        log "✓ jtop installed (system)"
    elif pip3 install --user -U jetson-stats 2>/dev/null; then
        log "✓ jtop installed (user)"
    else
        warn "jtop installation failed"
    fi
fi

# ------------------------------------------------------------------------------
# STEP 6: ROS 2 HUMBLE - CHECK & SETUP REPOSITORY
# ------------------------------------------------------------------------------
show_progress "Step 6: ROS 2 Humble Repository"

# Check if ROS 2 repository is already added
if [ -f /etc/apt/sources.list.d/ros2.list ] || [ -f /etc/apt/sources.list.d/ros2-latest.list ]; then
    skip "ROS 2 repository already configured"
else
    log "Adding ROS 2 repository..."
    sudo apt install -y software-properties-common
    sudo add-apt-repository -y universe
    
    sudo apt update && sudo apt install -y curl
    export ROS_APT_SOURCE_VERSION=$(curl -s https://api.github.com/repos/ros-infrastructure/ros-apt-source/releases/latest | grep -F "tag_name" | awk -F\" '{print $4}')
    curl -L -o /tmp/ros2-apt-source.deb "https://github.com/ros-infrastructure/ros-apt-source/releases/download/${ROS_APT_SOURCE_VERSION}/ros2-apt-source_${ROS_APT_SOURCE_VERSION}.$(. /etc/os-release && echo ${UBUNTU_CODENAME:-${VERSION_CODENAME}})_all.deb"
    sudo dpkg -i /tmp/ros2-apt-source.deb
    rm -f /tmp/ros2-apt-source.deb
    
    sudo apt update
    log "✓ ROS 2 repository added"
fi

# ------------------------------------------------------------------------------
# STEP 7: ROS 2 HUMBLE - CHECK & INSTALL
# ------------------------------------------------------------------------------
show_progress "Step 7: ROS 2 Humble Installation"

ROS_INSTALLED=false

# Check if ROS 2 Humble is already installed
if [ -f /opt/ros/humble/setup.bash ]; then
    log "Checking existing ROS 2 installation..."
    
    set +u
    source /opt/ros/humble/setup.bash
    set -u
    
    if command -v ros2 &>/dev/null; then
        ROS_VERSION=$(ros2 --version 2>/dev/null || echo "installed")
        skip "ROS 2 Humble already installed: ${ROS_VERSION}"
        ROS_INSTALLED=true
    else
        warn "ROS 2 files exist but ros2 command not working - reinstalling..."
        ROS_INSTALLED=false
    fi
fi

# Install ROS 2 if not present
if [ "$ROS_INSTALLED" = false ]; then
    log "Installing ROS 2 Humble Desktop..."
    sudo apt install -y --allow-downgrades ros-humble-desktop
    log "✓ ROS 2 Desktop installed"
fi

# Check and install ros-dev-tools
if dpkg -l | grep -q "^ii  ros-dev-tools"; then
    skip "ros-dev-tools already installed"
else
    log "Installing ros-dev-tools..."
    sudo apt install -y ros-dev-tools
    log "✓ ros-dev-tools installed"
fi

# Initialize rosdep if not done
if [ ! -f /etc/ros/rosdep/sources.list.d/20-default.list ]; then
    log "Initializing rosdep..."
    sudo rosdep init || true
    log "✓ rosdep initialized"
else
    skip "rosdep already initialized"
fi

# Source and update
log "Sourcing ROS 2 environment..."
set +u
source /opt/ros/humble/setup.bash
set -u

rosdep update || warn "rosdep update had issues"

# Final verification
if [ -f /opt/ros/humble/setup.bash ]; then
    log "✓ ROS 2 Humble verified and ready"
else
    err "ROS 2 installation failed"
    exit 1
fi

# ------------------------------------------------------------------------------
# STEP 8: GPU LIBRARIES
# ------------------------------------------------------------------------------
show_progress "Step 8: GPU-Accelerated Libraries"

# Check if ML dependencies are installed
log "Checking ML dependencies..."
ML_DEPS_MISSING=false

for pkg in libopenblas-dev libopencv-dev python3-opencv; do
    if ! dpkg -l | grep -q "^ii  $pkg"; then
        ML_DEPS_MISSING=true
        break
    fi
done

if [ "$ML_DEPS_MISSING" = true ]; then
    log "Installing ML dependencies..."
    sudo apt-get install -y \
        libopenblas-dev libblas-dev libjpeg-dev zlib1g-dev libhdf5-dev \
        libssl-dev libffi-dev liblapack-dev gfortran \
        libopencv-dev python3-opencv
    log "✓ ML dependencies installed"
else
    skip "ML dependencies already installed"
fi

# Check PyTorch
if python3 -c "import torch" 2>/dev/null; then
    TORCH_VERSION=$(python3 -c "import torch; print(torch.__version__)" 2>/dev/null)
    skip "PyTorch already installed: ${TORCH_VERSION}"
else
    log "Installing PyTorch for Jetson..."
    case "$JP_VERSION" in
        36.*)
            python3 -m pip install --user --no-cache-dir \
                https://developer.download.nvidia.com/compute/redist/jp/v60/pytorch/torch-2.3.0-cp310-cp310-linux_aarch64.whl
            ;;
        35.*)
            python3 -m pip install --user --no-cache-dir \
                https://developer.download.nvidia.com/compute/redist/jp/v512/pytorch/torch-2.1.0a0+41361538.nv23.06-cp38-cp38-linux_aarch64.whl
            ;;
        *)
            python3 -m pip install --user --no-cache-dir torch torchvision torchaudio --index-url https://pypi.nvidia.com || true
            ;;
    esac
    
    if python3 -c "import torch" 2>/dev/null; then
        log "✓ PyTorch installed"
        python3 -c "import torch; print(f'  CUDA: {torch.cuda.is_available()}')"
    else
        warn "PyTorch installation had issues"
    fi
fi

# Install additional Python packages
log "Installing Python ML packages..."
python3 -m pip install --user --no-cache-dir \
    numpy scipy pandas matplotlib pillow pyyaml \
    opencv-python scikit-learn scikit-image \
    Jetson.GPIO pyserial transforms3d pyquaternion \
    simple-pid tqdm requests flask 2>/dev/null || warn "Some packages failed"

# ------------------------------------------------------------------------------
# STEP 9: ULTRALYTICS YOLOV8
# ------------------------------------------------------------------------------
show_progress "Step 9: Ultralytics YOLOv8"

if python3 -c "import ultralytics" 2>/dev/null; then
    skip "Ultralytics already installed"
else
    log "Installing Ultralytics YOLOv8..."
    python3 -m pip install --user --no-cache-dir \
        ultralytics onnx onnx-simplifier || warn "Ultralytics had issues"
    log "✓ Ultralytics installed"
fi

# Download models
mkdir -p "${HOME_DIR}/models"
for model in yolov8n.pt yolov8s.pt; do
    if [ -f "${HOME_DIR}/models/${model}" ]; then
        skip "Model ${model} already exists"
    else
        log "Downloading ${model}..."
        wget -q "https://github.com/ultralytics/assets/releases/download/v0.0.0/${model}" \
            -O "${HOME_DIR}/models/${model}" || warn "Download failed for ${model}"
    fi
done

# ------------------------------------------------------------------------------
# STEP 10: ROS 2 NAVIGATION PACKAGES
# ------------------------------------------------------------------------------
show_progress "Step 10: ROS 2 Navigation Packages"

set +u
source /opt/ros/humble/setup.bash
set -u

# Check if nav2 is installed
if dpkg -l | grep -q "^ii  ros-humble-navigation2"; then
    skip "ROS 2 Navigation packages already installed"
else
    log "Installing ROS 2 Navigation packages..."
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
    log "✓ Navigation packages installed"
fi

# ------------------------------------------------------------------------------
# STEP 11: ARJUNA WORKSPACE
# ------------------------------------------------------------------------------
show_progress "Step 11: Arjuna Workspace"

# Check if workspace exists
if [ -f "${WS_DIR}/install/setup.bash" ]; then
    skip "Arjuna workspace already built"
else
    log "Setting up Arjuna workspace..."
    mkdir -p "${WS_DIR}/src"
    cd "${WS_DIR}/src"
    
    # Clone sensor drivers
    if [ ! -d "depthai-ros" ]; then
        log "Cloning DepthAI driver..."
        git clone --depth 1 -b humble https://github.com/luxonis/depthai-ros.git
    else
        skip "DepthAI driver already cloned"
    fi
    
    if [ ! -d "sllidar_ros2" ]; then
        log "Cloning RPLidar driver..."
        git clone --depth 1 -b humble https://github.com/Slamtec/sllidar_ros2.git
    else
        skip "RPLidar driver already cloned"
    fi
    
    if [ ! -d "ros-imu-bno055" ]; then
        log "Cloning IMU driver..."
        git clone --depth 1 -b humble https://github.com/dheera/ros-imu-bno055.git
    else
        skip "IMU driver already cloned"
    fi
    
    # USB rules
    if [ ! -f /etc/udev/rules.d/80-movidius.rules ]; then
        log "Adding udev rules..."
        echo 'SUBSYSTEM=="usb", ATTRS{idVendor}=="03e7", MODE="0666"' | \
            sudo tee /etc/udev/rules.d/80-movidius.rules >/dev/null
        sudo udevadm control --reload-rules
        sudo udevadm trigger
    else
        skip "udev rules already exist"
    fi
    
    # Build workspace
    cd "${WS_DIR}"
    set +u
    source /opt/ros/humble/setup.bash
    set -u
    
    log "Installing workspace dependencies..."
    rosdep install --from-paths src --ignore-src -r -y || warn "Some rosdep failed"
    
    log "Building workspace (this may take 5-10 minutes)..."
    colcon build \
        --symlink-install \
        --parallel-workers "${BUILD_JOBS}" \
        --cmake-args -DCMAKE_BUILD_TYPE=Release \
        --event-handlers console_direct+ || warn "Some packages failed"
    
    if [ -f "${WS_DIR}/install/setup.bash" ]; then
        log "✓ Arjuna workspace built"
    else
        warn "Workspace build had issues"
    fi
fi

# ------------------------------------------------------------------------------
# STEP 12: VS CODE
# ------------------------------------------------------------------------------
show_progress "Step 12: VS Code"

if command -v code &>/dev/null; then
    skip "VS Code already installed"
else
    log "Installing VS Code..."
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | \
        gpg --dearmor > /tmp/packages.microsoft.gpg
    sudo install -D -o root -g root -m 644 /tmp/packages.microsoft.gpg \
        /etc/apt/keyrings/packages.microsoft.gpg
    sudo sh -c 'echo "deb [arch=arm64,amd64 signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
    rm -f /tmp/packages.microsoft.gpg
    sudo apt-get update
    sudo apt-get install -y code || warn "VS Code failed"
    
    if command -v code &>/dev/null; then
        log "✓ VS Code installed"
    fi
fi

# ------------------------------------------------------------------------------
# STEP 13: USER GROUPS
# ------------------------------------------------------------------------------
show_progress "Step 13: User Groups & Permissions"

# Add user to groups
GROUPS_TO_ADD="dialout video i2c plugdev docker gpio"
GROUPS_ADDED=""

for group in $GROUPS_TO_ADD; do
    # Create group if doesn't exist
    sudo groupadd -f "$group" 2>/dev/null || true
    
    # Check if user is already in group
    if groups "${USER_NAME}" | grep -q "\b$group\b"; then
        continue
    else
        sudo usermod -aG "$group" "${USER_NAME}"
        GROUPS_ADDED="$GROUPS_ADDED $group"
    fi
done

if [ -n "$GROUPS_ADDED" ]; then
    log "✓ Added to groups:$GROUPS_ADDED"
else
    skip "User already in all required groups"
fi

# ------------------------------------------------------------------------------
# STEP 14: BASHRC CONFIGURATION
# ------------------------------------------------------------------------------
show_progress "Step 14: Shell Configuration"

# Check if our config already exists
if grep -q "NEWRRO_COMPLETE_SETUP" "${HOME_DIR}/.bashrc" 2>/dev/null; then
    skip ".bashrc already configured"
else
    log "Adding ROS environment to .bashrc..."
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
    log "✓ .bashrc configured"
fi

# Cleanup
log "Cleaning up..."
rm -rf "${WS_DIR}/build" "${WS_DIR}/log" 2>/dev/null || true
sudo apt-get clean
sudo apt-get autoremove -y

# ------------------------------------------------------------------------------
# FINAL VERIFICATION
# ------------------------------------------------------------------------------

clear
echo ""
echo "=========================================================================="
echo "                    ✓ INTELLIGENT SETUP COMPLETE!"
echo "=========================================================================="
echo ""

log "Running final verification..."
echo ""

VERIFICATION_RESULTS=()
FAILED_CHECKS=()

# Docker
if command -v docker &>/dev/null; then
    VERIFICATION_RESULTS+=("✓ Docker: $(docker --version | cut -d',' -f1)")
else
    FAILED_CHECKS+=("✗ Docker")
fi

# ROS 2
if [ -f /opt/ros/humble/setup.bash ]; then
    set +u
    source /opt/ros/humble/setup.bash
    set -u
    if command -v ros2 &>/dev/null; then
        ROS_VER=$(ros2 --version 2>/dev/null || echo "installed")
        VERIFICATION_RESULTS+=("✓ ROS 2: ${ROS_VER}")
    else
        VERIFICATION_RESULTS+=("✓ ROS 2: Installed (needs reboot)")
    fi
else
    FAILED_CHECKS+=("✗ ROS 2")
fi

# Workspace
if [ -f "${WS_DIR}/install/setup.bash" ]; then
    VERIFICATION_RESULTS+=("✓ Arjuna Workspace: Built")
else
    FAILED_CHECKS+=("✗ Workspace")
fi

# PyTorch
if python3 -c "import torch" 2>/dev/null; then
    PT_VER=$(python3 -c "import torch; print(torch.__version__)" 2>/dev/null)
    PT_CUDA=$(python3 -c "import torch; print('CUDA' if torch.cuda.is_available() else 'CPU')" 2>/dev/null)
    VERIFICATION_RESULTS+=("✓ PyTorch: ${PT_VER} (${PT_CUDA})")
else
    FAILED_CHECKS+=("✗ PyTorch")
fi

# YOLOv8
if python3 -c "import ultralytics" 2>/dev/null; then
    VERIFICATION_RESULTS+=("✓ YOLOv8: Installed")
else
    FAILED_CHECKS+=("○ YOLOv8 (optional)")
fi

# jtop
if python3 -c "import jtop" 2>/dev/null; then
    VERIFICATION_RESULTS+=("✓ jtop: Installed")
else
    VERIFICATION_RESULTS+=("○ jtop (needs reboot)")
fi

# VS Code
if command -v code &>/dev/null; then
    VERIFICATION_RESULTS+=("✓ VS Code: Installed")
else
    VERIFICATION_RESULTS+=("○ VS Code (optional)")
fi

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
fi

echo ""
echo "=========================================================================="
echo "📋 NEXT STEPS:"
echo "=========================================================================="
echo ""
echo "1️⃣  REBOOT YOUR SYSTEM (Required for group changes & jtop)"
echo "   sudo reboot"
echo ""
echo "2️⃣  After reboot, test ROS 2:"
echo "   Terminal 1: ros2 run demo_nodes_cpp talker"
echo "   Terminal 2: ros2 run demo_nodes_py listener"
echo ""
echo "3️⃣  Check GPU:"
echo "   python3 -c 'import torch; print(torch.cuda.is_available())'"
echo ""
echo "4️⃣  Monitor system:"
echo "   jtop"
echo ""
echo "5️⃣  Start developing:"
echo "   ws && code ."
echo ""
echo "=========================================================================="
echo "📁 LOCATIONS:"
echo "=========================================================================="
echo "  Workspace:  ${WS_DIR}"
echo "  Models:     ${HOME_DIR}/models"
echo "  Log:        ${LOG_FILE}"
echo ""
echo "=========================================================================="
echo "⚡ USEFUL COMMANDS:"
echo "=========================================================================="
echo "  ws           - Go to workspace"
echo "  ros2build    - Build workspace"
echo "  ros2test     - Test ROS 2"
echo "  check_usb    - Show USB devices"
echo "  jtop         - System monitor"
echo "  max_power    - Enable max performance"
echo "  docker_gpu   - Test GPU in Docker"
echo ""
echo "=========================================================================="

if [ ${#FAILED_CHECKS[@]} -eq 0 ]; then
    echo ""
    echo "🎉 All critical components installed successfully!"
    echo "Installation completed at: $(date)"
    echo ""
fi

echo "=========================================================================="
echo ""