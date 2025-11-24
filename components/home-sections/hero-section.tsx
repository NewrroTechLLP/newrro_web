"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const VIDEO_URL =
  "https://cdn.jsdelivr.net/gh/ayushanand2003/Newrro-production-build@0be8a2c88b03de3b53df6fc01f022f9922a8bea8/public/v3.mp4?raw=true";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      video
        .play()
        .then(() => {
          setVideoLoaded(true);
          console.log("✅ Video autoplay successful");
        })
        .catch((error) => {
          console.warn("⚠️ Autoplay blocked, waiting for interaction", error);
          setVideoFailed(true);
        });
    };

    // ✅ Play video immediately when the page loads
    if (document.readyState === "complete") {
      playVideo();
    } else {
      window.addEventListener("load", playVideo);
    }

    // ✅ Simulate user interaction for autoplay (tricks the browser)
    const simulateInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        playVideo();
      }
    };

    document.addEventListener("mousemove", simulateInteraction, { once: true });
    document.addEventListener("touchstart", simulateInteraction, { once: true });

    return () => {
      window.removeEventListener("load", playVideo);
      document.removeEventListener("mousemove", simulateInteraction);
      document.removeEventListener("touchstart", simulateInteraction);
    };
  }, [userInteracted]);

  return (
    <>
      {/* ✅ Force Preloading */}
      <head>
        <link rel="preload" as="video" href={VIDEO_URL} type="video/mp4" />
      </head>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* ✅ Instant Fallback Thumbnail */}
        {videoFailed && (
          <img
            src="/fallback-thumbnail.jpg"
            alt="Background"
            className="absolute inset-0 z-0 w-full h-full object-cover"
          />
        )}

        {/* ✅ Video with Forced Autoplay */}
        {!videoFailed && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            className={`absolute inset-0 z-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* ✅ Main Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold mb-8 text-white"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#df5bd3] to-[#7e5bf6]">
                NEWRRO
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white font-semibold max-w-3xl mx-auto mb-6"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}
            >
              &quot;Bring your imaginations to life with us.&quot;
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-white/90 font-medium max-w-3xl mx-auto mb-12"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)" }}
            >
              Let us be your #1 stepping-stone towards the endless possibilities
              of your creations.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
            >
              <Link href="https://wa.link/dr12f8" passHref>
                <Button
                  size="lg"
                  className="bg-[#df5bd3] hover:bg-[#c74ebe] text-white px-8 py-6 text-lg rounded-full group relative overflow-hidden transition-all duration-300 ease-in-out"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
