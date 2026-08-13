"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  // {
  //   icon: "💰",
  //   title: "Buy Kaasmic Gold",
  //   description: "Purchase 24K Kaasmic gold starting from just ₹100. Build your wealth gram by gram with secure transactions.",
  //   gradient: "from-yellow-500/20 to-amber-600/20"
  // },
  // {
  //   icon: "💸",
  //   title: "Sell Anytime",
  //   description: "Convert your Kaasmic gold to cash instantly at live market rates. No hidden charges, complete transparency.",
  //   gradient: "from-green-500/20 to-emerald-600/20"
  // },
  {
    icon: "✨",
    title: "Physical Gold & Silver",
    description: "Physical gold and silver at best price in the Market.",
    gradient: "from-blue-500/20 to-cyan-600/20"
  },
  // {
  //   icon: "📊",
  //   title: "Track Portfolio",
  //   description: "Monitor your investments in real-time with detailed analytics and performance tracking.",
  //   gradient: "from-purple-500/20 to-violet-600/20"
  // },
  {
    icon: "🔒",
    title: "100% Secure",
    description: "Bank-grade security with insurance coverage. Your gold is stored in verified, insured vaults.",
    gradient: "from-red-500/20 to-rose-600/20"
  },
  {
    icon: "🎁",
    title: "Refer and Earn",
    description: "Invite your friends and earn rewards when they join and make their first purchase. The more you refer, the more you earn!",
    gradient: "from-pink-500/20 to-fuchsia-600/20"
  }
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#1A2664] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-[#0C173D] mb-4">
            Everything You Need in{" "}
            <span className="text-[#D4AF37]">One App</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Buy, sell gold & silver with just a few taps. Experience the future of gold investment.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full transition-all duration-300 group-hover:shadow-2xl">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-[#0C173D] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
