"use client"
import React, { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

const emptySubscribe = () => () => {}
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export default function Header() {
  const pathname = usePathname()
  const isMounted = useIsMounted()
  const { user, isAdmin, isAuthenticated, logout } = useAuth()
  const { cart, setIsCartOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // إخفاء السلة إذا كنا في مسار الأدمن أو إذا كان الحساب Admin
  const isAdminRoute = pathname?.startsWith('/admin') || (isMounted && isAdmin)

  // حساب إجمالي عدد القطع في السلة
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const navLinks = [
    { name: 'Collections', href: '/posts' },
    { name: 'Story', href: '/about' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F8F6F0]/90 backdrop-blur-md border-b border-[#E8E3D9]/60 transition-all">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col items-start group">
          <span className="text-xl md:text-2xl font-light tracking-[0.25em] text-[#121212] uppercase font-serif">
            Sukoon
          </span>
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#8C6F48] -mt-1 font-sans">
            Haute Parfumerie
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-[#736E65]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-[#121212] ${
                  isActive ? 'text-[#121212] border-b border-[#8C6F48] pb-0.5' : ''
                }`}
              >
                {link.name}
              </Link>
            )
          })}

          {/* ننتظر الـ Mount عشان نمنع الـ Hydration Mismatch */}
          {isMounted && isAdmin && (
            <Link
              href="/admin"
              className="text-[#8C6F48] hover:text-[#121212] transition-colors border border-[#8C6F48]/40 px-3 py-1 rounded-full text-[10px]"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-3">
          
          {/* Cart Bag Icon: تظهر فقط للعملاء وتختفي تماماً عن الأدمن */}
          {isMounted && !isAdminRoute && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#121212] hover:text-[#8C6F48] transition-colors cursor-pointer"
              aria-label="Open Sanctuary Basket"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.4}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-[#8C6F48] text-[#F8F6F0] text-[9px] font-mono font-medium w-4 h-4 rounded-full flex items-center justify-center border border-[#F8F6F0] shadow-xs"
                >
                  {totalItems}
                </span>
              )}
            </button>
          )}

          {/* User Account / Login */}
          {isMounted && (
            isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-[#736E65] hover:text-[#121212] font-mono bg-white px-3 py-1.5 rounded-full border border-[#E8E3D9]"
                >
                  {user?.name?.split(' ')[0] || 'Patron'}
                </Link>
                <button
                  onClick={logout}
                  className="text-[10px] uppercase tracking-wider text-[#736E65] hover:text-red-600 transition-colors cursor-pointer px-2 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-[10px] uppercase tracking-wider bg-[#121212] text-[#F8F6F0] hover:bg-[#8C6F48] transition-colors px-4 py-1.5 rounded-full"
              >
                Sign In
              </Link>
            )
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#121212] hover:text-[#8C6F48] transition-colors"
            aria-label="Toggle Navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#F8F6F0] border-b border-[#E8E3D9] px-6 py-5 space-y-4"
          >
            <nav className="flex flex-col space-y-3 text-xs uppercase tracking-widest text-[#736E65]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-[#121212] transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}

              {isMounted && isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#8C6F48] font-medium py-1"
                >
                  Admin Atelier Dashboard
                </Link>
              )}

              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#121212] transition-colors py-1"
              >
                Personal Sanctuary Profile
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}