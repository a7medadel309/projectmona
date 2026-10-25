"use client"
import React from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F0] py-20">
      <div className="container mx-auto px-6 max-w-4xl space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C6F48] font-medium">
            The Philosophy of Silence
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-[#121212] tracking-tight">
            Our Story & Heritage
          </h1>
          <p className="text-sm text-[#736E65] font-light max-w-xl mx-auto leading-relaxed">
            Sukoon was conceived not merely to produce scents, but to capture quietude in liquid form.
          </p>
        </div>

        {/* Narrative Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white p-8 md:p-14 rounded-3xl border border-[#E8E3D9] shadow-xs space-y-8"
        >
          <div className="space-y-4 text-sm font-light text-[#504C46] leading-relaxed">
            <h2 className="text-2xl font-light text-[#121212] tracking-wide font-serif italic">
              Crafted in Stillness, Designed for Memory
            </h2>
            <p>
              In an era dominated by loud declarations, Sukoon stands for understated authority. Each extract is macerated slowly over 180 days in temperature-controlled dark vaults, allowing rare resins, aged woods, and raw botanicals to intertwine without synthetic rush.
            </p>
            <p>
              From sustainably harvested sandalwood roots to hand-picked Mediterranean blossoms, our flacons house olfactory portraits rather than fleeting seasonal trends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#F8F6F0] text-center">
            <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#E8E3D9]/60">
              <span className="font-serif text-2xl text-[#8C6F48] block">180</span>
              <span className="text-[10px] uppercase tracking-wider text-[#736E65]">Days Maceration</span>
            </div>
            <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#E8E3D9]/60">
              <span className="font-serif text-2xl text-[#8C6F48] block">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-[#736E65]">Artisanal Flacons</span>
            </div>
            <div className="p-4 bg-[#F8F6F0] rounded-2xl border border-[#E8E3D9]/60">
              <span className="font-serif text-2xl text-[#8C6F48] block">0%</span>
              <span className="text-[10px] uppercase tracking-wider text-[#736E65]">Compromise</span>
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <Link
            href="/posts"
            className="px-8 py-3.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all shadow-md"
          >
            Explore The Extracts
          </Link>
        </div>

      </div>
    </div>
  )
}