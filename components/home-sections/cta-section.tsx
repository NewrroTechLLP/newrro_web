"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from 'next/link';


export function CTASection() {
  return (
    <section className="py-12 sm:py-20 bg-gradient-to-t from-[#7e5bf6] to-[#df5bd3]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 sm:p-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
            Ready to Start Your Robotics Journey?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of students already transforming their future with NEWRRO&apos;s innovative robotics education
          </p>
          <Link href="https://wa.link/dr12f8" passHref>

            <Button size="lg" className="bg-[#7e5bf6] hover:bg-[#6f4fe0] text-white w-full sm:w-auto">
              Enroll Now <ArrowRight className="ml-2" />
            </Button>
          </Link>

        </motion.div>
      </div>
    </section>
  );
}
