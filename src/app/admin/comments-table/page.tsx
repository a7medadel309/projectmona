"use client"
import React, { useState } from 'react'
import { motion } from 'motion/react'
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
    perfume: "Amber & Velvet Woods",
    rating: 5,
    date: "October 2026",
    comment: "The transition from the dry spicy cardamom into the creamy sandalwood heart is unlike anything from commercial designer houses. Lasts well past 18 hours with a comforting, intimate sillage.",
    verified: true,
  },
  {
    id: 2,
    author: "Nouran Mansour",
    location: "Alexandria, Egypt",
    perfume: "Celestial White Musk",
    rating: 5,
    date: "October 2026",
    comment: "Pure serenity in a bottle. It has that crisp linen clean vibe without smelling laundry-like. Incredibly soft, powdery vanilla drydown that lingers on scarves for days.",
    verified: true,
  },
  {
    id: 3,
    author: "Karim Hegazy",
    location: "Suez, Egypt",
    perfume: "Smoky Birch & Leather",
    rating: 5,
    date: "September 2026",
    comment: "Rich, dark, and sophisticated. The cade oil and birch smoke sit perfectly balanced against a buttery Tuscan leather note. The magnetic wooden cap and packaging feel royal.",
    verified: true,
  },
  {
    id: 4,
    author: "Layla Al-Khatib",
    location: "Dubai, UAE",
    perfume: "Amber & Velvet Woods",
    rating: 5,
    date: "September 2026",
    comment: "Ordered the discovery set first, then immediately committed to the 100ml flacon. The craftsmanship of the bottle glass and the depth of natural maceration are immediately noticeable.",
    verified: true,
  },
  {
    id: 5,
    author: "Tarek Fathy",
    location: "Giza, Egypt",
    perfume: "Imperial Oud Sillage",
    rating: 4,
    date: "August 2026",
    comment: "A true aristocratic oud profile. Not animalic or abrasive, but smooth, sweet, and enriched with damask rose and saffron. Remarkable projection for evening occasions.",
    verified: true,
  },
]

export default function ReviewsPage() {
  const [selectedPerfume, setSelectedPerfume] = useState<string>('All')

  const perfumesFilter = [
    'All',
    'Amber & Velvet Woods',
    'Celestial White Musk',
    'Smoky Birch & Leather',
    'Imperial Oud Sillage',
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
            Honest reflections from patrons who have invited Sukoon extraits into their daily sanctuaries.
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
              className="inline-block px-5 py-2 rounded-full border border-[#8C6F48] text-xs uppercase tracking-widest text-[#121212] hover:bg-[#121212] hover:text-white transition-all"
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
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-7 rounded-3xl border border-[#E8E3D9] shadow-xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Review Top Meta */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#C2A379]">{'★'.repeat(review.rating)}</span>
                    <span className="text-xs text-[#E8E3D9]">{'★'.repeat(5 - review.rating)}</span>
                  </div>
                  <span className="text-[10px] text-[#9E9B97] font-mono">{review.date}</span>
                </div>

                {/* Fragrance Tag */}
                <span className="inline-block px-3 py-1 rounded-full bg-[#F8F6F0] text-[10px] uppercase tracking-wider text-[#8C6F48] font-medium border border-[#E8E3D9]/60">
                  {review.perfume}
                </span>

                {/* Feedback Body */}
                <p className="text-xs text-[#504C46] font-light leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author info */}
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