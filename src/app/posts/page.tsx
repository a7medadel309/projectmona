"use client"
import React, { useState } from 'react'
import PostItem from '@/components/Postitem/Postitem'
import { motion } from 'motion/react'
import { Tpost } from '@/utilis/types'

// Mock data تمثل العطور لو الـ API مش شغال
const initialPerfumes: Tpost[] = [
  {
    id: 1,
    title: "Amber & Velvet Woods",
    body: "A profound blend of rich amber resin, smoked birch, and creamy Australian sandalwood lingering on skin for 24+ hours."
  },
  {
    id: 2,
    title: "Smoky Birch & Leather",
    body: "Tuscan saddle leather infused with cade oil, dark incense, and velvety iris petals for an unmistakably bold presence."
  },
  {
    id: 3,
    title: "Celestial White Musk",
    body: "A delicate whisper of crystalline musk, clean Egyptian cotton, powdery vanilla, and sun-drenched cedarwood."
  },
  {
    id: 4,
    title: "Imperial Oud Sillage",
    body: "Naturally aged Cambodian agarwood distilled with royal damascena rose, saffron threads, and warm liquid bronze."
  },
  {
    id: 5,
    title: "Midnight Fig & Vetiver",
    body: "Lush Mediterranean green fig leaves grounded by earthy Haitian vetiver, crushed pink pepper, and cool morning dew."
  },
  {
    id: 6,
    title: "Solar Neroli & Cardamom",
    body: "Crisp Italian neroli blossoms intertwined with warm crushed cardamom pods, ambergris, and sweet almond milk."
  }
]

export default function PostsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filters = ['All', 'Woody', 'Amber', 'Musk', 'Leather']

  const filteredPerfumes = initialPerfumes.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.body.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-16">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6F48] font-medium">
            The Permanent Archive
          </span>
          <h1 className="text-4xl lg:text-6xl font-light text-[#121212] tracking-tight">
            Artisanal Fragrance Editions
          </h1>
          <p className="text-sm text-[#736E65] font-light leading-relaxed">
            Every extract is balanced to perfection, offering a meditative sensory experience built around rare botanical distillation.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-md mx-auto">
            <input 
              type="text"
              placeholder="Search notes, accords, or titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-white border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] shadow-xs transition-all"
            />
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.15em] transition-all ${
                  selectedFilter === filter
                    ? 'bg-[#121212] text-[#F8F6F0] shadow-xs'
                    : 'bg-white/60 text-[#736E65] border border-[#E8E3D9] hover:bg-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Perfume Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPerfumes.map((perfume, idx) => (
            <motion.div
              key={perfume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <PostItem post={perfume} />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}