"use client";
import { motion } from "framer-motion";
import { BrainCircuit, Bot, Wrench } from "lucide-react";
import React from "react"; // ✅ This is the missing line

const expertiseAreas = [
  {
    icon: <BrainCircuit />,
    title: "Research & Development",
    description: "Robot controllers, AI Agents, Visual SLAM, Swarm Technology, and Autonomous Aerial Vehicles.",
    className: "lg:col-span-2",
  },
  {
    icon: <Bot />,
    title: "Hands-On Training",
    description: "Comprehensive workshops in ROS, AMR, autonomous vehicles, Python & OpenCV.",
    className: "lg:col-span-1",
  },
  {
    icon: <Wrench />,
    title: "Products & Solutions",
    description: "End-to-end lab design, bespoke curriculum, and advanced robot kits (NR-B1, Arjuna).",
    className: "lg:col-span-3",
  },
];

export function ExpertiseSection() {
  return (
    <section className="bg-muted py-20 text-foreground md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold md:text-6xl">Core Expertise</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We excel across the full spectrum of robotics, from foundational research to practical application.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {expertiseAreas.map((area) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`rounded-2xl border bg-card p-8 shadow-lg ${area.className}`}
            >
              <div className="mb-4 text-primary">{React.cloneElement(area.icon, { size: 32 })}</div>
              <h3 className="mb-2 text-2xl font-bold">{area.title}</h3>
              <p className="text-muted-foreground">{area.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}