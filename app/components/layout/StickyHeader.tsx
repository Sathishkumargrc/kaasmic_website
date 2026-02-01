"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import LogoIcon from "../assets/LogoIcon";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

interface StickyHeaderProps {
  isVisible: boolean;
}

export default function StickyHeader({ isVisible }: StickyHeaderProps) {
  if (!isVisible) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5.5rem] py-4 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
    >
      <Link href="/" className="flex items-center gap-3">
        <LogoIcon className="w-8 h-8 shrink-0 text-[#0C173D]" />
        <span className="text-lg font-bold text-[#0C173D] tracking-tight">
          Kaasmic
        </span>
      </Link>

      <nav className="flex items-center gap-8">
        {navLinks.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="text-sm font-medium text-gray-700 hover:text-[#D4AF37] transition-colors"
          >
            {label}
          </Link>
        ))}
        <button
          className="rounded-lg bg-[#D4AF37] px-6 py-2 text-sm font-medium text-white hover:bg-[#D4AF37]/90 transition-colors"
        >
          Login
        </button>
      </nav>
    </motion.header>
  );
}