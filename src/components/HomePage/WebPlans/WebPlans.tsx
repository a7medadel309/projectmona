"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'

const plans = [
  {
    name: "Discovery Tier",
    tagline: "The Olfactory Journey",
    price: "750 EGP",
    volume: "5 x 10ml Decants",
    features: [
      "Amber & Velvet Woods sample",
      "Smoky Birch & Leather accord",
      "Sensual White Musk",
      "Exclusive complimentary tester",
      "Standard shipping included"
    ],
    popular: false,
    cta: "Order Discovery Set"
  },
  {
    name: "Signature Flacon",
    tagline: "The Full Sukoon Presence",
    price: "1,850 EGP",
    volume: "100ml Eau de Parfum",
    features: [
      "Numbered handcrafted glass bottle",
      "24-hour long-lasting sillage",
      "Artisanal magnetic wooden cap",
      "Personalized engraved plate",
      "Priority express courier"
    ],
    popular: true,
    cta: "Acquire Signature"
  },
  {
    name: "Private Bespoke",
    tagline: "The Collector's Vault",
    price: "3,400 EGP",
    volume: "Double Reserve Duo (2 x 100ml)",
    features: [
      "Two flacons of private maceration",
      "Handmade leather storage case",
      "Exclusive travel atomizer included",
      "Private consultation with the perfumer",
      "VIP bespoke packaging"
    ],
    popular: false,
    cta: "Reserve Collection"
  }
]

const WebPlans = () => {
  return (
    <section className="py-24 bg-[#F8F6F0]">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[#8C6F48] font-medium">
            Curated Formulations
          </p>
          <h2 className="text-4xl lg:text-5xl font-light text-[#121212] tracking-tight">
            Curated Perfume Sets
          </h2>
          <p className="text-sm text-[#736E65] leading-relaxed font-light">
            Each formulation is macerated in small batches to preserve its natural depth and subtle transitions across top, heart, and base notes.
          </p>
        </div>

        {/* Pricing / Tiers Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col justify-between p-8 rounded-3xl transition-all ${
                plan.popular 
                  ? 'bg-[#121212] text-[#F8F6F0] shadow-2xl border border-[#8C6F48]/40 ring-1 ring-[#8C6F48]/30' 
                  : 'bg-white text-[#121212] border border-[#E8E3D9] shadow-sm hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#8C6F48] text-[10px] uppercase tracking-[0.2em] font-semibold text-white shadow-sm">
                  House Favorite
                </div>
              )}

              <div>
                <p className={`text-xs uppercase tracking-[0.2em] mb-1 ${plan.popular ? 'text-[#C2A379]' : 'text-[#8C6F48]'}`}>
                  {plan.volume}
                </p>
                <h3 className="text-2xl font-light tracking-wide">{plan.name}</h3>
                <p className={`text-xs mt-1 mb-6 font-light ${plan.popular ? 'text-[#9E9B97]' : 'text-[#736E65]'}`}>
                  {plan.tagline}
                </p>

                <div className="flex items-baseline gap-2 pb-6 border-b border-white/10 mb-6">
                  <span className="text-3xl font-light tracking-tight">{plan.price}</span>
                  <span className={`text-xs ${plan.popular ? 'text-[#9E9B97]' : 'text-[#736E65]'}`}>/ edition</span>
                </div>

                <ul className="space-y-3.5 text-xs font-light">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${plan.popular ? 'bg-[#C2A379]' : 'bg-[#121212]'}`} />
                      <span className={plan.popular ? 'text-[#E0DDD5]' : 'text-[#504C46]'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href="/posts"
                  className={`block w-full py-3.5 rounded-full text-center text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-[#C2A379] text-[#121212] hover:bg-white hover:text-black shadow-md'
                      : 'bg-[#121212] text-[#F8F6F0] hover:bg-[#8C6F48]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WebPlans