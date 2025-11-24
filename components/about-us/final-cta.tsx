// src/components/FinalCTA.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
      {/* Background Gradient Aurora */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 m-auto h-[300px] w-full max-w-4xl bg-purple-200/30 blur-3xl"
      ></div>

      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            Ready to Transform Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Robotics Program?
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600"
          >
            Let&apos;s build the future of robotics education together. Reach
            out to our experts or see our innovative solutions in action with a
            personalized demo.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Primary Button */}
            <Button
              size="lg"
              className="group w-full bg-purple-600 text-lg hover:bg-purple-700 sm:w-auto"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            
            {/* Secondary Button (Fixed Visibility) */}
            <Button
              size="lg"
              variant="outline"
              className="w-full border-slate-300 bg-white text-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 sm:w-auto"
            >
              Schedule a Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}