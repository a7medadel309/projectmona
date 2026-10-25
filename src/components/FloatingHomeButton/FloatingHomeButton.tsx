"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { IoHomeOutline } from 'react-icons/io5'

export default function FloatingHomeButton() {
  const pathname = usePathname()

  // Law e7na aslan fel-HomePage mesh lazem yezhar
  if (pathname === '/') return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        href="/"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#121212]/90 backdrop-blur-md text-[#F8F6F0] border border-[#E8E3D9]/30 shadow-xl hover:bg-[#8C6F48] hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        title="Return to Sanctuary Home"
      >
        <IoHomeOutline className="text-base text-[#C2A379] group-hover:text-white transition-colors" />
        <span className="text-[11px] uppercase tracking-[0.2em] font-medium pr-1">
          Home
        </span>
      </Link>
    </motion.div>
  )
}