"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import LivePrice from "../livePrice";
import { navLinks } from "../helper/CommonVariable";
import { useState } from "react";

interface StickyHeaderProps {
  isVisible: boolean;
}

export default function StickyHeader({ isVisible }: StickyHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isVisible) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-[5.5rem] py-3 sm:py-4 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
      >
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/assets/kassmic_logo.png"
            alt="Kaasmic Logo"
            width={32}
            height={32}
            className="shrink-0 sm:w-10 sm:h-10"
          />
          <span className="text-base sm:text-lg font-bold text-[#0C173D] tracking-tight">
            Kaasmic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks?.map(({ label, href }) => (
            <Link
              key={label}
              className="text-sm font-medium text-gray-700 hover:text-[#D4AF37] transition-colors"
              href={label === "Pricing" ? "/#pricing" : href}
            >
              {label}
            </Link>
          ))}

          <LivePrice type="sticky" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-[#0C173D] p-2"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </motion.header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[64px] sm:top-[72px] left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg"
        >
          <nav className="flex flex-col px-4 py-4 space-y-3">
            {navLinks?.map(({ label, href }) => (
              <Link
                key={label}
                className="text-sm font-medium text-gray-700 hover:text-[#D4AF37] transition-colors py-2"
                href={label === "Pricing" ? "/#pricing" : href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-200">
              <LivePrice type="sticky" />
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}