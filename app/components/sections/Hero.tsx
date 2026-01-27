"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";

function generateParticles() {
  return [...Array(24)].map(() => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 2 + Math.random() * 2,
  }));
}

export default function Hero() {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden px-[5.5rem] pt-8 pb-24 grid grid-cols-[1fr_1fr] gap-12 items-center">
      {/* Subtle particles / stars */}
      <div className="absolute inset-0 pointer-events-none">
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

      {/* Left content */}
      <div className="relative z-10">
        <motion.h1
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-[3.25rem] leading-[1.15] font-bold text-white tracking-tight"
        >
          Invest in{" "}
          <span className="text-[#D4AF37]">Digital Gold</span>
          <br />
          with Ease
        </motion.h1>

        <motion.p
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg text-white/90 leading-relaxed max-w-[28rem]"
        >
          Grow your wealth by investing in 24K digital gold securely, starting
          with just <span className="font-bold text-white">₹100</span>.
        </motion.p>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex gap-5"
        >
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
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

      {/* Right: phone + gold assets with glow */}
      <div className="relative h-[520px] flex justify-center items-center">
        {/* Golden glow behind illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute w-[420px] h-[420px] rounded-full bg-[#D4AF37]/20 blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute w-[380px] h-[380px] rounded-full bg-[#D4AF37]/15 blur-3xl"
        />

        {/* Existing assets: gold coin, gold bar */}
        <motion.div
          className="absolute w-64 left-[5%] top-[2%]"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/assets/gold_coin.png" alt="" width={256} height={256} />
        </motion.div>
        <motion.div
          className="absolute w-64 right-[2%] bottom-[18%]"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/assets/gold_biscuit.png" alt="" width={256} height={256} />
        </motion.div>

        {/* Phone with app UI */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="relative z-10"
        >
          <div className="relative">
            <Image
              src="/assets/phone.png"
              alt="GoldInvest app"
              width={300}
              height={520}
              className="drop-shadow-2xl object-contain"
            />
            {/* In-screen UI overlay to match design: My Gold Balance, Gold Rate, Buy/Sell */}
            {/* <div className="absolute inset-0 flex flex-col justify-center items-center pt-[38%] px-6">
              <div className="w-full text-center">
                <p className="text-white/90 text-[11px]">My Gold Balance</p>
                <p className="text-white text-2xl font-bold mt-0.5">₹75,200</p>
              </div>
              <div className="w-full mt-4 text-center">
                <p className="text-white/90 text-[11px]">Gold Rate</p>
                <div className="flex items-center justify-center gap-2 mt-0.5">
                  <p className="text-white text-xl font-bold">₹5,20/g</p>
                  <span className="text-green-400 text-xs font-medium">+10 day</span>
                </div>
              </div>
              <div className="flex gap-2 mt-6 w-full justify-center">
                <span className="rounded bg-white/10 px-4 py-2 text-[#D4AF37] text-xs font-medium">
                  Buy Gold
                </span>
                <span className="rounded bg-white/10 px-4 py-2 text-[#D4AF37] text-xs font-medium">
                  Sell Gold
                </span>
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
