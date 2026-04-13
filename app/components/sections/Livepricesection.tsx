"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMetalPrices } from "@/app/context/MetalPricesProvider";

// Mock chart data generator - replace with real historical data API later
const generateMockData = (goldBase: number, silverBase: number) => {
  const now = new Date();
  return [...Array(24)]?.map((_, i) => {
    const time = new Date(now?.getTime() - (23 - i) * 60 * 60 * 1000);
    return {
      time: time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      gold: goldBase + Math.random() * 100 - 50,
      silver: silverBase + Math.random() * 5 - 2.5,
    };
  });
};

const timeframes = [
  { label: "1H", value: "1h" },
  { label: "24H", value: "24h" },
  { label: "1W", value: "1w" },
  { label: "1M", value: "1m" },
  { label: "1Y", value: "1y" },
];

export default function LivePriceSection() {
  const { prices } = useMetalPrices();

  const currentGoldPrice = Number(prices?.gold?.buyPrice);
  const currentSilverPrice = Number(prices?.silver?.buyPrice);

  const [chartData, setChartData] = useState(() =>
    generateMockData(currentGoldPrice, currentSilverPrice)
  );
  const [activeTimeframe, setActiveTimeframe] = useState("24h");
  const [activeTab, setActiveTab] = useState<"gold" | "silver">("gold");

  // Regenerate chart data when prices update
  useEffect(() => {
    setChartData(generateMockData(currentGoldPrice, currentSilverPrice));
  }, [currentGoldPrice, currentSilverPrice]);

  // Simulate chart updates every 30 seconds (independent of API polling)
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateMockData(currentGoldPrice, currentSilverPrice));
    }, 30000);
    return () => clearInterval(interval);
  }, [currentGoldPrice, currentSilverPrice]);

  // Dynamic Y-axis domain
  const goldMin = Math.floor(currentGoldPrice - 100);
  const goldMax = Math.ceil(currentGoldPrice + 100);
  const silverMin = Math.floor(currentSilverPrice - 5);
  const silverMax = Math.ceil(currentSilverPrice + 5);

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 bg-white overflow-hidden scroll-mt-[100px]" id="pricing" >
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
            Track real-time gold and silver prices to make informed investment decisions
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
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 lg:p-8"
        >
          {/* Timeframe Selector */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0C173D]">
              {activeTab === "gold" ? "Gold" : "Silver"} Price Trend
            </h3>
            <div className="flex gap-1 sm:gap-2 bg-gray-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
              {timeframes?.map((tf) => (
                <button
                  key={tf?.value}
                  onClick={() => setActiveTimeframe(tf?.value)}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all whitespace-nowrap ${activeTimeframe === tf?.value
                    ? `${activeTab === "gold" ? `bg-[#D4AF37]` : `bg-[#C0C0C0]`} text-white shadow-md`
                    : "text-gray-600 hover:text-[#0C173D]"
                    }`}
                >
                  {tf?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-[300px] sm:h-[350px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="time"
                  stroke="#6b7280"
                  style={{ fontSize: '10px' }}
                  tick={{ fontSize: 10 }}
                />
                <YAxis
                  stroke="#6b7280"
                  style={{ fontSize: '10px' }}
                  tick={{ fontSize: 10 }}
                  domain={activeTab === "gold" ? [goldMin, goldMax] : [silverMin, silverMax]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={activeTab}
                  stroke={activeTab === "gold" ? "#D4AF37" : "#9ca3af"}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: activeTab === "gold" ? "#D4AF37" : "#9ca3af" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Today&#39;s High</p>
              <p className="text-base sm:text-lg font-bold text-[#0C173D]">
                ₹{activeTab === "gold"
                  ? (currentGoldPrice + 40)?.toFixed(2)
                  : (currentSilverPrice + 1.2)?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Today&#39;s Low</p>
              <p className="text-base sm:text-lg font-bold text-[#0C173D]">
                ₹{activeTab === "gold"
                  ? (currentGoldPrice - 35)?.toFixed(2)
                  : (currentSilverPrice - 0.5)?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Opening Price</p>
              <p className="text-base sm:text-lg font-bold text-[#0C173D]">
                ₹{activeTab === "gold"
                  ? (currentGoldPrice - 15)?.toFixed(2)
                  : (currentSilverPrice + 0.6)?.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">24h Volume</p>
              <p className="text-base sm:text-lg font-bold text-[#0C173D]">
                {activeTab === "gold" ? "₹45.2Cr" : "₹12.8Cr"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}