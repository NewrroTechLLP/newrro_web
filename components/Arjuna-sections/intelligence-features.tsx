// IntelligenceFeaturesSection.tsx

'use client';

import { motion } from "framer-motion";
import { Navigation, Mic, QrCode, Globe, Eye, MapPin } from "lucide-react";


const intelligenceFeatures = [
  {
    icon: <Navigation className="w-12 h-12" />,
    title: "Navigation with Obstacle Avoidance",
    description: "Autonomous navigation that detects and avoids obstacles in real-time."
  },
  {
    icon: <Mic className="w-12 h-12" />,
    title: "Voice Control",
    description: "Control and interact with Arjuna using intuitive voice commands."
  },
  {
    icon: <QrCode className="w-12 h-12" />,
    title: "QR Code Tracking",
    description: "Seamlessly track and identify objects using QR code scanning."
  },
  {
    icon: <Globe className="w-12 h-12" />,
    title: "Web Controlled",
    description: "Operate Arjuna remotely via an easy-to-use web interface."
  },
  {
    icon: <Eye className="w-12 h-12" />,
    title: "Color and Object Detection",
    description: "Advanced visual recognition to detect and categorize objects by color and shape."
  },
  {
    icon: <MapPin className="w-12 h-12" />,
    title: "Autonomous Path Planning",
    description: "Smart pathfinding algorithms that optimize routes and avoid obstacles to reach destinations efficiently"
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
            Arjuna’s Intelligent Capabilities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the advanced features that make Arjuna a powerful companion
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
