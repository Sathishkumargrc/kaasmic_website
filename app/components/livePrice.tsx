"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMetalPrices } from "@/app/context/MetalPricesProvider";

interface LivePriceProps {
  type?: "sticky" | "hero" | "drawer" | "mobile";
}

export default function LivePrice(props: LivePriceProps) {
  const { type = "hero" } = props;
  const isSticky = type === "sticky";
  const isDrawer = type === "drawer";
  const isMobile = type === "mobile";

  const { prices } = useMetalPrices();

  const labelColor = isSticky
    ? "text-black/70"
    : isDrawer
      ? "text-white/60"
      : "text-white/70";

  const goldText = isSticky ? "text-[#B8962E]" : "text-[#D4AF37]";
  const silverText = isSticky ? "text-gray-700" : "text-gray-300";

  // Mobile mode — Premium compact card
  if (isMobile) {
    return (
      <div className="flex items-center gap-2 sm:gap-3 bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-1 sm:p-1.5 border border-white/10 shadow-lg transition-all duration-300">
        {/* Gold */}
        <div className="flex items-center gap-2 sm:gap-2.5 bg-[#D4AF37]/10 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 border border-[#D4AF37]/20">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
          <div className="flex flex-col leading-none">
            <span className="text-[8px] sm:text-[9px] text-[#D4AF37] font-bold uppercase tracking-tighter sm:tracking-wider mb-0.5">Gold</span>
            <span className="text-[11px] sm:text-[13px] font-black text-white">
              {prices?.gold?.buyPrice ? `₹${prices.gold.buyPrice}` : "---"}
            </span>
          </div>
        </div>

        {/* Silver */}
        <div className="flex items-center gap-2 sm:gap-2.5 bg-white/5 rounded-lg sm:rounded-xl px-2 sm:px-3 py-1 sm:py-1.5 border border-white/10">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-300 animate-pulse shrink-0" />
          <div className="flex flex-col leading-none">
            <span className="text-[8px] sm:text-[9px] text-gray-400 font-bold uppercase tracking-tighter sm:tracking-wider mb-0.5">Silver</span>
            <span className="text-[11px] sm:text-[13px] font-black text-white">
              {prices?.silver?.buyPrice ? `₹${prices.silver.buyPrice}` : "---"}
            </span>
          </div>
        </div>
        
        {/* Timer */}
       
      </div>
    );
  }

  // Drawer mode - full width card layout
  if (isDrawer) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full"
      >
        <div className="flex flex-col gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <div className="text-[10px] font-bold text-white/50 tracking-[0.2em] uppercase">
                Live Market Rates
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Gold Rate Card */}
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider">Gold/gm</span>
              <span className="text-xl font-black text-white">
                {prices?.gold?.buyPrice ? `₹${prices.gold.buyPrice}` : "---"}
              </span>
            </div>

            {/* Silver Rate Card */}
            <div className="flex flex-col gap-1 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Silver/gm</span>
              <span className="text-xl font-black text-white">
                {prices?.silver?.buyPrice ? `₹${prices.silver.buyPrice}` : "---"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop/Sticky — Premium Glassmorphism Card
  return (
    <div className="flex items-center gap-3">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className={`flex items-center gap-2 p-1.5 rounded-2xl backdrop-blur-md shadow-2xl border ${
          isSticky 
            ? "bg-white/80 border-gray-200 shadow-gray-200/50" 
            : "bg-white/5 border-white/10"
        }`}
      >
        {/* Gold Card */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
          isSticky 
            ? "bg-[#D4AF37]/10 border border-[#D4AF37]/20" 
            : "bg-gradient-to-br from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
        }`}>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isSticky ? "text-[#B8962E]" : "text-[#D4AF37]"}`}>
                Gold/gm
              </span>
            </div>
            <span className={`text-lg lg:text-xl font-black leading-tight ${isSticky ? "text-[#0C173D]" : "text-white"}`}>
              {prices?.gold?.buyPrice ? `₹${prices.gold.buyPrice}` : "---"}
            </span>
          </div>
        </div>

        {/* Silver Card */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
          isSticky 
            ? "bg-gray-100 border border-gray-200" 
            : "bg-white/5 border-white/10"
        }`}>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isSticky ? "text-gray-500" : "text-gray-400"}`}>
                Silver/gm
              </span>
            </div>
            <span className={`text-lg lg:text-xl font-black leading-tight ${isSticky ? "text-[#0C173D]" : "text-white"}`}>
              {prices?.silver?.buyPrice ? `₹${prices.silver.buyPrice}` : "---"}
            </span>
          </div>
        </div>

        {/* Timer Card */}
       
      </motion.div>
    </div>
  );
}