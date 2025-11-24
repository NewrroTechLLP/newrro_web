'use client';

import { motion } from "framer-motion";
import { BookOpen, FlaskConical, Lightbulb, GraduationCap } from "lucide-react";

const academicUses = [
  {
    icon: <BookOpen className="w-12 h-12" />,
    title: "Coursework & Laboratory",
    description: "Hands-on modules in robotics, IoT, and embedded systems with labs on motor control, PID tuning, and sensor integration.",
    details: [
      "Experiments on networking protocols (MQTT, HTTP, BLE, Wi-Fi)",
      "Motor control and PID tuning exercises",
      "Sensor integration workshops",
      "Real-time system monitoring"
    ]
  },
  {
    icon: <FlaskConical className="w-12 h-12" />,
    title: "Research Focus",
    description: "Advanced topics in sensor fusion, trajectory planning, and obstacle avoidance with AI/ML integration.",
    details: [
      "TinyML inference and edge analytics",
      "Cloud learning integration",
      "Vision-based intelligence systems",
      "Secure IoT communication and OTA updates"
    ]
  },
  {
    icon: <Lightbulb className="w-12 h-12" />,
    title: "Capstone & Innovation Projects",
    description: "Real-world projects spanning multiple domains of robotics and automation.",
    details: [
      "Autonomous delivery systems",
      "Smart agriculture solutions",
      "Healthcare robotics applications",
      "Swarm systems and AI-enabled service robots"
    ]
  },
  {
    icon: <GraduationCap className="w-12 h-12" />,
    title: "Learning Outcomes",
    description: "Comprehensive skill development in system integration, control algorithms, and cloud connectivity.",
    details: [
      "Apply robotics, IoT, and AI to real-world challenges",
      "Edge AI application development",
      "Innovation for research and industry",
      "System integration expertise"
    ]
  }
];

export function AcademicSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Academic & Research Use
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive educational platform for robotics, IoT, and AI learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {academicUses.map((use, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-[#7e5bf6] transition-all duration-300 hover:shadow-xl h-full">
                <div className="relative z-10">
                  <div className="mb-4 text-[#df5bd3] group-hover:text-[#7e5bf6] transition-colors duration-300">
                    {use.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                    {use.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {use.description}
                  </p>
                  <ul className="space-y-2">
                    {use.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="text-[#7e5bf6] mr-2 mt-1">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Included Accessories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-[#4A3EBD] to-[#7e5bf6] text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Included Accessories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <p className="font-semibold">Newric Unit</p>
                  <p className="text-sm text-white/90">Fully assembled and ready to use</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <p className="font-semibold">Pre-flashed Firmware</p>
                  <p className="text-sm text-white/90">Based on version</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <p className="font-semibold">12V 5000mAh Battery</p>
                  <p className="text-sm text-white/90">With fast charger included</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <p className="font-semibold">Documentation</p>
                  <p className="text-sm text-white/90">User guide and setup docs</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <p className="font-semibold">Curriculum Access</p>
                  <p className="text-sm text-white/90">With purchase</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <p className="font-semibold">Project Videos</p>
                  <p className="text-sm text-white/90">Development tutorials</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
