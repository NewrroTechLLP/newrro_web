"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InfiniteMovingCards } from "@/components/ui/imagemoving";
import Image from "next/image";

const services = [
  {
    imageSrc: "/assets/why-newrro-images/11.jpg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/25.png",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/12.jpg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/13.jpg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/23.png",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/14.jpg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/15.jpg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/16.jpg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/24.png",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/17.jpg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/19.jpeg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/20.jpeg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/21.jpeg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/22.jpeg",
    alt: "Other Services",
  },
  {
    imageSrc: "/assets/why-newrro-images/26.png",
    alt: "Other Services",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            A Different Approach: Where Education Meets Innovation!
          </h2>
        </motion.div>

        {/* Infinite Moving Image Cards */}
        <div className="mb-16">
          <InfiniteMovingCards
            items={services}
            direction="left"
            speed="normal"
            pauseOnHover={true}
            className="overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
}
