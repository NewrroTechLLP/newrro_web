import React from 'react';
import { Zap, FlaskConical, Globe } from 'lucide-react';

// Explicit hex codes based on user's theme
const COLOR_PINK = '#df5bd3';
const COLOR_PURPLE = '#7e5bf6';

/**
 * Renders the introductory hero section for the FAQ page.
 */
export const FAQHeroSection: React.FC = () => (
  <header className="py-16 md:py-24 bg-white border-b border-gray-100">
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 relative inline-block text-gray-900">
        <span className="text-stroke text-transparent absolute top-0 left-0 w-full h-full -z-10 opacity-10">
          FAQs
        </span>
        {/* Title uses explicit theme gradient for visibility and branding */}
        <span 
          className="bg-clip-text text-transparent"
          style={{ backgroundImage: `linear-gradient(to right, ${COLOR_PINK}, ${COLOR_PURPLE})` }}
        >
          Frequently Asked Questions
        </span>
      </h1>
      
      {/* Paragraph text uses explicit dark gray for guaranteed visibility */}
      <p className="mt-4 text-xl text-gray-700 max-w-3xl mx-auto">
        Deep dive into Newrro Tech's vision, cutting-edge AMR platforms (like ARJUNA), and comprehensive support for educational robotics and AI research.
      </p>
      
      <div className="mt-8 flex justify-center space-x-6 flex-wrap">
        
        {/* Badge 1: Solid Purple background with white text */}
        <div 
          className="flex items-center space-x-2 text-sm font-medium text-white px-3 py-1 rounded-full p-1 shadow-md"
          style={{ backgroundColor: COLOR_PURPLE }}
        >
          <Zap className="w-5 h-5" />
          <span>ROS2 Ready</span>
        </div>
        
        {/* Badge 2: Solid Pink background with white text */}
        <div 
          className="flex items-center space-x-2 text-sm font-medium text-white px-3 py-1 rounded-full p-1 shadow-md"
          style={{ backgroundColor: COLOR_PINK }}
        >
          <FlaskConical className="w-5 h-5" />
          <span>Research Focused</span>
        </div>
        
        {/* Badge 3: Standard dark gray text */}
        <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 p-1">
          <Globe className="w-5 h-5 text-gray-700" />
          <span>Industry Standard</span>
        </div>
      </div>
    </div>
  </header>
);