"use client";

import React, { useState, useMemo, useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { Target, Eye, Wrench, GraduationCap, DollarSign, Code, ZapIcon, ChevronDown, Rocket, Shield, Cpu, Lightbulb, User, CheckCircle, TrendingUp, BookOpen } from 'lucide-react';

// Explicit hex codes based on user's theme (used across all sections)
const COLOR_PINK = '#df5bd3';
const COLOR_PURPLE = '#7e5bf6';

// WhatsApp Details for CTA
const WHATSAPP_NUMBER = '918660875098';
const PARTNERSHIP_OPTIONS = [
    'Select Area of Interest',
    'Educational Robotics',
    'Industrial Automation',
    'White-Label Manufacturing',
];

// ----------------------------------------------------------------------
// 1. HERO HEADER (Pure Pink/Purple Gradient Background, White Text)
// ----------------------------------------------------------------------

function HeroHeader() {
    return (
        // Applying the pure, vibrant pink/purple gradient as the direct background
        <div 
            className="relative flex min-h-[50vh] items-center justify-center overflow-hidden py-20 bg-gradient-to-r" 
            style={{ 
                // Using custom CSS properties to ensure the specific hex values are injected into the gradient utility
                '--tw-gradient-from': COLOR_PINK,
                '--tw-gradient-to': COLOR_PURPLE,
                backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
            } as React.CSSProperties} // Casting to ensure custom properties are accepted
        >
            
            <div className="container relative z-10 mx-auto px-4 text-center">
                <h1 className="mb-4 text-5xl font-extrabold text-white md:text-8xl">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white" 
                        style={{ textShadow: '1px 1px 5px rgba(0, 0, 0, 0.6)' }} 
                    >
                        Our Mission and Vision
                    </motion.span>
                </h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto"
                >
                    Transforming education, driving innovation, and pioneering the next era of autonomous systems.
                </motion.p>
            </div>
        </div>
    );
}


// ----------------------------------------------------------------------
// 2. MISSION & VISION SECTION (Light Theme)
// ----------------------------------------------------------------------

const missionVisionContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const missionVisionItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function MissionVisionSection() {
    return (
        <section className="py-20 text-gray-900 bg-white md:py-32">
            <div className="container mx-auto px-4 max-w-6xl">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl font-extrabold md:text-6xl mb-4">
                        <span 
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})` }}
                        >
                            Our Core Principles
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Defining our purpose and charting the course for the future of robotics education and industry.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    
                    {/* Vision Card: Light background with colored border/shadow */}
                    <motion.div
                        variants={missionVisionContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="rounded-2xl bg-white p-8 shadow-xl border border-gray-200 transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-200/50"
                    >
                        <motion.div variants={missionVisionItemVariants} className="flex items-center mb-6">
                            <Eye className="w-8 h-8 mr-4" style={{ color: COLOR_PURPLE }} />
                            <h3 className="text-3xl font-bold text-gray-800">Our Vision</h3>
                        </motion.div>
                        
                        <motion.p variants={missionVisionItemVariants} className="text-lg text-gray-700 leading-relaxed mb-6">
                            To empower the next generation of engineers, innovators, and problem-solvers by making advanced robotics, AI, and autonomous technologies accessible, practical, and industry-ready.
                        </motion.p>
                        <motion.p variants={missionVisionItemVariants} className="text-gray-500 text-sm">
                            We envision a future where every institution in India has the ability to teach, research, and deploy real-world autonomous systems—bridging the gap between education and industry through innovation-driven learning environments.
                        </motion.p>
                    </motion.div>

                    {/* Mission Card: Light background with colored border/shadow */}
                    <motion.div
                        variants={missionVisionContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="rounded-2xl bg-white p-8 shadow-xl border border-gray-200 transition-shadow duration-300 hover:shadow-2xl hover:shadow-pink-200/50"
                    >
                        <motion.div variants={missionVisionItemVariants} className="flex items-center mb-6">
                            <Target className="w-8 h-8 mr-4" style={{ color: COLOR_PINK }} />
                            <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
                        </motion.div>
                        
                        <motion.p variants={missionVisionItemVariants} className="text-lg text-gray-700 leading-relaxed mb-4">
                            Our mission is to create world-class robotics and AI learning ecosystems that enable students and researchers to move beyond theory and experience real engineering.
                        </motion.p>
                        
                        <motion.ul variants={missionVisionContainerVariants} className="list-none space-y-3 pl-0 text-gray-500">
                            <motion.li variants={missionVisionItemVariants} className="flex items-start">
                                <Wrench className="w-5 h-5 mr-3 flex-shrink-0 mt-1" style={{ color: COLOR_PINK }} />
                                <span>Designing high-quality Autonomous Mobile Robots (AMRs) and robotics kits built on modern technologies like ROS2, AI vision, and SLAM.</span>
                            </motion.li>
                            <motion.li variants={missionVisionItemVariants} className="flex items-start">
                                <GraduationCap className="w-5 h-5 mr-3 flex-shrink-0 mt-1" style={{ color: COLOR_PINK }} />
                                <span>Building turnkey robotics labs, training curricula, and research platforms for academic institutions.</span>
                            </motion.li>
                            <motion.li variants={missionVisionItemVariants} className="flex items-start">
                                <DollarSign className="w-5 h-5 mr-3 flex-shrink-0 mt-1" style={{ color: COLOR_PINK }} />
                                <span>Making robotics education affordable, scalable, and future-focused.</span>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------------------------------------
// 3. CORE STRENGTHS / SUCCESS SECTION (Grid View)
// ----------------------------------------------------------------------

const successPoints = [
    {
        icon: Rocket,
        title: "1. Building Strong Robotics Ecosystems in Colleges",
        description: "Every month, we collaborate with academic institutions to install robotics labs, deploy AMRs, and deliver training programs, ensuring students get access to modern, hands-on robotics education rather than outdated theory.",
        color: COLOR_PURPLE,
    },
    {
        icon: Cpu,
        title: "2. Developing Research-Grade Robots for Real Learning",
        description: "Our platforms like ARJUNA, NRC-2, and RICK Series are continuously upgraded based on feedback from colleges, real-world testing, student projects, and research challenges to ensure longevity and relevance.",
        color: COLOR_PINK,
    },
    {
        icon: Lightbulb,
        title: "3. Bringing Cutting-Edge AI, SLAM, and Vision to Education",
        description: "We integrate emerging technologies such as Visual SLAM, DepthAI, GPU-powered AI inference, Nav2 autonomous navigation, and Sensor fusion, exposing students to real industrial workflows.",
        color: COLOR_PURPLE,
    },
    {
        icon: Wrench,
        title: "4. Making Robotics Learning Practical & Hands-On",
        description: "Every kit and AMR we build includes structured coding exercises, real-time debugging, ROS projects, OpenCV perception tasks, and navigation challenges, transforming passive classroom learners into active robotics engineers.",
        color: COLOR_PINK,
    },
    {
        icon: Shield,
        title: "5. Providing High-Quality Support & Training",
        description: "Our support team ensures institutions receive quick issue resolution (within 48 hours), hands-on workshops, long-term mentorship, and technical upgrades, helping labs stay functional, active, and productive.",
        color: COLOR_PURPLE,
    },
    {
        icon: User,
        title: "6. Collaborating with Leading Universities",
        description: "We work with renowned institutions such as REVA University, BMSCE, NMIT, VSU, and several defense-linked labs. Their trust strengthens our credibility and pushes us to maintain world-class quality.",
        color: COLOR_PINK,
    },
    {
        icon: TrendingUp,
        title: "7. Innovating Continuously in Hardware & Software",
        description: "Innovation is our routine: every version improves upon the last (e.g., ARJUNA v2 introduced better compute support, advanced protection), ensuring our technology grows with your needs.",
        color: COLOR_PURPLE,
    },
    {
        icon: BookOpen,
        title: "8. Building Opportunities for Students & Researchers",
        description: "Our systems empower students to publish papers, build final-year projects, participate in national-level competitions, develop prototypes, and explore AI and autonomous navigation.",
        color: COLOR_PINK,
    },
    {
        icon: CheckCircle,
        title: "9. Creating a Lasting Impact on the Edutech Space",
        description: "We are redefining the standard of engineering education in India by focusing on practical learning, scalable solutions, modern technologies, and real-world applications.",
        color: COLOR_PURPLE,
    }
];

const coreStrengthsContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const coreStrengthsItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function CoreStrengthsSection() {
    return (
        <section className="py-20 text-gray-900 bg-gray-50 md:py-32 relative">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl font-extrabold md:text-6xl mb-4">
                        <span 
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})` }}
                        >
                            How We Are Succeeding
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Newrro Tech's success is not accidental. It is the result of deliberate innovation, continuous improvement, and strong partnerships.
                    </p>
                </motion.div>

                <motion.div
                    variants={coreStrengthsContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {successPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            variants={coreStrengthsItemVariants}
                            whileHover={{ y: -8, boxShadow: `0 15px 30px ${point.color}20` }}
                            className="p-6 rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300"
                        >
                            <div 
                                className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center text-white"
                                style={{ backgroundColor: point.color }}
                            >
                                <point.icon className="w-6 h-6" />
                            </div>
                            <h3 
                                className="text-xl font-bold mb-3 text-gray-900"
                                style={{ color: point.color }}
                            >
                                {point.title}
                            </h3>
                            <p className="text-gray-600 text-base">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* Summary Box */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 p-8 text-center rounded-xl border-2 border-fuchsia-500 bg-white shadow-2xl shadow-fuchsia-200/50 text-gray-900"
                >
                    <h4 className="text-2xl font-bold mb-4">🌟 In Summary</h4>
                    <p className="text-lg text-gray-700">
                        Newrro Tech is succeeding because we combine innovation, education, and industry expectations into a single ecosystem. Our robotics platforms, training solutions, and institutional partnerships ensure that every learner gains the skills needed to excel in AI, robotics, and automation, shaping the future one campus at a time.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}


// ----------------------------------------------------------------------
// 4. FINAL CTA (Light Theme)
// ----------------------------------------------------------------------

const finalCTAContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
};

const finalCTAItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
} as const;

// Simple Button Placeholder (adapted for theme)
const Button: React.FC<any> = ({ children, className, ...props }) => (
    <button className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${className}`} {...props}>
        {children}
    </button>
);


function FinalCTA() {
    const [selectedInterest, setSelectedInterest] = useState(PARTNERSHIP_OPTIONS[0]);

    // Function to construct the dynamic WhatsApp message link
    const WHATSAPP_LINK = useMemo(() => {
        const interest = selectedInterest === PARTNERSHIP_OPTIONS[0] 
          ? "an unspecified partnership type" 
          : selectedInterest;
          
        const message = encodeURIComponent(
          `Hello Newrro Tech, I am reaching out regarding a partnership in the area of *${interest}*. Please connect me with the specialist who can discuss our specific needs. Thank courteously. Thank you!`
        );
        return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${message}`;
    }, [selectedInterest]);

    // Check if a valid option is selected
    const isButtonDisabled = selectedInterest === PARTNERSHIP_OPTIONS[0];

    return (
        // Light background for CTA
        <section className="relative overflow-hidden bg-gray-100 py-24 sm:py-32 border-t border-gray-200"> 
            {/* Subtle background glow */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 m-auto h-[300px] w-full max-w-4xl opacity-50 blur-3xl"
                style={{ background: `radial-gradient(circle at center, ${COLOR_PURPLE}10, ${COLOR_PINK}10)` }}
            ></div>

            <div className="container mx-auto px-4">
                <motion.div
                    className="mx-auto max-w-3xl text-center"
                    variants={finalCTAContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <motion.h2
                        variants={finalCTAItemVariants}
                        className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
                    >
                        Ready to Transform Your{" "}
                        <span 
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})` }}
                        >
                            Future?
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={finalCTAItemVariants}
                        className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-700"
                    >
                        Let&apos;s discuss how Newrro Tech can accelerate your program or business goals.
                    </motion.p>

                    <motion.div
                        variants={finalCTAItemVariants}
                        className="mt-10 flex flex-col items-center justify-center gap-4"
                    >
                        {/* Dropdown Selection */}
                        <div className="relative w-full max-w-sm mb-4">
                            <select
                                className="w-full appearance-none bg-white border border-gray-300 rounded-lg py-3 pl-4 pr-10 text-gray-800 focus:outline-none focus:ring-2"
                                style={{ borderColor: COLOR_PURPLE }}
                                value={selectedInterest}
                                onChange={(e) => setSelectedInterest(e.target.value)}
                            >
                                {PARTNERSHIP_OPTIONS.map((option) => (
                                    <option 
                                        key={option} 
                                        value={option} 
                                        disabled={option === PARTNERSHIP_OPTIONS[0]}
                                    >
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                        </div>
                        
                        {/* Primary Button: Uses explicit theme color, white text, bold shadow */}
                        <a
                            href={WHATSAPP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group w-full text-lg text-white hover:opacity-90 sm:w-auto shadow-xl shadow-purple-500/40 inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold transition-all duration-300 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{ backgroundColor: COLOR_PURPLE }}
                            onClick={(e) => isButtonDisabled && e.preventDefault()}
                        >
                            Connect on WhatsApp
                            <Code className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                        
                        {isButtonDisabled && (
                            <p className="mt-2 text-sm text-red-600">Please select an area of interest above.</p>
                        )}
                        
                        {/* Secondary Button: White background, theme border/text */}
                        <Button
                            className="w-full text-lg text-gray-900 hover:bg-gray-100 sm:w-auto bg-white border-2"
                            style={{ borderColor: COLOR_PINK }}
                        >
                            Schedule a Call
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}


// ----------------------------------------------------------------------
// 5. MAIN PAGE COMPONENT (Export)
// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    // Set main app background to white
    <main className="bg-white text-gray-900 min-h-screen">
      <HeroHeader /> 
      <MissionVisionSection />
      <CoreStrengthsSection />
      <FinalCTA />
    </main>
  );
}