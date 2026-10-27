'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CgClose } from 'react-icons/cg'
import { FaComment } from 'react-icons/fa'
import { IoIosHome } from 'react-icons/io'
import { PiNewspaper } from 'react-icons/pi'

interface NavLink {
  path: string
  label: string
  icon: React.ReactNode
}

interface AdminSidebarProps {
  sidebarOpen?: boolean
  onClose?: () => void
}

const AdminSidebar = ({ sidebarOpen, onClose }: AdminSidebarProps) => {
  const pathname = usePathname()

  const navlinks: NavLink[] = [
    { path: '/admin', label: 'Dashboard', icon: <IoIosHome /> },
    { path: '/admin/posts-table', label: 'Fragrance Archive', icon: <PiNewspaper /> },
    { path: '/admin/comments-table', label: 'Client Reviews', icon: <FaComment /> },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 h-full w-[80vw] max-w-75 bg-[#121212] text-[#F8F6F0] z-50 border-r border-[#2A2A2A] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:w-64`}
      >
        <div>
          {/* Header & Mobile Close */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-[#222]">
            <div>
              <span className="text-xl font-light tracking-[0.3em] uppercase text-white block">
                SUKOON
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#C2A379] uppercase font-sans mt-0.5 block">
                Atelier Management
              </span>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 -mr-2 md:hidden text-[#9E9B97] hover:text-white text-2xl cursor-pointer rounded-lg hover:bg-[#1E1E1E] transition-colors"
              aria-label="Close menu"
            >
              <CgClose />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-2">
            {navlinks.map((link) => {
              const isActive = pathname === link.path
              return (
                <Link
                  key={link.label}
                  href={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all min-h-[48px] ${
                    isActive
                      ? 'bg-[#1E1E1E] text-[#C2A379] font-medium border border-[#333]'
                      : 'text-[#9E9B97] hover:text-white hover:bg-[#1A1A1A]'
                  }`}
                >
                  <span className={`text-lg transition-transform group-hover:scale-110 ${isActive ? 'text-[#C2A379]' : 'text-[#736E65]'}`}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer Sign Out */}
        <div className="p-6 border-t border-[#222] pb-10 md:pb-6">
          <button className="w-full py-3 px-4 rounded-xl border border-[#333] text-xs uppercase tracking-widest text-[#9E9B97] hover:text-white hover:bg-[#1E1E1E] hover:border-red-900/50 transition-all cursor-pointer min-h-[44px]">
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar