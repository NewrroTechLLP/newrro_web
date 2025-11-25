'use client';

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram, Twitter, Facebook } from "lucide-react";
import Link from "next/link";

const contactDetails = [
  {
    icon: <Phone className="w-8 h-8" />,
    title: "Phone",
    details: ["+91 8660875098"],
    description: "Mon-Fri from 9am to 6pm",
    color: "from-[#7e5bf6] to-[#6f4fe0]"
  },
  {
    icon: <Mail className="w-8 h-8" />,
    title: "Email",
    details: ["support@newrro.in", "sales@newrro.in"],
    description: "We'll respond within 24 hours",
    color: "from-[#df5bd3] to-[#c94abf]"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Office",
    details: ["Co-Innovation Centre, NITTE Campus", "Yelahanka, Bengaluru - 560064"],
    description: "Visit us at our office",
    color: "from-[#7e5bf6] to-[#df5bd3]"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Working Hours",
    details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"],
    description: "Closed on Sundays",
    color: "from-[#df5bd3] to-[#7e5bf6]"
  }
];

const socialLinks = [
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-6 h-6" />,
    url: "https://www.linkedin.com/company/newrro/?originalSubdomain=in",
    color: "hover:bg-[#0077b5]"
  },
  {
    name: "Instagram",
    icon: <Instagram className="w-6 h-6" />,
    url: "https://www.instagram.com/newrro_tech?igsh=MXA3dGJkazhlMjVucw%3D%3D",
    color: "hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]"
  },
  {
    name: "Twitter",
    icon: <Twitter className="w-6 h-6" />,
    url: "https://twitter.com/newrro",
    color: "hover:bg-[#1DA1F2]"
  },
  {
    name: "Facebook",
    icon: <Facebook className="w-6 h-6" />,
    url: "https://facebook.com/newrro",
    color: "hover:bg-[#1877f2]"
  }
];

export function ContactInfoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Contact Information
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Multiple ways to reach out to us. Choose what works best for you.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactDetails.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-4 text-[#7e5bf6] group-hover:text-white transition-colors duration-300">
                  {contact.icon}
                </div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">
                  {contact.title}
                </h3>

                <div className="space-y-2 mb-3">
                  {contact.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 group-hover:text-white/90 transition-colors duration-300 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>

                <p className="text-sm text-gray-500 group-hover:text-white/70 transition-colors duration-300">
                  {contact.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center"
        >
          <h3 className="text-3xl font-bold mb-4 text-gray-900">
            Connect With Us
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Follow us on social media for the latest updates, robotics news, and community events
          </p>

          <div className="flex justify-center items-center space-x-4">
            {socialLinks.map((social, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-14 h-14 rounded-full bg-white border-2 border-gray-200 text-gray-700 hover:text-white hover:border-transparent transition-all duration-300 hover:scale-110 ${social.color} shadow-md hover:shadow-xl`}
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-[#7e5bf6] to-[#df5bd3] rounded-full p-1">
            <div className="bg-white rounded-full px-8 py-4">
              <p className="text-gray-700">
                Looking for answers?{" "}
                <Link href="/faq" className="text-[#7e5bf6] font-semibold hover:underline">
                  Check our FAQ
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
