import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        href="/posts" 
        className="text-xs uppercase tracking-[0.2em] text-[#736E65] hover:text-[#121212] transition-colors"
      >
        Collections
      </Link>
      <Link 
        href="/contact" 
        className="text-xs uppercase tracking-[0.2em] text-[#736E65] hover:text-[#121212] transition-colors"
      >
        Contact
      </Link>
      <Link 
        href="/admin" 
        className="text-xs uppercase tracking-[0.2em] text-[#736E65] hover:text-[#121212] transition-colors"
      >
        Dashboard
      </Link>
    </nav>
  )
}

export default Navbar