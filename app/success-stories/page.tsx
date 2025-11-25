"use client";

import React, { useState, useMemo, useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion'; // Added useScroll/useTransform
import { Target, Eye, FolderOpen, Code, ZapIcon, ChevronLeft, ChevronRight, CheckCircle, GraduationCap, Factory, User, Lightbulb, Cpu, Rocket, Wrench, Shield, TrendingUp, BookOpen } from 'lucide-react'; // Ensured all icons are imported

// Explicit hex codes based on user's theme
const COLOR_PINK = '#df5bd3';
const COLOR_PURPLE = '#7e5bf6';

// ----------------------------------------------------------------------
// 1. DATA STRUCTURES (Unchanged)
// ----------------------------------------------------------------------

// Placeholder data for Collaborations Gallery
interface Collaboration {
    id: number;
    title: string;
    partner: string;
    description: string;
    image_descriptions: string[]; 
}

const COLLABORATIONS: Collaboration[] = [
    {
        id: 1,
        title: "Autonomous Robot System Lab Setup",
        partner: "REVA University, Bengaluru",
        description: "Provided a complete, custom-built lab featuring multiple ARJUNA AMRs, ROS2 integration, and bespoke curriculum for advanced navigation and SLAM research.",
        image_descriptions: [
            "Wide shot of a university robotics lab with 3-4 ARJUNA robots running SLAM algorithms.",
            "Close-up of a student analyzing LiDAR data on a monitor, with a Newrro robot in the foreground.",
            "Image of the faculty and Newrro team after successful lab handover, smiling in front of the new equipment."
        ],
    },
    {
        id: 2,
        title: "AI & Vision Training Workshop",
        partner: "BMSCE, Bengaluru",
        description: "A week-long Faculty Development Program (FDP) focused on Jetson-powered AI inference, computer vision using OAK-D Lite, and integrating custom models for object detection.",
        image_descriptions: [
            "A group of professors and faculty members intently listening to a Newrro trainer demonstrating Jetson Nano AI inference.",
            "Image of hands-on session where participants are wiring a camera module to a robot controller.",
            "A collage of code snippets and successful object detection outputs on a screen."
        ],
    },
    {
        id: 3,
        title: "Arjuna Edu Kits",
        partner: "JSSATE, Bengaluru",
        description: "Developed and supplied a custom, high-durability Arjuna Edu-Kits optimized for warehouse logistics robots, demonstrating Industrial standard educational product success.",
        image_descriptions: [
            "A sleek, black robotics controller PCB (Basic Robot Controller) close-up.",
            "A wide shot of a logistics warehouse with autonomous carts (simulated/rendered) utilizing the Newrro controller.",
            "Image of a handshake between a Newrro engineer and a client executive, symbolizing a successful partnership."
        ],
    },
    {
        id: 4,
        title: "Student Robotics Competition Support",
        partner: "NITTE Meenakshi Institute of Technology, Yelahanka",
        description: "Mentorship and hardware support for the college team participating in the national e-Yantra competition, focusing on swarm robotics and path planning challenges.",
        image_descriptions: [
            "Students gathered around a small robot platform (Babroo or RICK) in a competition arena.",
            "A dynamic, blurred image suggesting rapid movement of a robot solving a maze.",
            "A team portrait of the successful student robotics club members."
        ],
    },
    {
        id: 5,
        title: "Autonomous Mobile Robot Lab Setup",
        partner: "VidyaShilp University, Bengaluru",
        description: "Provided rugged, research-grade ARJUNA platforms tailored for complex outdoor sensor integration and autonomous surveillance protocol development.",
        image_descriptions: [
            "A robust ARJUNA robot being tested outdoors on rough terrain.",
            "Close-up of a high-end LiDAR and custom sensor array mounted on the robot chassis.",
            "Image emphasizing the durability and build quality of the robot in a professional setting."
        ],
    },
    {
        id: 6,
        title: "Autonomous Mobile Robot SDP",
        partner: "M S Ramiah University of Applied Sciences, Bengaluru",
        description: "Provided rugged, research-grade ARJUNA platforms tailored for complex outdoor sensor integration and autonomous surveillance protocol development.",
        image_descriptions: [
            "A robust ARJUNA robot being tested outdoors on rough terrain.",
            "Close-up of a high-end LiDAR and custom sensor array mounted on the robot chassis.",
            "Image emphasizing the durability and build quality of the robot in a professional setting."
        ],
    },
    {
        id: 7,
        title: "Robot Operating System SDP",
        partner: "Sai Vidya Institute of Technology, Bengaluru",
        description: "Provided rugged, research-grade ARJUNA platforms tailored for complex outdoor sensor integration and autonomous surveillance protocol development.",
        image_descriptions: [
            "A robust ARJUNA robot being tested outdoors on rough terrain.",
            "Close-up of a high-end LiDAR and custom sensor array mounted on the robot chassis.",
            "Image emphasizing the durability and build quality of the robot in a professional setting."
        ],
    },
    {
        id: 8,
        title: "Basic to Advanced Robotics Workshop",
        partner: "Sir M isvesvaraya Institute of Technology, Bengaluru",
        description: "Provided rugged, research-grade ARJUNA platforms tailored for complex outdoor sensor integration and autonomous surveillance protocol development.",
        image_descriptions: [
            "A robust ARJUNA robot being tested outdoors on rough terrain.",
            "Close-up of a high-end LiDAR and custom sensor array mounted on the robot chassis.",
            "Image emphasizing the durability and build quality of the robot in a professional setting."
        ],
    },
];

const MILESTONES = [
    {
        icon: GraduationCap,
        title: "Ecosystem Building",
        text: "Installed first turnkey robotics lab in collaboration with REVA University, setting the standard for hands-on, industry-aligned engineering education.",
        year: "2024",
    },
    {
        icon: Cpu,
        title: "Product Evolution",
        text: "Launched ARJUNA v2, integrating Jetson Orin compute power and DepthAI vision, shifting our platforms from educational kits to true research assets.",
        year: "2025",
    },
    {
        icon: Factory,
        title: "Industry Validation",
        text: "Secured first major industrial white-label contract for Autonomous Navigating Rover with Semi Humanoid Robot Design, validating our technology for logistics and automation needs.",
        year: "2026",
    },
    {
        icon: Lightbulb,
        title: "Knowledge Transfer",
        text: "Completed over 50 Faculty Development Programs (FDPs) and trained 3,000+ students in advanced ROS2, AI, and SLAM methodologies.",
        year: "Ongoing",
    },
];

// ----------------------------------------------------------------------
// 2. COMPONENTS
// ----------------------------------------------------------------------

// Modal for Image Gallery (Unchanged, uses animation for open/close)
interface GalleryModalProps {
    collaboration: Collaboration;
    onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ collaboration, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % collaboration.image_descriptions.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + collaboration.image_descriptions.length) % collaboration.image_descriptions.length);

    const getPlaceholderImage = (desc: string) => {
        const encodedDesc = encodeURIComponent(desc.replace(/ /g, '_'));
        return `https://placehold.co/800x450/7e5bf6/ffffff?text=Image+Needed%3A+${encodedDesc}`;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
                    aria-label="Close Gallery"
                >
                    <Code className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900">{collaboration.title}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                        <GraduationCap className="w-4 h-4 mr-1" style={{ color: COLOR_PURPLE }} />
                        {collaboration.partner}
                    </p>
                </div>
                
                {/* Main Image View */}
                <div className="relative aspect-video bg-gray-200">
                    <img
                        src={getPlaceholderImage(collaboration.image_descriptions[currentIndex])}
                        alt={`Visual for ${collaboration.partner} project`}
                        className="w-full h-full object-cover"
                    />

                    {/* Navigation Arrows */}
                    <button onClick={prevImage} className="absolute left-3 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition z-10">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={nextImage} className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition z-10">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
                
                {/* Thumbnail and Description Footer */}
                <div className="p-4 sm:p-6 bg-white">
                    <p className="text-sm text-gray-700 mb-4">{collaboration.description}</p>
                    <div className="flex items-center justify-between">
                        {/* Thumbnails */}
                        <div className="flex space-x-2">
                            {collaboration.image_descriptions.map((desc, index) => (
                                <img
                                    key={index}
                                    src={getPlaceholderImage(desc)}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-16 h-10 object-cover rounded cursor-pointer transition ${
                                        currentIndex === index ? 'ring-2' : 'opacity-60 hover:opacity-100'
                                    }`}
                                    style={{ borderColor: COLOR_PINK, '--ring-color': COLOR_PINK } as React.CSSProperties}
                                    onClick={() => setCurrentIndex(index)}
                                />
                            ))}
                        </div>
                        {/* Counter */}
                        <span className="text-sm font-medium text-gray-600">
                            {currentIndex + 1} / {collaboration.image_descriptions.length}
                        </span>
                    </div>
                    
                    {/* Image Generation Description for User (Crucial feedback for you) */}
                    {/* <p className="mt-4 text-xs italic text-gray-400">
                        **Image Generation Prompt:** "{collaboration.image_descriptions[currentIndex]}"
                    </p> */}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ----------------------------------------------------------------------
// 3. PAGE SECTIONS
// ----------------------------------------------------------------------

// Hero Header (Added dynamic scroll effect)
function StorytellingHero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div ref={ref}
            className="relative flex min-h-[55vh] items-center justify-center overflow-hidden py-20" 
            style={{ 
                backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})`, 
            } as React.CSSProperties}
        >
            <motion.div 
                className="absolute inset-0 z-0 bg-repeat opacity-10" 
                style={{ 
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 80 80\' width=\'80\' height=\'80\'%3E%3Cpath fill=\'%23ffffff\' d=\'M0 0h40v40H0zM40 40h40v40H40z\'/%3E%3C/svg%3E")',
                    y: backgroundY 
                }} 
            />

            <div className="container relative z-10 mx-auto px-4 text-center">
                <h1 className="mb-4 text-5xl font-extrabold text-white md:text-8xl">
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white" 
                        style={{ textShadow: '1px 1px 5px rgba(0, 0, 0, 0.6)' }}
                    >
                        Our Success Story
                    </motion.span>
                </h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto"
                >
                    From a bold vision to pioneering real-world deployments—discover how Newrro Tech is shaping the future of robotics, one successful partnership at a time.
                </motion.p>
            </div>
        </div>
    );
}

