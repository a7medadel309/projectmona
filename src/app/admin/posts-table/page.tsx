'use client'
import React from 'react'
import { motion } from 'motion/react'
import { useInventory } from '@/context/InventoryContext'

export default function FragranceArchivePage() {
  const { archivedInventory, restoreEdition, deletePermanently } = useInventory()

  return (
    <div className="space-y-6 px-4 md:px-0 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E3D9]">
        <div>
          <h2 className="text-xl sm:text-2xl font-light text-[#121212]">Fragrance Archive</h2>
          <p className="text-xs sm:text-sm text-[#736E65] font-light mt-1">
            Archived formulations hidden from live sales but preserved in maison vaults
          </p>
        </div>
        <div className="self-start sm:self-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#E8E3D9] text-xs text-[#8C6F48] font-mono">
            {archivedInventory.length} Archived
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        {archivedInventory.length === 0 ? (
          <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E8E3D9] text-center py-16 px-4 text-[#9E9B97]">
            <p className="font-serif italic text-lg sm:text-xl mb-1 text-[#121212]">Archive is Empty</p>
            <p className="text-xs sm:text-sm text-[#736E65]">No fragrances have been archived from the dashboard yet.</p>
          </div>
        ) : (
          <>
            {/* Mobile Cards View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {archivedInventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-5 rounded-2xl border border-[#E8E3D9] shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-base text-[#121212]">{item.title}</h3>
                      <p className="text-xs text-[#736E65] mt-0.5">{item.accords}</p>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 bg-[#F8F6F0] text-[#736E65] rounded-md shrink-0">
                      {item.volume}
                    </span>
                  </div>

                  <div className="text-sm font-medium text-[#121212] pt-1">
                    {item.price.toLocaleString()} <span className="text-xs font-normal text-[#736E65]">EGP</span>
                  </div>

                  <div className="pt-2 border-t border-[#F8F6F0] flex items-center justify-end gap-3">
                    <button
                      onClick={() => restoreEdition(item.id)}
                      className="px-3.5 py-2 text-xs font-medium text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      Restore to Live
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Permanently delete "${item.title}"?`)) {
                          deletePermanently(item.id)
                        }
                      }}
                      className="px-3.5 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Delete Forever
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-3xl border border-[#E8E3D9] overflow-hidden shadow-xs">
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
                    {archivedInventory.map((item) => (
                      <tr key={item.id} className="hover:bg-[#F8F6F0]/40 transition-colors">
                        <td className="py-4 px-6 font-medium text-[#121212]">{item.title}</td>
                        <td className="py-4 px-6 text-[#736E65]">{item.accords}</td>
                        <td className="py-4 px-6 text-[#121212] font-medium">{item.price.toLocaleString()} EGP</td>
                        <td className="py-4 px-6 text-[#736E65] font-mono text-[11px]">{item.volume}</td>
                        <td className="py-4 px-6 text-right space-x-3">
                          <button
                            onClick={() => restoreEdition(item.id)}
                            className="text-emerald-700 hover:underline cursor-pointer font-medium p-1"
                          >
                            Restore to Live
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Permanently delete "${item.title}"?`)) {
                                deletePermanently(item.id)
                              }
                            }}
                            className="text-red-500 hover:underline cursor-pointer p-1"
                          >
                            Delete Forever
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}