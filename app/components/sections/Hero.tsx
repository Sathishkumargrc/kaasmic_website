"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import LivePrice from "../livePrice";
import { navLinks } from "../helper/CommonVariable";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

function generateParticles() {
  return [...Array(24)].map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 2 + Math.random() * 2,
  }));
}

export default function HeroWithHeader() {
  const particles = useMemo(() => generateParticles(), []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 50;
    const moveY = (clientY - window.innerHeight / 2) / 50;
    setMousePosition({ x: moveX, y: moveY });
  };

  const scrollToAppDownload = () => {
    const section = document.getElementById("appdownload");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0C173D] via-[#1A2664] to-[#0C173D]"
    >
      {/* Header Navigation - Integrated with Hero */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-[5.5rem] py-4 sm:py-5 lg:py-6"
      >
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/assets/kassmic_logo.png"
            alt="Kaasmic Logo"
            width={32}
            height={32}
            className="shrink-0 sm:w-10 sm:h-10"
          />
          <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Kaasmic
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
          {navLinks?.map(({ label, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link
                className="text-sm xl:text-[15px] font-medium text-white hover:text-[#D4AF37] transition-colors"
                href={label === "Pricing" ? "/#pricing" : href}
              >
                {label}
              </Link>
            </motion.div>
          ))}
          <LivePrice />
        </nav>

        {/* Mobile right side: price pill + hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <LivePrice type="mobile" />
          <button
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} direction="right">
        <DrawerContent className="h-full w-[300px] sm:w-[350px] fixed bottom-0 right-0 bg-gradient-to-br from-[#0C173D] via-[#1A2664] to-[#0C173D] border-l border-white/10">
          <DrawerHeader className="border-b border-white/10">
            <div className="flex items-center justify-between">
              <DrawerTitle className="flex items-center gap-3">
                <Image
                  src="/assets/kassmic_logo.png"
                  alt="Kaasmic Logo"
                  width={32}
                  height={32}
                  className="shrink-0"
                />
                <span className="text-lg font-bold text-white tracking-tight">
                  Kaasmic
                </span>
              </DrawerTitle>
              <DrawerClose className="text-white/70 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <nav className="flex flex-col p-6 space-y-1">
            {navLinks?.map(({ label, href }) => (
              <Link
                key={label}
                className="text-base font-medium text-white hover:text-[#D4AF37] hover:bg-white/5 transition-colors py-3 px-4 rounded-lg"
                href={label === "Pricing" ? "/#pricing" : href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            {/* Full detail rates in drawer */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <LivePrice type="drawer" />
            </div>
          </nav>
        </DrawerContent>
      </Drawer>

      {/* Hero Content */}
      <div className="relative min-h-screen px-4 sm:px-8 lg:px-16 xl:px-[5.5rem] pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
        {/* Fixed layer: background parallax shape */}
        <div className="pointer-events-none absolute top-0 right-0 z-0 w-full h-full">
          <motion.div
            animate={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
            transition={{ type: "spring", damping: 20, stiffness: 50 }}
            className="absolute top-0 right-0 w-full h-full opacity-20"
          >
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-white/10 to-transparent blur-3xl"></div>
          </motion.div>
        </div>

        {/* Subtle particles */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {particles?.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{ left: `${particle?.left}%`, top: `${particle.top}%` }}
              animate={{ 
                opacity: [0.2, 0.6, 0.2],
                x: mousePosition.x * (i % 3 + 1),
                y: mousePosition.y * (i % 3 + 1)
              }}
              transition={{ 
                opacity: { duration: particle?.duration, repeat: Infinity },
                x: { type: "spring", damping: 30, stiffness: 50 },
                y: { type: "spring", damping: 30, stiffness: 50 }
              }}
            />
          ))}
        </div>

        {/* Left content */}
        <div 
          className="relative z-10 text-center lg:text-left"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <motion.h1
            animate={{ 
              x: mousePosition.x * 0.5,
              translateY: mousePosition.y * 0.5
            }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] leading-[1.15] font-bold text-white tracking-tight"
          >
            Invest in  <span className="text-[#D4AF37]">Gold & Silver</span>
            <br />
            with Ease
          </motion.h1>

          <motion.p
            animate={{ 
              x: mousePosition.x * 0.3,
              translateY: mousePosition.y * 0.3
            }}
            transition={{ delay: 0.1 }}
            className="mt-4 sm:mt-5 lg:mt-6 text-base sm:text-lg text-white/90 leading-relaxed max-w-[28rem] mx-auto lg:mx-0"
          >
            Grow your wealth by investing in 24K gold & silver securely, starting
            with just <span className="font-bold text-white">₹100</span>.
          </motion.p>

          <motion.div
            animate={{ 
              x: mousePosition.x * 0.2,
              translateY: mousePosition.y * 0.2
            }}
            transition={{ delay: 0.2 }}
            className="mt-6 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-[#D4AF37] px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-[#0C173D] shadow-lg cursor-pointer"
              onClick={scrollToAppDownload}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>

        {/* Right: phone + gold images */}
        <div
          className="relative z-10 h-[350px] sm:h-[420px] lg:h-[520px] flex justify-center items-center order-first lg:order-last"
          data-aos="fade-left"
          data-aos-duration="1200"
          data-aos-delay="400"
        >
          <div className="relative w-full h-full flex justify-center items-center">
            <motion.div
              animate={{ 
                x: mousePosition.x * -2,
                y: mousePosition.y * -2
              }}
              className="absolute w-[280px] sm:w-[350px] lg:w-[420px] h-[280px] sm:h-[350px] lg:h-[420px] rounded-full bg-[#D4AF37]/20 blur-[80px] lg:blur-[100px]"
            />
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-[250px] sm:w-[320px] lg:w-[380px] h-[250px] sm:h-[320px] lg:h-[380px] rounded-full bg-[#D4AF37]/15 blur-2xl lg:blur-3xl"
            />

            <div className="absolute w-48 sm:w-64 lg:w-80 left-[50%] sm:left-[55%] top-[50%]">
              <motion.div 
                animate={{ 
                  y: [0, -15, 0], 
                  x: mousePosition.x * 2,
                  translateY: mousePosition.y * 2
                }} 
                transition={{ 
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <Image src="/assets/gold_coin.png" alt="" width={300} height={256} className="w-full h-auto drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
              </motion.div>
            </div>

            <div className="relative z-10">
              <motion.div 
                animate={{ 
                  y: [0, 15, 0], 
                  x: mousePosition.x * 3,
                  translateY: mousePosition.y * 3
                }} 
                transition={{ 
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <Image
                  src="/assets/iPhone_15.png"
                  alt="GoldInvest app"
                  width={550}
                  height={520}
                  className="object-contain w-[300px] sm:w-[400px] lg:w-[550px] h-auto drop-shadow-2xl blur-[10px] lg:blur-[30px]"
                  title="🚀 Mobile app launching soon"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
