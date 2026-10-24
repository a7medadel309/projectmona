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
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#121212] text-[#F8F6F0] z-50 border-r border-[#2A2A2A] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div>
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="absolute top-6 right-5 md:hidden text-[#9E9B97] hover:text-white text-xl cursor-pointer"
          >
            <CgClose />
          </button>

          {/* Logo / Header */}
          <div className="flex flex-col items-start px-8 py-8 border-b border-[#222]">
            <span className="text-xl font-light tracking-[0.3em] uppercase text-white">
              SUKOON
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#C2A379] uppercase font-sans mt-0.5">
              Atelier Management
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="px-4 py-6 space-y-1.5">
            {navlinks.map((link) => {
              const isActive = pathname === link.path
              return (
                <Link
                  key={link.label}
                  href={link.path}
                  onClick={onClose}
                  className={`flex items-center space-x-3.5 px-4 py-3 rounded-xl text-xs uppercase tracking-[0.15em] transition-all group ${
                    isActive
                      ? 'bg-[#1E1E1E] text-[#C2A379] font-medium border border-[#333]'
                      : 'text-[#9E9B97] hover:text-white hover:bg-[#1A1A1A]'
                  }`}
                >
                  <span className={`text-base transition-transform group-hover:scale-110 ${isActive ? 'text-[#C2A379]' : 'text-[#736E65]'}`}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-6 border-t border-[#222]">
          <button className="w-full py-2.5 px-4 rounded-xl border border-[#333] text-xs uppercase tracking-widest text-[#9E9B97] hover:text-white hover:bg-[#1E1E1E] hover:border-red-900/50 transition-all cursor-pointer">
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar