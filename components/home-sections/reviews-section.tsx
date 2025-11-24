"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Animatedreviewsstu } from "../ui/reviews-stu";
import { Animatedreviewsexp } from "../ui/reviews-exp";



export function ReviewsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Stories From Our Users and Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from those who have experienced the NEWRRO difference
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 mb-4 md:mb-0 text-center"
          >
            <h3 className="text-2xl font-semibold mb-2 text-black">&quot;What Our Students Say&quot;</h3>
            <Animatedreviewsstu />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 text-center"
          >
            <h3 className="text-2xl font-semibold mb-2 text-black">&quot;Expert Insights&quot;</h3>
            <Animatedreviewsexp />
          </motion.div>
        </div>
      </div>
    </section>
  );
}