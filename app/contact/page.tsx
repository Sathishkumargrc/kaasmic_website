"use client";

import { motion } from "framer-motion";
import Header from "../components/layout/Header";
import PageBanner from "../components/layout/PageBanner";
import Footer from "../components/layout/Footer";
import ContactContent from "../components/sections/ContactContent";

export default function ContactPage() {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="min-h-screen bg-transparent"
    >
      <Header />
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
      >
        <PageBanner
          title="Contact Us"
          description="We're here to help you secure your future with Kaasmic gold. Reach out to our team for support or visit our office in Salem."
        />
      </motion.div>
      
      <ContactContent />
      <Footer />
    </motion.main>
  );
}
