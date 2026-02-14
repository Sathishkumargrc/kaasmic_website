"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LivePriceProps {
  type?: "sticky" | "hero" | "drawer";
}

export default function LivePrice(props: LivePriceProps) {
  const { type = "hero" } = props;
  const isSticky = type === "sticky";
  const isDrawer = type === "drawer";
  
  const labelColor = isSticky 
    ? "text-black/70" 
    : isDrawer 
    ? "text-white/60" 
    : "text-white/70";
    
  const borderColor = isSticky 
    ? "border-black/20" 
    : "border-white/20";
    
  const goldText = isSticky 
    ? "text-[#B8962E]" 
    : "text-[#D4AF37]";
    
  const silverText = isSticky 
    ? "text-gray-700" 
    : "text-gray-300";

  const [goldRate, setGoldRate] = useState(16012.5);
  const [silverRate, setSilverRate] = useState(276.3);
  const [goldChange, setGoldChange] = useState(2.3);
  const [silverChange, setSilverChange] = useState(-1.2);

  // Simulate live rate updates (replace with real API)
  useEffect(() => {
    const interval = setInterval(() => {
      setGoldRate((prev) => prev + (Math.random() - 0.5) * 10);
      setSilverRate((prev) => prev + (Math.random() - 0.5) * 0.5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Drawer mode - full width card layout
  if (isDrawer) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full"
      >
        <div className="flex flex-col gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="text-[10px] font-semibold text-white/50 tracking-wider uppercase">
            Live Rates
          </div>

          {/* Gold Rate */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
              <span className="text-xs font-medium text-white/70">Gold/gm</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#D4AF37]">
                ₹{goldRate.toFixed(2)}
              </span>
              <span
                className={`text-[10px] font-semibold ${goldChange >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {goldChange >= 0 ? "↑" : "↓"} {Math.abs(goldChange)}%
              </span>
            </div>
          </div>

          {/* Silver Rate */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
              <span className="text-xs font-medium text-white/70">Silver/gm</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-300">
                ₹{silverRate.toFixed(2)}
              </span>
              <span
                className={`text-[10px] font-semibold ${silverChange >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {silverChange >= 0 ? "↑" : "↓"} {Math.abs(silverChange)}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default mode - horizontal layout (hero/sticky)
  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 sm:ml-3 lg:ml-4 sm:pl-3 lg:pl-6 sm:border-l border-white/20"
      >
        {/* Gold Rate */}
        <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span
              className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${labelColor}`}
            >
              Gold/gm
            </span>
          </div>
          <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5">
            <span className={`text-sm sm:text-base lg:text-[17px] font-bold ${goldText}`}>
              ₹{goldRate.toFixed(2)}
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-semibold ${goldChange >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {goldChange >= 0 ? "↑" : "↓"} {Math.abs(goldChange)}%
            </span>
          </div>
        </div>

        {/* Silver Rate */}
        <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-300 animate-pulse"></div>
            <span
              className={`text-[10px] sm:text-[11px] font-medium tracking-wide ${labelColor}`}
            >
              Silver/gm
            </span>
          </div>
          <div className="flex items-baseline gap-1 sm:gap-1.5 mt-0.5">
            <span className={`text-sm sm:text-base lg:text-[17px] font-bold ${silverText}`}>
              ₹{silverRate.toFixed(2)}
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-semibold ${silverChange >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {silverChange >= 0 ? "↑" : "↓"} {Math.abs(silverChange)}%
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}