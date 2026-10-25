"use client"
import React, { useState, useSyncExternalStore } from 'react'
import PostItem from '@/components/Postitem/Postitem'
import { motion } from 'framer-motion'
import { useInventory } from '@/context/InventoryContext'

const emptySubscribe = () => () => {}
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export default function PostsPage() {
  const { activeInventory } = useInventory()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const isMounted = useIsMounted()

  // استخراج الماركات المتاحة ديناميكياً مع حماية SSR
  const brands = isMounted
    ? ['All', ...Array.from(new Set(activeInventory.map((item) => item.brand).filter(Boolean)))]
    : ['All', 'Hawas', 'Assaf', 'Ibraq']

  const filteredPerfumes = isMounted
    ? activeInventory.filter((item) => {
        const matchesBrand = selectedBrand === 'All' || item.brand === selectedBrand
        const matchesSearch =
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.body && item.body.toLowerCase().includes(searchTerm.toLowerCase()))
        return matchesBrand && matchesSearch
      })
    : []

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-16">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C6F48] font-medium">
            Artisanal Vault
          </span>
          <h1 className="text-4xl lg:text-6xl font-light text-[#121212] tracking-tight">
            Curated Houses & Flacons
          </h1>
          <p className="text-sm text-[#736E65] font-light leading-relaxed">
            Select your signature extract from legendary creations and bespoke private formulations.
          </p>

          {/* Search Input */}
          <div className="pt-4 max-w-md mx-auto">
            <input 
              type="text"
              placeholder="Search by perfume name or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-full bg-white border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] shadow-xs transition-all"
            />
          </div>

          {/* Dynamic Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {brands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] transition-all cursor-pointer ${
                  selectedBrand === brand
                    ? 'bg-[#121212] text-[#F8F6F0] shadow-xs'
                    : 'bg-white text-[#736E65] border border-[#E8E3D9] hover:bg-[#EDE7DC]'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Perfumes Grid */}
        {!isMounted ? (
          <div className="text-center py-20">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C6F48] animate-pulse">
              Unlocking Vault Selections...
            </p>
          </div>
        ) : filteredPerfumes.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif italic text-2xl text-[#9E9B97]">No Extracts Found</p>
            <p className="text-xs text-[#736E65] mt-2">Try adjusting your query or selected house filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPerfumes.map((perfume, idx) => (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <PostItem post={perfume} />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}