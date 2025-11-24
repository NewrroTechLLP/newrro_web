"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundLines } from "@/components/ui/background-lines";

export function HeroSection() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] py-20">
      <div className="absolute inset-0 bg-black/50" />
      <BackgroundLines className="absolute inset-0 opacity-20">
        <></>
      </BackgroundLines>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="container relative z-10 mx-auto px-4 text-left"
      >
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-6xl">
            Empowering Tomorrow&#39;s Innovators Through Robotics & AI
          </h1>
          <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl">
            Hands-on learning, cutting-edge R&D, and turnkey lab solutions that transform students into problem-solvers.
          </p>
          <Button size="lg" variant="secondary" className="text-lg">
            Explore Our Solutions
          </Button>
        </div>
      </motion.div>
    </div>
  );
}