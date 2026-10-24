'use client'
import React, { useState } from 'react'
import AdminSidebar from '../admin/AdminSidebar'
import { IoMenu } from 'react-icons/io5'

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#F8F6F0]">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 transition-all">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Top Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E8E3D9]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6F48] font-medium">
                Administrative Suite
              </span>
              <h2 className="text-3xl font-light text-[#121212] tracking-tight mt-1">
                Maison Oversight
              </h2>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-[#E8E3D9] text-[#121212] hover:bg-[#F8F6F0] transition-colors cursor-pointer"
            >
              <IoMenu className="w-5 h-5" />
            </button>
          </div>

          {/* Children container */}
          <div>
            {children}
          </div>

        </div>
      </main>
    </div>
  )
}

export default AdminLayout