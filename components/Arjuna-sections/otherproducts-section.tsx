"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tabspd } from "../ui/tabsprod";

export function ProductTabs() {
  const tabs = [
    {
      title: "NR-B1",
      value: "nr-b1",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <h2 className="text-2xl mb-4 font-semibold">NR-B1</h2>
          <p className="mb-6">The NR-B1 is a cutting-edge AI-powered device for advanced robotics applications, featuring robust processing capabilities and high precision sensors.</p>
          <div className="relative">
            <Image
              src="/assets/scroller/1.png" // Replace with correct path
              alt="NR-B1"
              width="1000"
              height="1000"
              className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
            />
          </div>
          <a
            href="/nr-b1" // Link to the eCommerce page for NR-B1
            className="mt-6 inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            View NR-B1
          </a>
        </div>
      ),
    },
    {
      title: "NR-B2",
      value: "nr-b2",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <h2 className="text-2xl mb-4 font-semibold">NR-B2</h2>
          <p className="mb-6">The NR-B2 model offers enhanced sensor integration and superior computational performance, ideal for industrial-grade robotic systems.</p>
          <div className="relative">
            <Image
              src="/nr-b2-image.webp" // Replace with correct path
              alt="NR-B2"
              width="1000"
              height="1000"
              className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
            />
          </div>
          <a
            href="/nr-b2" // Link to the eCommerce page for NR-B2
            className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            View NR-B2
          </a>
        </div>
      ),
    },
    {
      title: "AMR Connection Kit",
      value: "amr-connection-kit",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <h2 className="text-2xl mb-4 font-semibold">AMR Connection Kit</h2>
          <p className="mb-6">Our AMR Connection Kit is a comprehensive solution designed to integrate multiple sensors and modules for autonomous mobile robots (AMRs).</p>
          <div className="relative">
            <Image
              src="/amr-connection-kit-image.webp" // Replace with correct path
              alt="AMR Connection Kit"
              width="1000"
              height="1000"
              className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
            />
          </div>
          <a
            href="/amr-connection-kit" // Link to the eCommerce page for AMR Connection Kit
            className="mt-6 inline-block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            View AMR Connection Kit
          </a>
        </div>
      ),
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-500 relative overflow-hidden">
    <div className="container mx-auto px-4 py-20 relative z-10">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Products
        </h2>
        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
          Look through our other products.
        </p>
      </motion.div>
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabspd tabs={tabs} />
    </div>
      </div>
    </section>
        
      
  
  )
}  
