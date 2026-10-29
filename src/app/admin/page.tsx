'use client'
import React, { useState, useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useInventory, type InventoryItem } from '@/context/InventoryContext'
import { useOrders } from '@/context/OrderContext'

const emptySubscribe = () => () => {}
type AdminOrder = {
  id: string | number
  customerName: string
  phone: string
  perfumeTitle: string
  totalPrice: number
  status: string
  declineReason?: string
}

type AdminNotification = {
  id: string | number
  isRead: boolean
  message: string
  time: string
}

const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // Client
    () => false  // Server
  )
}

export default function AdminDashboardPage() {
  const mounted = useIsMounted()

  const { inventory, archiveEdition, addEdition, updatePrice } = useInventory() as {
    inventory: InventoryItem[]
    archiveEdition: (id: number) => void
    addEdition: (item: Omit<InventoryItem, 'id' | 'isArchived'>) => void
    updatePrice: (id: number, newPrice: number) => void
  }

  const { orders, toggleOrderStatus, declineOrder, deleteOrder, adminNotifications, markAdminNotifAsRead } = useOrders() as {
    orders: AdminOrder[]
    toggleOrderStatus: (id: AdminOrder['id']) => void
    declineOrder: (id: AdminOrder['id'], outOfStockItem: string) => void
    deleteOrder: (id: AdminOrder['id']) => void
    adminNotifications: AdminNotification[]
    markAdminNotifAsRead: (id: AdminNotification['id']) => void
  }

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders'>('inventory')

  const [editingItem, setEditingItem] = useState<{ id: number; title: string; price: number } | null>(null)
  const [newPrice, setNewPrice] = useState<string>('')

  // State للـ Decline Modal
  const [decliningOrderId, setDecliningOrderId] = useState<AdminOrder['id'] | null>(null)
  const [outOfStockName, setOutOfStockName] = useState<string>('')

  const [isAddingNew, setIsAddingNew] = useState<boolean>(false)
  const [newPerfume, setNewPerfume] = useState({
    title: '',
    brand: 'Sukoon Edition',
    accords: '',
    body: '',
    price: '',
    volume: '100ml',
    status: 'In Stock',
  })

  const handleOpenEdit = (item: { id: number; title: string; price: number }) => {
    setEditingItem({ id: Number(item.id), title: item.title, price: item.price })
    setNewPrice(item.price.toString())
  }

  const handleSavePrice = () => {
    if (editingItem && newPrice && !isNaN(Number(newPrice))) {
      const numericPrice = Number(newPrice)
      updatePrice(editingItem.id, numericPrice)
      setEditingItem(null)
      setNewPrice('')
    }
  }

  const handleConfirmDecline = () => {
    if (decliningOrderId && outOfStockName.trim()) {
      declineOrder(decliningOrderId, outOfStockName.trim())
      setDecliningOrderId(null)
      setOutOfStockName('')
    }
  }

  const handleCreateEdition = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPerfume.title || !newPerfume.price) return

    if (addEdition) {
      addEdition({
        title: newPerfume.title,
        brand: newPerfume.brand,
        accords: newPerfume.accords,
        body: newPerfume.body || newPerfume.accords,
        price: Number(newPerfume.price),
        volume: newPerfume.volume,
        status: newPerfume.status,
      } as Omit<InventoryItem, 'id' | 'isArchived'>)
    }

    setNewPerfume({
      title: '',
      brand: 'Sukoon Edition',
      accords: '',
      body: '',
      price: '',
      volume: '100ml',
      status: 'In Stock',
    })
    setIsAddingNew(false)
  }

  const inventoryCount = mounted && inventory ? inventory.length : 0
  const ordersCount = mounted && orders ? orders.length : 0
  const totalUnits = inventoryCount * 28
  const totalValue = mounted && inventory ? inventory.reduce((acc: number, curr: InventoryItem) => acc + (curr.price || 0), 0) : 0
  const pendingOrdersCount = mounted && orders ? orders.filter((o) => o.status === 'Pending').length : 0
  const unreadNotifs = mounted && adminNotifications ? adminNotifications.filter((n) => !n.isRead) : []

  if (!mounted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F48] font-mono animate-pulse">
          Loading Sukoon Sanctuary Atelier...
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-6 px-4 md:px-8 pb-16 max-w-7xl mx-auto pt-2">
      {/* تنبيه الأدمن بوجود طلب جديد */}
      {unreadNotifs.length > 0 && (
        <div className="space-y-2">
          {unreadNotifs.map((notif) => (
            <div
              key={notif.id}
              className="p-4 rounded-2xl bg-[#121212] text-white flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <div>
                  <p className="text-xs font-mono font-medium">{notif.message}</p>
                  <span className="text-[10px] text-neutral-400 font-mono">{notif.time}</span>
                </div>
              </div>
              <button
                onClick={() => markAdminNotifAsRead(notif.id)}
                className="text-[10px] font-mono uppercase tracking-widest text-[#8C6F48] hover:text-[#d3ad7c] transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Action / Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-mono whitespace-nowrap min-h-[42px] transition-colors cursor-pointer ${
            activeTab === 'inventory'
              ? 'bg-[#121212] text-white'
              : 'bg-white border border-[#E8E3D9] text-[#121212] hover:bg-[#F8F6F0]'
          }`}
        >
          Active Reserves ({inventoryCount})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-mono whitespace-nowrap min-h-[42px] transition-colors cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-[#121212] text-white'
              : 'bg-white border border-[#E8E3D9] text-[#121212] hover:bg-[#F8F6F0]'
          }`}
        >
          Orders & Dispatches ({ordersCount})
        </button>

        {activeTab === 'inventory' && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="px-5 py-2.5 rounded-full bg-white border border-[#E8E3D9] text-[#8C6F48] text-xs uppercase tracking-widest font-mono whitespace-nowrap hover:bg-[#F8F6F0] min-h-[42px] transition-colors cursor-pointer"
          >
            + New Edition
          </button>
        )}
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3D9] shadow-xs">
          <span className="text-[10px] tracking-wider uppercase text-[#736E65] font-mono block">
            Active Reserves
          </span>
          <span className="text-lg sm:text-2xl font-light text-[#121212] mt-1 block">
            {inventoryCount} Extracts
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

        <div
          onClick={() => setActiveTab('orders')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3D9] shadow-xs cursor-pointer hover:border-[#121212] transition-colors"
        >
          <span className="text-[10px] tracking-wider uppercase text-[#736E65] font-mono block">
            Pending Orders
          </span>
          <span className="text-lg sm:text-2xl font-light text-[#121212] mt-1 block">
            {pendingOrdersCount} Dispatches
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

      {/* View Switcher: Inventory vs Orders */}
      {activeTab === 'inventory' ? (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-light text-[#121212]">Active Formulations</h2>
            <span className="text-xs text-[#736E65] font-mono">Live In Stock</span>
          </div>

          {/* Mobile Cards View */}
          <div className="grid grid-cols-1 gap-3.5 md:hidden">
            {(inventory || []).map((item: InventoryItem) => {
              const itemRecord = item as unknown as Record<string, unknown>
              const brandName = (itemRecord.brand as string) || (itemRecord.house as string) || 'Sukoon Edition'
              const itemId = Number(item.id)

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E3D9] shadow-xs flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#8C6F48] tracking-wider block">
                        {brandName}
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

          {/* Desktop Table View */}
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
                  {(inventory || []).map((item: InventoryItem) => {
                    const itemRecord = item as unknown as Record<string, unknown>
                    const brandName = (itemRecord.brand as string) || (itemRecord.house as string) || 'Sukoon Edition'
                    const itemId = Number(item.id)

                    return (
                      <tr key={item.id} className="hover:bg-[#F8F6F0]/40 transition-colors">
                        <td className="py-4 px-6 font-medium text-[#121212]">{item.title}</td>
                        <td className="py-4 px-6 text-[#736E65] font-mono text-[11px]">{brandName}</td>
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
      ) : (
        /* Orders & Dispatches Section */
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-light text-[#121212]">Client Orders</h2>
            <span className="text-xs text-[#736E65] font-mono">
              {pendingOrdersCount} Pending Action
            </span>
          </div>

          {/* Orders Mobile Cards */}
          <div className="grid grid-cols-1 gap-3.5 md:hidden">
            {(orders || []).map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-2xl border border-[#E8E3D9] shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#8C6F48]">{order.id}</span>
                    <h3 className="text-base font-medium text-[#121212]">{order.customerName}</h3>
                    <p className="text-xs text-[#736E65] font-mono">{order.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-mono rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : order.status === 'Declined'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {order.status}
                    </span>
                    <button
                      onClick={() => deleteOrder(order.id)}
                      title="Delete Order"
                      className="w-7 h-7 rounded-full border border-neutral-200 text-neutral-400 hover:text-rose-600 hover:border-rose-300 flex items-center justify-center text-xs transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F8F6F0] text-xs">
                  <span className="text-[#121212] font-medium">{order.perfumeTitle}</span>
                  <span className="font-semibold text-[#121212]">{order.totalPrice.toLocaleString()} EGP</span>
                </div>

                {order.declineReason && (
                  <p className="text-[11px] text-rose-600 font-mono">
                    Out of stock: {order.declineReason}
                  </p>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => toggleOrderStatus(order.id)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                      order.status === 'Completed'
                        ? 'bg-neutral-100 text-[#736E65] hover:bg-neutral-200'
                        : 'bg-[#121212] text-white hover:bg-neutral-800'
                    }`}
                  >
                    {order.status === 'Completed' ? 'Mark as Pending' : 'Mark as Completed'}
                  </button>

                  {order.status !== 'Declined' && (
                    <button
                      onClick={() => {
                        setDecliningOrderId(order.id)
                        const firstItem = order.perfumeTitle.split(',')[0].replace(/\(x\d+\)/, '').trim()
                        setOutOfStockName(firstItem)
                      }}
                      className="px-3.5 py-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono rounded-xl hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      Decline
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Orders Desktop Table */}
          <div className="hidden md:block bg-white rounded-3xl border border-[#E8E3D9] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#F8F6F0] text-[11px] uppercase tracking-wider text-[#736E65]">
                    <th className="py-4 px-6">Order ID</th>
                    <th className="py-4 px-6">Customer</th>
                    <th className="py-4 px-6">Phone</th>
                    <th className="py-4 px-6">Edition</th>
                    <th className="py-4 px-6">Total</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F8F6F0] font-light">
                  {(orders || []).map((order) => (
                    <tr key={order.id} className="hover:bg-[#F8F6F0]/40 transition-colors">
                      <td className="py-4 px-6 font-mono text-[11px] text-[#8C6F48]">{order.id}</td>
                      <td className="py-4 px-6 font-medium text-[#121212]">{order.customerName}</td>
                      <td className="py-4 px-6 text-[#736E65] font-mono">{order.phone}</td>
                      <td className="py-4 px-6 text-[#121212]">
                        <div>{order.perfumeTitle}</div>
                        {order.declineReason && (
                          <div className="text-[10px] text-rose-500 font-mono">
                            Out of stock: {order.declineReason}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 font-medium text-[#121212]">
                        {order.totalPrice.toLocaleString()} EGP
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono ${
                            order.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : order.status === 'Declined'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => toggleOrderStatus(order.id)}
                          className="text-[#8C6F48] hover:underline cursor-pointer font-medium"
                        >
                          {order.status === 'Completed' ? 'Revert to Pending' : 'Mark as Completed'}
                        </button>
                        {order.status !== 'Declined' && (
                          <button
                            onClick={() => {
                              setDecliningOrderId(order.id)
                              const firstItem = order.perfumeTitle.split(',')[0].replace(/\(x\d+\)/, '').trim()
                              setOutOfStockName(firstItem)
                            }}
                            className="text-rose-600 hover:underline cursor-pointer font-medium ml-2"
                          >
                            Decline
                          </button>
                        )}
                        <button
                          onClick={() => deleteOrder(order.id)}
                          title="Delete Order"
                          className="text-neutral-400 hover:text-rose-600 ml-3 font-bold px-1.5 py-0.5 rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal 1: Quick Edit Price Modal */}
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

      {/* Modal 2: New Edition Modal */}
      <AnimatePresence>
        {isAddingNew && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-[#E8E3D9] shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-[#F8F6F0] pb-3">
                <h3 className="text-base font-medium text-[#121212]">
                  Add New Formulation
                </h3>
                <span className="text-[10px] font-mono uppercase text-[#8C6F48] tracking-widest">
                  Sukoon Inventory
                </span>
              </div>

              <form onSubmit={handleCreateEdition} className="space-y-3.5">
                <div>
                  <label className="text-[11px] text-[#736E65] block mb-1 font-mono uppercase">
                    Fragrance Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liquid Brun, Hawas Black..."
                    value={newPerfume.title}
                    onChange={(e) => setNewPerfume({ ...newPerfume, title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3D9] text-sm focus:outline-none focus:border-[#121212]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#736E65] block mb-1 font-mono uppercase">
                      Brand
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. French Avenue"
                      value={newPerfume.brand}
                      onChange={(e) => setNewPerfume({ ...newPerfume, brand: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3D9] text-sm focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-[#736E65] block mb-1 font-mono uppercase">
                      Volume
                    </label>
                    <input
                      type="text"
                      placeholder="100ml"
                      value={newPerfume.volume}
                      onChange={(e) => setNewPerfume({ ...newPerfume, volume: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3D9] text-sm focus:outline-none focus:border-[#121212]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#736E65] block mb-1 font-mono uppercase">
                    Price (EGP)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="2500"
                    value={newPerfume.price}
                    onChange={(e) => setNewPerfume({ ...newPerfume, price: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3D9] text-sm focus:outline-none focus:border-[#121212]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-[#736E65] block mb-1 font-mono uppercase">
                    Main Accords
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Warm Spicy, Vanilla, Cinnamon, Woody"
                    value={newPerfume.accords}
                    onChange={(e) => setNewPerfume({ ...newPerfume, accords: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8E3D9] text-sm focus:outline-none focus:border-[#121212]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#F8F6F0]">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2 text-xs text-[#736E65] hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs bg-[#121212] text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium cursor-pointer"
                  >
                    Create Reserve
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 3: Decline Order Modal (Out of Stock) */}
      <AnimatePresence>
        {decliningOrderId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 border border-[#E8E3D9] shadow-xl"
            >
              <h3 className="text-base font-medium text-[#121212]">
                Decline Reserve: Out of Stock
              </h3>
              <p className="text-xs text-[#736E65] leading-relaxed">
                Specify or confirm which edition has run out of stock. This fragrance title will be shown directly in the client&apos;s notification:
              </p>
              <div>
                <label className="text-[11px] text-[#736E65] block mb-1 font-mono uppercase">
                  Depleted Edition Title
                </label>
                <input
                  type="text"
                  required
                  value={outOfStockName}
                  onChange={(e) => setOutOfStockName(e.target.value)}
                  placeholder="e.g. Hawas for Him, Liquid Brun..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E3D9] text-xs focus:outline-none focus:border-[#121212]"
                  autoFocus
                />
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDecliningOrderId(null)
                    setOutOfStockName('')
                  }}
                  className="px-4 py-2 text-xs text-[#736E65] hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDecline}
                  className="px-4 py-2 text-xs bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium cursor-pointer"
                >
                  Confirm Decline
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}