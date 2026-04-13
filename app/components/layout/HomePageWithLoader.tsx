"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLoader from "./PageLoader";
import HeroWithHeader from "../sections/Hero";
import StickyHeader from "./StickyHeader";
import Features from "../sections/Features";
import Footer from "./Footer";
import HowItWorksSection from "../sections/HowItWorks";
import LivePriceSection from "../sections/Livepricesection";
import WhyChooseSection from "../sections/Whychoosesection";
import TestimonialsSection from "../sections/Testimonialssection";
import AppDownloadSection from "../sections/Appdownloadsection";

export default function HomePageWithLoader() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show sticky header after scrolling past 80% of viewport height
      setShowStickyHeader(scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <PageLoader onComplete={() => setLoaderDone(true)} />
      
      <AnimatePresence>
        {loaderDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Sticky Header (appears on scroll) */}
            <StickyHeader isVisible={showStickyHeader} />
            
            {/* Hero Section with integrated header */}
            <HeroWithHeader />
            
            {/* Rest of the content */}
            <div className="bg-white">
              <Features />
              <HowItWorksSection />
              <LivePriceSection />
              <WhyChooseSection />
              <TestimonialsSection />
              <AppDownloadSection />
              <Footer />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
