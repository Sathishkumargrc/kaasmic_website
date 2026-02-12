"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import LivePrice from "../livePrice";
import { navLinks } from "../helper/CommonVariable";

function generateParticles() {
  return [...Array(24)].map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 2 + Math.random() * 2,
  }));
}

const shapeTransition = { duration: 2, ease: "easeOut" as const };
const transitionContent = { duration: 0.15, ease: "easeOut" as const };
const transitionZoom = { duration: 0.1, ease: "easeOut" as const };

export default function HeroWithHeader() {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0C173D] via-[#1A2664] to-[#0C173D]">
      {/* Header Navigation - Integrated with Hero */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-[5.5rem] py-6"
      >
        <Link href="/" className="flex items-center gap-3">
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

        <nav className="flex items-center gap-10">
          {navLinks?.map(({ label, href }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link
                className="text-[15px] font-medium text-white hover:text-[#D4AF37] transition-colors"
                href={label === "Pricing" ? "/#pricing" : href}
              >
                {label}
              </Link>
            </motion.div>
          ))}

          {/* Live Metal Rates */}
          <LivePrice />
        </nav>
      </motion.header>

      {/* Hero Content */}
      <div className="relative min-h-screen px-[5.5rem] pt-32 pb-24 grid grid-cols-[1fr_1fr] gap-12 items-center">
        {/* Fixed layer: right-side SVG background */}
        <div
          className="pointer-events-none absolute top-0 right-0 z-0 w-[min(70%,1500px)] h-full"
          aria-hidden
        >
          {/* Outer shape: dark purple/blue gradient */}
          <motion.div
            initial={{ x: "75%", y: "-75%", opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ ...shapeTransition, delay: 0.1 }}
            className="absolute top-0 right-0 w-full h-full"
          >
            <svg
              className="h-full w-full object-right-top object-fit opacity-30"
              viewBox="0 0 1350 850"
              fill="none"
              preserveAspectRatio="xMaxYMin meet"
            >
              <path
                d="M0 0H1414V640L1028 972C1028 972 887 1068 774 927L0 0Z"
                fill="rgba(255, 255, 255, 0.2)"
              />
            </svg>
          </motion.div>

          {/* Inner shape: purple gradient */}
          <motion.div
            initial={{ x: "75%", y: "-75%", opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ ...shapeTransition, delay: 0.35 }}
            className="absolute top-0 right-0 w-[85%] h-full"
          >
            <svg
              className="h-full w-full object-right-top object-cover opacity-20"
              viewBox="0 0 1200 920"
              fill="none"
              preserveAspectRatio="xMaxYMin meet"
            >
              <defs>
                <linearGradient
                  id="shape-gradient"
                  x1="0%"
                  x2="50%"
                  y1="86.603%"
                  y2="0%"
                >
                  <stop
                    offset="50%"
                    stopColor="rgba(255, 255, 255, 0.2)"
                    stopOpacity="1"
                  />
                  <stop
                    offset="100%"
                    stopColor="rgba(255, 255, 255, 0.2)"
                    stopOpacity="1"
                  />
                </linearGradient>
              </defs>
              <path
                d="M0 0H1245V640L941 890C941 890 812 978 709 849L0 0Z"
                fill="url(#shape-gradient)"
              />
            </svg>
          </motion.div>
        </div>

        {/* Subtle particles */}
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {particles?.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/30"
              style={{
                left: `${particle?.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: particle?.duration, repeat: Infinity }}
            />
          ))}
        </div>

        {/* Left content – fade up animation after SVG (2.4s delay for SVG completion) */}
        <div
          className="relative z-10"
          data-aos="fade-up"
          data-aos-delay="2400"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <motion.h1
            initial={{ y: 75, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...transitionContent, delay: 2.4 }}
            className="text-[3.25rem] leading-[1.15] font-bold text-white tracking-tight"
          >
            Invest in <span className="text-[#D4AF37]">Digital Gold</span>
            <br />
            with Ease
          </motion.h1>

          <motion.p
            initial={{ y: 75, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...transitionContent, delay: 2.6 }}
            className="mt-6 text-lg text-white/90 leading-relaxed max-w-[28rem]"
          >
            Grow your wealth by investing in 24K digital gold securely, starting
            with just <span className="font-bold text-white">₹100</span>.
          </motion.p>

          <motion.div
            initial={{ y: 75, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...transitionContent, delay: 2.8 }}
            className="mt-10 flex gap-5"
          >
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 0 30px rgba(212,175,55,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-[#D4AF37] px-8 py-3.5 text-base font-semibold text-[#0C173D] shadow-lg"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, borderColor: "#F5D78E" }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg border-2 border-[#D4AF37] bg-transparent px-8 py-3.5 text-base font-medium text-white"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* Right: phone + gold images – fade from right after SVG */}
        <div
          className="relative z-10 h-[520px] flex justify-center items-center"
          data-aos="fade-right"
          data-aos-delay="2600"
          data-aos-duration="1000"
          data-aos-once="true"
        >
          <div className="relative w-full h-full flex justify-center items-center">
            {/* Background glow effects */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ ...transitionContent, delay: 2.8 }}
              className="absolute w-[420px] h-[420px] rounded-full bg-[#D4AF37]/20 blur-[100px]"
            />
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute w-[380px] h-[380px] rounded-full bg-[#D4AF37]/15 blur-3xl"
            />

            {/* Gold coin */}
            <div
              data-aos="zoom-in"
              data-aos-delay="2800"
              data-aos-duration="600"
              data-aos-once="true"
              className="absolute w-80 left-[55%] top-[50%]"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...transitionZoom, delay: 3.0 }}
              >
                <Image
                  src="/assets/gold_coin.png"
                  alt=""
                  width={300}
                  height={256}
                  className=""
                />
              </motion.div>
            </div>

            {/* Phone */}
            <div
              data-aos="fade-left"
              data-aos-delay="3200"
              data-aos-duration="800"
              data-aos-once="true"
              className="relative z-10 blur-lg"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ ...transitionZoom, delay: 3.4 }}
              >
                <Image
                  src="/assets/iPhone_15.png"
                  alt="GoldInvest app"
                  width={550}
                  height={520}
                  className="drop-shadow-2xl object-contain ml-100px"
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
