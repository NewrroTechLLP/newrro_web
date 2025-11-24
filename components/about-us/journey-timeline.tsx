"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { CalendarHeart, Rocket, Bot, GraduationCap, Handshake, Cpu, Sparkles, Zap } from "lucide-react";

/* ---------- Enhanced Data ---------- */
const journeyData = [
  {
    year: "2024 Q1",
    title: "Newrro Is Born",
    event: "Company founded by a team of robotics & automation experts",
    icon: <CalendarHeart className="h-6 w-6 text-fuchsia-400" />,
    gradient: "from-fuchsia-500 via-pink-500 to-rose-400",
    glow: "shadow-fuchsia-500/30"
  },
  {
    year: "2024 Q2",
    title: "First AMR Prototype",
    event: "Developed & tested AMR with dynamic obstacle avoidance",
    icon: <Bot className="h-6 w-6 text-indigo-400" />,
    gradient: "from-indigo-500 via-purple-500 to-violet-400",
    glow: "shadow-indigo-500/30"
  },
  {
    year: "2024 Q4",
    title: "ARJUNA Edu-Bot Launch",
    event: "Deployed kits across 3 premier universities",
    icon: <GraduationCap className="h-6 w-6 text-sky-400" />,
    gradient: "from-sky-500 via-blue-500 to-cyan-400",
    glow: "shadow-sky-500/30"
  },
  {
    year: "2025 Q1",
    title: "500+ Students Trained",
    event: "Hands-on sessions in ROS, SLAM & path-planning",
    icon: <Rocket className="h-6 w-6 text-emerald-400" />,
    gradient: "from-emerald-500 via-teal-500 to-green-400",
    glow: "shadow-emerald-500/30"
  },
  {
    year: "2025 Q2",
    title: "ISRO Space-AMR Challenge",
    event: "Strategic R&D partnership announced",
    icon: <Handshake className="h-6 w-6 text-amber-400" />,
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    glow: "shadow-amber-500/30"
  },
  {
    year: "2025 Q3",
    title: "NRC-2 EDU Kit Release",
    event: "Next-gen controller & robot kit hit the market",
    icon: <Cpu className="h-6 w-6 text-pink-400" />,
    gradient: "from-pink-500 via-rose-500 to-fuchsia-400",
    glow: "shadow-pink-500/30"
  },
];

/* ---------- Animation Config ---------- */
const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1] // Custom easing
    } 
  },
};

/* ---------- Component ---------- */
export function JourneyTimeline() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const scaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black py-24 text-white md:py-36">
      {/* Enhanced background effects */}
      <motion.div
        style={{ y: backgroundY }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
          whileInView={{ opacity: 0.4, scale: 1.2, rotate: 45 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,#7e5bf6_0%,#ec4899_40%,transparent_70%)] blur-[160px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 6, delay: 1, ease: "easeOut" }}
          className="absolute -bottom-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,#06b6d4_0%,#8b5cf6_40%,transparent_70%)] blur-[140px]"
        />
      </motion.div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 2px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl px-6 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative inline-block"
          >
            <h2 className="text-4xl font-extrabold md:text-7xl relative z-10">
              Our&nbsp;
              <span className="relative">
                <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                  Journey
                </span>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -top-2 -right-8"
                >
                  <Sparkles className="h-8 w-8 text-fuchsia-400 animate-pulse" />
                </motion.div>
              </span>
            </h2>
            {/* Subtle glow effect behind text */}
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-indigo-500/20 blur-2xl -z-10" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed"
          >
            A rapid ascent from spark to sector-defining force—powered by relentless innovation and 
            <span className="text-transparent bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text font-semibold"> hands-on impact</span>.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={container} 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }} 
          className="relative"
        >
          {/* Enhanced timeline rail with gradient */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-1 -translate-x-1/2">
            <div className="h-full w-full bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 rounded-full" />
          </div>
          
          {/* Enhanced animated progress overlay */}
          <motion.div
            style={{ scaleY }}
            className="pointer-events-none absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-fuchsia-500 via-purple-500 via-indigo-500 via-sky-500 via-emerald-500 via-amber-500 to-pink-500 shadow-lg"
          />

          {/* Cards with enhanced interactions */}
          {journeyData.map((item, index) => (
            <motion.div
              key={item.year}
              variants={card}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative mb-16 flex flex-col items-center md:flex-row group"
            >
              {/* Spacers */}
              <div className={`hidden flex-1 md:block ${index % 2 === 0 ? "pr-8" : "pl-8"}`} />
              
              {/* Enhanced Card */}
              <motion.div
                whileHover={{ 
                  scale: 1.03, 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`relative w-full max-w-md rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-xl p-8 shadow-2xl md:w-1/2 overflow-hidden ${
                  index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                }`}
              >
                {/* Animated background gradient on hover */}
                <motion.div
                  initial={false}
                  animate={hoveredCard === index ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl`}
                />
                
                {/* Enhanced Icon with floating animation */}
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: hoveredCard === index ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ 
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 0.5 }
                  }}
                  className={`absolute -left-12 top-8 hidden md:flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r ${item.gradient} shadow-lg ${item.glow}`}
                >
                  {item.icon}
                  {/* Pulse effect */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient}`}
                  />
                </motion.div>

                {/* Content with enhanced typography */}
                <div className="relative z-10">
                  <motion.p
                    className={`text-sm font-bold uppercase tracking-wider bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-3`}
                  >
                    {item.year}
                  </motion.p>
                  
                  <motion.h3
                    whileHover={{ x: 4 }}
                    className="text-xl font-bold text-white mb-3 transition-colors group-hover:text-slate-100"
                  >
                    {item.title}
                  </motion.h3>
                  
                  <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                    {item.event}
                  </p>
                </div>

                {/* Enhanced hover border effect */}
                <motion.div
                  initial={false}
                  animate={hoveredCard === index ? { opacity: 1 } : { opacity: 0 }}
                  className={`absolute inset-0 rounded-3xl border-2 bg-gradient-to-r ${item.gradient} p-[1px] pointer-events-none`}
                >
                  <div className="h-full w-full rounded-3xl bg-slate-900/90" />
                </motion.div>
              </motion.div>
              
              {/* Enhanced center dot */}
              <div className="absolute left-1/2 top-1/2 -z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0">
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  className={`h-full w-full rounded-full bg-gradient-to-r ${item.gradient} shadow-lg ${item.glow} relative`}
                >
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.gradient}`}
                  />
                </motion.div>
              </div>
              
              {/* Spacers */}
              <div className={`hidden flex-1 md:block ${index % 2 === 0 ? "pl-8" : "pr-8"}`} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}