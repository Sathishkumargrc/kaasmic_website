"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useMetalPrices } from "@/app/context/MetalPricesProvider";

// Historical data for Gold (per 10g) and Silver (per 1kg) in INR from 1975 to current year
const historicalData = [
  { year: "1975", gold: 540, silver: 1100 },
  { year: "1980", gold: 1330, silver: 2700 },
  { year: "1985", gold: 2130, silver: 3900 },
  { year: "1990", gold: 3200, silver: 6700 },
  { year: "1995", gold: 4680, silver: 6300 },
  { year: "2000", gold: 4400, silver: 7900 },
  { year: "2005", gold: 7000, silver: 10600 },
  { year: "2010", gold: 18500, silver: 27000 },
  { year: "2015", gold: 26343, silver: 37825 },
  { year: "2020", gold: 48651, silver: 63435 },
  { year: "2023", gold: 58826, silver: 71250 },
  { year: "2024", gold: 65400, silver: 75000 },
  { year: "2025", gold: 69200, silver: 82000 },
  { year: "2026", gold: 72500, silver: 86500 },
];

export default function LivePriceSection() {
  const { prices } = useMetalPrices();

  const currentGoldPrice = Number(prices?.gold?.buyPrice);
  const currentSilverPrice = Number(prices?.silver?.buyPrice);

  const [activeTab, setActiveTab] = useState<"gold" | "silver">("gold");

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 bg-white overflow-hidden scroll-mt-[100px]" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0C173D] mb-3 sm:mb-4">
            Live Market <span className="text-[#D4AF37]">Prices</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-4">
            Track real-time gold and silver prices alongside their historic 50-year growth
          </p>
        </motion.div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
          {/* Gold Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setActiveTab("gold")}
            className={`cursor-pointer rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 transition-all ${activeTab === "gold"
              ? "border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/10 to-[#F5D78E]/10 shadow-xl"
              : "border-gray-200 bg-white hover:border-[#D4AF37]/50"
              }`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">
                    <Image
                      src="/assets/gold_icon.png"
                      alt="Gold Icon"
                      width={70}
                      height={70}
                      className="object-contain w-12 h-12 sm:w-[70px] sm:h-[70px]"
                    />
                  </span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0C173D]">Gold</h3>
                  <p className="text-xs sm:text-sm text-gray-500">24K / Per Gram</p>
                </div>
              </div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0C173D]">₹{currentGoldPrice?.toFixed(2)}</span>
            </div>
          </motion.div>

          {/* Silver Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setActiveTab("silver")}
            className={`cursor-pointer rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 transition-all ${activeTab === "silver"
              ? "border-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl"
              : "border-gray-200 bg-white hover:border-gray-400"
              }`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">
                    <Image
                      src="/assets/silver_icon.png"
                      alt="Silver Icon"
                      width={70}
                      height={70}
                      className="object-contain w-12 h-12 sm:w-[70px] sm:h-[70px]"
                    />
                  </span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0C173D]">Silver</h3>
                  <p className="text-xs sm:text-sm text-gray-500">999 / Per Gram</p>
                </div>
              </div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0C173D]">₹{currentSilverPrice?.toFixed(2)}</span>
            </div>
          </motion.div>
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-4 sm:p-6 lg:p-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0C173D]">
                {activeTab === "gold" ? "Gold" : "Silver"} Historical Growth
              </h3>
              <p className="text-sm text-gray-500">Value trend from 1975 to Present</p>
            </div>
            <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-sm font-semibold text-gray-700">All Time</span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[300px] sm:h-[350px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={activeTab === "gold" ? "#D4AF37" : "#9ca3af"} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={activeTab === "gold" ? "#D4AF37" : "#9ca3af"} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis
                  dataKey="year"
                  stroke="#9ca3af"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  dy={10}
                />
                {/* Hiding Y-Axis and Tooltip for a pure visual trend graph */}
                <YAxis hide={true} />
                <Area
                  type="monotone"
                  dataKey={activeTab}
                  stroke={activeTab === "gold" ? "#D4AF37" : "#9ca3af"}
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorTrend)"
                  activeDot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>The graph illustrates approximate historical growth. Past performance does not guarantee future results.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}