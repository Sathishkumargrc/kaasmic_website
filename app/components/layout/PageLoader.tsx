"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoIcon from "../assets/LogoIcon";
import Image from "next/image";

const LOADER_DURATION_MS = 1000; 

interface PageLoaderProps {
  onComplete?: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, LOADER_DURATION_MS);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="relative w-[100px] h-[100px]"
          >
            {/* Static inset shadow */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_2px_rgba(0,0,0,0.3)]" />

            {/* Rotating arc with custom animation */}
            <div 
              className="absolute inset-0 rounded-full shadow-[inset_0_2px_0_#D4AF37] animate-spin"
              style={{
                animation: 'spin 1s linear infinite'
              }}
            />

            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image src="/assets/kassmic_logo.png" alt="Kaasmic Logo" width={40} height={40} className="shrink-0" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}