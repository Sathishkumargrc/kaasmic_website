"use client";

import { motion } from "framer-motion";
import LogoIcon from "../assets/LogoIcon";

const navLinks = ["Home", "Features", "Pricing", "About"];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 flex items-center justify-between px-[5.5rem] py-6 bg-transparent"
    >
      <a href="#" className="flex items-center gap-3">
        <LogoIcon className="w-10 h-10 shrink-0" />
        <span className="text-xl font-bold text-white tracking-tight">
          Kaasmic
        </span>
      </a>

      <nav className="flex items-center gap-10">
        {navLinks.map((label, i) => (
          <motion.a
            key={label}
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="text-[15px] font-medium text-white hover:text-[#D4AF37] transition-colors"
          >
            {label}
          </motion.a>
        ))}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-lg border-2 border-[#D4AF37] bg-transparent px-6 py-2.5 text-[15px] font-medium text-white hover:bg-[#D4AF37]/10 transition-colors"
        >
          Login
        </motion.button>
      </nav>
    </motion.header>
  );
}
