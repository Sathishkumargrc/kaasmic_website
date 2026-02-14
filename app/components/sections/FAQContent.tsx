"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const faqs = [
  {
    q: "What is digital gold?",
    a: "Digital gold is a way to own 24K physical gold in electronic form. Your balance is backed by real gold stored in secure vaults. You can buy in small amounts (e.g. from ₹100), accumulate over time, and redeem as cash or physical gold coins when you want.",
  },
  {
    q: "How do I buy and sell digital gold?",
    a: "You can buy digital gold through our app or website in a few taps. Choose the amount you want to invest; the equivalent weight of 24K gold is added to your balance at the current rate. Selling works the same way—you convert your gold balance to cash, which is credited to your linked account.",
  },
  {
    q: "What is the minimum investment?",
    a: "You can start with as little as ₹100. There is no upper limit. You can add to your balance anytime and benefit from gold's long-term value while avoiding the hassle of storing physical gold.",
  },
  {
    q: "How do I redeem my gold?",
    a: "You can redeem anytime. Choose to either get the value in cash (credited to your bank account) or request physical gold coins delivered to you. Redemption is subject to our terms and may have a minimum amount; full details are in the app.",
  },
  {
    q: "Is my gold safe and secure?",
    a: "Yes. Your digital gold is backed by physical 24K gold held with regulated custodians. We do not lend or use your holdings for any other purpose. Our platform uses industry-standard security and we are committed to compliance and transparency.",
  },
];

export default function FAQContent() {
  return (
    <section className="px-4 sm:px-6 lg:px-16 xl:px-[5.5rem] py-8 sm:py-12 pb-12 sm:pb-16 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="border-white/10 bg-[#0C173D]/80">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-white text-lg sm:text-xl">Common questions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-white hover:text-[#D4AF37] text-sm sm:text-base text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/85 text-xs sm:text-sm">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}