// Narrative Milestones Section (Improved Visual Flow)
function StoryMilestones() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const scaleY = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

    const containerVariants: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } },
    };

    return (
        <section ref={ref} className="py-20 text-gray-900 bg-white md:py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold md:text-6xl mb-4">
                        <span 
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})` }}
                        >
                            Milestones of Impact
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        A look at the key moments where our mission translated into tangible outcomes for academia and industry.
                    </p>
                </div>

                {/* Timeline Path */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-200 hidden md:block" style={{ top: '150px', bottom: '150px' }} />
                <motion.div
                    className="absolute left-1/2 w-1 origin-top shadow-md hidden md:block"
                    style={{ 
                        top: '150px', 
                        bottom: '150px', 
                        scaleY,
                        backgroundImage: `linear-gradient(to bottom, ${COLOR_PINK}, ${COLOR_PURPLE})`, 
                    }}
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col space-y-16"
                >
                    {MILESTONES.map((step, index) => {
                        const IconComponent = step.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={index}
                                variants={{ hidden: { opacity: 0, x: isEven ? -100 : 100 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                                whileHover={{ scale: 1.05, boxShadow: `0 15px 30px ${COLOR_PURPLE}20` }}
                                className={`relative flex w-full ${isEven ? 'md:justify-start' : 'md:justify-end'}`}
                            >
                                <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div className={`p-6 rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                                        
                                        <div className={`flex items-center ${isEven ? 'justify-end' : 'justify-start'} mb-3`}>
                                            <span className="text-sm font-semibold text-gray-500 order-2">{step.year}</span>
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center mx-3 order-1" style={{ backgroundColor: COLOR_PINK, opacity: 0.1 }}>
                                                <IconComponent className="w-4 h-4" style={{ color: COLOR_PINK }} />
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-2 text-gray-900">{step.title}</h3>
                                        <p className="text-base text-gray-600">{step.text}</p>
                                    </div>
                                </div>

                                {/* Timeline Dot (Absolute positioning for desktop, hidden on mobile) */}
                                <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 shadow-lg hidden md:flex items-center justify-center`} style={{ borderColor: isEven ? COLOR_PINK : COLOR_PURPLE }}>
                                    <CheckCircle className='w-3 h-3 text-white' style={{ fill: isEven ? COLOR_PURPLE : COLOR_PINK }} />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}


// Collaboration Gallery Section (Enhanced Folder Card Interaction)
function CollaborationGallery() {
    const [selectedCollaboration, setSelectedCollaboration] = useState<Collaboration | null>(null);

    const folderCardVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <section className="py-20 text-gray-900 bg-gray-50 md:py-32 relative">
            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold md:text-6xl mb-4">
                        <span 
                            className="bg-clip-text text-transparent"
                            style={{ backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})` }}
                        >
                            Client Success Portfolio
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Explore the real-world applications and deep partnerships that define our commitment to excellence in robotics. Click a folder to see the media.
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {COLLABORATIONS.map((collab, index) => (
                        <motion.div
                            key={collab.id}
                            variants={folderCardVariants}
                            onClick={() => setSelectedCollaboration(collab)}
                            // Enhanced 3D Folder Hover Effect
                            whileHover={{ 
                                y: -15, 
                                boxShadow: `0 20px 40px ${COLOR_PINK}40`, 
                                scale: 1.05,
                                rotateY: 5, // Slight 3D tilt
                                rotateX: 2 
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer p-5 rounded-xl border-2 shadow-lg bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center transition-all duration-300 transform origin-bottom"
                            style={{ borderColor: COLOR_PINK }}
                        >
                            <FolderOpen className="w-12 h-12 mb-3" style={{ color: COLOR_PURPLE }} />
                            <h3 className="text-base font-bold text-gray-900 mb-1">{collab.partner}</h3>
                            <p className="text-xs text-gray-600">{collab.title}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            
            {/* Gallery Modal */}
            {selectedCollaboration && (
                <GalleryModal collaboration={selectedCollaboration} onClose={() => setSelectedCollaboration(null)} />
            )}
        </section>
    );
}

// ----------------------------------------------------------------------
// 4. MAIN PAGE EXPORT
// ----------------------------------------------------------------------

export default function SuccessStoryPage() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <StorytellingHero /> 
      <StoryMilestones />
      <CollaborationGallery />
    </main>
  );
}