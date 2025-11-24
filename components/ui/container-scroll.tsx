"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

export const ContainerScroll = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        {children}
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

  // Check if videoSrc is a YouTube URL and extract video ID
  const getYouTubeEmbedUrl = (url: string) => {
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}`;
    }
    return null;
  };

  const embedUrl = getYouTubeEmbedUrl(videoSrc);

  return (
    <motion.div
      className="w-full max-w-[90%] sm:max-w-[85%] md:max-w-5xl lg:max-w-[90%] xl:max-w-[95%] 2xl:max-w-[120%] mx-auto h-[18rem] sm:h-[22rem] md:h-[30rem] lg:h-[40rem] mt-4 mb-4 border-4 border-[#6C6C6C] p-2 bg-[#222222] rounded-[20px] shadow-2xl"
      >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
        {embedUrl ? (
          <iframe
            className="w-full h-full"
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </div>
    </motion.div>
  );
};
