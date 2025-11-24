"use client"

import { motion } from "framer-motion"
import { Star, Shield, Zap, Clock } from "lucide-react"

const benefits = [
  {
    icon: <Star className="h-10 w-10" />,
    title: "Premium Quality",
    description: "All products meet our high standards with rigorous testing.",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and encrypted transactions.",
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: "Blazing Performance",
    description: "Optimized speeds for seamless and efficient workflows.",
  },
  {
    icon: <Clock className="h-10 w-10" />,
    title: "24/7 Support",
    description: "Our experts are available around the clock for assistance.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20 relative bg-gradient-to-r from-[#f8f8ff] to-[#ffffff]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* ✅ Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose Our Products?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the best in technology, security, and performance.
          </p>
        </motion.div>

        {/* ✅ Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white bg-opacity-30 backdrop-blur-md border border-gray-200 
                p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group 
                hover:scale-[1.05] transform flex flex-col items-center text-center h-full"
            >
              {/* ✅ Floating Icon Animation */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
                className="mb-6 text-[#df5bd3] group-hover:text-[#7e5bf6] transition-all duration-300"
              >
                {benefit.icon}
              </motion.div>

              {/* ✅ Title */}
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{benefit.title}</h3>

              {/* ✅ Description */}
              <p className="text-gray-600">{benefit.description}</p>

              {/* ✅ Animated Border Effect */}
              <div
                className="absolute inset-0 border-2 border-transparent 
                group-hover:border-[#df5bd3] group-hover:shadow-lg rounded-2xl 
                transition-all duration-300 pointer-events-none"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

