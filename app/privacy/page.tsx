"use client";

import React from 'react';
import { ShieldCheck, Calendar } from 'lucide-react';

// Explicit hex codes for theme consistency
const COLOR_PINK = '#df5bd3';
const COLOR_PURPLE = '#7e5bf6';

// --- Legal Content ---

const POLICY_SECTIONS = [
    {
        title: "1. Introduction",
        content: `This Privacy Policy applies to:`,
        items: [
            "Our website (www.newrro.in)",
            "Our products and robotics platforms (**ARJUNA**, **NRC-2**, **Babroo**, **RICK Series**, **Kush**, controllers, etc.)",
            "Training programs (FDPs, workshops, online/offline training)",
            "Customer communication, inquiry forms, and support interactions",
            "Purchase orders, contracts, and collaborations",
        ],
        note: "This policy is designed to be transparent, protect user rights, and also safeguard the Company’s operational needs and intellectual property.",
    },
    {
        title: "2. Information We Collect",
        content: `We collect information to provide better services, maintain operational records, improve product performance, and ensure effective customer support.`,
        subsections: [
            {
                title: "A. Personal Information (Provided by You)",
                items: [
                    "Full name", "Email address", "Phone number", "Institution/Company details",
                    "Job role or designation", "Billing and shipping information",
                    "Training or workshop registrations", "Inquiry form submissions",
                    "Identification documents for official contracts (if required)",
                ],
            },
            {
                title: "B. Technical & System Information",
                items: [
                    "IP address", "Browser type & device information", "Operating system data",
                    "Usage statistics", "Cookies and tracking data", "System logs for robots/software",
                    "Diagnostic data for troubleshooting",
                ],
            },
            {
                title: "C. Product & Robot Usage Data",
                items: [
                    "Firmware logs", "Sensor performance data", "Navigation errors",
                    "Device health metrics", "Activation and license information",
                    "Motor, battery, LiDAR, and camera diagnostics",
                ],
                note: "This helps us improve stability, provide updates, and offer accurate support.",
            },
            {
                title: "D. Financial Information",
                content: "For product purchases:",
                items: [
                    "Payment confirmations", "Transaction IDs", "Company billing details",
                ],
                note: "(We do not store credit/debit card numbers or banking passwords. All payments are processed through secure third-party gateways.)",
            },
        ],
    },
    {
        title: "3. How We Use the Information",
        content: `We use collected data to:`,
        subsections: [
            {
                title: "A. Deliver & Improve Services",
                items: [
                    "Process orders, deliveries, and installations", "Provide access to training, workshops, and robotics labs",
                    "Maintain product functionality and issue updates", "Troubleshoot and offer technical support",
                ],
            },
            {
                title: "B. Communication",
                items: [
                    "Respond to inquiries", "Share product updates", "Notify about training programs",
                    "Provide warranty or service alerts",
                ],
            },
            {
                title: "C. Product Development",
                items: [
                    "Analyze robot performance", "Improve hardware and software design",
                    "Enhance user experience on website and dashboards",
                ],
            },
            {
                title: "D. Safety & Compliance",
                items: [
                    "Ensure safe operation of robots", "Prevent unauthorized access or misuse",
                    "Comply with legal, contractual, and regulatory requirements",
                ],
            },
            {
                title: "E. Marketing (With Consent)",
                items: [
                    "Share newsletters", "Product announcements", "Event invitations",
                    "Educational content",
                ],
                note: "You may opt out of marketing communication at any time.",
            },
        ],
    },
    {
        title: "4. Legal Basis for Processing (Where Applicable)",
        content: `Depending on jurisdiction, our data handling is justified by:`,
        items: [
            "Contractual necessity – to fulfill product orders and provide services",
            "Legitimate interest – improving robotics systems, security, and user experience",
            "Consent – when filling inquiry forms or subscribing to newsletters",
            "Legal obligation – tax records, invoices, regulatory compliance",
        ],
    },
    {
        title: "5. Information Sharing & Disclosure",
        content: `We never sell personal data. We only share information when necessary for legitimate purposes:`,
        subsections: [
            {
                title: "A. Service Providers",
                content: "Trusted partners who assist with:",
                items: [
                    "Hosting services", "Payment processing", "Logistics/shipping",
                    "Technical support", "Software maintenance",
                ],
                note: "All partners follow confidentiality and data-protection requirements.",
            },
            {
                title: "B. Institutional Collaboration Partners",
                content: "If you are part of a college or training program, basic information may be shared with the institution’s administration to coordinate sessions smoothly.",
            },
            {
                title: "C. Legal or Regulatory Requests",
                content: "We may share information if required: To comply with law enforcement, By court order, or To protect Newrro Tech LLP’s legal rights.",
            },
            {
                title: "D. Product Repairs & Warranty Processing",
                content: "Diagnostic logs may be shared with hardware or software suppliers for troubleshooting.",
            },
        ],
    },
    {
        title: "6. Data Security",
        content: `We employ multiple layers of security:`,
        items: [
            "Encrypted communication (HTTPS)", "Firewall-protected servers",
            "Restricted access to databases", "Secure API access",
            "Monitoring systems for unauthorized activity", "Encrypted backups",
            "Safety checks for robot logs and sensor data",
        ],
        note: "While no system is completely foolproof, we take industry-standard precautions to protect your data and robotic systems.",
    },
    {
        title: "7. Data Retention",
        content: `We retain information only as long as required for:`,
        items: [
            "Service delivery", "Warranty support", "Legal obligations",
            "Academic or industrial partnership records", "Product development",
            "User account maintenance",
        ],
        note: "After retention periods expire, data is securely deleted or anonymized.",
    },
    {
        title: "8. Your Rights (Where Applicable)",
        content: `Users may have the following rights depending on jurisdiction:`,
        items: [
            "Right to access your data", "Right to request corrections",
            "Right to request deletion (subject to legal or contractual limits)",
            "Right to withdraw consent", "Right to restrict or object to processing",
            "Right to request data portability",
        ],
        note: "We respond to all valid requests within a reasonable timeframe.",
    },
    {
        title: "9. Cookies & Tracking Technologies",
        content: `Our website may use cookies to:`,
        items: [
            "Improve user experience", "Analyze website traffic",
            "Remember login sessions", "Personalize content", "Enhance navigation",
        ],
        note: "Users can control or disable cookies through browser settings.",
    },
    {
        title: "10. Third-Party Links",
        content: `Our website or training materials may contain links to third-party sites (e.g., YouTube, GitHub, university portals). We are not responsible for their privacy practices. Users should review their respective privacy policies.`,
    },
    {
        title: "11. Children's Privacy",
        content: `Our services are primarily intended for higher education. We do not knowingly collect data from children under 16 unless:`,
        items: [
            "They are part of an academic program",
            "Permission is provided by the institution or guardian",
        ],
    },
    {
        title: "12. International Transfers",
        content: `If data is accessed or processed outside India, we ensure:`,
        items: [
            "Adequate protection mechanisms", "Compliance with applicable data-transfer regulations",
            "Secure handling of diagnostics and cloud services",
        ],
    },
    {
        title: "13. Updates to This Privacy Policy",
        content: `We may update this policy periodically to reflect:`,
        items: [
            "New products", "Regulatory updates", "Improved data practices",
            "Security enhancements",
        ],
        note: "Changes will be posted on our website with updated timestamps.",
    },
];


