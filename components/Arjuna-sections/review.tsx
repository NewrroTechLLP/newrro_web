"use client";

import React from "react";
import { motion } from "framer-motion"; // Ensure framer-motion is installed
import { ReviewCards } from "../ui/review-cards";

export function ReviewsSectionArjuna() {
  return (
    <div className="h-auto rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
      {/* Section Header */}
      <div className="py-5 relative z-20 px-2 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8 text-black"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#df5bd3] to-[#7e5bf6]">
            Shared Perspectives
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-black font-semibold max-w-3xl mx-auto mb-6 relative z-10"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
          >
            &quot;First-hand accounts of ARJUNA&apos;s transformative power in education.&quot;
          </motion.p>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white items-center justify-center relative overflow-hidden">
        <ReviewCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "The ARJUNA kit is an incredible educational tool! The industrial-grade electronics and high-resolution sensors provided my students with a real-world experience unmatched by any other kit we've tried.",
    name: "Sophia Carter",
    title: "STEM Educator",
    rating: 5,
  },
  {
    quote:
      "The hands-on experience with ARJUNA has transformed the way our students approach robotics and problem-solving. The advanced smart actuators are a game-changer in educational robotics.",
    name: "Rahul Sharma",
    title: "Robotics Instructor",
    rating: 5,
  },
  {
    quote:
      "I was amazed by how quickly my students were able to assemble and program the ARJUNA kit. It's intuitive, robust, and perfectly designed for educational purposes.",
    name: "Emily Wong",
    title: "Technology Specialist",
    rating: 4,
  },
  {
    quote:
      "The ARJUNA Robotics Kit has taken our robotics club to the next level. The practical applications and real-world challenges it offers are exactly what our students needed to excel.",
    name: "James Lee",
    title: "Club Coordinator",
    rating: 5,
  },
  {
    quote:
      "As a parent, I appreciate the thoughtfulness behind the ARJUNA kit. It's not just a toy—it's a comprehensive learning experience that prepares kids for the future.",
    name: "Anita Patel",
    title: "Parent of STEM Enthusiast",
    rating: 4,
  },
];
