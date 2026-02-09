"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    image: "👩‍💼",
    rating: 5,
    text: "Kaasmic made gold investment so simple! I started with just ₹500 and now I regularly invest every month. The app is super easy to use and I love that I can track live prices.",
    investment: "₹45,000"
  },
  {
    name: "Rajesh Kumar",
    location: "Bangalore, Karnataka",
    image: "👨‍💼",
    rating: 5,
    text: "Best platform for digital gold! I sold some gold during a family emergency and got the money in my account within 2 minutes. No hassle at all. Highly recommended!",
    investment: "₹1,25,000"
  },
  {
    name: "Anita Desai",
    location: "Pune, Maharashtra",
    image: "👩",
    rating: 5,
    text: "I gift digital gold to my children on every festival through Kaasmic. It's a perfect way to save for their future. The security and transparency give me complete peace of mind.",
    investment: "₹80,000"
  },
  {
    name: "Vikram Singh",
    location: "Delhi, NCR",
    image: "👨",
    rating: 5,
    text: "As a young professional, I wanted to start investing but didn't have much capital. Kaasmic allowed me to start with just ₹100. Now it's become a habit and my portfolio is growing!",
    investment: "₹32,000"
  },
  {
    name: "Lakshmi Iyer",
    location: "Chennai, Tamil Nadu",
    image: "👩‍🦳",
    rating: 5,
    text: "I converted my digital gold to physical gold coins for my daughter's wedding. The process was seamless and the coins arrived within 3 days. Wonderful experience!",
    investment: "₹2,50,000"
  },
  {
    name: "Arjun Patel",
    location: "Ahmedabad, Gujarat",
    image: "🧔",
    rating: 5,
    text: "The live price tracking and detailed analytics help me make informed decisions. I've seen consistent returns and the customer support team is always helpful. Great platform!",
    investment: "₹1,75,000"
  }
];

export default function TestimonialsSection() {

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-[#0C173D] mb-4">
            What Our <span className="text-[#D4AF37]">Investors</span> Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied investors who trust Kaasmic for their gold investments
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                {/* Gold accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl group-hover:bg-[#D4AF37]/20 transition-colors"></div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#D4AF37] text-xl">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#F5D78E] rounded-full flex items-center justify-center text-3xl shadow-md">
                    {testimonial.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#0C173D]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Invested</p>
                    <p className="text-sm font-bold text-[#D4AF37]">{testimonial.investment}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-[#0C173D] to-[#1A2664] rounded-2xl p-8 shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">5L+</div>
              <div className="text-white/80">Happy Investors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">₹500Cr+</div>
              <div className="text-white/80">Gold Invested</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">4.8/5</div>
              <div className="text-white/80">App Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">99.9%</div>
              <div className="text-white/80">Customer Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}