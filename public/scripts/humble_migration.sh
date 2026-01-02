#!/bin/bash
# ==============================================================================
# FOXY → HUMBLE MIGRATION FIXER
# Automatically fixes common API changes in your workspace
# ==============================================================================

WS_DIR="${HOME}/arjuna2_ws"

echo "=========================================================================="
echo "  FOXY → HUMBLE MIGRATION FIXER"
echo "=========================================================================="
echo ""

cd "${WS_DIR}/src"

# Find all C++ source files
CPP_FILES=$(find . -name "*.cpp" -o -name "*.hpp" -o -name "*.h")

echo "Found $(echo "$CPP_FILES" | wc -l) C++ files to check"
echo ""

# Backup everything first
echo "Creating backup..."
tar -czf "${HOME}/arjuna2_ws_backup_$(date +%Y%m%d_%H%M%S).tar.gz" "${WS_DIR}/src"
echo "✓ Backup created"
echo ""

# Fix 1: TF2 Geometry Messages Header
echo "[1/5] Fixing tf2_geometry_msgs headers..."
find . \( -name "*.cpp" -o -name "*.hpp" -o -name "*.h" \) -exec \
    sed -i 's|#include <tf2_geometry_msgs/tf2_geometry_msgs.hpp>|#include <tf2_geometry_msgs/tf2_geometry_msgs.h>|g' {} \;
echo "✓ Fixed tf2_geometry_msgs includes"

# Fix 2: QoS Profile Updates
echo "[2/5] Checking QoS profiles..."
grep -r "rclcpp::QoS(" . --include="*.cpp" --include="*.hpp" | grep -v "KeepLast" || echo "  No QoS issues found"

# Fix 3: spin_some → spin
echo "[3/5] Checking for deprecated spin_some..."
if grep -r "spin_some" . --include="*.cpp"; then
    echo "⚠️  WARNING: spin_some found - needs manual review"
    echo "  Replace: rclcpp::spin_some(node)"
    echo "  With:    rclcpp::spin(node)"
else
    echo "  No spin_some found"
fi

# Fix 4: Check for deprecated headers
echo "[4/5] Checking for other deprecated includes..."
DEPRECATED_INCLUDES=(
    "rclcpp/rclcpp.hpp:rclcpp/rclcpp.hpp"
    "tf2/transform_datatypes.h:tf2/LinearMath/Transform.h"
)

for pattern in "${DEPRECATED_INCLUDES[@]}"; do
    IFS=':' read -r old new <<< "$pattern"
    if grep -r "$old" . --include="*.cpp" --include="*.hpp" >/dev/null 2>&1; then
        echo "  Found: $old (still works, but consider updating)"
    fi
done

# Fix 5: Check CMakeLists.txt for ament dependencies
echo "[5/5] Checking CMakeLists.txt files..."
find . -name "CMakeLists.txt" -exec grep -l "tf2_geometry_msgs" {} \; | while read -r cmake_file; do
    if ! grep -q "find_package(tf2_geometry_msgs REQUIRED)" "$cmake_file"; then
        echo "⚠️  Add to $cmake_file:"
        echo "     find_package(tf2_geometry_msgs REQUIRED)"
    fi
done

echo ""
echo "=========================================================================="
echo "  MIGRATION COMPLETE"
echo "=========================================================================="
echo ""
echo "Now rebuild your workspace:"
echo "  cd ~/arjuna2_ws"
echo "  colcon build"
echo ""
echo "If errors persist, check the manual migration guide below"
echo "=========================================================================="