import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Explicit hex codes based on user's theme
const COLOR_PINK = '#df5bd3';
const COLOR_PURPLE = '#7e5bf6';

// --- FAQ Data Structure ---
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQ[] = [
  {
    id: 1,
    question: 'What is Newrro Tech LLP?',
    answer: 'Newrro Tech LLP is a deep-tech robotics company based in India, focused on developing cutting-edge autonomous systems, educational robotics platforms, and research-ready AMR technologies. We specialize in building intelligent, ROS-based robots that help institutions transform their engineering education, robotics curriculum, and applied research. Our mission revolves around empowering students, faculty, and industries with accessible, high-quality robotics tools that bridge the gap between theory and modern industrial applications.',
  },
  {
    id: 2,
    question: 'What is the core vision and mission of Newrro Tech?',
    answer: 'Our vision is to make advanced robotics and AI education accessible to every engineering student in India. We aim to build a generation that can innovate, build, and deploy world-class robotics solutions.\n\nOur mission focuses on: Providing hands-on robotics systems to colleges, Enabling AI-driven learning and research, Supporting institutions with turnkey robotics ecosystems, Developing affordable yet powerful AMRs and robot kits, and Bridging academia and industry through real-world robotics challenges.\n\nNewrro exists to create tomorrow’s problem-solvers by giving them the right tools today.',
  },
  {
    id: 3,
    question: 'What products does Newrro Tech offer?',
    answer: 'Newrro provides a complete suite of robotics platforms for different levels of learning and research: ARJUNA – A flagship ROS2-based Autonomous Mobile Robot; NRC-2 – A basic AMR educational platform; Babroo – A beginner-friendly mobile robot kit; RICK Series – Modular robotics kits; Basic Robot Controller – A plug-and-play microcontroller board; and ESP32-Based Kush Bot (In Development) – A smart and expandable educational robot. Each product serves a different learning stage—from fundamentals to advanced AMR research.',
  },
  {
    id: 4,
    question: 'What makes ARJUNA different from other educational robots?',
    answer: 'ARJUNA is not just an educational robot—it is a full-scale research AMR platform designed to match industry standards. Key differentiators include: Native ROS2 architecture, LiDAR-based mapping and navigation, Visual SLAM using OAK-D Lite camera, Jetson GPU-supported AI models, Nav2 autonomous navigation, EKF-based sensor fusion (IMU + encoders + VO + LiDAR), and Modular hardware for sensor upgrades. This makes ARJUNA suitable for engineering courses, M.Tech/PhD research, R&D labs, and prototype development.',
  },
  {
    id: 5,
    question: 'Does Newrro Tech provide complete robotics lab setups?',
    answer: 'Yes. Newrro specializes in building turnkey robotics labs for colleges and universities. We provide: Complete robot packages (AMRs + kits), ROS2-compatible computers and tools, AI & Computer Vision learning modules, Faculty Development Programs, Structured semester-wise curriculum, Student project support, and Lab layout, installation, training, and certification. Our setup ensures that institutions can begin robotics teaching and research immediately without additional hassles.',
  },
  {
    id: 6,
    question: 'What types of training programs does Newrro offer?',
    answer: 'We offer specialized training programs for both faculty and students, including: 3–5 Day Faculty Development Programs on ROS2, AI, AMR navigation, and perception; Student Workshops covering mobile robotics, drones, SLAM, and embedded systems; Hands-On Bootcamps on navigation, OpenCV, depth perception, and AI inference; Customized Training Modules aligned with academic syllabi; and Capstone project guidance for B.Tech, M.Tech, and research scholars. Each training is highly practical, allowing learners to build, test, and deploy real robot applications.',
  },
  {
    id: 7,
    question: 'Who are the founders of Newrro Tech LLP?',
    answer: 'Newrro was founded by Nikhil U, Basavaraja HM, and Bindusagar MG, robotics engineers who have solid backgrounds in autonomous systems, embedded electronics, AI-based navigation, and educational technology. Their combined expertise ensures every product is designed with both academic and industrial relevance in mind.',
  },
  {
    id: 8,
    question: 'How can I contact Newrro Tech for product inquiries or support?',
    answer: 'You can reach us through multiple channels:\n\n📧 Email: info@newrro.in\n\n🌐 Website: www.newrro.in\n\n📱 Instagram: @newrro_tech\n\n💼 LinkedIn: Newrro Tech LLP\n\nWe respond quickly to product demos, sales inquiries, collaboration requests, and technical support needs.',
  },
  {
    id: 9,
    question: 'Does Newrro Tech work with institutions for research projects?',
    answer: 'Yes. Research collaboration is one of our core strengths. We support institutions with: AMRs for research labs, SLAM and AI-based navigation experiments, Custom sensor integrations, Joint publications and research papers, Drone and robotics ecosystem development, and Student and faculty mentorship. Our platforms are research-ready and used for academic publishing and prototype development.',
  },
  {
    id: 10,
    question: 'What technical support does Newrro Tech provide after purchase?',
    answer: 'We offer structured support that includes: Remote assistance via email, call, and video; 48-hour support response time; Firmware and software updates; Directed troubleshooting assistance; ROS package updates and improvements; and Guidance for lab maintenance and robot handling. Our aim is to ensure long-term, uninterrupted use of our robots in your institution.',
  },
  {
    id: 11,
    question: 'Do Newrro robots come with a warranty?',
    answer: 'Yes. All major robotics products come with a 6-month warranty, covering manufacturing defects, electronics faults, and sensor issues, as long as the original seals and operational guidelines are maintained.',
  },
  {
    id: 12,
    question: 'What software ecosystems do Newrro robots support?',
    answer: 'Our robots support a wide range of modern software: Ubuntu + ROS2 (Humble/Foxy), OpenCV, DepthAI + Myriad X, TensorRT & CUDA for AI acceleration, Nav2 for autonomous navigation, SLAM Toolbox / RTAB-Map, and Custom Python and C++ packages. This makes our robots ideal for both beginners and advanced researchers.',
  },
  {
    id: 13,
    question: 'Are Newrro robots suited for AI & computer vision research?',
    answer: 'Yes. With OAK-D Lite, Jetson GPU support, depth sensing, and ROS2 integration, our robots can perform: Object detection & tracking, Human pose estimation, Environment understanding, Visual SLAM, Depth-based navigation, Scene segmentation, and AI-powered obstacle detection. This makes them suitable for PG/PhD research and real-world experimentation.',
  },
  {
    id: 14,
    question: 'Can I customize the robots based on specific academic or research needs?',
    answer: 'Absolutely. We offer customizable: Sensors (LiDAR, depth, cameras, radar, IMU), Compute units (Nano/Orin/Xavier), Wheel and drive configurations, Communication modules, Software packages, and Curriculum modules. We design robots according to your research goals and educational objectives.',
  },
  {
    id: 15,
    question: 'What industries benefit from Newrro robotics technology?',
    answer: 'While our primary focus is education and research, our technology is applicable in: Warehousing & logistics, Agriculture automation, Healthcare robotics, Environment monitoring, Vision-based inspection systems, Autonomous transportation, and Drone-based autonomy. Our AMRs are capable of scaling into prototype-stage industrial solutions.',
  },
  {
    id: 16,
    question: 'Do you offer long-term partnerships to institutions?',
    answer: 'Yes. We offer annual and multi-year partnerships which include: Yearly lab upgrades, Advanced FDP and refresher training, Support for student competitions (e-Yantra, SAE, hackathons), Consultation for research papers, and Internship and recruitment support. This ensures continuous improvement in the institution’s robotics ecosystem.',
  },
  {
    id: 17,
    question: 'Are Newrro robots suitable for complete beginners?',
    answer: 'Yes. Products like Babroo, NRC-2, and RICK Series are built for entry-level learners. They include step-by-step tutorials, easy programming interfaces, and modular hardware which help students transition smoothly from basics to advanced robotics.',
  },
  {
    id: 18,
    question: 'How can an institute request a demo or quotation?',
    answer: 'Colleges can contact us through email or our website. We offer both virtual demonstrations and on-campus demos, followed by complete technical and financial proposals tailored to the institution’s requirements.',
  },
  {
    id: 19,
    question: 'What safety features are integrated into Newrro robots?',
    answer: 'Our robots include: BMS-protected batteries, Regulated power distribution, Short-circuit and over-voltage protection, Stable current supply for motors, Emergency stop options, and Temperature and load monitoring. These ensure safe handling, even in student labs.',
  },
  {
    id: 20,
    question: 'Can Newrro robots help institutions generate revenue?',
    answer: 'Yes. Many institutions use our robots to run: Paid workshops, Certification training, Skill development programs, AI/robotics bootcamps, Intercollegiate events, and Student projects and consultancy work. This allows institutions to generate revenue while simultaneously enhancing their robotics culture.',
  },
];


