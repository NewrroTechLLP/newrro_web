"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 bg-gray-900/50 border-gray-800 hover:border-purple-500 transition-all h-full">
        <div className="flex flex-col h-full">
          {icon}
          <h3 className="text-lg md:text-xl font-semibold my-4 text-white">{title}</h3>
          <p className="text-gray-400 text-sm md:text-base flex-grow">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
}