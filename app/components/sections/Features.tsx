// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// const cards = [
//   {
//     title: "Buy & Save",
//     desc: "Start with as little as ₹100",
//     image: "/assets/gold_pocket.png",
//   },
//   {
//     title: "Earn Returns",
//     desc: "Up to 15% annual returns",
//     image: "/assets/gold_graph.png",
//   },
//   {
//     title: "Redeem Anytime",
//     desc: "Convert to cash or gold coins",
//     image: "/assets/gold_coin_bt.png",
//   },
// ];

// export default function Features() {
//   return (
//     <section id="features" className="relative px-[5.5rem] pt-20 pb-36 overflow-hidden">
//       {/* Warm gradient overlay behind section */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-40"
//         style={{
//           background:
//             "radial-gradient(ellipse 80% 50% at 50% 60%, rgba(212,175,55,0.08) 0%, transparent 60%)",
//         }}
//       />

//       {/* Section titles */}
//       <motion.h2
//         initial={{ y: 24, opacity: 0 }}
//         whileInView={{ y: 0, opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//         className="relative text-[2.5rem] font-bold text-white text-center mb-3"
//       >
//         Why Choose Digital Gold?
//       </motion.h2>
//       <motion.p
//         initial={{ y: 20, opacity: 0 }}
//         whileInView={{ y: 0, opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.5, delay: 0.1 }}
//         className="relative text-base text-white/85 text-center mb-16"
//       >
//         Smart, Secure, and Flexible Investment
//       </motion.p>

//       {/* Feature cards with images + hover zoom */}
//       <div className="relative z-10 grid grid-cols-3 gap-10">
//         {cards?.map((item, i) => (
//           <motion.div
//             key={item.title}
//             initial={{ y: 56, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay: i * 0.12 }}
//             whileHover={{ scale: 1.06 }}
//             className="group cursor-pointer"
//           >
//             <motion.article
//               whileHover={{
//                 boxShadow:
//                   "0 24px 48px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(212,175,55,0.2), 0 32px 64px -16px rgba(212,175,55,0.15)",
//               }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#1a2652]/90 to-[#0C173D]/95 backdrop-blur-sm border border-white/10 p-8 flex flex-col items-center text-center"
//             >
//               {/* Image container with zoom on hover */}
//               <motion.div
//                 className="relative w-28 h-28 mb-6 overflow-hidden rounded-xl"
//                 whileHover={{ scale: 1.12 }}
//                 transition={{ duration: 0.35, ease: "easeOut" }}
//               >
//                 <Image
//                   src={item?.image}
//                   alt={item?.title}
//                   fill
//                   sizes="112px"
//                   className="object-contain object-center"
//                 />
//               </motion.div>
//               <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
//               <p className="text-[15px] text-white/80 leading-relaxed">
//                 {item.desc}
//               </p>
//               {/* Subtle gold bottom accent on hover */}
//               <div
//                 className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                 aria-hidden
//               />
//             </motion.article>
//           </motion.div>
//         ))}
//       </div>

//       {/* Golden glow arc below cards */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 1 }}
//         className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-64 pointer-events-none"
//       >
//         <motion.div
//           animate={{
//             opacity: [0.4, 0.7, 0.4],
//             scaleX: [1, 1.02, 1],
//           }}
//           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#D4AF37]/25 via-[#D4AF37]/10 to-transparent rounded-[50%] blur-2xl"
//           style={{ filter: "blur(60px)" }}
//         />
//         <svg
//           viewBox="0 0 800 120"
//           className="absolute bottom-0 w-full h-32 opacity-30"
//           preserveAspectRatio="none"
//         >
//           <defs>
//             <linearGradient id="arcGold" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
//               <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
//             </linearGradient>
//           </defs>
//           <path
//             d="M0 120 Q400 20 800 120 L800 120 L0 120 Z"
//             fill="url(#arcGold)"
//           />
//         </svg>
//       </motion.div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const features = [
  {
    icon: "💰",
    title: "Buy Digital Gold",
    description: "Purchase 24K digital gold starting from just ₹100. Build your wealth gram by gram with secure transactions.",
    gradient: "from-yellow-500/20 to-amber-600/20"
  },
  {
    icon: "💸",
    title: "Sell Anytime",
    description: "Convert your digital gold to cash instantly at live market rates. No hidden charges, complete transparency.",
    gradient: "from-green-500/20 to-emerald-600/20"
  },
  {
    icon: "🔄",
    title: "Exchange Gold",
    description: "Exchange your digital gold for physical gold coins or jewelry. Seamless conversion with doorstep delivery.",
    gradient: "from-blue-500/20 to-cyan-600/20"
  },
  {
    icon: "📊",
    title: "Track Portfolio",
    description: "Monitor your investments in real-time with detailed analytics and performance tracking.",
    gradient: "from-purple-500/20 to-violet-600/20"
  },
  {
    icon: "🔒",
    title: "100% Secure",
    description: "Bank-grade security with insurance coverage. Your gold is stored in verified, insured vaults.",
    gradient: "from-red-500/20 to-rose-600/20"
  },
  {
    icon: "🎁",
    title: "Gift Gold",
    description: "Send digital gold as gifts to your loved ones. Perfect for festivals and special occasions.",
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
            Buy, sell, and exchange gold with just a few taps. Experience the future of gold investment.
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