// --- Component Helpers ---
type SectionProps = {
    title: string;
    content?: string;
    items?: string[];
    subsections?: any[];
    note?: string;
};

const PolicySection: React.FC<SectionProps> = ({ title, content, items, subsections, note }) => (
    <div className='mt-8'>
        <h2 className="text-3xl font-bold mb-4 border-b pb-2" style={{ borderColor: COLOR_PINK, color: COLOR_PURPLE }}>{title}</h2>
        
        {/* Main Content */}
        {content && <p className="mb-4 text-gray-700 leading-relaxed">{content}</p>}

        {/* Item List */}
        {items && (
            <ul className="list-disc ml-5 space-y-3 text-gray-700">
                {items.map((item, idx) => (
                    // Rendering list items with simple Markdown (e.g., **bold**) via dangerouslySetInnerHTML
                    <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ))}
            </ul>
        )}
        
        {/* Note/Disclaimer */}
        {note && <p className="mt-4 text-sm italic text-gray-500">{note}</p>}
        
        {/* Subsections (for nested structure) */}
        {subsections && subsections.map((sub, subIdx) => (
            <div key={subIdx} className='mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200'>
                <h3 className="text-2xl font-semibold mt-0 mb-3 text-gray-800">{sub.title}</h3>
                {sub.content && <p className="mb-3 text-gray-700 leading-relaxed">{sub.content}</p>}
                
                {sub.items && (
                    <ul className="list-disc ml-5 space-y-3 text-gray-700">
                        {sub.items.map((item: string, itemIdx: number) => (
                            <li key={itemIdx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                    </ul>
                )}
                
                {sub.note && <p className="mt-3 text-sm italic text-gray-500">{sub.note}</p>}
            </div>
        ))}
    </div>
);

const ContactSection = () => (
    <div className='mt-8 pt-4 border-t border-gray-200'>
        <h2 className="text-3xl font-bold mb-4 border-b pb-2" style={{ borderColor: COLOR_PINK, color: COLOR_PURPLE }}>14. Contact Information</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
            For privacy concerns, data requests, or support:
        </p>
        <div className='mt-4 p-4 rounded-lg border border-gray-200 bg-gray-50'>
            <p className='text-gray-800 font-semibold mb-1'>📧 Email: <a href="mailto:info@newrro.in" className='text-pink-600 hover:underline font-normal'>info@newrro.in</a></p>
            <p className='text-gray-700 mb-1'>🌐 Website: www.newrro.in</p>
            <p className='text-gray-700'>📍 Newrro Tech LLP, India</p>
        </div>
    </div>
);


/**
 * Renders the Privacy Policy page.
 */
export default function PrivacyPolicyPage() {
    const Introduction = (
        <div className='mb-4'>
            <h1 className="text-3xl font-bold mb-3 text-gray-900">Privacy Policy</h1>
            <p className='text-sm text-gray-500 mb-4'>Last Updated: November 25, 2025</p>
            <p className="mb-4 text-gray-700 leading-relaxed">
                Newrro Tech LLP (“Company”, “we”, “our”, “us”) is committed to protecting your personal information and ensuring compliance with applicable data protection laws in India and internationally. This Privacy Policy explains how we collect, use, share, store, and safeguard information through our website, products, robotics platforms, training services, and communication channels.
            </p>
             <p className="mb-4 text-gray-700 font-semibold leading-relaxed">
                By using our services, accessing our website, interacting with our robots, or contacting us, you agree to the terms outlined in this Privacy Policy.
            </p>
        </div>
    );

    return (
        <main className="bg-white text-gray-900 min-h-screen">
            
            {/* Hero Header */}
            <div 
                className="relative flex min-h-[40vh] items-center justify-center overflow-hidden py-20"
                style={{ backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})` }}
            >
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-white" />
                    <h1 className="mb-2 text-5xl font-extrabold text-white md:text-6xl">Compliance Documents</h1>
                    <p className="text-lg text-gray-100 max-w-2xl mx-auto flex items-center justify-center">
                        Our commitment to transparent and safe data handling.
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-16 md:py-24">
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="lg:prose-xl max-w-none">
                        
                        {Introduction}

                        {POLICY_SECTIONS.map((section, index) => (
                            <PolicySection 
                                key={index} 
                                title={section.title} 
                                content={section.content} 
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