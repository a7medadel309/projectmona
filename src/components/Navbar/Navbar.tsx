'use client'
import React, { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

const emptySubscribe = () => () => {}
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

const Navbar = () => {
  const { isAdmin } = useAuth()
  const isMounted = useIsMounted()

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        href="/posts" 
        className="text-xs uppercase tracking-[0.2em] text-[#736E65] hover:text-[#121212] transition-colors"
      >
        Collections
      </Link>
      <Link 
        href="/about" 
        className="text-xs uppercase tracking-[0.2em] text-[#736E65] hover:text-[#121212] transition-colors"
      >
        Story
      </Link>
      <Link 
        href="/reviews" 
        className="text-xs uppercase tracking-[0.2em] text-[#736E65] hover:text-[#121212] transition-colors"
      >
        Reviews
      </Link>
      <Link 
        href="/contact" 
        className="text-xs uppercase tracking-[0.2em] text-[#736E65] hover:text-[#121212] transition-colors"
      >
        Contact
      </Link>

      {isMounted && isAdmin && (
        <Link 
          href="/admin" 
          className="text-xs uppercase tracking-[0.2em] text-[#8C6F48] font-semibold hover:text-[#121212] transition-colors"
        >
          Dashboard
        </Link>
      )}
    </nav>
  )
}

export default Navbar