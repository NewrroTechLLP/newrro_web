"use client";

import { motion } from "framer-motion";
import { BackgroundLines } from "@/components/ui/background-lines";

export function HeroSection() {
  return (
    <div className="relative h-[40vh] bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] overflow-hidden">
      <div className="absolute inset-0 bg-black/40" />
      <BackgroundLines className="absolute inset-0 opacity-20" >
        <></> {/* ✅ Empty fragment to satisfy required `children` prop */}
      </BackgroundLines>
      <div className="container relative z-10 mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl"
          >
            Discover our range of innovative solutions designed to transform your business.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
