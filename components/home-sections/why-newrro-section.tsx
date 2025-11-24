"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

// ✅ Set the start date for automatic "Months of Operation"
const startDate = new Date("2023-11-23"); // Update this to your actual start date

export function WhyNewrroSection() {
  const [counts, setCounts] = useState([0, 0, 0, 0]); // Initial count values
  const [monthsOfOperation, setMonthsOfOperation] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef(null); // ✅ useRef to track section visibility

  useEffect(() => {
    // ✅ Calculate dynamic months of operation
    const today = new Date();
    const diffMonths =
      (today.getFullYear() - startDate.getFullYear()) * 12 +
      today.getMonth() -
      startDate.getMonth();
    setMonthsOfOperation(diffMonths);

    // ✅ Intersection Observer to detect visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          const interval = setInterval(() => {
            setCounts((prevCounts) =>
              prevCounts.map((count, index) => {
                const targetValue = [
                  diffMonths, // Automatically updated months of operation
                  1500,       // Total students
                  10,         // Total courses
                  10,          // Total University Sectio
                ][index];

                return count < targetValue
                  ? Math.min(count + Math.ceil(targetValue / 50), targetValue)
                  : targetValue;
              })
            );
          }, 50);

          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 } // ✅ Only triggers when at least 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasStarted]);

  const stats = [
    { label: "Months of Operation", value: monthsOfOperation },
    { label: "Students", value: 1500 },
    { label: "Courses", value: 10 },
    { label: "Trusted Universities", value: 10 },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* ✅ Animated Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            A Different Approach, Where Education Meets Innovation!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We design and deliver high-quality educational kits that transform learning into a practical experience.
          </p>
        </motion.div>

        {/* ✅ Animated Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl font-bold text-[#df5bd3] mb-2">
                {counts[index]}+
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}