'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabspd = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);
  const [isOpen, setIsOpen] = useState(false);  // State for dropdown menu

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      {/* Tab Bar for Larger Screens */}
      <div
        className={cn(
          "flex flex-row items-center justify-start space-x-4 overflow-auto no-visible-scrollbar w-full",
          containerClassName,
          "lg:flex-row flex-col" // Stack tabs vertically on smaller screens (mobile-first)
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn(
              "relative px-6 py-3 rounded-full",
              tabClassName,
              "w-auto"
            )}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gray-200 dark:bg-zinc-800 rounded-full ",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block text-black dark:text-white">
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      {/* Hamburger Button for Smaller Screens */}
      <div className="lg:hidden relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-between items-center w-8 h-8 space-y-1"
        >
          <span className="w-6 h-1 bg-black dark:bg-white rounded"></span>
          <span className="w-6 h-1 bg-black dark:bg-white rounded"></span>
          <span className="w-6 h-1 bg-black dark:bg-white rounded"></span>
        </button>

        {/* Dropdown Menu for Mobile */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-zinc-800 p-2 shadow-lg rounded-md w-48">
            <ul className="space-y-2">
              {tabs.map((tab, idx) => (
                <li
                  key={tab.value}
                  onClick={() => {
                    setActive(tab);
                    setIsOpen(false); // Close the dropdown when a tab is clicked
                  }}
                  className="text-black dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700 p-2 rounded cursor-pointer"
                >
                  {tab.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Tab Content */}
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-8", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
