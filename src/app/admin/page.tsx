'use client'
import React, { useState } from 'react'
import { motion } from 'motion/react'
import AdminPostForm from '../admin/adminPostForm'

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'create'>('inventory')

  return (
    <div className="space-y-8">
      {/* Action / View Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-[#E8E3D9] shadow-xs">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] transition-all cursor-pointer ${
              activeTab === 'inventory'
                ? 'bg-[#121212] text-white shadow-xs'
                : 'text-[#736E65] hover:text-[#121212]'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-[0.15em] transition-all cursor-pointer ${
              activeTab === 'create'
                ? 'bg-[#121212] text-white shadow-xs'
                : 'text-[#736E65] hover:text-[#121212]'
            }`}
          >
            + New Edition
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#E8E3D9] shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Active Reserves</p>
          <p className="text-2xl font-light text-[#121212] mt-1">12 Extracts</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-[#E8E3D9] shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Total Flacons</p>
          <p className="text-2xl font-light text-[#121212] mt-1">340 Units</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-[#E8E3D9] shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Pending Orders</p>
          <p className="text-2xl font-light text-[#8C6F48] mt-1">18 Dispatches</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-[#E8E3D9] shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Monthly Volume</p>
          <p className="text-2xl font-light text-[#121212] mt-1">54,800 EGP</p>
        </div>
      </div>

      {/* Tab 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl border border-[#E8E3D9] overflow-hidden shadow-xs"
        >
          <div className="p-6 border-b border-[#F8F6F0]">
            <h3 className="text-base font-medium text-[#121212]">Archived Formulations</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F8F6F0] text-[11px] uppercase tracking-wider text-[#736E65]">
                  <th className="py-4 px-6">Flacon Name</th>
                  <th className="py-4 px-6">Accords</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F6F0] text-xs font-light">
                <tr>
                  <td className="py-4 px-6 font-medium text-[#121212]">Amber & Velvet Woods</td>
                  <td className="py-4 px-6 text-[#736E65]">Amber, Sandalwood, Birch</td>
                  <td className="py-4 px-6 text-[#121212]">1,850 EGP</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px]">In Stock</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-[#8C6F48] hover:underline mr-4 cursor-pointer">Edit</button>
                    <button className="text-red-500 hover:underline cursor-pointer">Archive</button>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-[#121212]">Smoky Birch & Leather</td>
                  <td className="py-4 px-6 text-[#736E65]">Tuscan Leather, Incense</td>
                  <td className="py-4 px-6 text-[#121212]">1,950 EGP</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px]">Low Reserve</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-[#8C6F48] hover:underline mr-4 cursor-pointer">Edit</button>
                    <button className="text-red-500 hover:underline cursor-pointer">Archive</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Creation Form Component */}
      {activeTab === 'create' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-8 md:p-10 rounded-3xl border border-[#E8E3D9] shadow-xs"
        >
          <AdminPostForm />
        </motion.div>
      )}
    </div>
  )
}