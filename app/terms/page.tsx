"use client";

import React from 'react';
import { FileText, Calendar, Scale } from 'lucide-react';

// Explicit hex codes for theme consistency
const COLOR_PINK = '#df5bd3';
const COLOR_PURPLE = '#7e5bf6';

// --- Legal Content ---

const TERMS_SECTIONS = [
    {
        title: "1. Introduction",
        content: `Welcome to Newrro Tech LLP (“Company”, “we”, “our”, “us”). By accessing our website, purchasing our products, using our robotics platforms, or participating in our training programs, you agree to comply with these Terms & Conditions.`,
        note: "If you do not agree with any part of these terms, please discontinue using our services.",
        listTitle: "These terms govern:",
        items: [
            "Product purchases and usage",
            "Robotics lab installations",
            "AMRs and robot kit usage",
            "Workshops, training, and FDPs",
            "Online platforms, documentation, and support",
            "Data usage, intellectual property, and safety guidelines",
        ],
    },
    {
        title: "2. Definitions",
        items: [
            "**“Website”** refers to www.newrro.in",
            "**“Products”** include ARJUNA, Babroo, NRC-2, RICK Series, controllers, accessories, and upcoming platforms",
            "**“Services”** include robotics training, FDPs, workshops, lab setups, documentation, and support",
            "**“Client/User”** refers to educational institutions, individuals, staff, students, or researchers interacting with Newrro products or services",
        ],
    },
    {
        title: "3. Eligibility",
        content: "By using our platform, you represent that:",
        items: [
            "You are at least 18 years old (or supervised by an institution/guardian)",
            "The use is for academic, research, or institutional purposes",
            "You have legal authority to enter into binding agreements",
        ],
    },
    {
        title: "4. Product Usage Terms",
        subsections: [
            {
                title: "A. Robotics & AMR Usage",
                items: [
                    "All AMRs must be used indoors unless specified otherwise.",
                    "Safety guidelines must be followed during navigation, sensor use, and robot testing.",
                    "Any hardware modification beyond permitted limits voids the warranty.",
                    "Robots must be operated only by trained staff or supervised students.",
                ],
            },
            {
                title: "B. Software & Firmware",
                items: [
                    "ROS2, Nav2, SLAM tools, and OpenCV frameworks must be used as per licensing agreements.",
                    "Unauthorized copying, reverse engineering, or distribution of firmware/software is prohibited.",
                    "Customization is allowed only within permitted ROS/AI frameworks.",
                ],
            },
        ],
    },
    {
        title: "5. Pricing & Payments",
        items: [
            "All product prices are subject to change without prior notice.",
            "Taxes, shipping, installation, and training charges may apply.",
            "Payments must be completed through approved channels only.",
            "Purchase Orders issued by institutions are legally binding.",
        ],
    },
    {
        title: "6. Order Confirmation & Delivery",
        items: [
            "An order is confirmed only after payment or official institutional PO.",
            "Delivery timelines vary based on product stock, installation schedule, and location.",
            "Any damage during transit must be reported within 48 hours of delivery.",
        ],
    },
    {
        title: "7. Warranty & Repairs",
        content: "All major products include a 6-month limited warranty. Warranty covers manufacturing defects, electronics faults, and sensor issues.",
        listTitle: "Warranty does not cover:",
        items: [
            "Physical damage",
            "Water damage",
            "Unauthorized modifications",
            "Mishandling by staff or students",
            "Tampering with protective seals",
        ],
        note: "Repairs outside warranty may incur charges.",
    },
    {
        title: "8. Training, Workshops & FDPs",
        items: [
            "Training dates will be mutually agreed upon after confirmation.",
            "Institutes must ensure availability of infrastructure (lab space, PCs, projector, power).",
            "Newrro trainers must be allowed safe access to campus facilities.",
            "Training modules cannot be recorded or redistributed without consent.",
        ],
    },
    {
        title: "9. Intellectual Property Rights",
        content: "All content, hardware designs, firmware, curriculum, documentation, logos, and training materials are the intellectual property of Newrro Tech LLP.",
        listTitle: "Clients receive the right to use materials for academic purposes, but cannot:",
        items: [
            "Copy", "Resell", "Reproduce", "Distribute",
            "Reverse-engineer", "Commercialize",
        ],
        note: "Any violation may lead to legal action.",
    },
    {
        title: "10. User Responsibilities",
        content: "Users agree not to:",
        items: [
            "Misuse robots or use them for harmful activities",
            "Bypass firmware/security protections",
            "Perform unsafe experiments",
            "Upload or transmit malware",
            "Violate campus/lab safety rules",
        ],
        note: "Institutions are responsible for ensuring supervised usage.",
    },
    {
        title: "11. Limitation of Liability",
        content: "Newrro Tech LLP is not responsible for:",
        items: [
            "Injuries caused by mishandling the robot",
            "Damages due to improper usage",
            "Loss of data",
            "Academic or research outcomes",
            "Downtime due to external power/network issues",
        ],
        note: "Our liability is limited to replacement/repair of defective parts under warranty.",
    },
    {
        title: "12. Product Updates & Modifications",
        content: "We may release firmware updates, software patches, or documentation improvements.",
        note: "Newrro reserves the right to modify products or services without prior notice.",
    },
    {
        title: "13. Termination",
        content: "Newrro Tech may suspend or terminate service access if:",
        items: [
            "Terms are violated",
            "Payments fail",
            "Product misuse is reported",
            "Intellectual property is infringed",
        ],
    },
    {
        title: "14. Governing Law",
        content: "These Terms & Conditions are governed by the Laws of India, under the jurisdiction of local courts where Newrro Tech LLP is registered.",
    },
];

