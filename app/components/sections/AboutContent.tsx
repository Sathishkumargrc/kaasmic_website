"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

const profiles = [
  {
    name: "Alex Chen",
    role: "CEO & Co-founder",
    bio: "Former fintech lead. Passionate about making gold investment accessible.",
    initials: "AC",
  },
  {
    name: "Priya Sharma",
    role: "CFO",
    bio: "15+ years in treasury and commodity markets. Ensures your gold is safe.",
    initials: "PS",
  },
  {
    name: "Marcus Webb",
    role: "Head of Product",
    bio: "Designs simple, secure experiences for buying and redeeming digital gold.",
    initials: "MW",
  },
  {
    name: "Dr. Ravi Krishnan",
    role: "Advisor",
    bio: "Economist and gold market expert. Guides our product and compliance.",
    initials: "RK",
  },
];

export default function AboutContent() {
  return (
    <section className="px-[5.5rem] py-16 border-red-500">
      {/* People profiles */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-white mb-10 text-center"
      >
        Our Team
      </motion.h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-20">
        {profiles.map((person, i) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full border-white/10 bg-[#0C173D]/80 hover:border-[#D4AF37]/30 transition-colors">
              <CardHeader>
                <div className="flex size-14 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-semibold text-lg mb-2">
                  {person.initials}
                </div>
                <CardTitle className="text-white">{person.name}</CardTitle>
                <CardDescription className="text-[#D4AF37]/90">
                  {person.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/80 leading-relaxed">
                  {person.bio}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* More about us */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <h2 className="text-2xl font-bold text-white mb-6">
          More <span className="text-[#D4AF37]">About Us</span>
        </h2>
        <p className="text-white/85 leading-relaxed">
          Kaasmic was founded to bridge the gap between traditional gold ownership and modern digital convenience. We partner with regulated custodians and refineries so every unit of digital gold on our platform is backed by physical 24K gold stored in secure vaults.
        </p>
        <p className="text-white/85 leading-relaxed">
          Our platform lets you buy, save, and redeem gold in small amounts—starting from as little as ₹100—without worrying about storage, purity, or authenticity. Whether you are saving for the long term or want the flexibility to redeem cash or physical coins, we are here to make it simple and transparent.
        </p>
        <p className="text-white/85 leading-relaxed">
          We are committed to security, compliance, and customer trust. Your gold balance is yours; we never lend or use your holdings for any other purpose. If you have questions, our support team and FAQ section are always available to help.
        </p>
      </motion.div>
    </section>
  );
}
