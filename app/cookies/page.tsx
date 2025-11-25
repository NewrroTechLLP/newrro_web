"use client";

import React from 'react';
import { Cookie, Calendar, Globe } from 'lucide-react';

// Explicit hex codes for theme consistency
const COLOR_PINK = '#df5bd3';
const COLOR_PURPLE = '#7e5bf6';

// --- Legal Content ---

const COOKIES_SECTIONS = [
    {
        title: "1. Introduction",
        content: `This Cookies Policy explains how Newrro Tech LLP uses cookies and similar tracking technologies on our website (www.newrro.in). Cookies allow us to enhance user experience, improve website performance, and understand visitor behavior.`,
        note: "By continuing to browse the website, you consent to our use of cookies under this policy.",
    },
    {
        title: "2. What Are Cookies?",
        content: `Cookies are small text files stored on your device when you visit a website. They help websites remember preferences, improve load times, and analyze user behavior.`,
        listTitle: "Cookies may include:",
        items: [
            "Device and browser details",
            "Pages visited",
            "Session IDs",
            "Usage patterns",
            "Authentication status",
        ],
    },
    {
        title: "3. Types of Cookies We Use",
        subsections: [
            {
                title: "A. Essential (Strictly Necessary) Cookies",
                content: "These cookies enable core website functionality such as page navigation, security validations, and accessing secure areas.",
                note: "The website cannot function properly without them.",
            },
            {
                title: "B. Performance & Analytics Cookies",
                content: "Used to understand how visitors interact with our website:",
                items: [
                    "Page load speeds", "Session duration", "Click patterns", "Errors encountered",
                ],
                note: "These help improve our website’s functionality and user experience.",
            },
            {
                title: "C. Preference Cookies",
                content: "These cookies remember your settings and preferences:",
                items: [
                    "Language selection", "Region preferences", "User interface customizations",
                ],
            },
            {
                title: "D. Marketing & Third-Party Cookies",
                content: "These may be set by external partners (e.g., Google Analytics, YouTube embeds):",
                items: [
                    "Track browsing behavior", "Improve targeted communications", "Provide relevant content or ads",
                ],
                note: "We ensure that third-party cookie usage complies with security and privacy standards.",
            },
        ],
    },
    {
        title: "4. Why We Use Cookies",
        content: `We use cookies to:`,
        items: [
            "Improve website performance", "Enhance navigation experience", "Analyze engagement metrics",
            "Deliver personalized content", "Ensure secure access to certain pages", "Diagnose technical issues",
            "Support user account functionality",
        ],
        note: "Cookies help us understand user needs and continuously improve our web presence.",
    },
    {
        title: "5. Managing & Controlling Cookies",
        content: `You can manage or disable cookies through your browser settings:`,
        items: [
            "Block all cookies", "Block specific categories", "Delete stored cookies", "Allow cookies only from trusted websites",
        ],
        note: "However, restricting cookies may affect website functionality and user experience.",
    },
    {
        title: "6. Third-Party Tools & Embedded Services",
        content: `Our website may use integrated tools such as Google Analytics, YouTube video players, social media embeds, and API-based educational tools. These third parties may place their own cookies.`,
        note: "We recommend reviewing their individual privacy policies.",
    },
    {
        title: "7. Cookies Used by Our Robots & Dashboards (If Applicable)",
        content: `Some of our robot dashboards or web-based control panels may use cookies to:`,
        items: [
            "Maintain login sessions", "Store robot preferences", "Track navigation console usage", "Enhance dashboard performance",
        ],
        note: "These cookies are purely functional and do not store sensitive personal information.",
    },
    {
        title: "8. Changes to This Cookies Policy",
        content: `We may update this policy from time to time to reflect website improvements, regulatory changes, or new tools/analytics platforms.`,
        note: "Updates will be posted with revised “Last Updated” dates.",
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

const CookieSection: React.FC<SectionProps> = ({ title, content, listTitle, items, subsections, note }) => (
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
                    // Rendering list items with simple Markdown (e.g., **bold**) via dangerouslySetInnerHTML
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
            </ul>
        )}
        
        {/* Subsections (for nested structure) */}
        {subsections && subsections.map((sub, subIdx) => (
            <div key={subIdx} className='mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200'>
                <h3 className="text-xl font-bold mt-0 mb-3 text-gray-800">{sub.title}</h3>
                {sub.content && <p className="mb-3 text-gray-700 leading-relaxed">{sub.content}</p>}
                
                {sub.items && (
                    <ul className="list-disc ml-5 space-y-2 text-gray-700">
                        {sub.items.map((item: string, itemIdx: number) => (
                            <li key={itemIdx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                    </ul>
                )}
                {sub.note && <p className="mt-3 text-sm italic text-gray-600">{sub.note}</p>}
            </div>
        ))}

        {/* Note/Disclaimer */}
        {note && <p className="mt-4 text-sm italic text-gray-600 border-l-4 pl-3" style={{ borderColor: COLOR_PINK }}>{note}</p>}
    </div>
);

const ContactSection = () => (
    <div className='mt-8 pt-4 border-t border-gray-200'>
        <h2 className="text-3xl font-bold mb-4 border-b pb-2" style={{ borderColor: COLOR_PINK, color: COLOR_PURPLE }}>9. Contact Information</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
            For questions about cookies or data practices, contact:
        </p>
        <div className='mt-4 p-4 rounded-lg border border-gray-200 bg-gray-50'>
            <p className='text-gray-800 font-semibold mb-1'>📧 Email: <a href="mailto:info@newrro.in" className='text-pink-600 hover:underline font-normal'>info@newrro.in</a></p>
            <p className='text-gray-700'>🌐 Website: www.newrro.in</p>
        </div>
    </div>
);


/**
 * Renders the Cookie Policy page.
 */
export default function CookiePolicyPage() {
    return (
        <main className="bg-white text-gray-900 min-h-screen">
            
            {/* Hero Header */}
            <div 
                className="relative flex min-h-[40vh] items-center justify-center overflow-hidden py-20"
                style={{ backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})` }}
            >
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <Cookie className="w-16 h-16 mx-auto mb-4 text-white" />
                    <h1 className="mb-2 text-5xl font-extrabold text-white md:text-6xl">Cookie Policy</h1>
                    <p className="text-lg text-gray-100 max-w-2xl mx-auto flex items-center justify-center">
                        <Calendar className='w-4 h-4 mr-2' />
                        Last Updated: November 25, 2025
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-16 md:py-24">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="lg:prose-xl max-w-none">
                        
                        <div className='mb-4'>
                            <p className="mb-4 text-gray-700 leading-relaxed">
                                This Cookies Policy explains how Newrro Tech LLP uses cookies and similar tracking technologies on our website (www.newrro.in). Cookies allow us to enhance user experience, improve website performance, and understand visitor behavior.
                            </p>
                            <p className="mb-4 text-gray-700 font-semibold leading-relaxed">
                                By continuing to browse the website, you consent to our use of cookies under this policy.
                            </p>
                        </div>

                        {COOKIES_SECTIONS.map((section, index) => (
                            <CookieSection 
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