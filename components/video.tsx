// src/components/VideoPlayer.tsx
import { motion } from "framer-motion";
import React from "react";

const VideoPlayer: React.FC = () => {
  return (
    // <motion.div
    //   initial={{ y: 20, opacity: 0 }}
    //   animate={{ y: 0, opacity: 1 }}
    //   transition={{ duration: 0.8, delay: 0.8 }}
    //   className="bg-[#7e5bf6] p-8 rounded-xl shadow-lg max-w-4xl mx-auto mt-12 flex items-center justify-center"
    // >
      <div className="flex flex-col items-center gap-6">
        {/* Text Section */}
        {/* <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">ARJUNA</h1>
          <p className="mt-4 text-base">
          Our innovative, cross-platform learning agent designed for seamless navigation, voice interaction, and intelligent tracking—pioneering the future of educational robotics..
          </p>
          
        </div> */}

        {/* Video Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="rounded-lg overflow-hidden shadow-md"
        >
         {/* <iframe title="vimeo-player" src="https://player.vimeo.com/video/1028135356?h=d30c292251" width="640" height="360" frameborder="0"    allowfullscreen></iframe> */}
        </motion.div>
      </div>
    //  </motion.div>
  );
};

export default VideoPlayer;
