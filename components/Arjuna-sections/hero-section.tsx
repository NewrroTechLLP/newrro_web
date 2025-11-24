'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ContainerScroll, Card } from "@/components/ui/container-scroll";
import { ChevronRight } from "lucide-react";

export function HeroSection() {
  // Responsive Scale Logic
  const [responsiveScale, setResponsiveScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setResponsiveScale(0.8); // Scale down for smaller devices
      } else {
        setResponsiveScale(1); // Normal scale for larger devices
      }
    };

    handleResize(); // Set initial scale
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Main Content */}
      <div className="py-60 relative z-20 px-2 text-center">
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
              ARJUNA
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-black font-semibold max-w-3xl mx-auto mb-6 relative z-10"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
          >
            &quot;Revolutionizing How You Learn Robotics, One Step at a Time!&quot;
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="flex flex-col overflow-hidden">
            <ContainerScroll>
              {/* Card Component */}
              <Card
                videoSrc="v1.mp4"
                responsiveScale={responsiveScale}
              />
            </ContainerScroll>
          </div>
        </motion.div>

        {/* Text above the button */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-black font-semibold max-w-3xl mx-auto mb-6 relative z-10"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
        >
          &quot;Get the full scoop on Arjuna! Click below and explore all the possibilities!&quot;
        </motion.p>

        {/* Download Brochure Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="/assets/NR_Arjuna_catalogue.pdf"  // Replace with the correct path to your brochure
            download
          >
            <button
              className="bg-[#df5bd3] hover:bg-[#c74ebe] text-white px-8 py-4 text-lg rounded-full flex items-center group relative overflow-hidden transition-all duration-300 ease-in-out"
            >
              <span className="relative z-10 flex items-center">
                Download Brochure
                <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
