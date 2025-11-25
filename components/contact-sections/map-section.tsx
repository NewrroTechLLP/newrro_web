'use client';

import { motion } from "framer-motion";
import { MapPin, Navigation as NavigationIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MapSection() {
  const handleGetDirections = () => {
    // Open Google Maps with exact location
    window.open('https://www.google.com/maps/place/Nitte+Meenakshi+Institute+of+Technology/@13.1294627,77.5876588,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae170d10bb559b:0x2bb3892a626cf9ba!8m2!3d13.1294627!4d77.5876588!16zL20vMGcxdG13?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D', '_blank');
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Find Us Here
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Visit our office and experience the future of robotics firsthand
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] bg-gray-200">
              {/* Google Maps Embed - NITTE Campus Location */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.460738287595!2d77.58765887507582!3d13.129462687229847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae170d10bb559b%3A0x2bb3892a626cf9ba!2sNitte%20Meenakshi%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NEWRRO Office Location - NITTE Campus"
              />

              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-xl">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-[#7e5bf6] to-[#df5bd3] rounded-full p-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">NEWRRO Headquarters</h3>
                    <p className="text-gray-600 text-sm">
                      Co-Innovation Centre, NITTE Campus<br />
                      Yelahanka, Bengaluru - 560064
                    </p>
                  </div>
                  <Button
                    onClick={handleGetDirections}
                    size="sm"
                    className="bg-[#7e5bf6] hover:bg-[#6f4fe0] text-white"
                  >
                    <NavigationIcon className="w-4 h-4 mr-1" />
                    Directions
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Address Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-br from-[#7e5bf6] to-[#df5bd3] rounded-lg p-3">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Address</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Co-Innovation Centre<br />
                    NITTE Meenakshi College Rd<br />
                    BSF Campus, Yelahanka<br />
                    Bengaluru, Karnataka - 560064
                  </p>
                </div>
              </div>
            </div>

            {/* Parking Info */}
            <div className="bg-gradient-to-br from-[#7e5bf6]/10 to-[#df5bd3]/10 rounded-xl p-6 border border-[#7e5bf6]/20">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#7e5bf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Visitor Information
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-[#7e5bf6] mr-2">•</span>
                  <span>Ample parking space available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#7e5bf6] mr-2">•</span>
                  <span>Wheelchair accessible entrance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#7e5bf6] mr-2">•</span>
                  <span>Reception on ground floor</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#7e5bf6] mr-2">•</span>
                  <span>Please call ahead for appointments</span>
                </li>
              </ul>
            </div>

            {/* Public Transport */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#df5bd3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                Public Transport
              </h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start">
                  <span className="text-[#df5bd3] mr-2">•</span>
                  <span>Metro: 10 min walk from nearest station</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#df5bd3] mr-2">•</span>
                  <span>Bus: Multiple routes available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#df5bd3] mr-2">•</span>
                  <span>Taxi/Ride-share: Drop-off at main entrance</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
