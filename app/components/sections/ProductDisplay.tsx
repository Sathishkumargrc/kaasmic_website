"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useGetJewelleryDesignsQuery, JewelleryDesign } from "@/app/redux/features/api/jewelleryApi";
import { useMetalPrices } from "@/app/context/MetalPricesProvider";

export default function ProductDisplay() {
  const { data: jewelleryResponse, isLoading } = useGetJewelleryDesignsQuery();
  const { prices } = useMetalPrices();

  const goldRate = prices?.gold?.buyPrice ?? 7200;
  const silverRate = prices?.silver?.buyPrice ?? 90;

  const products = jewelleryResponse?.data?.designs ?? [];

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-[#D4AF37]">Products</span>
            </h2>
            <div className="h-4 bg-gray-200 rounded max-w-sm mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse h-96 flex flex-col justify-between">
                <div className="w-full aspect-square rounded-xl bg-gray-200" />
                <div className="h-6 bg-gray-200 rounded mt-4" />
                <div className="h-4 bg-gray-200 rounded mt-2 w-2/3" />
                <div className="h-8 bg-gray-200 rounded mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Featured <span className="text-[#D4AF37]">Products</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Explore our curated collection of premium gold and jewelry products.
          </motion.p>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            No jewellery designs available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                goldRate={goldRate}
                silverRate={silverRate}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ 
  product, 
  index,
  goldRate,
  silverRate
}: { 
  product: JewelleryDesign; 
  index: number;
  goldRate: number;
  silverRate: number;
}) {
  const [activeImage, setActiveImage] = useState(0);

  const images = product.images && product.images.length > 0
    ? product.images.map((img) => img.url)
    : ["/images/product-placeholder.png"];

  useEffect(() => {
    if (images.length <= 1) return;
    
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % images.length);
      }, 2500);
    }, index * 800);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [images.length, index]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/images/product-placeholder.png";
  };

  // Real-time jewelry price calculations
  const weight = parseFloat(product.weight);
  const metalRate = product.metal_type === "GOLD" ? goldRate : silverRate;
  const metalCost = weight * metalRate;
  
  let makingCharge = 0;
  const makingChargeVal = parseFloat(product.making_charge_value);
  if (product.making_charge_type === "FIXED") {
    makingCharge = makingChargeVal;
  } else {
    makingCharge = metalCost * (makingChargeVal / 100);
  }
  
  const basePrice = metalCost + makingCharge;
  const gst = basePrice * (parseFloat(product.gst_percentage) / 100);
  
  const finalPriceVal = Math.round(basePrice + gst);
  const originalPriceVal = Math.round(finalPriceVal * 1.05); // crossed out original price with a markup

  const price = `₹${finalPriceVal.toLocaleString("en-IN")}`;
  const originalPrice = `₹${originalPriceVal.toLocaleString("en-IN")}`;
  const description = product.description || `${product.purity} ${product.metal_type} ${product.category?.name || "Design"}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100 group">
        <AnimatePresence mode="wait">
          <motion.img 
            key={activeImage}
            src={images[activeImage]} 
            alt={product.name}
            initial={{ opacity: 0, scale: 1.1, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ 
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1] 
            }}
            onError={handleImageError}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      
      {/* Dynamic Thumbnails (Maximum 4 thumbnails) */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {images.slice(0, 4).map((img: string, idx: number) => (
            <div 
              key={idx} 
              onClick={() => setActiveImage(idx)}
              className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === idx ? 'border-[#D4AF37]' : 'border-transparent hover:border-gray-300'}`}
            >
              <img 
                src={img} 
                alt="Thumbnail" 
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="mt-auto mb-4 flex items-end gap-2">
          <span className="text-xl font-extrabold text-[#D4AF37]">{price}</span>
          <span className="text-sm text-gray-400 line-through mb-1">{originalPrice}</span>
        </div>

        <Link href="/checkout" className="w-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-[#D4AF37] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#D4AF37]/20 hover:bg-[#B8962E] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Buy Now</span>
            <svg 
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