// --- Reusable Accordion Item Component ---
const FAQItem: React.FC<{ faq: FAQ }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Custom function to format answer text for visibility
  const formatAnswer = (text: string) => {
    return text.split('\n').map((segment, index) => {
      // Check for bullet points (based on the provided structure)
      const isListItem = segment.startsWith('Providing') || segment.startsWith('Enabling') || segment.startsWith('Supporting') || 
        segment.startsWith('Developing') || segment.startsWith('Bridging') || segment.startsWith('Complete') || 
        segment.startsWith('ROS2-compatible') || segment.startsWith('AI &') || segment.startsWith('Faculty') || 
        segment.startsWith('Structured') || segment.startsWith('Student') || segment.startsWith('Lab layout') || 
        segment.startsWith('3–5 Day') || segment.startsWith('Student Workshops') || segment.startsWith('Hands-On') || 
        segment.startsWith('Customized') || segment.startsWith('Capstone') || segment.startsWith('AMRs for') || 
        segment.startsWith('SLAM and') || segment.startsWith('Custom sensor') || segment.startsWith('Joint') || 
        segment.startsWith('Drone and') || segment.startsWith('Student and faculty') || segment.startsWith('Remote') || 
        segment.startsWith('48-hour') || segment.startsWith('Firmware') || segment.startsWith('Directed') || 
        segment.startsWith('ROS package') || segment.startsWith('Guidance for') || segment.startsWith('Ubuntu +') || 
        segment.startsWith('OpenCV') || segment.startsWith('DepthAI +') || segment.startsWith('TensorRT &') || 
        segment.startsWith('Nav2 for') || segment.startsWith('SLAM Toolbox') || segment.startsWith('Custom Python') || 
        segment.startsWith('Object') || segment.startsWith('Human') || segment.startsWith('Environment') || 
        segment.startsWith('Visual') || segment.startsWith('Depth-based') || segment.startsWith('Scene') || 
        segment.startsWith('AI-powered') || segment.startsWith('Sensors') || segment.startsWith('Compute units') || 
        segment.startsWith('Wheel and') || segment.startsWith('Communication') || segment.startsWith('Software packages') || 
        segment.startsWith('Curriculum') || segment.startsWith('Warehousing') || segment.startsWith('Agriculture') || 
        segment.startsWith('Healthcare') || segment.startsWith('Environment monitoring') || segment.startsWith('Vision-based') || 
        segment.startsWith('Autonomous') || segment.startsWith('Drone-based') || segment.startsWith('Yearly') || 
        segment.startsWith('Advanced') || segment.startsWith('Support for student') || segment.startsWith('Consultation for') || 
        segment.startsWith('Internship and') || segment.startsWith('BMS-protected') || segment.startsWith('Regulated') || 
        segment.startsWith('Short-circuit') || segment.startsWith('Stable current') || segment.startsWith('Emergency') || 
        segment.startsWith('Temperature') || segment.startsWith('Paid') || segment.startsWith('Certification') || 
        segment.startsWith('Skill') || segment.startsWith('AI/robotics') || segment.startsWith('Intercollegiate') || 
        segment.startsWith('Student projects');

      if (isListItem) {
        // Use standard dark gray for list items
        return (
          <li key={index} className="pl-4 leading-relaxed list-disc text-gray-700">
            {segment.trim()}
          </li>
        );
      }
      // Highlight contact details using the pink color
      if (segment.startsWith('📧 Email') || segment.startsWith('🌐 Website') || segment.startsWith('📱 Instagram') || segment.startsWith('💼 LinkedIn')) {
         return (
            <p key={index} className="mb-1 leading-relaxed font-medium" style={{ color: COLOR_PINK }}>{segment.trim()}</p>
        );
      }
      
      // Standard paragraph/line break with dark gray
      return (
        <React.Fragment key={index}>
          <p className="mb-2 leading-relaxed text-gray-800">{segment}</p>
        </React.Fragment>
      );
    });
  };

  return (
    <div className="border-b border-gray-200 group">
      <button
        className="flex justify-between items-start w-full py-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        {/* Question text is dark gray when closed, pink when open */}
        <span 
          className={`text-lg font-semibold transition-colors duration-200 ${isOpen ? 'text-pink-600' : 'text-gray-900 hover:text-purple-600'}`}
        >
          {faq.question}
        </span>
        <ChevronDown
          className={`w-6 h-6 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          style={{ color: COLOR_PURPLE }} // Chevron uses purple
        />
      </button>

      <div
        id={`faq-answer-${faq.id}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
      >
        {/* Answer container text is dark gray */}
        <div className="text-base text-gray-700 pl-0 sm:pl-4">
          {faq.question.includes('mission') || faq.question.includes('products') || faq.answer.includes('\n') ? (
            <ul className="space-y-2 list-none">{formatAnswer(faq.answer)}</ul>
          ) : (
            <p className="whitespace-pre-line leading-relaxed">{faq.answer}</p>
          )}
        </div>
      </div>
    </div>
  );
};


/**
 * Renders the main FAQ accordion section.
 */
export const FAQAccordionSection: React.FC = () => (
  <section className="py-16 md:py-24">
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Heading uses explicit theme gradient */}
      <h2 
        className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent"
        style={{ backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})` }}
      >
        Explore Our Robotics Ecosystem
      </h2>
      <div className="space-y-0 p-4 border border-gray-200 rounded-xl shadow-lg bg-white backdrop-blur-sm">
        {FAQ_DATA.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  </section>
);