'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useAuth } from '@/context/AuthContext'
import { useReviews } from '@/context/ReviewsContext'

export default function ClientImpressions() {
  const { user } = useAuth()
  const { impressions, addImpression } = useReviews()

  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [flacon, setFlacon] = useState('Signature Flacon')

  // Check law admin
  const isAdmin = Boolean(
    (user && 'role' in user && user.role === 'admin') ||
      user?.isAdmin === true ||
      user?.email?.includes('admin')
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    const author = user?.name || user?.email?.split('@')[0] || 'Anonymous Collector'
    addImpression({
      authorName: author,
      rating,
      comment: comment.trim(),
      flacon,
    })

    setComment('')
    setRating(5)
    setIsOpen(false)
  }

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8C6F48]">
          Echoes of Sillage
        </span>
        <h2 className="text-3xl md:text-4xl font-light font-serif text-[#121212]">
          Client Impressions
        </h2>
        <p className="text-xs md:text-sm text-[#736E65] font-light max-w-md mx-auto">
          Reflections from patrons who have invited Sukoon extraits into their olfactory journey.
        </p>
      </div>

      {/* Main Stats Card */}
      <div className="bg-white rounded-3xl border border-[#E8E3D9] p-8 md:p-12 text-center shadow-xs space-y-8">
        <div className="space-y-1">
          <span className="text-4xl md:text-5xl font-light text-[#121212] tracking-tight block">
            4.9
          </span>
          <div className="flex justify-center gap-1 text-[#8C6F48] text-sm">
            {'★'.repeat(5)}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#736E65] block mt-1">
            Overall Satisfaction
          </span>
        </div>

        <div className="space-y-1 border-t border-[#F8F6F0] pt-6">
          <span className="text-3xl md:text-4xl font-light text-[#121212] block">
            98%
          </span>
          <span className="text-xs font-medium text-[#121212] block">
            Repeat Patronage
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#736E65] block">
            Reorder Rate
          </span>
        </div>

        {/* Action Button: Visible for Collectors / Normal Users Only */}
        <div className="pt-4 border-t border-[#F8F6F0] space-y-3">
          <p className="text-xs text-[#736E65] font-light">
            Have you experienced our private extraits?
          </p>

          {!isAdmin ? (
            <button
              onClick={() => setIsOpen(true)}
              className="px-8 py-3 rounded-full border border-[#8C6F48] text-[#8C6F48] text-xs font-mono uppercase tracking-widest hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-all cursor-pointer"
            >
              Submit an Impression
            </button>
          ) : (
            <span className="inline-block text-[11px] font-mono text-[#736E65] bg-[#F8F6F0] px-4 py-1.5 rounded-full border border-[#E8E3D9]">
              Admin View Mode (Submissions disabled)
            </span>
          )}
        </div>
      </div>

      {/* List of Impressions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {impressions.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-white rounded-2xl border border-[#E8E3D9] shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#121212] font-medium">{item.authorName}</span>
                <span className="text-[#8C6F48]">{'★'.repeat(item.rating)}</span>
              </div>
              <p className="text-xs text-[#736E65] font-light leading-relaxed italic">
                &ldquo;{item.comment}&rdquo;
              </p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-[#F8F6F0] text-[10px] font-mono text-[#736E65]">
              <span>{item.flacon || 'Private Reserve'}</span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Comment Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 space-y-5 border border-[#E8E3D9] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#F8F6F0] pb-3">
                <div>
                  <h3 className="text-base font-serif font-medium text-[#121212]">
                    Pen Your Impression
                  </h3>
                  <span className="text-[10px] font-mono text-[#8C6F48] uppercase tracking-widest">
                    Sukoon Olfactory Archive
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-full border border-neutral-200 text-neutral-400 hover:text-black flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Rating selection */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#736E65] block mb-1.5">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-lg transition-transform hover:scale-125 cursor-pointer ${
                          star <= rating ? 'text-[#8C6F48]' : 'text-neutral-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fragrance name */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#736E65] block mb-1">
                    Flacon / Edition
                  </label>
                  <input
                    type="text"
                    value={flacon}
                    onChange={(e) => setFlacon(e.target.value)}
                    placeholder="e.g. Liquid Brun, Signature Flacon..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3D9] text-xs focus:outline-none focus:border-[#121212]"
                  />
                </div>

                {/* Comment area */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#736E65] block mb-1">
                    Your Reflection
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe the projection, sillage, or character of the extraction..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3D9] text-xs focus:outline-none focus:border-[#121212] resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#F8F6F0]">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs text-[#736E65] hover:bg-neutral-100 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-xs bg-[#121212] text-white rounded-full hover:bg-[#8C6F48] transition-colors font-mono uppercase tracking-widest cursor-pointer"
                  >
                    Immortalize
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}