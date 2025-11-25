import React, { useState, useMemo } from 'react';
import { Code, ZapIcon, ChevronDown } from 'lucide-react';

// Explicit hex codes based on user's theme
const COLOR_PINK = '#df5bd3';
const COLOR_PURPLE = '#7e5bf6';

// WhatsApp Details
const WHATSAPP_NUMBER = '918660875098';

// Partnership Options
const PARTNERSHIP_OPTIONS = [
  'Select Area of Interest', // Default placeholder
  'Educational Robotics',
  'Industrial Automation',
  'White-Label Manufacturing',
];

/**
 * Renders the final call-to-action section.
 */
export const FAQCTASection: React.FC = () => {
  const [selectedInterest, setSelectedInterest] = useState(PARTNERSHIP_OPTIONS[0]);

  // Function to construct the dynamic WhatsApp message link
  const WHATSAPP_LINK = useMemo(() => {
    const interest = selectedInterest === PARTNERSHIP_OPTIONS[0] 
      ? "an unspecified partnership type" 
      : selectedInterest;
      
    const message = encodeURIComponent(
      `Hello Newrro Tech, I am reaching out regarding a partnership in the area of *${interest}*. Please connect me with the specialist who can discuss our specific needs. Thank you!`
    );
    return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${message}`;
  }, [selectedInterest]);

  // Check if a valid option is selected
  const isButtonDisabled = selectedInterest === PARTNERSHIP_OPTIONS[0];

  return (
    <section className="pb-20 pt-10">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Box: Uses lightened hex colors for background gradient and dark text */}
        <div 
          className="p-8 md:p-12 rounded-2xl text-center text-gray-900 border-2 shadow-xl shadow-pink-200/50"
          style={{ 
            backgroundImage: `linear-gradient(to bottom right, rgba(126, 91, 246, 0.1), rgba(223, 91, 211, 0.2))`,
            borderColor: COLOR_PINK,
          }}
        >
          
          {/* Icon uses purple theme color */}
          <ZapIcon className="w-12 h-12 mx-auto mb-4 animate-float" style={{ color: COLOR_PURPLE }} />
          
          {/* Title text uses dark gray */}
          <h3 className="text-3xl font-bold mb-4 text-gray-900">
            Ready to Transform Your Robotics Lab or Business?
          </h3>
          
          {/* Paragraph text uses dark gray */}
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Select your primary area of interest below to connect with the right specialist immediately.
          </p>

          {/* New: Dropdown Selection */}
          <div className="flex flex-col items-center mb-8">
            <label className="text-sm font-semibold text-gray-800 mb-2">
              My Primary Focus Is:
            </label>
            <div className="relative w-full max-w-sm">
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
          </div>
          
          {/* CTA Button: Updated to WhatsApp link for demo/enquire */}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full 
                       text-white transition duration-300 ease-in-out shadow-lg shadow-purple-500/30 transform hover:scale-[1.02] ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: COLOR_PURPLE }}
            aria-disabled={isButtonDisabled}
            onClick={(e) => isButtonDisabled && e.preventDefault()}
          >
            Discuss Partnership Now (WhatsApp)
            <Code className="ml-3 h-5 w-5" />
          </a>
          
          {isButtonDisabled && (
              <p className="mt-3 text-sm text-red-500">Please select an area of interest above.</p>
          )}

        </div>
      </div>
    </section>
  );
};