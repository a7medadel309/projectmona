'use client'
import React from 'react'
import { motion } from 'motion/react'
import { useInventory } from '@/context/InventoryContext'

export default function FragranceArchivePage() {
  const { archivedInventory, restoreEdition, deletePermanently } = useInventory()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E3D9]">
        <div>
          <h2 className="text-2xl font-light text-[#121212]">Fragrance Archive</h2>
          <p className="text-xs text-[#736E65] font-light mt-1">
            Archived formulations hidden from live sales but preserved in maison vaults
          </p>
        </div>
        <span className="px-4 py-1.5 rounded-full bg-white border border-[#E8E3D9] text-xs text-[#8C6F48] font-mono">
          {archivedInventory.length} Archived
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-3xl border border-[#E8E3D9] overflow-hidden shadow-xs"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F8F6F0] text-[11px] uppercase tracking-wider text-[#736E65]">
                <th className="py-4 px-6">Flacon Name</th>
                <th className="py-4 px-6">Accords</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Volume</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8F6F0] text-xs font-light">
              {archivedInventory.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-[#9E9B97]">
                    <p className="font-serif italic text-lg mb-1">Archive is Empty</p>
                    <p className="text-xs text-[#736E65]">No fragrances have been archived from the dashboard yet.</p>
                  </td>
                </tr>
              ) : (
                archivedInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F8F6F0]/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#121212]">{item.title}</td>
                    <td className="py-4 px-6 text-[#736E65]">{item.accords}</td>
                    <td className="py-4 px-6 text-[#121212] font-medium">{item.price.toLocaleString()} EGP</td>
                    <td className="py-4 px-6 text-[#736E65] font-mono text-[11px]">{item.volume}</td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <button
                        onClick={() => restoreEdition(item.id)}
                        className="text-emerald-700 hover:underline cursor-pointer font-medium"
                      >
                        Restore to Live
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Permanently delete "${item.title}"?`)) {
                            deletePermanently(item.id)
                          }
                        }}
                        className="text-red-500 hover:underline cursor-pointer"
                      >
                        Delete Forever
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}