// src/components/about-us/mission-vision-section.tsx
"use client";

import { motion } from "framer-motion";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Target, Eye } from "lucide-react";

export function MissionVisionSection() {
  return (
    <div className="relative overflow-hidden bg-slate-50/50 py-20 sm:py-24">
      {/* Subtle background pattern */}
      <BackgroundLines className="absolute inset-0 opacity-10">
                  <></>
      </BackgroundLines>
      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-300/60"
          >
            <div className="flex items-start gap-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Target className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Our Mission
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  Our mission is to ignite students&apos; curiosity and empower
                  them to become tomorrow&apos;s innovators.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50 transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-300/60"
          >
            <div className="flex items-start gap-6">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <Eye className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Our Vision
                </h2>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  To be the world&apos;s most trusted partner for robotics
                  education, research, and lab infrastructure, driving
                  innovation across academia and industry.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}