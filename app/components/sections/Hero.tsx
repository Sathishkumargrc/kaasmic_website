"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
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
import MotherboardBackground from "../NeuralNetworkBackground";


export default function HeroWithHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Spring animations for smoother mouse movement
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { damping: 25, stiffness: 150 });
  const springY = useSpring(0, { damping: 25, stiffness: 150 });

  useEffect(() => {
    springX.set(mousePos.x);
    springY.set(mousePos.y);
  }, [mousePos, springX, springY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 50;
    const y = (clientY - window.innerHeight / 2) / 50;
    setMousePos({ x, y });
  };

  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  const scrollToAppDownload = () => {
    const section = document.getElementById("appdownload");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#050A1F]"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1A2664_0%,#050A1F_100%)]" />
        <motion.div
          style={{ scale, filter: `blur(${blur}px)` }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D4AF37] blur-[120px] rounded-full mix-blend-screen animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1A2664] blur-[100px] rounded-full mix-blend-screen" />
        </motion.div>
      </div>

      <MotherboardBackground />

      {/* Header Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-12 lg:px-24 py-6"
      >
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/assets/kassmic_logo.png"
              alt="Kaasmic Logo"
              width={40}
              height={40}
              className="shrink-0 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            />
          </motion.div>
          <span className="text-xl font-bold text-white tracking-wider group-hover:text-[#D4AF37] transition-colors">
            KAASMIC
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-12">
          {navLinks?.map(({ label, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <Link
                className="text-sm font-semibold text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all relative group"
                href={label === "Pricing" ? "/#pricing" : href}
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
          <LivePrice />
        </nav>

        <div className="lg:hidden flex items-center gap-4">
          <LivePrice type="mobile" />
          <button
            className="text-white p-2 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} direction="right">
        <DrawerContent className="h-full w-[300px] bg-[#050A1F] border-l border-white/10">
          <DrawerHeader className="border-b border-white/5 pb-6">
            <div className="flex items-center justify-between">
              <DrawerTitle className="flex items-center gap-3 text-white">
                <Image src="/assets/kassmic_logo.png" alt="Logo" width={32} height={32} />
                KAASMIC
              </DrawerTitle>
              <DrawerClose className="text-white/50 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <nav className="flex flex-col p-8 space-y-6">
            {navLinks?.map(({ label, href }) => (
              <Link
                key={label}
                className="text-lg font-medium text-white/80 hover:text-[#D4AF37] transition-colors"
                href={label === "Pricing" ? "/#pricing" : href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-8 mt-8 border-t border-white/5">
              <LivePrice type="drawer" />
            </div>
          </nav>
        </DrawerContent>
      </Drawer>

      {/* Hero Main Content */}
      <div className="relative min-h-screen container mx-auto px-6 lg:px-24 flex flex-col lg:grid lg:grid-cols-2 items-center gap-16 pt-32 pb-20 z-10">
        {/* Left Section */}
        <motion.div
          style={{ y: textY, opacity }}
          className="text-center lg:text-left space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm font-bold tracking-widest uppercase"
            >
              Secure Wealth Management
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-[4.2rem] font-extrabold text-white leading-[1.15] md:leading-[1.2] tracking-normal"
            >
              Invest in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5D78E] to-[#D4AF37] animate-gradient-x">
                Gold & Silver With Ease
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-white/70 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Grow your wealth by investing in 24K , 22K gold & silver securely, starting with just <span className="text-white font-semibold">₹100</span>.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(212,175,55,0.3)",
                translateY: -2
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-[#050A1F] rounded-xl font-bold text-base shadow-2xl transition-all cursor-pointer"
              onClick={scrollToAppDownload}
            >
              Start Investing
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Section: 3D Visualization */}
        <motion.div
          style={{ y: imageY, opacity }}
          className="relative w-full h-[400px] lg:h-[600px] flex items-center justify-center lg:translate-y-40"
        >
          {/* Main Visual Group */}
          <div className="relative w-full h-full">
            {/* Background Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#D4AF37]/20 blur-[100px] rounded-full"
            />

            {/* Floating Assets */}
            <motion.div
              animate={{
                y: [0, -30, 0],
                rotateY: [0, 15, 0],
                rotateX: [0, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 flex  items-center justify-center"
            >
              <div className="relative">
                {/* Phone Mockup without container background */}
                <div className="relative group">
                  <Image
                    src="/assets/iPhone_15.png"
                    alt="App Preview"
                    width={380}
                    height={760}
                    className="relative z-10 w-[280px] lg:w-[320px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* Floating Coin 1 */}
                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    rotate: [0, 360, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-12 -right-12 z-30"
                >
                  <Image
                    src="/assets/gold_coin.png"
                    alt="Gold Coin"
                    width={120}
                    height={120}
                    className="w-24 h-24 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  />
                </motion.div>

                {/* Floating Coin 2 */}
                <motion.div
                  animate={{
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                    rotate: [0, -360, 0]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-10 -left-16 z-30"
                >
                  <Image
                    src="/assets/gold_coin.png"
                    alt="Silver Coin"
                    width={100}
                    height={100}
                    className="w-20 h-20 grayscale brightness-125 drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Depth Shapes around visual */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 z-10 opacity-30"
            >
              <div className="absolute top-0 left-0 w-8 h-8 border border-[#D4AF37] rotate-45 blur-[1px]" />
              <div className="absolute bottom-1/4 right-0 w-12 h-12 border-2 border-white/20 rounded-full blur-[2px]" />
              <div className="absolute top-1/2 left-[-10%] w-6 h-6 bg-white/20 blur-[1px]" />
            </motion.div>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
