"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* Original Testimonials Data (Commented out)
const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    image: "👩‍💼",
    rating: 5,
    text: "Kaasmic made gold investment so simple! I started with just ₹500 and now I regularly invest every month. The app is super easy to use and I love that I can track live prices.",
    investment: "₹45,000"
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore, Karnataka",
    image: "👨‍💼",
    rating: 5,
    text: "Best platform for digital gold! I sold some gold during a family emergency and got the money in my account within 2 minutes. No hassle at all. Highly recommended!",
    investment: "₹1,25,000"
  },
  {
    name: "Anita Desai",
    location: "Pune, Maharashtra",
    image: "👩",
    rating: 5,
    text: "I gift digital gold to my children on every festival through Kaasmic. It's a perfect way to save for their future. The security and transparency give me complete peace of mind.",
    investment: "₹80,000"
  },
  {
    name: "Vikram Singh",
    location: "Delhi, NCR",
    image: "👨",
    rating: 5,
    text: "As a young professional, I wanted to start investing but didn't have much capital. Kaasmic allowed me to start with just ₹100. Now it's become a habit and my portfolio is growing!",
    investment: "₹32,000"
  },
  {
    name: "Lakshmi Iyer",
    location: "Chennai, Tamil Nadu",
    image: "👩‍🦳",
    rating: 5,
    text: "I converted my digital gold to physical gold coins for my daughter's wedding. The process was seamless and the coins arrived within 3 days. Wonderful experience!",
    investment: "₹2,50,000"
  },
  {
    name: "Arjun Patel",
    location: "Ahmedabad, Gujarat",
    image: "🧔",
    rating: 5,
    text: "The live price tracking and detailed analytics help me make informed decisions. I've seen consistent returns and the customer support team is always helpful. Great platform!",
    investment: "₹1,75,000"
  }
];
*/

// New Testimonials Data with 5 Image support
const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    image: "/assets/t1.png",
    rating: 5,
    text: "Kaasmic made gold investment so simple! I started with just ₹500 and now I regularly invest every month. The app is super easy to use and I love that I can track live prices.",
    investment: "₹45,000"
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore, Karnataka",
    image: "/assets/t2.png",
    rating: 5,
    text: "Best platform for digital gold! I sold some gold during a family emergency and got the money in my account within 2 minutes. No hassle at all. Highly recommended!",
    investment: "₹1,25,000"
  },
  {
    name: "Anita Desai",
    location: "Pune, Maharashtra",
    image: "/assets/t3.png",
    rating: 5,
    text: "I gift digital gold to my children on every festival through Kaasmic. It's a perfect way to save for their future. The security and transparency give me complete peace of mind.",
    investment: "₹80,000"
  },
  {
    name: "Vikram Singh",
    location: "Delhi, NCR",
    image: "/assets/t4.png",
    rating: 5,
    text: "As a young professional, I wanted to start investing but didn't have much capital. Kaasmic allowed me to start with just ₹100. Now it's become a habit and my portfolio is growing!",
    investment: "₹32,000"
  },
  {
    name: "Lakshmi Iyer",
    location: "Chennai, Tamil Nadu",
    image: "/assets/t5.png",
    rating: 5,
    text: "I converted my digital gold to physical gold coins for my daughter's wedding. The process was seamless and the coins arrived within 3 days. Wonderful experience!",
    investment: "₹2,50,000"
  }
];

// Duplicate testimonials for seamless infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export default function TestimonialsSection() {
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
    <>
      {/* <section className="relative py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0C173D] mb-3 sm:mb-4">
              What Our <span className="text-[#D4AF37]">Investors</span> Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Join thousands of satisfied investors who trust Kaasmic for their gold investments
            </p>
          </motion.div>

         
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
            
            <div className="flex gap-4 sm:gap-6 lg:gap-8">
              {duplicatedTestimonials?.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.02 }}
                  whileHover={{ y: -8 }}
                  className="flex-shrink-0 w-[280px] sm:w-[350px] lg:w-[400px]"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                  
                    <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors"></div>
                    
               
                    <div className="flex gap-1 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-[#D4AF37] text-lg sm:text-xl">★</span>
                      ))}
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 relative z-10">
                      &quot;{testimonial.text}&quot;
                    </p>

                    
                    <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#D4AF37] to-[#F5D78E] rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-md flex-shrink-0 overflow-hidden">
                        {testimonial.image.startsWith("/") ? (
                          <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{testimonial.image}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#0C173D] text-sm sm:text-base truncate">{testimonial.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{testimonial.location}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[10px] sm:text-xs text-gray-500">Invested</p>
                        <p className="text-xs sm:text-sm font-bold text-[#D4AF37] whitespace-nowrap">{testimonial.investment}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 sm:mt-12 lg:mt-16 bg-gradient-to-r from-[#0C173D] to-[#1A2664] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D4AF37] mb-1 sm:mb-2">10K+</div>
                <div className="text-xs sm:text-sm lg:text-base text-white/80">Happy Investors</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D4AF37] mb-1 sm:mb-2">₹5Cr+</div>
                <div className="text-xs sm:text-sm lg:text-base text-white/80">Gold Invested</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D4AF37] mb-1 sm:mb-2">4.8/5</div>
                <div className="text-xs sm:text-sm lg:text-base text-white/80">App Rating</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D4AF37] mb-1 sm:mb-2">99.9%</div>
                <div className="text-xs sm:text-sm lg:text-base text-white/80">Customer Satisfaction</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Old Implementation (Commented out)
      <section className="relative py-12 sm:py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0C173D] mb-3 sm:mb-4">
              What Our <span className="text-[#D4AF37]">Investors</span> Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Join thousands of satisfied investors who trust Kaasmic for their gold investments
            </p>
          </motion.div>

          <div 
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide py-2 sm:py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="grid grid-flow-col auto-cols-[calc(100%-2rem)] sm:auto-cols-[calc(50%-1rem)] lg:auto-cols-[calc(33.333%-1.33rem)] gap-4 sm:gap-6 lg:gap-8">
              {duplicatedTestimonials?.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="group w-full"
                >
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 h-full">
                    <div className="flex gap-1 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-[#D4AF37] text-lg sm:text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 relative z-10">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#D4AF37] to-[#F5D78E] rounded-full flex items-center justify-center text-2xl sm:text-3xl shadow-md flex-shrink-0">
                        {testimonial.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#0C173D] text-sm sm:text-base truncate">{testimonial.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      */}
    </>
  );
}