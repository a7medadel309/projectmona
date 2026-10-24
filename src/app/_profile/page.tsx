"use client"
import React, { useState } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'vault'>('orders')

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-16">
      <div className="container mx-auto px-6 max-w-4xl space-y-10">
        
        {/* Profile Header */}
        <div className="bg-white p-8 md:p-10 rounded-3xl border border-[#E8E3D9] flex flex-col md:flex-row items-center gap-6 justify-between shadow-xs">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-[#F8F6F0] border border-[#C2A379] flex items-center justify-center font-serif text-2xl text-[#8C6F48]">
              S
            </div>
            <div className="text-left space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6F48] font-medium">Maison Patron</span>
              <h1 className="text-2xl font-light text-[#121212]">Ahmed Adel</h1>
              <p className="text-xs text-[#736E65] font-light">client@sanctuary.com • Member since 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/posts"
              className="px-5 py-2.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-wider hover:bg-[#8C6F48] transition-colors"
            >
              Explore Archive
            </Link>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
              activeTab === 'orders'
                ? 'bg-[#121212] text-white'
                : 'bg-white text-[#736E65] border border-[#E8E3D9]'
            }`}
          >
            Dispatched Orders
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${
              activeTab === 'vault'
                ? 'bg-[#121212] text-white'
                : 'bg-white text-[#736E65] border border-[#E8E3D9]'
            }`}
          >
            Olfactory Vault (Favorites)
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="p-6 bg-white rounded-2xl border border-[#E8E3D9] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#8C6F48]">Order #SKN-8942</span>
                <h3 className="text-sm font-medium text-[#121212]">Amber & Velvet Woods (100ml)</h3>
                <p className="text-xs text-[#736E65]">Placed on October 18, 2026 • Cash on Delivery</p>
              </div>

              <div className="flex items-center gap-4">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] tracking-wider uppercase font-medium">
                  Delivered
                </span>
                <span className="text-sm font-medium text-[#121212]">1,850 EGP</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Vault / Favorites Tab */}
        {activeTab === 'vault' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <div className="p-5 bg-white rounded-2xl border border-[#E8E3D9] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-[#121212]">Smoky Birch & Leather</h4>
                <p className="text-[11px] text-[#736E65]">Extrait de Parfum • 100ml</p>
              </div>
              <span className="text-xs font-semibold text-[#8C6F48]">1,950 EGP</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-[#E8E3D9] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-[#121212]">Celestial White Musk</h4>
                <p className="text-[11px] text-[#736E65]">Extrait de Parfum • 100ml</p>
              </div>
              <span className="text-xs font-semibold text-[#8C6F48]">1,750 EGP</span>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}