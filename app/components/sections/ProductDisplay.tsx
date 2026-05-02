"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDisplay() {
  const products = [
    {
      id: 1,
      title: "24K Gold Coin (10g)",
      description: "Pure 24K hallmark certified gold coin.",
      price: "₹65,000",
      originalPrice: "₹68,000",
      
      images: [
        "/images/product-placeholder.png",
        "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1574007559190-bc4205513ab4?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1588820463371-2cb2d0752b04?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1605330368146-51d26cf3dc43?w=500&auto=format&fit=crop&q=60",
      ],
    },
    {
      id: 2,
      title: "Gold Bar (50g)",
      description: "Investment grade 99.99% pure gold bar.",
      price: "₹3,25,000",
      originalPrice: "₹3,30,000",
      
      images: [
        "/images/product-placeholder.png",
        "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1605330368146-51d26cf3dc43?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1574007559190-bc4205513ab4?w=500&auto=format&fit=crop&q=60",
      ],
    },
    {
      id: 3,
      title: "Gold Chain (22K)",
      description: "Elegant daily wear chain for men and women.",
      price: "₹45,000",
      originalPrice: "₹50,000",
      
      images: [
        "/images/product-placeholder.png",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1599643478524-fb9651927a95?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=60",
      ],
    },
    {
      id: 4,
      title: "Diamond Ring",
      description: "18K Gold ring with VVS diamond clarity.",
      price: "₹85,000",
      originalPrice: "₹95,000",
     
      images: [
        "/images/product-placeholder.png",
        "https://images.unsplash.com/photo-1605100804763-247f67b2548e?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1599643478524-fb9651927a95?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=500&auto=format&fit=crop&q=60",
      ],
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: any; index: number }) {
  const [activeImage, setActiveImage] = useState(0);
  const images = product.images;

  useEffect(() => {
    // Offset the start time based on index so they don't change at the same moment
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setActiveImage((prev) => (prev + 1) % images.length);
      }, 2500); // Consistent speed for all cards
    }, index * 800); // 800ms offset between each card's start

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [images.length, index]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/images/product-placeholder.png";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100 group">
        <AnimatePresence>
          <motion.img 
            key={activeImage}
            src={product.images[activeImage]} 
            alt={product.title}
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
      
      {/* 4 Thumbnails */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {product.images.slice(1, 5).map((img: string, idx: number) => (
          <div 
            key={idx} 
            onClick={() => setActiveImage(idx + 1)}
            className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === idx + 1 ? 'border-[#D4AF37]' : 'border-transparent hover:border-gray-300'}`}
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

      <div className="flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto mb-4 flex items-end gap-2">
          <span className="text-xl font-extrabold text-[#D4AF37]">{product.price}</span>
          <span className="text-sm text-gray-400 line-through mb-1">{product.originalPrice}</span>
        </div>

        {/* Buttons in one row */}
       
      </div>
    </motion.div>
  );
}
