"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductDetailModal } from "./product-detail-modal";
import { ShoppingCart, Heart, Eye } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  badge?: string;
  view360Link?: string;
  rotationOffset?: [number, number, number];
}

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={container} initial="hidden" animate="show">
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={item}
            className="group"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Card
              className="overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
              onClick={() => setSelectedProduct(product)}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.button
                      className="bg-white p-2 rounded-full"
                      whileHover={{ scale: 1.1, backgroundColor: "#df5bd3", color: "white" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                    >
                      <Eye className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      className="bg-white p-2 rounded-full"
                      whileHover={{ scale: 1.1, backgroundColor: "#df5bd3", color: "white" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      className="bg-white p-2 rounded-full"
                      whileHover={{ scale: 1.1, backgroundColor: "#df5bd3", color: "white" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="h-5 w-5" />
                    </motion.button>
                  </motion.div>
                  {product.badge && <Badge className="absolute top-4 left-4 bg-primary">{product.badge}</Badge>}
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <CardTitle className="mb-2 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end">
                    {/* <span className="text-lg font-semibold">&#8377;{product.price.toFixed(2)}</span> */}
                    {/* {product.badge === "Best Seller" && <span className="text-xs text-green-600">13% off</span>} */}
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                <div className="flex flex-wrap gap-2">
                  {product.features.slice(0, 2).map((feature) => (
                    <Badge key={feature} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {feature}
                    </Badge>
                  ))}
                  {product.features.length > 2 && (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      +{product.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button
                  className="w-full bg-white text-primary hover:bg-primary hover:text-white border border-primary transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
