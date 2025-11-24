'use client';

import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "../ui/bentogrid";
import { Cpu, Battery, HardDrive, Gauge, Zap, Settings, Monitor, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const specifications = [
  {
    icon: <Cpu className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Computing Unit",
    description: "Dual Controller: ESP32 and Raspberry Pi Pico for flexible robotics development",
    details: [
      "Platform: ESP32 Microcontroller Based",
      "Connectivity: Wi-Fi, Bluetooth",
      "Memory: Standard 8GB (extendable)",
      "Compatible with Jetson series, Raspberry Pi series"
    ]
  },
  {
    icon: <Zap className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Motor Driver",
    description: "High-power 4-channel motor driver with encoder compatibility",
    details: [
      "Voltage: 7V to 24V",
      "Current: 6A per channel",
      "12V 5A Each with 4 channels",
      "Encoder compatibility for precise control"
    ]
  },
  {
    icon: <Battery className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Power System",
    description: "12V 5000mAh Li-ion battery with comprehensive protection",
    details: [
      "Battery: 12V 5000mAh Li-ion with BMS",
      "Charger included with indicator",
      "Short-circuit & thermal protection",
      "Reverse polarity protection",
      "5V 4A USB output"
    ]
  },
  {
    icon: <Gauge className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Built-in Features",
    description: "Integrated microphone, speaker, and battery indicator",
    details: [
      "Microphone for voice input",
      "Speaker for audio feedback",
      "Battery level indicator",
      "Compact design (~1 kg)"
    ]
  },
  {
    icon: <Settings className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Expansion Board",
    description: "Multiple connectivity options for sensors and peripherals",
    details: [
      "USB connectivity",
      "GPIO pins",
      "I2C, UART, SPI interfaces",
      "Support for various SBCs"
    ]
  },
  {
    icon: <Wrench className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Mechanical Specs",
    description: "Compact and lightweight design for easy integration",
    details: [
      "Dimensions: 350mm × 280mm × 200mm",
      "Weight: ~1 kg (with battery)",
      "Durable construction",
      "Easy mounting options"
    ]
  },
  {
    icon: <Monitor className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Software Support",
    description: "Programming flexibility with multiple IDE options",
    details: [
      "Languages: MicroPython, Arduino",
      "IDE: Arduino IDE, VS Code, Thonny",
      "Cloud platforms: Blynk, Firebase",
      "Browser-based web interface"
    ]
  },
  {
    icon: <HardDrive className="w-12 h-12 text-[#4A3EBD]" />,
    title: "Additional Sensors",
    description: "Customizable sensor suite for diverse applications",
    details: [
      "Ultrasonic, IR, Motion sensors",
      "IMU (built-in)",
      "Temperature & humidity (DHT11)",
      "RFID, Touch, and more"
    ]
  },
];

export function SpecificationSection() {
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
            Technical Specifications
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Newric AI & IoT compatible controller designed for advanced robotics education and research
          </p>
          <div className="inline-block bg-gradient-to-r from-[#4A3EBD] to-[#7e5bf6] text-white px-6 py-3 rounded-lg shadow-lg">
            <p className="text-sm font-semibold">
              Ideal for Engineering Colleges, Research Labs & Robotics Educators
            </p>
          </div>
        </motion.div>

        {/* BentoGrid with specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BentoGrid className="max-w-6xl mx-auto">
            {specifications.map((spec, index) => (
              <BentoGridItem
                key={index}
                title={spec.title}
                description={spec.description}
                header={spec.icon}
                className={cn(
                  index === 0 ? "md:col-span-1 md:row-span-1" : ""
                )}
              />
            ))}
          </BentoGrid>
        </motion.div>

        {/* Warranty & Support Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-white border-2 border-[#4A3EBD] text-gray-800 px-6 py-4 rounded-lg shadow-lg">
            <p className="text-sm font-semibold mb-2">
              6 Months Warranty | 48-Hour Support Resolution | 24/7 AI Assistant
            </p>
            <p className="text-xs text-gray-600">
              Full technical manual and learning modules included
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
