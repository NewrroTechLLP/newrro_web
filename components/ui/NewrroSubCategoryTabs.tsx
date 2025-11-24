"use client";

import { motion } from "framer-motion";
import React from "react";

interface NewrroSubCategoryTabsProps {
  subCategories: string[];
  selectedSubCategory: string;
  setSelectedSubCategory: (subCategory: string) => void;
}

/**
 * A stylish sub-category tabs component using Newrro brand colors
 * and a modern gradient design.
 */
export function NewrroSubCategoryTabs({
  subCategories,
  selectedSubCategory,
  setSelectedSubCategory,
}: NewrroSubCategoryTabsProps) {
  return (
    <motion.div
      className="flex justify-center mb-8"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Container with a subtle background and spacing */}
      <div className="inline-flex items-center space-x-3 bg-white/5 rounded-xl px-4 py-3 shadow-md">
        {subCategories.map((subCategory) => {
          const isActive = selectedSubCategory === subCategory;
          return (
            <motion.button
              key={subCategory}
              onClick={() => setSelectedSubCategory(subCategory)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative px-5 py-2 rounded-full font-semibold capitalize transition-all 
                tracking-wide 
                ${isActive ? "text-white" : "text-[#333333]"} 
                ${
                  isActive
                    ? // Active: gradient background from pink to purple
                      "bg-gradient-to-r from-[#df5bd3] to-[#7e5bf6] shadow-lg"
                    : // Inactive: light border with brand accent
                      "bg-white border border-[#df5bd3] hover:bg-[#df5bd3]/10"
                }
              `}
              style={{ fontFamily: "Nunito, sans-serif" }}
            >
              {subCategory}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
