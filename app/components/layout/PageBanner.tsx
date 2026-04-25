"use client";

import { motion } from "framer-motion";

interface PageBannerProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageBanner({ title, description, children }: PageBannerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative px-6 sm:px-8 lg:px-16 xl:px-[5.5rem] py-12 sm:py-16 text-center"
    >
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl font-bold text-white md:text-5xl lg:text-6xl tracking-tight"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed font-medium"
        >
          {description}
        </motion.p>
      )}
      {children && <div className="mt-8 flex justify-center">{children}</div>}
    </motion.section>
  );
}
