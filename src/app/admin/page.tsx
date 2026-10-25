'use client'
import React, { useState, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { useInventory } from '@/context/InventoryContext'

const emptySubscribe = () => () => {}
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'inventory' | 'create'>('inventory')
  const { activeInventory, addEdition, archiveEdition, updatePrice, toggleStatus } = useInventory()
  const isMounted = useIsMounted()

  // Form State
  const [brand, setBrand] = useState('Sukoon Private')
  const [editionName, setEditionName] = useState('')
  const [accords, setAccords] = useState('')
  const [price, setPrice] = useState('')
  const [volume, setVolume] = useState('100ml')
  const [status, setStatus] = useState<'In Stock' | 'Low Reserve' | 'Out of Stock'>('In Stock')

  const handleEditPrice = (id: number, currentPrice: number, title: string) => {
    const newPriceStr = prompt(`Set new retail price for ${title} (EGP):`, currentPrice.toString())
    if (!newPriceStr) return
    const newPrice = parseInt(newPriceStr, 10)
    if (isNaN(newPrice) || newPrice <= 0) {
      toast.error('Invalid price entered')
      return
    }
    updatePrice(id, newPrice)
  }

  const handleCreateEdition = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editionName || !price || !accords) {
      toast.error('Please complete all formulation details')
      return
    }

    addEdition({
      brand,
      title: editionName,
      body: accords,
      accords,
      price: parseInt(price, 10),
      volume,
      status,
    })

    setEditionName('')
    setAccords('')
    setPrice('')
    setBrand('Sukoon Private')
    setActiveTab('inventory')
  }

  if (!isMounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F48] font-mono animate-pulse">
          Loading Atelier Inventory...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* View Switcher */}
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
            Active Reserves ({activeInventory.length})
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

      {/* Dynamic Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-[#E8E3D9] shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Active Reserves</p>
          <p className="text-2xl font-light text-[#121212] mt-1" suppressHydrationWarning>
            {activeInventory.length} Extracts
          </p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-[#E8E3D9] shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Total Flacons</p>
          <p className="text-2xl font-light text-[#121212] mt-1" suppressHydrationWarning>
            {activeInventory.length * 28} Units
          </p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-[#E8E3D9] shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Pending Orders</p>
          <p className="text-2xl font-light text-[#8C6F48] mt-1">18 Dispatches</p>
        </div>
        <div className="p-5 bg-white rounded-2xl border border-[#E8E3D9] shadow-xs">
          <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Inventory Value</p>
          <p className="text-2xl font-light text-[#121212] mt-1" suppressHydrationWarning>
            {activeInventory.reduce((sum, item) => sum + item.price, 0).toLocaleString()} EGP
          </p>
        </div>
      </div>

      {/* Tab 1: Inventory Table */}
      {activeTab === 'inventory' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-3xl border border-[#E8E3D9] overflow-hidden shadow-xs"
        >
          <div className="p-6 border-b border-[#F8F6F0] flex items-center justify-between">
            <h3 className="text-base font-medium text-[#121212]">Active Formulations</h3>
            <span className="text-[11px] text-[#8C6F48] font-mono">Live In Stock</span>
          </div>
          
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
                {activeInventory.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-[#9E9B97]">
                      No active formulations. Add a new edition or restore from Fragrance Archive.
                    </td>
                  </tr>
                ) : (
                  activeInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F8F6F0]/40 transition-colors">
                      <td className="py-4 px-6 font-medium text-[#121212]">{item.title}</td>
                      <td className="py-4 px-6 text-[#8C6F48] font-medium">{item.brand}</td>
                      <td className="py-4 px-6 text-[#736E65] max-w-xs truncate">{item.accords || item.body}</td>
                      <td className="py-4 px-6 text-[#121212] font-medium" suppressHydrationWarning>
                        {item.price.toLocaleString()} EGP
                      </td>
                      <td className="py-4 px-6 text-[#736E65] font-mono text-[11px]">{item.volume}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleStatus(item.id)}
                          title="Click to toggle status"
                          className="cursor-pointer"
                        >
                          <span className={`px-3 py-1 rounded-full text-[10px] font-medium ${
                            item.status === 'In Stock'
                              ? 'bg-emerald-50 text-emerald-700'
                              : item.status === 'Low Reserve'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                          }`}>
                            {item.status}
                          </span>
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right space-x-3">
                        <button
                          onClick={() => handleEditPrice(item.id, item.price, item.title)}
                          className="text-[#8C6F48] hover:underline cursor-pointer"
                        >
                          Edit Price
                        </button>
                        <button
                          onClick={() => archiveEdition(item.id)}
                          className="text-amber-700 hover:underline cursor-pointer"
                        >
                          Archive
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Tab 2: Creation Form */}
      {activeTab === 'create' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-8 md:p-10 rounded-3xl border border-[#E8E3D9] shadow-xs max-w-2xl mx-auto"
        >
          <div className="border-b border-[#F8F6F0] pb-4 mb-6">
            <h2 className="text-xl font-light text-[#121212]">Register New Formulation</h2>
            <p className="text-xs text-[#736E65] font-light mt-1">
              Add custom extracts directly into the maison management index and public collection
            </p>
          </div>

          <form onSubmit={handleCreateEdition} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#121212] font-medium">
                  House / Brand
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
                >
                  <option value="Sukoon Private">Sukoon Private</option>
                  <option value="Hawas">Hawas</option>
                  <option value="Assaf">Assaf</option>
                  <option value="Ibraq">Ibraq</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#121212] font-medium">
                  Edition Name
                </label>
                <input 
                  type="text" 
                  required
                  value={editionName}
                  onChange={(e) => setEditionName(e.target.value)}
                  placeholder="e.g. Royal Tonka & Smoked Cedar" 
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider text-[#121212] font-medium">
                Olfactory Accords & Dominant Notes
              </label>
              <input 
                type="text" 
                required
                value={accords}
                onChange={(e) => setAccords(e.target.value)}
                placeholder="e.g. Tonka Bean, Cedarwood, Bourbon Vanilla" 
                className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#121212] font-medium">
                  Price (EGP)
                </label>
                <input 
                  type="number" 
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="2200" 
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#121212] font-medium">
                  Flacon Volume
                </label>
                <select
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
                >
                  <option value="100ml EDP">100ml EDP</option>
                  <option value="100ml Extrait">100ml Extrait</option>
                  <option value="50ml EDP">50ml EDP</option>
                  <option value="Discovery Set">Discovery Set</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider text-[#121212] font-medium">
                  Initial Status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as 'In Stock' | 'Low Reserve' | 'Out of Stock')
                  }
                  className="w-full px-3 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Reserve">Low Reserve</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all cursor-pointer shadow-sm"
              >
                Publish Edition to Archive & Collections
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  )
}