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
      className="relative px-[5.5rem] py-16 text-center"
    >
      <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 leading-relaxed">
          {description}
        </p>
      )}
      {children && <div className="mt-8 flex justify-center">{children}</div>}
    </motion.section>
  );
}
