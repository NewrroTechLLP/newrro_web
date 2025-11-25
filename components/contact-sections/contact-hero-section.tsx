'use client';

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactHeroSection() {
  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#7e5bf6] via-[#df5bd3] to-[#7e5bf6] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Mail className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Get in Touch
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Have questions about our robotics solutions? We&apos;re here to help you innovate and transform your ideas into reality.
          </p>

          {/* Quick contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Phone className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Call Us</h3>
              <p className="text-white/80 text-sm">+91 8660875098</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <Mail className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Email Us</h3>
              <p className="text-white/80 text-sm">support@newrro.in</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <MapPin className="w-8 h-8 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Visit Us</h3>
              <p className="text-white/80 text-sm">NITTE Campus, Yelahanka</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
