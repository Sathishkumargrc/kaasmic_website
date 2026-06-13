"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import { Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      staggerChildren: 0.25,
      delayChildren: 0.8,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-16 xl:px-[5.5rem] py-12 sm:py-20 bg-transparent overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4AF37] rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.03, 0.08, 0.03],
            x: [0, -40, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#D4AF37] rounded-full blur-[100px]"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Side: Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
              Get in <span className="text-[#D4AF37]">Touch</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-white/70 mb-8 text-base sm:text-lg">
              Have questions about Kaasmic gold? Our team is here to help you every step of the way.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Full Name</label>
                  <Input
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white focus:border-[#D4AF37]/50 h-12 transition-all duration-300 hover:border-white/20"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <label className="text-sm font-medium text-white/80 ml-1">Email Address</label>
                  <Input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white focus:border-[#D4AF37]/50 h-12 transition-all duration-300 hover:border-white/20"
                  />
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Phone Number</label>
                <Input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-white/5 border-white/10 text-white focus:border-[#D4AF37]/50 h-12 transition-all duration-300 hover:border-white/20"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-sm font-medium text-white/80 ml-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help you.?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]/50 transition-all duration-300 hover:border-white/20"
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(212,175,55,0.3)"
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#D4AF37] text-[#0C173D] font-bold py-4 rounded-lg shadow-lg hover:bg-[#F5D78E] transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side: Info & Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Details Card */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm group hover:border-[#D4AF37]/30 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-[#D4AF37] flex items-center gap-2">
                  <span className="w-8 h-px bg-[#D4AF37]/30"></span>
                  Visit Our Shop
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div whileHover={{ x: 5 }} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#D4AF37]/30">
                    <span className="text-xl">📍</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Registered Office</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      KAASMIC TECHNOLOGIES PRIVATE LIMITED<br />
                      67/1, Appasamy Road, Shevapet,<br />
                      Shevapet Bazaar, Salem - 636002,<br />
                      Tamil Nadu, India
                    </p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#D4AF37]/30">
                    <span className="text-xl">📧</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email Us</h4>
                    <p className="text-white/70 text-sm">support@kaasmic.in</p>
                  </div>
                </motion.div>

                <motion.div whileHover={{ x: 5 }} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#D4AF37]/30">
                    <span className="text-xl">⏰</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Open Hours</h4>
                    <p className="text-white/70 text-sm">Mon - Sat: 10:00 AM - 7:00 PM</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            {/* Google Maps Embed */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="w-full h-[300px] rounded-xl overflow-hidden border border-white/10 shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C173D]/20 to-transparent pointer-events-none z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.545366474665!2d78.1417033!3d11.65578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1d07289f66b%3A0x6b772c67c299c85a!2sShevapet%2C%20Salem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1714032000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
