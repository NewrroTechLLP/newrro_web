'use client';

import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "../ui/bentogrid";
import { Cpu, HardDrive, Boxes, Cloud, MapPin, Battery, LoaderPinwheel, Camera, TvMinimal, Gauge, Mic, Volume2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const basicKitSpecs = [
  {
    icon: <Cpu className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Jetson Nano with ROS1 & ROS2",
    description: "NVIDIA Jetson Nano pre-configured with Docker support for both ROS1 and ROS2, enabling flexible robotics development with AI acceleration and seamless framework switching.",
    imageSrc: "/assets/specific_images/jetson.png",
    imageAlt: "Jetson Nano hardware"
  },
  {
    icon: <MapPin className="w-12 h-12 text-[#4A3EBD]" />,
    title: "7semi IMU BNO055",
    description: "High-accuracy 9-axis absolute orientation sensor combining accelerometer, gyroscope, and magnetometer for precise motion tracking and orientation measurement in demanding robotics applications.",
    imageSrc: "/assets/specific_images/imu.jpg",
    imageAlt: "BNO055 IMU module"
  },
  {
    icon: <Cloud className="w-12 h-12 text-[#4A3EBD]" />,
    title: "RPLIDAR C1",
    description: "Industrial-grade IO rated 360° laser scanner delivering up to 8kHz sampling rate with 12-meter range for robust SLAM mapping and autonomous navigation in challenging environments.",
    imageSrc: "/assets/specific_images/lidar.jpg",
    imageAlt: "RPLIDAR C1"
  },
  {
    icon: <LoaderPinwheel className="w-12 h-12 text-[#4A3EBD]" />,
    title: "High Precision Smart Actuators",
    description: "Advanced servo actuators with position feedback and torque control, delivering precise motion control with minimal backlash for accurate robotic movements and manipulation tasks.",
    imageSrc: "/assets/specific_images/servo.jpg",
    imageAlt: "High Precision Smart Actuators"
  },
  {
    icon: <Boxes className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Ultrasonic Sensors",
    description: "Multi-directional ultrasonic array providing reliable short-range obstacle detection with 2cm-400cm range, perfect for collision avoidance and proximity awareness.",
    imageSrc: "/assets/specific_images/us.webp",
    imageAlt: "Ultrasonic sensors"
  },
  {
    icon: <HardDrive className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Arjuna Motherboard (Upgradable)",
    description: "Custom PCB hub integrating all sensors and peripherals with optimized power distribution and communication protocols, designed for seamless upgrade path to Advanced configuration.",
    imageSrc: "/assets/specific_images/mb.webp",
    imageAlt: "Arjuna Motherboard"
  },
  {
    icon: <Camera className="w-12 h-12 text-[#4A3EBD]" />,
    title: "2D Web Camera",
    description: "High-definition 1080p webcam with wide-angle lens for visual perception, object detection, and real-time video streaming capabilities in robotics applications.",
    imageSrc: "/assets/specific_images/cam.png",
    imageAlt: "2D Web Camera"
  },
  {
    icon: <TvMinimal className="w-12 h-12 text-[#4A3EBD]" />,
    title: "7 Inch Display",
    description: "Vibrant touchscreen display with 1024x600 resolution for live telemetry visualization, system diagnostics, and interactive robot control interface.",
    imageSrc: "/assets/specific_images/disp.png",
    imageAlt: "7 inch Display"
  },
];

const advancedKitSpecs = [
  {
    icon: <Cpu className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Jetson Orin Nano Super with ROS2",
    description: "Next-gen NVIDIA Jetson Orin Nano Super featuring 1024-core GPU and 8GB memory, delivering up to 67 TOPS AI performance with native ROS2 support for cutting-edge autonomous robotics.",
    imageSrc: "/assets/specific_images/jetson.png",
    imageAlt: "Jetson Orin Nano Super"
  },
  {
    icon: <Gauge className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Bosch IMU BNO055",
    description: "Premium Bosch BNO055 intelligent 9-DOF absolute orientation sensor with factory calibration and sensor fusion algorithms, ensuring industrial-grade accuracy and reliability.",
    imageSrc: "/assets/specific_images/imu.jpg",
    imageAlt: "Bosch BNO055 IMU"
  },
  {
    icon: <Cloud className="w-12 h-12 text-[#4A3EBD]" />,
    title: "RPLIDAR C1 IO Rated",
    description: "Industrial-certified RPLIDAR C1 with enhanced durability, IP54 protection rating, and optimized firmware for reliable performance in harsh industrial and outdoor environments.",
    imageSrc: "/assets/specific_images/lidar.jpg",
    imageAlt: "RPLIDAR C1 IO rated"
  },
  {
    icon: <LoaderPinwheel className="w-12 h-12 text-[#4A3EBD]" />,
    title: "High Precision Smart Actuators",
    description: "Professional-grade servo actuators with advanced position feedback, current sensing, and thermal protection for demanding robotic applications requiring sub-millimeter precision.",
    imageSrc: "/assets/specific_images/servo.jpg",
    imageAlt: "High Precision Smart Actuators"
  },
  {
    icon: <Boxes className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Ultrasonic Sensors",
    description: "Enhanced ultrasonic sensor array with temperature compensation and noise filtering, delivering consistent performance across varying environmental conditions.",
    imageSrc: "/assets/specific_images/us.webp",
    imageAlt: "Ultrasonic sensors"
  },
  {
    icon: <Zap className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Arjuna Motherboard Advanced",
    description: "Premium motherboard configuration with expanded I/O capabilities, enhanced power management, and dedicated AI accelerator interfaces for maximum performance and scalability.",
    imageSrc: "/assets/specific_images/mb.webp",
    imageAlt: "Arjuna Motherboard Advanced"
  },
  {
    icon: <Camera className="w-12 h-12 text-[#4A3EBD]" />,
    title: "3D Depth Camera OAK-D Lite",
    description: "Luxonis OAK-D Lite with autofocus and onboard AI processing, providing stereo depth perception up to 10m, spatial object detection, and neural network inference at the edge.",
    imageSrc: "/assets/specific_images/cam.png",
    imageAlt: "OAK-D Lite Camera"
  },
  {
    icon: <TvMinimal className="w-12 h-12 text-[#4A3EBD]" />,
    title: "7 Inch Display",
    description: "Premium touchscreen display with enhanced brightness and viewing angles, featuring capacitive touch for intuitive multi-point gesture control and rich data visualization.",
    imageSrc: "/assets/specific_images/disp.png",
    imageAlt: "7 inch Display"
  },
  {
    icon: <Volume2 className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Speakers",
    description: "High-fidelity stereo speakers with digital signal processing for clear audio feedback, voice synthesis, and acoustic alerts in human-robot interaction scenarios.",
    imageSrc: "/assets/specific_images/speakers.png",
    imageAlt: "Speakers"
  },
  {
    icon: <Mic className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Microphones",
    description: "Dual digital MEMS microphones with noise cancellation and beamforming capabilities, enabling voice commands, sound localization, and ambient audio monitoring.",
    imageSrc: "/assets/specific_images/mic.png",
    imageAlt: "Microphones"
  },
];

export function SpecificationSection() {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  const currentSpecs = activeTab === 'basic' ? basicKitSpecs : advancedKitSpecs;

  return (
    <section className="py-20 bg-[#F3F4F6] relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#4A3EBD]">
            Product Specifications
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose between our Basic Kit for learning and Advanced Kit for professional applications
          </p>

          {/* Tab Buttons */}
          <div className="inline-flex rounded-lg border-2 border-[#4A3EBD] p-1 bg-white shadow-lg">
            <button
              onClick={() => setActiveTab('basic')}
              className={cn(
                "px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300",
                activeTab === 'basic'
                  ? "bg-[#4A3EBD] text-white shadow-md"
                  : "bg-transparent text-[#4A3EBD] hover:bg-[#4A3EBD]/10"
              )}
            >
              Basic Kit
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={cn(
                "px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300",
                activeTab === 'advanced'
                  ? "bg-[#4A3EBD] text-white shadow-md"
                  : "bg-transparent text-[#4A3EBD] hover:bg-[#4A3EBD]/10"
              )}
            >
              Advanced Kit
            </button>
          </div>

          {/* Kit Description */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 max-w-3xl mx-auto"
          >
            {activeTab === 'basic' ? (
              <p className="text-md text-gray-700 bg-white/70 px-6 py-3 rounded-lg border border-[#4A3EBD]/20">
                Perfect for education, research, and robotics enthusiasts. Features upgradable components and comprehensive ROS support.
              </p>
            ) : (
              <p className="text-md text-gray-700 bg-white/70 px-6 py-3 rounded-lg border border-[#4A3EBD]/20">
                Industry-grade solution with enhanced AI processing, 3D perception, and audio capabilities for professional robotics deployment.
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* BentoGrid with dynamic cards */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BentoGrid className="max-w-6xl mx-auto">
            {currentSpecs.map((spec, index) => (
              <BentoGridItem
                key={index}
                title={spec.title}
                description={spec.description}
                header={spec.icon}
                className={cn(
                  index === 0 ? "md:col-span-1 md:row-span-1" : ""
                )}
                imageSrc={spec.imageSrc}
                imageAlt={spec.imageAlt}
              />
            ))}
          </BentoGrid>
        </motion.div>

        {/* Upgrade Notice for Basic Kit */}
        {activeTab === 'basic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-[#4A3EBD] to-[#7e5bf6] text-white px-6 py-3 rounded-lg shadow-lg">
              <p className="text-sm font-semibold">
                🚀 Upgrade Path Available: Seamlessly upgrade to Advanced Kit components anytime
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
