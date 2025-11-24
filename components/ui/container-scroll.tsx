"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);


  const [responsiveScale, setResponsiveScale] = useState(1);

  // Adjust responsive scaling based on screen width
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    const newScale = Math.max(windowWidth / 1920, 0.4); // Clamp scaling between 0.4 and 1
    setResponsiveScale(newScale);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div
      className="flex items-center justify-center relative py-6 sm:py-8 md:py-10"
      ref={containerRef}
    >
      <div
        className="py-8 sm:py-8 md:py-10 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Card
          videoSrc="v1.mp4"
          responsiveScale={responsiveScale}
        />
      </div>
    </div>
  );
};

export const Card = ({
  videoSrc,
  responsiveScale,
}: {
  videoSrc?: string;
  responsiveScale: number;
}) => {
  if (!videoSrc) return null;

  return (
    <motion.div
      className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-5xl lg:max-w-[90%] xl:max-w-[95%] 2xl:max-w-[120%] mx-auto h-[18rem] sm:h-[22rem] md:h-[30rem] lg:h-[40rem] mt-4 mb-4 border-4 border-[#6C6C6C] p-2 bg-[#222222] rounded-[20px] shadow-2xl"
      >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
        >
          <source src="v1.mp4" type="video/mp4" />
        </video>
      </div>
    </motion.div>
  );
};
