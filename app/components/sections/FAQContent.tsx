"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { useGetFaqsQuery, FAQItem } from "@/app/redux/features/api/faqApi";

const staticFaqs = [
  {
    question: "What is Kaasmic gold?",
    answer: "Kaasmic gold is a way to own 24K physical gold in electronic form. Your balance is backed by real gold stored in secure vaults. You can buy in small amounts (e.g. from ₹100), accumulate over time, and redeem as cash or physical gold coins when you want.",
  },
  {
    question: "How do I buy and sell Kaasmic gold?",
    answer: "You can buy Kaasmic gold through our app or website in a few taps. Choose the amount you want to invest; the equivalent weight of 24K gold is added to your balance at the current rate. Selling works the same way—you convert your gold balance to cash, which is credited to your linked account.",
  },
  {
    question: "What is the minimum investment?",
    answer: "You can start with as little as ₹100. There is no upper limit. You can add to your balance anytime and benefit from gold's long-term value while avoiding the hassle of storing physical gold.",
  },
  {
    question: "How do I redeem my gold?",
    answer: "You can redeem anytime. Choose to either get the value in cash (credited to your bank account) or request physical gold coins delivered to you. Redemption is subject to our terms and may have a minimum amount; full details are in the app.",
  },
  {
    question: "Is my gold safe and secure?",
    answer: "Yes. Your Kaasmic gold is backed by physical 24K gold held with regulated custodians. We do not lend or use your holdings for any other purpose. Our platform uses industry-standard security and we are committed to compliance and transparency.",
  },
];

export default function FAQContent() {
  const { data, isLoading, error } = useGetFaqsQuery();

  // Flatten all items across all categories
  const faqs: FAQItem[] = data?.data?.faqs?.flatMap((cat) => cat.items) ?? [];

  if (isLoading) {
    return (
      <section className="px-4 sm:px-6 lg:px-16 xl:px-[5.5rem] py-8 sm:py-12 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-3xl mx-auto flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-16 xl:px-[5.5rem] py-8 sm:py-12 pb-12 sm:pb-16 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="border-white/10 bg-[#0C173D]/80">
          <CardHeader className="p-4 sm:p-6 text-center sm:text-left">
            <CardTitle className="text-white text-lg sm:text-xl">Common questions</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            {faqs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq: FAQItem, i: number) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-white hover:text-[#D4AF37] text-sm sm:text-base text-left transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white/85 text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60 text-sm sm:text-base">
                  No FAQs available at the moment. Please check back later.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}