"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "../assets/SocialIcons";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "/faq" },
      { label: "Help Center", href: "#" },
      { label: "Security", href: "#" },
      { label: "Terms", href: "#" },
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
  { Icon: InstagramIcon, href: "#" , key: 'instagram' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background backdrop-blur-sm">
      <div className="px-[5.5rem] pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-4 gap-12 mb-12"
        >
          {columns?.map((col, i) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-white mb-4">{col.title}</p>
              <ul className="space-y-3">
                {col?.links?.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/70 hover:text-[#D4AF37] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="text-sm font-semibold text-white mb-4">Follow Us</p>
            <div className="flex gap-3">
              {socialLinks?.map(({ Icon, href, key }) => (
                <motion.a
                  key={key}
                  href={href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-[#D4AF37] hover:text-[#0C173D] transition-colors"
                >
                  <Icon className="w-5 h-5" />
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
          className="flex items-center justify-between pt-8 border-t border-white/10 text-[13px] text-white/60"
        >
          <p>© 2024 GoldInvest. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/90 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white/90 transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
