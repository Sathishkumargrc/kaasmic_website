"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LivePrice(props: { type?: "sticky" | "hero" }) {
  const { type = "hero" } = props;
  const isSticky = type === "sticky";
  const labelColor = isSticky ? "text-black/70" : "text-white/70";
  const borderColor = isSticky ? "border-black/20" : "border-white/20";
  const goldText = isSticky ? "text-[#B8962E]" : "text-[#D4AF37]";
  const silverText = isSticky ? "text-gray-700" : "text-gray-300";
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

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-6 ml-4 pl-6 border-l border-white/20"
      >
        {/* Gold Rate */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
            <span
              className={`text-[11px] font-medium tracking-wide ${labelColor}`}
            >
              Gold/gm
            </span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className={`text-[17px] font-bold ${goldText}`}>
              ₹{goldRate.toFixed(2)}
            </span>
            <span
              className={`text-[11px] font-semibold ${goldChange >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {goldChange >= 0 ? "↑" : "↓"} {Math.abs(goldChange)}%
            </span>
          </div>
        </div>

        {/* Silver Rate */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
            <span
              className={`text-[11px] font-medium tracking-wide ${labelColor}`}
            >
              Silver/gm
            </span>
          </div>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className={`text-[17px] font-bold ${silverText}`}>
              ₹{silverRate.toFixed(2)}
            </span>
            <span
              className={`text-[11px] font-semibold ${silverChange >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {silverChange >= 0 ? "↑" : "↓"} {Math.abs(silverChange)}%
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
