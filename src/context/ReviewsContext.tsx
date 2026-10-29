'use client'
import React, { createContext, useContext, useState, useSyncExternalStore } from 'react'

export interface Impression {
  id: string
  authorName: string
  rating: number
  comment: string
  date: string
  flacon?: string
}

interface ReviewsContextType {
  impressions: Impression[]
  addImpression: (imp: Omit<Impression, 'id' | 'date'>) => void
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined)

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

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const raw = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(STORAGE_KEY) || JSON.stringify(defaultImpressions),
    () => JSON.stringify(defaultImpressions)
  )

  const [localList, setLocalList] = useState<Impression[] | null>(null)
  const impressions: Impression[] = localList ?? JSON.parse(raw)

  const addImpression = (impData: Omit<Impression, 'id' | 'date'>) => {
    const newImp: Impression = {
      ...impData,
      id: `IMP-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB'),
    }
    const updated = [newImp, ...impressions]
    setLocalList(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      window.dispatchEvent(new Event('storage'))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <ReviewsContext.Provider value={{ impressions, addImpression }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export function useReviews() {
  const context = useContext(ReviewsContext)
  if (!context) throw new Error('useReviews must be used within ReviewsProvider')
  return context
}