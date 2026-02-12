"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data - replace with real API
const generateMockData = () => {
  const now = new Date();
  return [...Array(24)].map((_, i) => {
    const time = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
    return {
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      gold: 6200 + Math.random() * 100,
      silver: 75 + Math.random() * 5,
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
  const [chartData, setChartData] = useState(generateMockData());
  const [activeTimeframe, setActiveTimeframe] = useState("24h");
  const [activeTab, setActiveTab] = useState<"gold" | "silver">("gold");
  
  const currentGoldPrice = 6245.50;
  const goldChange = 2.3;
  const currentSilverPrice = 78.30;
  const silverChange = -1.2;

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateMockData());
    }, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 bg-white overflow-hidden scroll-mt-[100px]" id="pricing" >
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-[#0C173D] mb-4">
            Live Market <span className="text-[#D4AF37]">Prices</span>
          </h2>
          <p className="text-lg text-gray-600">
            Track real-time gold and silver prices to make informed investment decisions
          </p>
        </motion.div>

        {/* Price Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Gold Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setActiveTab("gold")}
            className={`cursor-pointer rounded-2xl p-8 border-2 transition-all ${
              activeTab === "gold" 
                ? "border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/10 to-[#F5D78E]/10 shadow-xl" 
                : "border-gray-200 bg-white hover:border-[#D4AF37]/50"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12  rounded-full flex items-center justify-center">
                  <span className="text-2xl">
                    <Image 
                     src="/assets/gold_icon.png"
                     alt="Gold Icon"
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0C173D]">Gold</h3>
                  <p className="text-sm text-gray-500">24K / Per Gram</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#0C173D]">₹{currentGoldPrice?.toFixed(2)}</span>
              <span className={`text-lg font-semibold px-3 py-1 rounded-full ${
                goldChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {goldChange >= 0 ? '↑' : '↓'} {Math.abs(goldChange)}%
              </span>
            </div>
          </motion.div>

          {/* Silver Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setActiveTab("silver")}
            className={`cursor-pointer rounded-2xl p-8 border-2 transition-all ${
              activeTab === "silver" 
                ? "border-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl" 
                : "border-gray-200 bg-white hover:border-gray-400"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-2xl">
                     <Image 
                     src="/assets/silver_icon.png"
                     alt="Silver Icon"
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0C173D]">Silver</h3>
                  <p className="text-sm text-gray-500">999 / Per Gram</p>
                </div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#0C173D]">₹{currentSilverPrice.toFixed(2)}</span>
              <span className={`text-lg font-semibold px-3 py-1 rounded-full ${
                silverChange >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {silverChange >= 0 ? '↑' : '↓'} {Math.abs(silverChange)}%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
        >
          {/* Timeframe Selector */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-[#0C173D]">
              {activeTab === "gold" ? "Gold" : "Silver"} Price Trend
            </h3>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              {timeframes?.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setActiveTimeframe(tf?.value)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTimeframe === tf?.value
                      ? `${activeTab === "gold" ? `bg-[#D4AF37]` : `bg-[#C0C0C0]`} text-white shadow-md`
                      : "text-gray-600 hover:text-[#0C173D]"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  style={{ fontSize: '12px' }}
                  domain={activeTab === "gold" ? [6150, 6350] : [70, 85]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey={activeTab} 
                  stroke={activeTab === "gold" ? "#D4AF37" : "#9ca3af"}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6, fill: activeTab === "gold" ? "#D4AF37" : "#9ca3af" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-500 mb-1">Today&#39;s High</p>
              <p className="text-lg font-bold text-[#0C173D]">
                ₹{activeTab === "gold" ? "6,285.00" : "79.50"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Today&#39;s Low</p>
              <p className="text-lg font-bold text-[#0C173D]">
                ₹{activeTab === "gold" ? "6,210.00" : "77.80"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Opening Price</p>
              <p className="text-lg font-bold text-[#0C173D]">
                ₹{activeTab === "gold" ? "6,230.00" : "78.90"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">24h Volume</p>
              <p className="text-lg font-bold text-[#0C173D]">
                {activeTab === "gold" ? "₹45.2Cr" : "₹12.8Cr"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}