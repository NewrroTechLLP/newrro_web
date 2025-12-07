#!/bin/bash
# ==============================================================================
# NEWRRO TECH LLP - TF2 & NAV2 ESSENTIAL PACKAGES INSTALLER
# Installs only required TF2 and Nav2 packages for robot navigation
# ==============================================================================

set -e

LOG_FILE="${HOME}/tf2_nav2_install_$(date +%Y%m%d_%H%M%S).log"
exec > >(tee -a "$LOG_FILE") 2>&1

log() { echo -e "\n[$(date +%H:%M:%S)] [INFO] $*"; }
warn() { echo -e "\n[$(date +%H:%M:%S)] [WARN] $*"; }
err() { echo -e "\n[$(date +%H:%M:%S)] [ERROR] $*"; }
success() { echo -e "\n[$(date +%H:%M:%S)] [SUCCESS] $*"; }

echo "=========================================================================="
echo "       TF2 & NAV2 ESSENTIAL PACKAGES INSTALLER"
echo "=========================================================================="
echo ""

# Check if ROS 2 is installed
if [ ! -f /opt/ros/humble/setup.bash ]; then
    err "ROS 2 Humble not installed. Please install ROS 2 first."
    exit 1
fi

log "Sourcing ROS 2 environment..."
source /opt/ros/humble/setup.bash

log "Updating package lists..."
sudo apt-get update

# ------------------------------------------------------------------------------
# TF2 (Transform) COMPLETE PACKAGE
# ------------------------------------------------------------------------------
echo ""
echo "=========================================================================="
echo " [1/2] INSTALLING TF2 (TRANSFORM) PACKAGES"
echo "=========================================================================="

log "Installing TF2 core packages..."
sudo apt-get install -y \
    ros-humble-tf2 \
    ros-humble-tf2-ros \
    ros-humble-tf2-py \
    ros-humble-tf2-tools \
    ros-humble-tf2-msgs \
    ros-humble-tf2-geometry-msgs \
    ros-humble-tf2-sensor-msgs \
    ros-humble-tf2-eigen \
    ros-humble-tf2-kdl \
    ros-humble-tf2-bullet \
    ros-humble-geometry2

success "✓ TF2 packages installed"

# ------------------------------------------------------------------------------
# NAV2 COMPLETE PACKAGE
# ------------------------------------------------------------------------------
echo ""
echo "=========================================================================="
echo " [2/2] INSTALLING NAV2 (NAVIGATION) PACKAGES"
echo "=========================================================================="

log "Installing Nav2 core navigation stack..."
sudo apt-get install -y \
    ros-humble-navigation2 \
    ros-humble-nav2-bringup \
    ros-humble-nav2-common \
    ros-humble-nav2-msgs

log "Installing Nav2 map server and map saver..."
sudo apt-get install -y \
    ros-humble-nav2-map-server \
    ros-humble-nav2-lifecycle-manager

log "Installing Nav2 planners..."
sudo apt-get install -y \
    ros-humble-nav2-planner \
    ros-humble-nav2-navfn-planner \
    ros-humble-nav2-theta-star-planner \
    ros-humble-nav2-smac-planner

log "Installing Nav2 controllers..."
sudo apt-get install -y \
    ros-humble-nav2-controller \
    ros-humble-nav2-regulated-pure-pursuit-controller \
    ros-humble-nav2-dwb-controller \
    ros-humble-nav2-rotation-shim-controller

log "Installing Nav2 behaviors..."
sudo apt-get install -y \
    ros-humble-nav2-behaviors \
    ros-humble-nav2-bt-navigator \
    ros-humble-nav2-waypoint-follower

log "Installing Nav2 costmap and AMCL..."
sudo apt-get install -y \
    ros-humble-nav2-costmap-2d \
    ros-humble-nav2-amcl

log "Installing Nav2 utilities and tools..."
sudo apt-get install -y \
    ros-humble-nav2-util \
    ros-humble-nav2-core \
    ros-humble-nav2-rviz-plugins \
    ros-humble-nav2-collision-monitor

log "Installing SLAM Toolbox (for mapping)..."
sudo apt-get install -y \
    ros-humble-slam-toolbox

log "Installing Robot Localization..."
sudo apt-get install -y \
    ros-humble-robot-localization

success "✓ Nav2 packages installed"

# ------------------------------------------------------------------------------
# VERIFICATION
# ------------------------------------------------------------------------------
echo ""
echo "=========================================================================="
echo " VERIFICATION"
echo "=========================================================================="
echo ""

log "Verifying TF2 installation..."
if ros2 pkg list | grep -q "tf2"; then
    success "✓ TF2 packages found"
    ros2 pkg list | grep "tf2"
else
    err "✗ TF2 packages not found"
fi

echo ""
log "Verifying Nav2 installation..."
if ros2 pkg list | grep -q "nav2"; then
    success "✓ Nav2 packages found"
    ros2 pkg list | grep "nav2"
else
    err "✗ Nav2 packages not found"
fi

echo ""
log "Verifying map_server availability..."
if ros2 pkg executables nav2_map_server | grep -q "map_saver_cli"; then
    success "✓ map_saver_cli available"
else
    warn "✗ map_saver_cli not found"
fi

echo ""
echo "=========================================================================="
echo " INSTALLATION COMPLETE"
echo "=========================================================================="
echo ""

success "🎉 TF2 and Nav2 packages installed successfully!"

echo ""
echo "=========================================================================="
echo " QUICK USAGE EXAMPLES"
echo "=========================================================================="
echo ""

echo "1. View TF tree:"
echo "   ros2 run tf2_tools view_frames"
echo ""

echo "2. Echo TF transforms:"
echo "   ros2 run tf2_ros tf2_echo <source_frame> <target_frame>"
echo ""

echo "3. Save a map (while SLAM is running):"
echo "   ros2 run nav2_map_server map_saver_cli -f ~/my_map"
echo ""

echo "4. Load a map:"
echo "   ros2 run nav2_map_server map_server --ros-args -p yaml_filename:=my_map.yaml"
echo ""

echo "5. Launch Nav2 with a map:"
echo "   ros2 launch nav2_bringup bringup_launch.py map:=/path/to/my_map.yaml"
echo ""

echo "6. Launch SLAM Toolbox for mapping:"
echo "   ros2 launch slam_toolbox online_async_launch.py"
echo ""

echo "=========================================================================="
echo " IMPORTANT FILES"
echo "=========================================================================="
echo ""
echo "  Log File: ${LOG_FILE}"
echo ""
echo "=========================================================================="
echo ""
