"use client"
import React, { use } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'

interface PostDetailsProps {
  params: Promise<{ id: string }>
}

export default function PostDetails({ params }: PostDetailsProps) {
  const resolvedParams = use(params)
  const id = resolvedParams.id

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Back link */}
        <Link 
          href="/posts" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#736E65] hover:text-[#121212] transition-colors mb-12"
        >
          <span>&larr;</span>
          <span>Back to Collection</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-center bg-white p-8 md:p-14 rounded-3xl border border-[#E8E3D9] shadow-sm">
          
          {/* Visual Presentation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full aspect-[4/5] rounded-2xl bg-[#F8F6F0] border border-[#E8E3D9] flex flex-col items-center justify-center p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent pointer-events-none" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C6F48] font-sans mb-3">
              Flacon No. 00{id}
            </span>
            <div className="w-36 h-56 border border-[#8C6F48]/40 rounded-t-full rounded-b-2xl flex items-center justify-center bg-white/70 backdrop-blur-xs shadow-lg">
              <span className="font-serif italic text-[#121212] text-sm">SUKOON</span>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#9E9B97] mt-6">
              Hand-Poured in Maceration Cave
            </p>
          </motion.div>

          {/* Details & Olfactory Pyramid */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F48] font-medium">
                Extrait de Parfum
              </span>
              <h1 className="text-3xl lg:text-4xl font-light text-[#121212] tracking-tight">
                Amber & Velvet Woods
              </h1>
              <p className="text-2xl font-light text-[#121212] pt-2">
                1,850 EGP <span className="text-xs text-[#736E65] font-normal">/ 100ml</span>
              </p>
            </div>

            <p className="text-sm text-[#736E65] font-light leading-relaxed">
              Designed as an intimate cocoon of calm. Opening with radiant amber spice, blooming into soft cashmere woods, and drying down to a silken trail of aged sandalwood and gentle leather accords.
            </p>

            {/* Olfactory Accord Pyramid */}
            <div className="space-y-4 pt-4 border-t border-[#F8F6F0]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#121212] font-semibold">
                Olfactory Composition
              </h3>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9]/60">
                  <p className="text-[10px] uppercase text-[#8C6F48] tracking-widest mb-1">Top Notes</p>
                  <p className="text-xs text-[#121212] font-medium">Cardamom, Bergamot</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9]/60">
                  <p className="text-[10px] uppercase text-[#8C6F48] tracking-widest mb-1">Heart Notes</p>
                  <p className="text-xs text-[#121212] font-medium">Velvet Amber, Cedar</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9]/60">
                  <p className="text-[10px] uppercase text-[#8C6F48] tracking-widest mb-1">Base Notes</p>
                  <p className="text-xs text-[#121212] font-medium">Sandalwood, Musk</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center gap-4">
              <button className="flex-1 py-4 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all shadow-md">
                Add to Sanctuary Basket
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}