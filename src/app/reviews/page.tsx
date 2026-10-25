"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Review {
  id: number
  author: string
  location: string
  perfume: string
  rating: number
  date: string
  comment: string
  verified: boolean
}

const reviewsData: Review[] = [
  {
    id: 1,
    author: "Omar El-Sayed",
    location: "Cairo, Egypt",
    perfume: "Liquid Brun",
    rating: 5,
    date: "October 2026",
    comment: "The transition from spiced cinnamon into the creamy Madagascar vanilla and bourbon tobacco heart is magnificent. Lasts well past 18 hours.",
    verified: true,
  },
  {
    id: 2,
    author: "Nouran Mansour",
    location: "Alexandria, Egypt",
    perfume: "Hawas for Him",
    rating: 5,
    date: "October 2026",
    comment: "Crisp apple and aquatic freshness balanced with warm cinnamon and ambergris. An absolute head-turner with unmatched projection.",
    verified: true,
  },
  {
    id: 3,
    author: "Karim Hegazy",
    location: "Suez, Egypt",
    perfume: "Emerald Soul",
    rating: 5,
    date: "September 2026",
    comment: "Italian bergamot, violet leaf, and clean patchouli over golden ambergris. Extremely refined and royal scent trail.",
    verified: true,
  },
  {
    id: 4,
    author: "Layla Al-Khatib",
    location: "Dubai, UAE",
    perfume: "Sovereign Oud",
    rating: 5,
    date: "September 2026",
    comment: "Cambodian aged oud wrapped in taif roses and sweet amber. The glasswork and sillage are both masterpieces.",
    verified: true,
  },
  {
    id: 5,
    author: "Tarek Fathy",
    location: "Giza, Egypt",
    perfume: "Hawas Elixir",
    rating: 4,
    date: "August 2026",
    comment: "Intense balsamic resins and smoky bourbon vanilla. Highly recommend for cool evening outings.",
    verified: true,
  },
]

export default function ReviewsPage() {
  const [selectedPerfume, setSelectedPerfume] = useState<string>('All')

  const perfumesFilter = [
    'All',
    'Liquid Brun',
    'Hawas for Him',
    'Emerald Soul',
    'Sovereign Oud',
    'Hawas Elixir',
  ]

  const filteredReviews = selectedPerfume === 'All'
    ? reviewsData
    : reviewsData.filter(r => r.perfume === selectedPerfume)

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-20">
      <div className="container mx-auto px-6 max-w-5xl space-y-14">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C6F48] font-medium">
            Echoes of Sillage
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-[#121212] tracking-tight">
            Client Impressions
          </h1>
          <p className="text-sm text-[#736E65] font-light max-w-lg mx-auto leading-relaxed">
            Reflections from patrons who have invited Sukoon extraits into their olfactory journey.
          </p>
        </div>

        {/* Rating Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-8 rounded-3xl border border-[#E8E3D9] shadow-xs text-center items-center">
          <div className="space-y-1">
            <span className="text-4xl font-light text-[#121212] font-serif">4.9</span>
            <div className="flex justify-center text-[#C2A379] text-sm">★★★★★</div>
            <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Overall Satisfaction</p>
          </div>
          
          <div className="space-y-1 md:border-x border-[#F8F6F0] px-4">
            <span className="text-4xl font-light text-[#121212] font-serif">98%</span>
            <p className="text-xs text-[#121212] font-medium pt-1">Repeat Patronage</p>
            <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Reorder Rate</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-[#736E65] font-light">Have you experienced our private extraits?</p>
            <Link
              href="/contact"
              className="inline-block px-5 py-2 rounded-full border border-[#8C6F48] text-xs uppercase tracking-widest text-[#121212] hover:bg-[#121212] hover:text-white transition-all cursor-pointer"
            >
              Submit an Impression
            </Link>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {perfumesFilter.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setSelectedPerfume(name)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] transition-all cursor-pointer ${
                selectedPerfume === name
                  ? 'bg-[#121212] text-white shadow-xs'
                  : 'bg-white text-[#736E65] border border-[#E8E3D9] hover:bg-[#F8F6F0]'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredReviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white p-7 rounded-3xl border border-[#E8E3D9] shadow-xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#C2A379]">{'★'.repeat(review.rating)}</span>
                    <span className="text-xs text-[#E8E3D9]">{'★'.repeat(5 - review.rating)}</span>
                  </div>
                  <span className="text-[10px] text-[#9E9B97] font-mono">{review.date}</span>
                </div>

                <span className="inline-block px-3 py-1 rounded-full bg-[#F8F6F0] text-[10px] uppercase tracking-wider text-[#8C6F48] font-medium border border-[#E8E3D9]/60">
                  {review.perfume}
                </span>

                <p className="text-xs text-[#504C46] font-light leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#F8F6F0] flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#121212]">{review.author}</p>
                  <p className="text-[10px] text-[#9E9B97]">{review.location}</p>
                </div>
                {review.verified && (
                  <span className="text-[10px] tracking-wider uppercase text-[#8C6F48] font-mono flex items-center gap-1">
                    <span>✓</span> Verified Patron
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}