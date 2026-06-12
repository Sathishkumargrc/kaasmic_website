"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const benefits = [
  {
    title: "99.9% Pure Gold",
    description: "All our digital gold is backed by 24K (99.9% pure) physical gold stored in secure, insured vaults certified by international standards.",
    stat: "24K , 22K",
    icon: "✨"
  },
  {
    title: "99.9% Pure Silver",
    description: "99.9% Pure Silver (999 Fine Silver) All our digital silver is backed by 999 (99.9% pure) physical silver stored in secure, insured vaults certified by international standards",
    stat: "",
    icon: "🥈"
  },
  {
    title: "916 Hallmarked Gold",
    description: "Certified 916 hallmark gold with guaranteed purity and trusted quality assurance for every purchase.",
    stat: "916 BIS",
    icon: "✔️"
  },
  {
    title: "Insured Shipping",
    description: "Your precious metals travel with complete insurance coverage from vault to doorstep. Every delivery is tracked, verified, and protected — so you receive exactly what you own, safely.",
    stat: "Fully Covered",
    icon: "🚚"
  },
  {
    title: "Secure Packaging",
    description: "Each delivery is sealed in premium, tamper-evident packaging designed to safeguard your gold and silver. Arrives intact, authenticated, and ready to treasure.",
    stat: "Tamper-Proof",
    icon: "📦"
  }
];

export default function WhyChooseSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left: Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-br from-[#0C173D] via-[#1A2664] to-[#0C173D] p-6 sm:p-10 lg:p-12">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                    {/* Stats Cards */}
                    <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20">
                      <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">💰</div>
                      <div className="text-2xl sm:text-2xl lg:text-3xl font-bold text-[#D4AF37]">₹100</div>
                      <div className="text-xs sm:text-sm text-white/80 mt-1">Min. Investment</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20">
                      <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">📈</div>
                      <div className="text-2xl sm:text-2xl lg:text-3xl font-bold text-[#D4AF37]">15%</div>
                      <div className="text-xs sm:text-sm text-white/80 mt-1">Avg. Returns</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20">
                      <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">⚡</div>
                      <div className="text-2xl sm:text-2xl lg:text-3xl font-bold text-[#D4AF37]">2 Min</div>
                      <div className="text-xs sm:text-sm text-white/80 mt-1">Quick Selling</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border border-white/20">
                      <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">🔒</div>
                      <div className="text-2xl sm:text-2xl lg:text-3xl font-bold text-[#D4AF37]">100%</div>
                      <div className="text-xs sm:text-sm text-white/80 mt-1">Secure</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              {/* <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 sm:-top-6 -right-4 sm:-right-6 z-20 bg-[#D4AF37] text-[#0C173D] px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl text-sm sm:text-base font-bold"
              >
                ⭐ 4.8/5 Rating
              </motion.div> */}

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/20 to-[#1A2664]/20 blur-3xl -z-10"></div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0C173D] mb-4 sm:mb-6">
                Why Choose <span className="text-[#D4AF37]">Kaasmic</span>?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 lg:mb-10">
                India&#39;s first and its most trusted digital gold platform with unmatched security, transparency, and convenience.
              </p>
            </motion.div>

            {/* Benefits List */}
            <div className="space-y-4 sm:space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#D4AF37] to-[#F5D78E] rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0C173D]">{benefit.title}</h3>
                        {benefit.stat && (
                          <span className="text-xl sm:text-2xl font-bold text-[#D4AF37]">{benefit.stat}</span>
                        )}
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 sm:mt-8 lg:mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#D4AF37] text-[#0C173D] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:bg-[#F5D78E] transition-colors flex items-center gap-2"
              >
                Start Your Journey
                <span>→</span>
              </motion.button>
            </motion.div> */}
          </div>
        </div>
      </div>
    </section>
  );
}