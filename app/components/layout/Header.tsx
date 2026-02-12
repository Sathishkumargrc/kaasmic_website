"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import LogoIcon from "../assets/LogoIcon";
import Image from "next/image";
import LivePrice from "../livePrice";
import { navLinks } from "../helper/CommonVariable";

const SCROLL_THRESHOLD = 60;

/** Height used for #sticky-placeholder when header is fixed. Export so parent can match. */
export const HEADER_HEIGHT_PX = 88;

interface HeaderProps {
  isScrolled?: boolean;
  /** Use fixed position when scrolled (like indiagoldratesapi); requires parent to render #sticky-placeholder with same height */
  fixedWhenScrolled?: boolean;
}

export default function Header({
  isScrolled: isScrolledProp,
  fixedWhenScrolled = false,
}: HeaderProps) {
  const [internalScrolled, setInternalScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () =>
      setInternalScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const isScrolled = isScrolledProp ?? internalScrolled;

  const positionClass = fixedWhenScrolled
    ? isScrolled
      ? "fixed top-0 left-0 right-0"
      : "relative"
    : "sticky top-0";

  return (
    <motion.header
      initial={!isScrolled ? { y: -24, opacity: 0 } : false}
      animate={!isScrolled ? { y: 0, opacity: 1 } : false}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`z-50 flex items-center justify-between px-[5.5rem] py-6 transition-all duration-300 ${positionClass} ${
        isScrolled
          ? "bg-[#0C173D]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center gap-3">
        {/* <LogoIcon className="w-10 h-10 shrink-0" /> */}
        <Image
          src="/assets/kassmic_logo.png"
          alt="Kaasmic Logo"
          width={40}
          height={40}
          className="shrink-0"
        />
        <span className="text-xl font-bold text-white tracking-tight">
          Kaasmic
        </span>
      </Link>

      <nav className="flex items-center gap-8">
        {navLinks?.map(({ label, href }) => (
          <Link
            key={label}
            className="text-sm font-medium text-white-700 hover:text-[#D4AF37] transition-colors"
            href={label === "Pricing" ? "/#pricing" : href}
          >
            {label}
          </Link>
        ))}

        <LivePrice />
      </nav>
    </motion.header>
  );
}
