"use client"
import React, { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'motion/react'
import { allPerfumes } from '@/data/perfumes'
import { useCart } from '@/context/CartContext'

interface PostDetailsProps {
  params: Promise<{ id: string }>
}

export default function PostDetails({ params }: PostDetailsProps) {
  const resolvedParams = use(params)
  const idNum = parseInt(resolvedParams.id, 10)
  const { addToCart } = useCart()

  const perfume = allPerfumes.find((item) => item.id === idNum)

  if (!perfume) {
    notFound()
  }

  const handleAdd = () => {
    addToCart({
      id: perfume.id,
      title: perfume.title,
      price: perfume.price,
      volume: perfume.volume,
    })
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <Link 
          href="/posts" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#736E65] hover:text-[#121212] transition-colors mb-12"
        >
          <span>&larr;</span>
          <span>Back to Collection</span>
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-center bg-white p-8 md:p-14 rounded-3xl border border-[#E8E3D9] shadow-sm">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full aspect-[4/5] rounded-2xl bg-[#F8F6F0] border border-[#E8E3D9] flex flex-col items-center justify-center p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent pointer-events-none" />
            
            <span className="text-xs uppercase tracking-[0.3em] text-[#8C6F48] font-semibold mb-2">
              {perfume.brand}
            </span>
            
            <div className="w-36 h-56 border border-[#8C6F48]/40 rounded-t-full rounded-b-2xl flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs shadow-lg p-3 text-center">
              <span className="font-serif italic text-[#121212] text-xs font-semibold">{perfume.title}</span>
              <span className="text-[9px] text-[#8C6F48] mt-2 font-mono">{perfume.volume}</span>
            </div>

            <p className="text-[11px] uppercase tracking-widest text-[#9E9B97] mt-6">
              Macerated Reserve Flacon
            </p>
          </motion.div>

          <div className="space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F48] font-medium">
                {perfume.brand} Haute Collection
              </span>
              <h1 className="text-3xl lg:text-4xl font-light text-[#121212] tracking-tight">
                {perfume.title}
              </h1>
              <p className="text-2xl font-semibold text-[#121212] pt-2">
                {perfume.price.toLocaleString()} EGP{" "}
                <span className="text-xs text-[#736E65] font-normal">/ {perfume.volume}</span>
              </p>
            </div>

            <p className="text-sm text-[#736E65] font-light leading-relaxed">
              {perfume.body}
            </p>

            <div className="space-y-4 pt-4 border-t border-[#F8F6F0]">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#121212] font-semibold">
                Olfactory Breakdown
              </h3>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9]/60">
                  <p className="text-[10px] uppercase text-[#8C6F48] tracking-widest mb-1">Top Notes</p>
                  <p className="text-xs text-[#121212] font-medium line-clamp-2">{perfume.topNotes}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9]/60">
                  <p className="text-[10px] uppercase text-[#8C6F48] tracking-widest mb-1">Heart Notes</p>
                  <p className="text-xs text-[#121212] font-medium line-clamp-2">{perfume.heartNotes}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9]/60">
                  <p className="text-[10px] uppercase text-[#8C6F48] tracking-widest mb-1">Base Notes</p>
                  <p className="text-xs text-[#121212] font-medium line-clamp-2">{perfume.baseNotes}</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleAdd}
                className="w-full py-4 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all shadow-md cursor-pointer"
              >
                Add to Sanctuary Basket
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}