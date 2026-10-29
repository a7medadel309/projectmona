'use client'
import React, { useState, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useAuth } from '@/context/AuthContext'

const emptySubscribe = () => () => {}
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Client
    () => false  // Server
  )
}

interface Impression {
  id: string
  authorName: string
  rating: number
  comment: string
  date: string
  flacon?: string
}

const STORAGE_KEY = 'sukoon_client_impressions'

const defaultImpressions: Impression[] = [
  {
    id: 'IMP-1',
    authorName: 'Karim M.',
    rating: 5,
    comment: 'Liquid Brun has an unmatched depth. The projection is sublime yet quiet.',
    date: '24/10/2026',
    flacon: 'Liquid Brun',
  },
  {
    id: 'IMP-2',
    authorName: 'Nour E.',
    rating: 5,
    comment: 'The maceration quality is clear from first spray. Authentic niche craftsmanship.',
    date: '20/10/2026',
    flacon: 'Signature Flacon',
  },
]

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export default function ReviewsPage() {
  const isMounted = useIsMounted()
  const { user } = useAuth() as {
    user?: { role?: string; isAdmin?: boolean; email?: string } | null
  }

  // تحميل وحفظ المراجعات من المتصفح
  const rawImpressions = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultImpressions),
    () => JSON.stringify(defaultImpressions)
  )

  const [localImpressions, setLocalImpressions] = useState<Impression[] | null>(null)
  const impressions: Impression[] = localImpressions ?? JSON.parse(rawImpressions)

  // حالات المودال والإدخال
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [flacon, setFlacon] = useState('Signature Flacon')

  // التأكد من رتبة المستخدم فقط بعد الـ Mount لمنع Hydration Mismatch
  const isAdmin = Boolean(
    isMounted && (user?.role === 'admin' || user?.isAdmin === true || user?.email?.includes('admin'))
  )

  const saveUpdatedImpressions = (updated: Impression[]) => {
    setLocalImpressions(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      window.dispatchEvent(new Event('storage'))
    } catch (err) {
      console.error(err)
    }
  }

  // حذف التعليق للأدمن
  const handleDeleteImpression = (id: string) => {
    const updated = impressions.filter((item) => item.id !== id)
    saveUpdatedImpressions(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    const author = user?.email?.split('@')[0] || 'Collector'
    const newImp: Impression = {
      id: `IMP-${Date.now()}`,
      authorName: author,
      rating,
      comment: comment.trim(),
      flacon,
      date: new Date().toLocaleDateString('en-GB'),
    }

    const updated = [newImp, ...impressions]
    saveUpdatedImpressions(updated)

    setComment('')
    setRating(5)
    setIsOpen(false)
  }

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto space-y-12">
      {/* العنوان العلوي */}
      <div className="text-center space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#8C6F48]">
          Echoes of Sillage
        </span>
        <h1 className="text-3xl md:text-5xl font-light font-serif text-[#121212]">
          Client Impressions
        </h1>
        <p className="text-xs md:text-sm text-[#736E65] font-light max-w-md mx-auto">
          Reflections from patrons who have invited Sukoon extraits into their olfactory journey.
        </p>
      </div>

      {/* كارت الإحصائيات الرئيسي */}
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

        {/* زر إضافة الرأي المحمي من الـ Hydration */}
        <div className="pt-4 border-t border-[#F8F6F0] space-y-3 min-h-[48px] flex flex-col items-center justify-center">
          <p className="text-xs text-[#736E65] font-light">
            Have you experienced our private extraits?
          </p>

          {isMounted && (
            !isAdmin ? (
              <button
                onClick={() => setIsOpen(true)}
                className="px-8 py-3 rounded-full border border-[#8C6F48] text-[#8C6F48] text-xs font-mono uppercase tracking-widest hover:bg-[#121212] hover:text-white hover:border-[#121212] transition-all cursor-pointer"
              >
                Submit an Impression
              </button>
            ) : (
              <span className="inline-block text-[11px] font-mono text-[#736E65] bg-[#F8F6F0] px-4 py-1.5 rounded-full border border-[#E8E3D9]">
                Admin Atelier Mode (Review Moderation Active)
              </span>
            )
          )}
        </div>
      </div>

      {/* قائمة آراء العملاء */}
      <div className="space-y-4">
        <div className="border-b border-[#E8E3D9] pb-3 flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#8C6F48]">
            Archived Impressions ({impressions.length})
          </h2>
          <span className="text-xs text-[#736E65] font-mono">Verified Extractions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {impressions.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white rounded-3xl border border-[#E8E3D9] shadow-xs flex flex-col justify-between gap-4 relative group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between pr-6">
                  <span className="text-xs font-medium text-[#121212] font-mono">
                    {item.authorName}
                  </span>
                  <span className="text-[#8C6F48] text-xs">
                    {'★'.repeat(item.rating)}
                  </span>
                </div>
                <p className="text-xs text-[#736E65] font-light italic leading-relaxed">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              {/* زر الحذف يظهر للأدمن فقط على المتصفح */}
              {isMounted && isAdmin && (
                <button
                  onClick={() => handleDeleteImpression(item.id)}
                  title="Delete Impression"
                  className="absolute top-4 right-4 w-7 h-7 rounded-full border border-neutral-200 text-neutral-400 hover:text-rose-600 hover:border-rose-300 flex items-center justify-center text-xs transition-colors cursor-pointer bg-white"
                >
                  ✕
                </button>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-[#F8F6F0] text-[10px] font-mono text-[#736E65]">
                <span className="bg-[#F8F6F0] px-2 py-0.5 rounded border border-[#E8E3D9]">
                  {item.flacon || 'Signature Reserve'}
                </span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* نافذة كتابة الرأي (Modal) */}
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
                  className="w-7 h-7 rounded-full border border-neutral-200 text-neutral-400 hover:text-black flex items-center justify-center text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[11px] font-mono uppercase text-[#736E65] block mb-1">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-xl transition-transform hover:scale-125 cursor-pointer ${
                          star <= rating ? 'text-[#8C6F48]' : 'text-neutral-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#736E65] block mb-1">
                    Flacon / Edition
                  </label>
                  <input
                    type="text"
                    value={flacon}
                    onChange={(e) => setFlacon(e.target.value)}
                    placeholder="e.g. Liquid Brun, Hawas Black..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3D9] text-xs focus:outline-none focus:border-[#121212]"
                  />
                </div>

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
                    className="px-6 py-2.5 text-xs bg-[#121212] text-white rounded-full hover:bg-[#8C6F48] transition-colors font-mono uppercase tracking-widest cursor-pointer"
                  >
                    Immortalize
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}