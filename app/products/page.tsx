"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/products-sections/hero-section";
import { BenefitsSection } from "@/components/products-sections/benefits-section";
import { FiltersSearchSection } from "@/components/products-sections/filters-search-section";
import { ProductGrid } from "@/components/products-sections/product-grid";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  badge?: string;
  view360Link?: string; // URL to dedicated 360° view (iframe embed or GLB file)
  rotationOffset?: [number, number, number]; // Optional: [x, y, z] in radians for model adjustment
  galleryImages?: string[]; // New optional property
  
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Arjuna Edu Kit",
    category: "Educational Robotics",
    price: 150000,
    image: "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/R11.png?raw=true",
    galleryImages: [
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/R2.png?raw=true",
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/R3.png?raw=true",
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/work_gallery/R6.png?raw=true",
    ],
    description:
      "Elevate Robotics Learning with ARJUNA! The Newrro ARJUNA Edu Kit is a high-performance ROS-based Autonomous Mobile Robot designed for research, AI development, and autonomous navigation.",
    features: [
      "NVIDIA Jetson Nano 4GB",
      "ROS-Based Platform",
      "4K 3D Camera",
      "Water & Dustproof LiDAR Sensor",
      "Dual-Band WiFi",
    ],
    badge: "Best Seller - 10% Off",
    view360Link: "/assets/product_models/Arjuna.glb",

  },
  {
    id: 2,
    name: "Babroo",
    category: "Robotics Kits",
    price: 35000,
    image: "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/b2.png",
    galleryImages: [
      "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/b3.png",
      "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/b2.png",
      "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/b0.png",
    ],

    description:
      "Newrro Babroo is a smart robotics learning kit for students and educators featuring AI-powered control with obstacle detection, line following, and voice commands.",
    features: [
      "Plug-and-Play Setup",
      "Smart Robot Controller",
      "WiFi & Bluetooth Control",
      "Obstacle Avoidance & Line Following",
      "Voice & Color Recognition",
    ],
    badge: "New Arrival - 10% Off",
    view360Link: "/assets/product_models/Babru.glb",
    // If needed, add rotationOffset: [x, y, z] e.g. [0, Math.PI/2, 0]
    rotationOffset: [0, 4.2, 0],
  },
  {
    id: 3,
    name: "Kush",
    category: "Educational Robotics",
    price: 15000,
    image: "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/k1.png",
    galleryImages: [
      "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/k2.png",
      "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/k3.png",
      "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/k4.png",
    ],
    
    description:
      "Newrro Kush is a beginner-friendly robotics kit for kids and students. It offers obstacle avoidance, line following, an interactive display, and an easy-to-use programming library.",
    features: [
      "Beginner-Friendly Design",
      "Preloaded Robotics Library",
      "WiFi & Bluetooth Control",
      "Obstacle Avoidance & Line Following",
      "Custom PCB for Expansion",
    ],
    badge: "Top Rated",
    view360Link: "/assets/product_models/KH-1.glb",
    rotationOffset: [0, 0, 0], // Adjust this offset based on your model
  },
  {
    id: 4,
    name: "JT-2",
    category: "Autonomous Robots",
    price: 28000,
    image: "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/nrc0.png",
    galleryImages: [
      "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/nrc1.png",
      "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/nrc2.png",
      "https://raw.githubusercontent.com/ayushanand2003/Newrro-production-build/refs/heads/main/public/assets/product/nrc3.png",
    ],
    description:
      "Newrro JT-2 is a ROS 2-based autonomous mobile robot for research and learning. It features voice & WiFi control, smart motor controllers, and modular expandability.",
    features: [
      "ROS 2 Optimized",
      "Multi-Goal Navigation",
      "Voice & Wireless Operation",
      "Real-Time Monitoring",
      "Modular Expandability",
    ],
    badge: "Limited Edition - 10% Off",
    view360Link: "/assets/product_models/nrc_mini.glb",
    rotationOffset: [0, Math.PI, 0], // Default offset; adjust as needed
  },
  {
    id: 5,
    name: "Robotics Learning Kit (ESP32)",
    category: "Educational Robotics",
    price: 7000,
    image: "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/product/br3.png?raw=true",
    galleryImages: [
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/product/br1.png?raw=true",
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/product/br2.png?raw=true",
      "https://github.com/ayushanand2003/Newrro-production-build/blob/main/public/assets/product/br0.png?raw=true",
    ],
    description:
      "Newrro Robotics Learning Kit powered by an advanced ESP32 robot controller. It offers wireless connectivity, a modular design, and AI-powered features for STEM education.",
    features: [
      "ESP32 Controller",
      "WiFi & Bluetooth Connectivity",
      "Motor Driver with 1.2A",
      "Built-in Safety Fuse",
      "Modular & Expandable Design",
    ],
    view360Link: "/assets/product_models/BRC.glb",
    rotationOffset: [0, Math.PI, 0],
    badge: "Top Rated - 10% Off",

  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const query = value.toLowerCase();
    const filtered = initialProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FiltersSearchSection
        onSearchChange={handleSearchChange}
        onFilter={() => console.log("Filter clicked")}
        onSort={() => console.log("Sort clicked")}
      />
      <div className="container mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  className="rounded-lg overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="h-56 bg-gray-200 animate-pulse" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded w-full mt-6 animate-pulse" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProductGrid products={filteredProducts} />
              {filteredProducts.length === 0 && (
                <motion.div className="text-center py-16" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <h3 className="text-2xl font-semibold mb-2">No products found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters to find what you&apos;re looking for.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="py-12">
        <BenefitsSection />
      </div>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
