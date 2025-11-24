"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Define the collaborators array with explicit typing
interface Collaborator {
  name: string;
  logo: string;
}

const collaborators: Collaborator[] = [
  { name: "NMIT", logo: "/assets/logos/nitte png.png" },
  { name: "JSS", logo: "/assets/logos/jssate.png" },
  { name: "IEEE Bangalore", logo: "/assets/logos/Screenshot 2024-01-17 191858.png" },
  { name: "REVA", logo: "/assets/logos/reva.png" },
  { name: "MS Engineering", logo: "/assets/logos/mse.jpeg" },
  { name: "Vidyashilp", logo: "/assets/logos/vsu.png" },
  { name: "BIT", logo: "/assets/logos/BIT.webp" },
  { name: "Sir MVIT", logo: "/assets/logos/smvit.jpg" },
  { name: "GAT", logo: "/assets/logos/gat.jpg" },
  { name: "IEEE", logo: "/assets/logos/ieee.jpg" },
  { name: "VIT", logo: "/assets/logos/vit.png" },
  { name: "AVVP", logo: "/assets/logos/avvp.jpg" },
];

export function CollaborationSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            We Work With
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Collaborating with leading institutions to bring you the best in robotics education.
          </p>
        </motion.div>

        {/* Collaborators Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
          {collaborators.map((collaborator, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <Image
                src={collaborator.logo}
                alt={collaborator.name}
                width={120}
                height={80}
                className="max-w-full h-auto"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}