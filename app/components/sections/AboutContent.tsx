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
    name: "Saravanan",
    role: "founder",
    bio: "Founder of Kaasmic technology",
    initials: "S",
  },
  {
    name: "Sathish Kumar Gobala krishnan",
    role: "COO",
    bio: "Chief Operating Officer of Kaasmic technology",
    initials: "SK",
  },
];

export default function AboutContent() {
  return (
    <section className="px-4 sm:px-6 lg:px-16 xl:px-[5.5rem] py-12 sm:py-16 border-red-500">
      {/* People profiles */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 lg:mb-10 text-center"
      >
        Our Team
      </motion.h2>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20"> */}
      <div className="flex justify-center mb-12 sm:mb-16 lg:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-3xl">
          {profiles?.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full border-white/10 bg-[#0C173D]/80 hover:border-[#D4AF37]/30 transition-colors">
                <CardHeader>
                  <div className="flex w-12 h-12 sm:w-14 sm:h-14 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-semibold text-base sm:text-lg mb-2">
                    {person.initials}
                  </div>
                  <CardTitle className="text-white text-base sm:text-lg">
                    {person.name}
                  </CardTitle>
                  <CardDescription className="text-[#D4AF37]/90 text-xs sm:text-sm">
                    {person.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    {person.bio}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* More about us */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto space-y-4 sm:space-y-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
          More <span className="text-[#D4AF37]">About Us</span>
        </h2>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed">
          Kaasmic was founded to bridge the gap between traditional gold
          ownership and modern Kaasmic convenience. We partner with regulated
          custodians and refineries so every unit of Kaasmic gold on our
          platform is backed by physical 24K gold stored in secure vaults.
        </p>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed">
          Our platform lets you buy, save, and redeem gold in small
          amounts—starting from as little as ₹100—without worrying about
          storage, purity, or authenticity. Whether you are saving for the long
          term or want the flexibility to redeem cash or physical coins, we are
          here to make it simple and transparent.
        </p>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed">
          We are committed to security, compliance, and customer trust. Your
          gold balance is yours; we never lend or use your holdings for any
          other purpose. If you have questions, our support team and FAQ section
          are always available to help.
        </p>
      </motion.div>
    </section>
  );
}
