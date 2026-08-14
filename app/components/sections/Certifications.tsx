"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const certifications = [
  {
    title: "BIS Hallmarked",
    description: "Every gram of gold is certified by the Bureau of Indian Standards for guaranteed purity.",
    image: "/assets/bis.png"
  },
  {
    title: "99.9% Purity",
    description: "We provide only 24K pure gold, tested and certified by international laboratories.",
    image: "/assets/purity_100.png"
  },
  // {
  //   title: "NABL Certified",
  //   description: "Our gold is verified by NABL accredited labs to ensure the highest quality standards.",
  //   image: "/assets/hallmark.png"
  // },
  // {
  //   title: "100% Insured",
  //   description: "Your gold is stored in secure, insured vaults with 100% protection against any risk.",
  //   image: "/assets/guarantee.png"
  // },
   {
    title: "Live MCX Pricing",
    description: "We offer real-time, transparent pricing directly synced with MCX live rates.",
    image: "/assets/mcx_pricing.png"
  }
];

// Duplicate certifications for seamless infinite scroll
const duplicatedCertifications = [...certifications, ...certifications, ...certifications];

export default function Certifications() {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (!isHovered) {
        scrollPositionRef.current += 0.8; // Scroll speed
        
        // Reset to start when reaching the end of first set
        if (scrollPositionRef.current >= scrollContainer.scrollWidth / 3) {
          scrollPositionRef.current = 0;
        }
        
        scrollContainer.scrollLeft = scrollPositionRef.current;
      }
      
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isHovered]);

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0C173D] mb-4">
            Our <span className="text-[#D4AF37]">Certifications</span> & Trust
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Your trust is our priority. We adhere to the strictest quality and security standards in the industry.
          </p>
        </motion.div>

        {/* Continuous Scroll Container */}
        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide py-2 sm:py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          <div className="flex gap-6 sm:gap-8">
            {duplicatedCertifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.02 }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100 hover:shadow-xl transition-all duration-300 flex-shrink-0 w-[260px] sm:w-[280px]"
              >
                <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-white rounded-full shadow-inner p-4">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-[#0C173D] mb-3">{cert.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
