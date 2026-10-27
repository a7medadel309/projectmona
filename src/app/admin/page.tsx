'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useInventory } from '@/context/InventoryContext'

export default function AdminDashboardPage() {
  const { inventory, archiveEdition } = useInventory()

  const [editingItem, setEditingItem] = useState<{ id: number; title: string; price: number } | null>(null)
  const [newPrice, setNewPrice] = useState<string>('')

  const handleOpenEdit = (item: { id: number; title: string; price: number }) => {
    setEditingItem({ id: Number(item.id), title: item.title, price: item.price })
    setNewPrice(item.price.toString())
  }

  const handleSavePrice = () => {
    if (editingItem && newPrice && !isNaN(Number(newPrice))) {
      setEditingItem(null)
    }
  }

  const totalUnits = inventory.length * 28
  const totalValue = inventory.reduce((acc, curr) => acc + (curr.price || 0), 0)

  return (
    <div className="space-y-6 px-4 md:px-8 pb-16 max-w-7xl mx-auto pt-2">
      {/* Action / Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button className="px-5 py-2.5 rounded-full bg-[#121212] text-white text-xs uppercase tracking-widest font-mono whitespace-nowrap min-h-[42px]">
          Active Reserves ({inventory.length})
        </button>
        <button className="px-5 py-2.5 rounded-full bg-white border border-[#E8E3D9] text-[#121212] text-xs uppercase tracking-widest font-mono whitespace-nowrap hover:bg-[#F8F6F0] min-h-[42px] transition-colors">
          + New Edition
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3D9] shadow-xs">
          <span className="text-[10px] tracking-wider uppercase text-[#736E65] font-mono block">
            Active Reserves
          </span>
          <span className="text-lg sm:text-2xl font-light text-[#121212] mt-1 block">
            {inventory.length} Extracts
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3D9] shadow-xs">
          <span className="text-[10px] tracking-wider uppercase text-[#736E65] font-mono block">
            Total Flacons
          </span>
          <span className="text-lg sm:text-2xl font-light text-[#121212] mt-1 block">
            {totalUnits} Units
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3D9] shadow-xs">
          <span className="text-[10px] tracking-wider uppercase text-[#736E65] font-mono block">
            Pending Orders
          </span>
          <span className="text-lg sm:text-2xl font-light text-[#121212] mt-1 block">
            18 Dispatches
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3D9] shadow-xs">
          <span className="text-[10px] tracking-wider uppercase text-[#736E65] font-mono block">
            Inventory Value
          </span>
          <span className="text-lg sm:text-2xl font-light text-[#121212] mt-1 block">
            {totalValue.toLocaleString()} EGP
          </span>
        </div>
      </div>

      {/* Active Formulations Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-light text-[#121212]">Active Formulations</h2>
          <span className="text-xs text-[#736E65] font-mono">Live In Stock</span>
        </div>

        {/* 1. Mobile Cards View */}
        <div className="grid grid-cols-1 gap-3.5 md:hidden">
          {inventory.map((item) => {
            const itemRecord = item as unknown as Record<string, unknown>
            const houseName = typeof itemRecord.house === 'string' ? itemRecord.house : 'Sukoon Edition'
            const itemId = Number(item.id)

            return (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3D9] shadow-xs flex flex-col justify-between gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8C6F48] tracking-wider block">
                      {houseName}
                    </span>
                    <h3 className="text-base font-medium text-[#121212] mt-0.5">{item.title}</h3>
                    <p className="text-xs text-[#736E65] mt-1 line-clamp-1">{item.accords}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-mono rounded-full shrink-0">
                    In Stock
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#F8F6F0]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-[#121212]">
                      {item.price.toLocaleString()} EGP
                    </span>
                    <span className="text-[11px] font-mono text-[#736E65]">
                      {item.volume}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEdit({ id: itemId, title: item.title, price: item.price })}
                      className="px-3.5 py-1.5 bg-[#F8F6F0] text-[#121212] text-xs font-medium rounded-lg hover:bg-[#E8E3D9] transition-colors min-h-[38px] cursor-pointer"
                    >
                      Edit Price
                    </button>
                    <button
                      onClick={() => archiveEdition(itemId)}
                      className="px-3.5 py-1.5 bg-neutral-100 text-[#736E65] text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors min-h-[38px] cursor-pointer"
                    >
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* 2. Desktop Table View */}
        <div className="hidden md:block bg-white rounded-3xl border border-[#E8E3D9] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F8F6F0] text-[11px] uppercase tracking-wider text-[#736E65]">
                  <th className="py-4 px-6">Flacon Name</th>
                  <th className="py-4 px-6">House</th>
                  <th className="py-4 px-6">Accords</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Volume</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F8F6F0] text-xs font-light">
                {inventory.map((item) => {
                  const itemRecord = item as unknown as Record<string, unknown>
                  const houseName = typeof itemRecord.house === 'string' ? itemRecord.house : 'Sukoon Edition'
                  const itemId = Number(item.id)

                  return (
                    <tr key={item.id} className="hover:bg-[#F8F6F0]/40 transition-colors">
                      <td className="py-4 px-6 font-medium text-[#121212]">{item.title}</td>
                      <td className="py-4 px-6 text-[#736E65] font-mono text-[11px]">{houseName}</td>
                      <td className="py-4 px-6 text-[#736E65] max-w-[220px] truncate">{item.accords}</td>
                      <td className="py-4 px-6 text-[#121212] font-medium">{item.price.toLocaleString()} EGP</td>
                      <td className="py-4 px-6 text-[#736E65] font-mono text-[11px]">{item.volume}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono">
                          In Stock
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-3">
                        <button
                          onClick={() => handleOpenEdit({ id: itemId, title: item.title, price: item.price })}
                          className="text-[#8C6F48] hover:underline font-medium cursor-pointer"
                        >
                          Edit Price
                        </button>
                        <button
                          onClick={() => archiveEdition(itemId)}
                          className="text-[#736E65] hover:underline cursor-pointer"
                        >
                          Archive
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Edit Price Modal */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 border border-[#E8E3D9] shadow-xl"
            >
              <h3 className="text-base font-medium text-[#121212]">
                Update Price: {editingItem.title}
              </h3>
              <div>
                <label className="text-xs text-[#736E65] block mb-1.5 font-mono uppercase">
                  Price (EGP)
                </label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3D9] text-sm focus:outline-none focus:border-[#121212]"
                  autoFocus
                />
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs text-[#736E65] hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSavePrice}
                  className="px-4 py-2 text-xs bg-[#121212] text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
