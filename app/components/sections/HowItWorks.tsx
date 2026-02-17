"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Download App",
    description: "Get the Kaasmic app from Play Store or App Store and create your account in seconds.",
    icon: "📱"
  },
  {
    number: "02",
    title: "Complete KYC",
    description: "Quick and secure verification process. Upload your documents and get verified instantly.",
    icon: "✅"
  },
  {
    number: "03",
    title: "Start Investing",
    description: "Buy digital gold starting from ₹100. Track your portfolio and watch your wealth grow.",
    icon: "💎"
  },
  {
    number: "04",
    title: "Buy Back Guaranteed",
    description: "Sell your gold & silver anytime at the best market rate. 100% transparent pricing.",
    icon: "🎯"
  }
];

// Generate random positions and durations outside of render
const particlePositions = [...Array(20)].map(() => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 3 + Math.random() * 2,
}));

export default function HowItWorksSection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#0C173D] via-[#1A2664] to-[#0C173D] overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions?.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#D4AF37] rounded-full opacity-20"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: position.duration,
              repeat: Infinity,
              delay: position.delay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            How It <span className="text-[#D4AF37]">Works</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Start your gold investment journey in 4 simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
              )}

              <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group hover:bg-white/10">
                {/* Step number */}
                <div className="absolute -top-6 -left-4 w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#F5D78E] rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-2xl font-bold text-[#0C173D]">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="text-6xl mb-6 mt-4 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(212,175,55,0.5)" }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#D4AF37] text-[#0C173D] px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-[#F5D78E] transition-colors"
          >
            Start Investing Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
