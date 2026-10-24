"use client"
import React, { useState } from 'react'
import { motion } from 'motion/react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-20">
      <div className="container mx-auto px-6 max-w-2xl">
        
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6F48] font-medium">
            Atelier Inquiries
          </span>
          <h1 className="text-4xl font-light text-[#121212] tracking-tight">
            Connect With Sukoon
          </h1>
          <p className="text-sm text-[#736E65] font-light leading-relaxed">
            For private commissions, bespoke gifting sets, or wholesale partnerships, reach our master perfumer`&apos;`s salon.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-12 rounded-3xl border border-[#E8E3D9] shadow-sm"
        >
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <span className="w-12 h-12 rounded-full bg-[#F8F6F0] text-[#8C6F48] inline-flex items-center justify-center text-xl">
                ✓
              </span>
              <h3 className="text-2xl font-light text-[#121212]">Message Received</h3>
              <p className="text-xs text-[#736E65] font-light max-w-sm mx-auto">
                Thank you for your patronage. Our concierge will review your dispatch and respond within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.15em] text-[#121212] font-medium">
                  Full Name
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Lord / Lady..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.15em] text-[#121212] font-medium">
                  Email Address
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="contact@domain.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.15em] text-[#121212] font-medium">
                  Message / Fragrance Preference
                </label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tell us about the scent profile or custom request you envision..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all shadow-sm"
              >
                Send Dispatch
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </div>
  )
}