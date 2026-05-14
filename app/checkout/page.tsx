"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-[#050A1F] text-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
          <div className={`absolute top-1/2 left-0 h-0.5 bg-[#D4AF37] -translate-y-1/2 z-0 transition-all duration-500`} style={{ width: `${(step - 1) * 50}%` }}></div>
          
          {[1, 2, 3].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${step >= s ? 'bg-[#D4AF37] text-[#050A1F]' : 'bg-white/10 text-white/50'}`}>
                {s}
              </div>
              <span className={`text-xs mt-2 font-medium ${step >= s ? 'text-[#D4AF37]' : 'text-white/30'}`}>
                {s === 1 ? 'Address' : s === 2 ? 'Payment' : 'Confirm'}
              </span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-[#D4AF37]">📍</span> Shipping Address
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-white/50 ml-1">Full Name</label>
                      <input 
                        type="text" name="name" value={formData.name} onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/50 ml-1">Phone Number</label>
                      <input 
                        type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/50 ml-1">Email Address</label>
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/50 ml-1">Street Address</label>
                    <textarea 
                      name="address" value={formData.address} onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-[#D4AF37] outline-none transition-colors min-h-[100px]"
                      placeholder="House No, Street, Area..."
                    ></textarea>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-white/50 ml-1">City</label>
                      <input 
                        type="text" name="city" value={formData.city} onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/50 ml-1">State</label>
                      <input 
                        type="text" name="state" value={formData.state} onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/50 ml-1">Pincode</label>
                      <input 
                        type="text" name="pincode" value={formData.pincode} onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={nextStep}
                    className="w-full py-4 bg-[#D4AF37] text-[#050A1F] rounded-xl font-bold mt-8 shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Proceed to Payment
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="text-[#D4AF37]">💳</span> Payment Method
                  </h2>
                  <div className="space-y-4">
                    {[
                      { id: 'upi', name: 'UPI (GPay, PhonePe, Paytm)', icon: '📱' },
                      { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
                      { id: 'net', name: 'Net Banking', icon: '🏦' },
                    ].map((method) => (
                      <div 
                        key={method.id}
                        className="p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#D4AF37]/50 cursor-pointer flex items-center gap-4 group transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-xl group-hover:bg-[#D4AF37]/20 transition-colors">
                          {method.icon}
                        </div>
                        <span className="flex-1 font-medium">{method.name}</span>
                        <div className="w-6 h-6 rounded-full border-2 border-white/20"></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4 mt-12">
                    <button 
                      onClick={prevStep}
                      className="flex-1 py-4 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all"
                    >
                      Back
                    </button>
                    <button 
                      onClick={nextStep}
                      className="flex-[2] py-4 bg-[#D4AF37] text-[#050A1F] rounded-xl font-bold shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-12 space-y-6">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto text-4xl"
                  >
                    ✓
                  </motion.div>
                  <h2 className="text-3xl font-bold">Order Placed Successfully!</h2>
                  <p className="text-white/60">
                    Thank you for your purchase. We'll send you a confirmation email shortly.
                  </p>
                  <Link 
                    href="/"
                    className="inline-block py-4 px-12 bg-[#D4AF37] text-[#050A1F] rounded-xl font-bold mt-8 shadow-xl shadow-[#D4AF37]/20 hover:scale-[1.02] transition-all"
                  >
                    Back to Home
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-xl overflow-hidden flex-shrink-0">
                    <img src="/images/product-placeholder.png" alt="Product" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">24K Gold Coin (10g)</h4>
                    <p className="text-xs text-white/50">Quantity: 1</p>
                    <p className="text-[#D4AF37] font-bold">₹65,000</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-white/60">
                  <span>Subtotal</span>
                  <span>₹65,000</span>
                </div>
                <div className="flex justify-between text-sm text-white/60">
                  <span>Shipping</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#D4AF37]">₹65,000</span>
                </div>
              </div>
              <p className="text-[10px] text-white/30 mt-6 text-center italic">
                Secure checkout powered by Kaasmic Payment Gateway
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
