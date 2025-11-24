'use client';

import { motion } from "framer-motion";
import { Cpu, Wifi, Cloud, Zap, Network, Boxes } from "lucide-react";

const intelligenceFeatures = [
  {
    icon: <Cpu className="w-12 h-12" />,
    title: "Dual Controller System",
    description: "Powered by ESP32 and Raspberry Pi Pico for enhanced processing and flexibility"
  },
  {
    icon: <Wifi className="w-12 h-12" />,
    title: "Wi-Fi & Bluetooth Connectivity",
    description: "Seamless wireless control and communication for IoT applications"
  },
  {
    icon: <Cloud className="w-12 h-12" />,
    title: "Cloud Integration",
    description: "Compatible with Blynk, ThingSpeak, ThingsBoard, Adafruit IO, and Firebase"
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: "High-Power Motor Driver",
    description: "7V to 24V 6A per channel motor driver with encoder compatibility"
  },
  {
    icon: <Network className="w-12 h-12" />,
    title: "SBC Compatible",
    description: "Works with Jetson series, Raspberry Pi series, and other microcontrollers"
  },
  {
    icon: <Boxes className="w-12 h-12" />,
    title: "Modular & Expandable",
    description: "USB, GPIO, I2C, UART, SPI expansion board for unlimited possibilities"
  }
];

export function IntelligenceFeatures() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Newric's Intelligent Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Advanced features designed for engineering colleges, research labs, and robotics educators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {intelligenceFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 glass-effect hover:shadow-lg">
                <div className="relative z-10">
                  <div className="mb-4 text-[#df5bd3] group-hover:text-[#7e5bf6] transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
