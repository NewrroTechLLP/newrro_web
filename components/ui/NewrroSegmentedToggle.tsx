"use client";

import React from "react";
import { motion } from "framer-motion";

interface NewrroSegmentedToggleProps {
  options: string[];             // e.g. ["All", "Images", "Video"]
  selected: string;              // current selection
  onChange: (value: string) => void;  // callback when user picks a new option
}

export function NewrroSegmentedToggle({
  options,
  selected,
  onChange,
}: NewrroSegmentedToggleProps) {
  return (
    <div
      className="
        relative inline-flex items-center
        bg-[#7e5bf6]/20 
        rounded-full 
        p-1
        shadow-md
      "
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {options.map((option) => {
        const isActive = option === selected;

        return (
          <div key={option} className="relative flex-1">
            <motion.button
              type="button"
              onClick={() => onChange(option)}
              className={`
                relative z-10 w-full text-center font-semibold capitalize 
                px-6 py-2 rounded-full transition-colors
                ${
                  isActive
                    ? "text-white"
                    : "text-[#7e5bf6] hover:text-white"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>

            {/* Highlight bubble for active option */}
            {isActive && (
              <motion.div
                layoutId="highlight"
                className="
                  absolute top-0 left-0 right-0 bottom-0 
                  rounded-full 
                  bg-gradient-to-r from-[#df5bd3] to-[#7e5bf6] 
                  shadow-xl
                  z-0
                "
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
