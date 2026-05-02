"use client";

import { motion } from "framer-motion";

const floatingKeywords = [
  "24x7 Access",
  "Certified",
  "Live Market",
  "Instant Payment",
  "Safe & Insured"
];

export default function WealthSection() {
  return (
    <section className="relative py-10 bg-[#0C173D] overflow-hidden">
      {/* Background Gradient to match Hero */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C173D] via-[#1A2664] to-[#0C173D] opacity-100 z-0" />
      
      {/* Background Glowing Chevron (similar to image) */}
      <div className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none">
        {/* Top Arc/Chevron - Styled to match brand blue/gold */}
        <motion.div 
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            filter: ["blur(80px)", "blur(100px)", "blur(80px)"]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 w-[120%] h-[120px] bg-white/5"
          style={{ 
            clipPath: "polygon(0% 100%, 50% 0%, 100% 100%, 100% 110%, 50% 10%, 0% 110%)",
            transform: "scale(1.5)"
          }}
        />
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%", 
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: ["0%", "-100%"],
                opacity: [0, 0.6, 0]
              }}
              transition={{ 
                duration: Math.random() * 10 + 15, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
              className="absolute w-[2px] h-[2px] bg-white/40 rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Floating Keywords */}
          <div className="relative mb-8 h-20">
            <motion.span
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-[10%] px-5 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white/80 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl"
            >
              24x7 Access
            </motion.span>
            
            <motion.span
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-4 right-[15%] px-5 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white/80 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl"
            >
              Certified
            </motion.span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
              Build Your Wealth with <br />
              <span className="text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">Precious Metals</span>
            </h2>
            <p className="text-white/80 text-xl md:text-3xl font-medium mb-12">
              Kaasmic makes Gold & Silver investing simple.
            </p>
          </motion.div>

          <div className="relative h-20 mb-12">
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-0 left-[20%] px-5 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white/80 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl"
            >
              Live Market
            </motion.span>
            
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-8 left-1/2 -translate-x-1/2 px-5 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white/80 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl"
            >
              Instant Payment
            </motion.span>

            <motion.span
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-2 right-[25%] px-5 py-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl text-white/80 text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl"
            >
              Safe & Insured
            </motion.span>
          </div>

      
          
        </div>
      </div>

      {/* Ambient Glows to match brand */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-full h-full bg-[#1A2664] blur-[150px] rounded-full pointer-events-none z-0"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[#D4AF37]/10 blur-[150px] rounded-full pointer-events-none z-0"
      />
    </section>
  );
}


