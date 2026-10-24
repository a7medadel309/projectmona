"use client"
import React from 'react'
import Link from 'next/link'
import Navbar from '../Navbar/Navbar'
import { useCart } from '@/context/CartContext'

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart()

  return (
    <header className="fixed top-0 left-0 w-full bg-[#F8F6F0]/80 backdrop-blur-md border-b border-[#E8E3D9] z-40 transition-all">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span className="text-2xl font-light tracking-[0.35em] text-[#121212] uppercase transition-colors group-hover:text-[#8C6F48]">
              SUKOON
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#8C6F48] uppercase font-sans">
              Haute Parfumerie
            </span>
          </Link>

          {/* Navigation Links */}
          <Navbar />
          
          {/* Action Area */}
          <div className="flex items-center space-x-6">
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#121212] hover:text-[#8C6F48] transition-colors cursor-pointer"
              aria-label="View basket"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#8C6F48] text-white text-[9px] font-semibold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <Link 
              href="/login" 
              className="hidden md:inline-block text-xs uppercase tracking-[0.2em] text-[#121212] hover:text-[#C2A379] transition-colors"
            >
              Sign In
            </Link>

            <Link 
              href="/register" 
              className="hidden md:inline-block text-xs uppercase tracking-[0.2em] px-6 py-2.5 rounded-full bg-[#121212] text-[#F8F6F0] hover:bg-[#8C6F48] transition-all duration-300 shadow-sm"
            >
              Join Us
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
