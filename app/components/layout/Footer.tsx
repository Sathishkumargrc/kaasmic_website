"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "../assets/SocialIcons";
import { useState, useEffect } from "react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "/faq" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Refund & Policy", href: "/refund-policy" },
      { label: "Cancellation & Policy", href: "/cancellation-policy" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Investment Tips", href: "#" },
      { label: "Calculator", href: "#" },
      { label: "Gold Insights", href: "#" },
    ],
  },
];

const socialLinks = [
  { Icon: FacebookIcon, href: "#", key: 'facebook' },
  { Icon: TwitterIcon, href: "#", key: 'twitter' },
  { Icon: InstagramIcon, href: "https://www.instagram.com/kaasmic_gold_silver?igsh=MmhuejQ1M2Uzd2s0", key: 'instagram' },
];

export default function Footer() {
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [ActiveIcon, setActiveIcon] = useState<any>(null);

  const handleSocialClick = (e: React.MouseEvent, href: string, Icon: any) => {
    if (href === "#") {
      e.preventDefault();
      setActiveIcon(() => Icon);
      setShowComingSoon(true);
    }
  };

  useEffect(() => {
    if (showComingSoon) {
      const timer = setTimeout(() => setShowComingSoon(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showComingSoon]);

  return (
    <footer className="relative border-t border-white/10 bg-background backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-16 xl:px-[5.5rem] pt-12 sm:pt-16 pb-6 sm:pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12"
        >
          {columns?.map((col, i) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white mb-3 sm:mb-4">{col.title}</p>
              <ul className="space-y-2 sm:space-y-3">
                {col?.links?.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-white/70 hover:text-[#D4AF37] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-sm font-semibold text-white mb-3 sm:mb-4">Follow Us</p>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks?.map(({ Icon, href, key }) => (
                <motion.a
                  key={key}
                  href={href}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                  onClick={(e) => handleSocialClick(e, href, Icon)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 text-white hover:bg-[#D4AF37] hover:text-[#0C173D] transition-colors"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 sm:pt-8 border-t border-white/10 text-xs sm:text-[13px] text-white/60"
        >
          <p className="text-center sm:text-left">© 2026 Kasmic Technologies Private Limited. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="/privacy-policy" className="hover:text-white/90 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-conditions" className="hover:text-white/90 transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>

      {/* Coming Soon Notification */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#D4AF37] text-[#0C173D] px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3"
          >
            {ActiveIcon && <ActiveIcon className="w-5 h-5" />}
            <span className="text-sm">Coming Soon!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