// --- Component Helpers ---

type SectionProps = {
    title: string;
    content?: string;
    listTitle?: string;
    items?: string[];
    subsections?: any[];
    note?: string;
};

const TermsSection: React.FC<SectionProps> = ({ title, content, listTitle, items, subsections, note }) => (
    <div className='mt-8'>
        <h2 className="text-3xl font-bold mb-4 border-b pb-2" style={{ borderColor: COLOR_PINK, color: COLOR_PURPLE }}>{title}</h2>
        
        {/* Main Content */}
        {content && <p className="mb-4 text-gray-700 leading-relaxed">{content}</p>}

        {/* List Title (Optional) */}
        {listTitle && <p className="mb-2 text-gray-800 font-semibold">{listTitle}</p>}

        {/* Item List */}
        {items && (
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
                {items.map((item, idx) => (
                    // Rendering bold text syntax manually
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
            </ul>
        )}
        
        {/* Subsections (for nested structure) */}
        {subsections && subsections.map((sub, subIdx) => (
            <div key={subIdx} className='mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200'>
                <h3 className="text-xl font-bold mt-0 mb-3 text-gray-800">{sub.title}</h3>
                {sub.items && (
                    <ul className="list-disc ml-5 space-y-2 text-gray-700">
                        {sub.items.map((item: string, itemIdx: number) => (
                            <li key={itemIdx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                    </ul>
                )}
            </div>
        ))}

        {/* Note/Disclaimer */}
        {note && <p className="mt-4 text-sm italic text-gray-600 border-l-4 pl-3" style={{ borderColor: COLOR_PINK }}>{note}</p>}
    </div>
);

const ContactSection = () => (
    <div className='mt-8 pt-4 border-t border-gray-200'>
        <h2 className="text-3xl font-bold mb-4 border-b pb-2" style={{ borderColor: COLOR_PINK, color: COLOR_PURPLE }}>15. Contact Information</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
            For queries or complaints:
        </p>
        <div className='mt-4 p-4 rounded-lg border border-gray-200 bg-gray-50'>
            <p className='text-gray-800 font-semibold mb-1'>📧 Email: <a href="mailto:info@newrro.in" className='text-pink-600 hover:underline font-normal'>info@newrro.in</a></p>
            <p className='text-gray-700 mb-1'>🌐 Website: www.newrro.in</p>
            <p className='text-gray-700'>📍 Newrro Tech LLP, India</p>
        </div>
    </div>
);


/**
 * Renders the Terms of Service page.
 */
export default function TermsPage() {
    return (
        <main className="bg-white text-gray-900 min-h-screen">
            
            {/* Hero Header */}
            <div 
                className="relative flex min-h-[40vh] items-center justify-center overflow-hidden py-20"
                style={{ backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})` }}
            >
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Scale className="w-16 h-16 mx-auto mb-4 text-white" />
                    <h1 className="mb-2 text-5xl font-extrabold text-white md:text-6xl">Terms & Conditions</h1>
                    <p className="text-lg text-gray-100 max-w-2xl mx-auto flex items-center justify-center">
                        <Calendar className='w-4 h-4 mr-2' />
                        Effective for: www.newrro.in and all Newrro products
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-16 md:py-24">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="lg:prose-xl max-w-none">
                        
                        {TERMS_SECTIONS.map((section, index) => (
                            <TermsSection 
                                key={index} 
                                title={section.title} 
                                content={section.content} 
                                listTitle={section.listTitle}
                                items={section.items}
                                subsections={section.subsections}
                                note={section.note}
                            />
                        ))}
                        
                        <ContactSection />
                        
                    </div>
                </div>
            </section>
        </main>
    );
}