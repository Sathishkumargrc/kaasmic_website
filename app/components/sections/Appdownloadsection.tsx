"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AppDownloadSection() {
  return (
    <section id="appdownload" className="relative py-24 bg-gradient-to-br from-[#0C173D] via-[#1A2664] to-[#0C173D] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
              <span className="text-[#D4AF37] text-sm font-semibold">
                Download Now
              </span>
            </div>

            <h2 className="text-5xl font-bold text-white mb-6">
              Start Your Gold Investment Journey{" "}
              <span className="text-[#D4AF37]">Today</span>
            </h2>

            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Download the Kaasmic app and start investing in Kaasmic gold with
              just ₹100. Available on iOS and Android.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-10">
              {[
                "✅ Zero storage charges",
                "✅ 24K pure gold guarantee",
                // "✅ Instant buy & sell",
                "✅ Bank-grade security",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-white/90 text-lg"
                >
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#0C173D] px-6 py-3 rounded-xl font-semibold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <Image
                    src="/assets/app-store.png"
                    alt="App Store"
                    width={130}
                    height={130}
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white text-[#0C173D] px-6 py-3 rounded-xl font-semibold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <Image
                    src="/assets/google-play.png"
                    alt="Google Play"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </motion.button>
            </div>

            {/* QR Code */}
            <div className="mt-10 flex items-center gap-4">
              <div className="bg-white p-3 rounded-xl shadow-lg">
                <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">📱</span>
                </div>
              </div>
              <div className="text-white/80">
                <p className="text-sm mb-1">Scan to download</p>
                <p className="text-xs text-white/60">
                  Available on iOS & Android
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#D4AF37]/20 blur-3xl"></div>
              <img src="../assets/K 2.png" alt="app-download image" />

              {/* Phone mockup placeholder - replace with actual image */}
              {/* <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border-8 border-gray-800 mx-auto max-w-sm">
                <div className="bg-gradient-to-br from-[#0C173D] via-[#1A2664] to-[#0C173D] rounded-[2.5rem] overflow-hidden">
                 
                  <div className="bg-black h-8 rounded-b-3xl mx-auto w-40"></div>

            
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                        <span className="text-white text-sm">
                          Welcome to Kaasmic
                        </span>
                      </div>
                    </div>

                
                    <div className="bg-gradient-to-br from-[#D4AF37] to-[#F5D78E] rounded-2xl p-6 mb-4">
                      <div className="text-[#0C173D] text-sm mb-1">
                        Live Gold Price
                      </div>
                      <div className="text-[#0C173D] text-3xl font-bold">
                        ₹6,245.50
                      </div>
                      <div className="text-[#0C173D] text-sm mt-1">↑ +2.3%</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">💰</div>
                        <div className="text-white text-xs">Buy Gold</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">💸</div>
                        <div className="text-white text-xs">Sell Gold</div>
                      </div>
                    </div>

                   
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-white/60 text-xs mb-2">
                        Your Portfolio
                      </div>
                      <div className="text-white text-xl font-bold">
                        ₹45,230
                      </div>
                      <div className="text-green-400 text-xs mt-1">
                        +12.5% returns
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -left-8 bg-[#D4AF37] text-[#0C173D] px-4 py-2 rounded-full shadow-xl font-bold text-sm"
              >
                💎 Start at ₹100
              </motion.div>

              {/* <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-8 -right-8 bg-white text-[#0C173D] px-4 py-2 rounded-full shadow-xl font-bold text-sm"
              >
                ⚡ Instant Sell
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
