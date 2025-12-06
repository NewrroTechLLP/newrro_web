cat >> /root/.bashrc <<'BASHRC'
ros2arjuna_setup() {
  echo "==========================================="
  echo "  ARJUNA SETUP - INSTALLING ALL DEPENDENCIES"
  echo "==========================================="
  echo ""
  # ============ ROS 2 PACKAGES ============
  echo "Installing ROS 2 packages..."
  apt-get update -o Acquire::Retries=3 -o Acquire::http::Timeout=120
  apt-get install -y \
    ros-foxy-nav2-bringup \
    ros-foxy-nav2-lifecycle-manager \
    ros-foxy-nav2-map-server \
    ros-foxy-navigation2 \
    ros-foxy-nav2-common \
    ros-foxy-slam-toolbox \
    ros-foxy-cartographer \
    ros-foxy-cartographer-ros \
    ros-foxy-robot-localization \
    ros-foxy-tf2-ros \
    ros-foxy-tf2-geometry-msgs \
    ros-foxy-tf2-tools \
    ros-foxy-robot-state-publisher \
    ros-foxy-teleop-twist-keyboard \
    ros-foxy-teleop-twist-joy \
    ros-foxy-rviz2 \
    ros-foxy-rviz-default-plugins \
    ros-foxy-rqt \
    ros-foxy-rqt-common-plugins \
    ros-foxy-cv-bridge \
    ros-foxy-vision-opencv \
    ros-foxy-image-transport \
    ros-foxy-compressed-image-transport \
    ros-foxy-joint-state-publisher \
    ros-foxy-xacro
  echo ""
  # ============ PYTHON PACKAGES VIA APT ============
  echo "Installing Python packages via apt..."
  apt-get install -y \
    python3-opencv \
    python3-numpy \
    python3-scipy \
    python3-matplotlib \
    python3-pil \
    python3-flask \
    python3-flask-cors \
    python3-requests \
    python3-yaml \
    python3-psutil \
    python3-pytest \
    python3-skimage
  echo ""
  # ============ PYTHON PACKAGES VIA PIP (NOT IN APT) ============
  echo "Installing Python packages via pip3..."
  pip3 install --break-system-packages \
    pyzbar \
    qrcode \
    transforms3d \
    pyquaternion \
    RPi.GPIO \
    gpiozero \
    SpeechRecognition \
    pyttsx3 \
    playsound \
    flask-socketio \
    python-socketio \
    simple-pid \
    imutils \
    tqdm
  echo ""
  # ============ CLONE WORKSPACE ============
  echo "Cloning Arjuna workspace..."
  mkdir -p /root/arjuna_ros2
  cd /root/arjuna_ros2 && rm -rf arjuna2_ws
  git clone --recurse-submodules https://github.com/samartha-s-in/arjuna2_ws.git
  echo ""
  # ============ CLONE HARDWARE DRIVERS ============
  echo "Cloning hardware drivers..."
  cd /root/arjuna_ros2/arjuna2_ws/src
  if [ ! -d "sllidar_ros2" ]; then
    git clone https://github.com/Slamtec/sllidar_ros2.git
  fi
  if [ ! -d "ros-imu-bno055" ]; then
    git clone https://github.com/dheera/ros-imu-bno055.git
  fi
  echo ""
  # ============ BUILD WORKSPACE ============
  echo "Building workspace..."
  cd /root/arjuna_ros2/arjuna2_ws
  source /opt/ros/foxy/setup.bash
  colcon build --symlink-install
  source /root/arjuna_ros2/arjuna2_ws/install/setup.bash
  echo ""
  # ============ VERIFY INSTALLATION ============
  echo "==========================================="
  echo "  CHECKING DEPENDENCIES"
  echo "==========================================="
  python3 -c "import cv2; print(\"✓ OpenCV:\", cv2.__version__)" 2>/dev/null || echo "✗ OpenCV"
  python3 -c "import pyzbar; print(\"✓ pyzbar\")" 2>/dev/null || echo "✗ pyzbar"
  python3 -c "import transforms3d; print(\"✓ transforms3d\")" 2>/dev/null || echo "✗ transforms3d"
  python3 -c "import serial; print(\"✓ pyserial\")" 2>/dev/null || echo "✗ pyserial"
  python3 -c "import speech_recognition; print(\"✓ SpeechRecognition\")" 2>/dev/null || echo "✗ SpeechRecognition"
  python3 -c "import flask; print(\"✓ Flask\")" 2>/dev/null || echo "✗ Flask"
  python3 -c "import numpy; print(\"✓ NumPy:\", numpy.__version__)" 2>/dev/null || echo "✗ NumPy"
  python3 -c "import psutil; print(\"✓ psutil\")" 2>/dev/null || echo "✗ psutil"
  echo "==========================================="
  ros2 pkg list | grep -q slam_toolbox && echo "✓ SLAM Toolbox" || echo "✗ SLAM Toolbox"
  ros2 pkg list | grep -q robot_localization && echo "✓ Robot Localization" || echo "✗ Robot Localization"
  ros2 pkg list | grep -q nav2 && echo "✓ Nav2" || echo "✗ Nav2"
  echo "==========================================="
  echo ""
  echo "==========================================="
  echo "  ✓ ARJUNA SETUP COMPLETE"
  echo "==========================================="
  cd /root/
}

save_map() {
  read -p "Enter map name (default: my_map): " map_name
  map_name=${map_name:-my_map}
  ros2 run nav2_map_server map_saver_cli -f /root/arjuna_ros2/arjuna2_ws/src/arjuna/arjuna/maps/"$map_name"
  echo "Map saved as: /root/arjuna_ros2/arjuna2_ws/src/arjuna/arjuna/maps/${map_name}.pgm and ${map_name}.yaml"