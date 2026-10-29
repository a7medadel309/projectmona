'use client'
import React, { createContext, useContext, useState, useSyncExternalStore } from 'react'

export interface Order {
  id: string
  userId?: string
  userEmail?: string
  customerName: string
  phone: string
  perfumeTitle: string
  totalPrice: number
  status: 'Pending' | 'Completed' | 'Declined'
  declineReason?: string
  date?: string
}

export interface AdminNotification {
  id: string
  orderId: string
  message: string
  time: string
  isRead: boolean
}

interface OrderContextType {
  orders: Order[]
  adminNotifications: AdminNotification[]
  addOrder: (order: Omit<Order, 'id' | 'status'>) => void
  toggleOrderStatus: (id: string) => void
  declineOrder: (id: string, outOfStockItem: string) => void
  deleteOrder: (id: string) => void
  markAdminNotifAsRead: (id: string) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

const ORDERS_KEY = 'sukoon_live_orders'
const NOTIFS_KEY = 'sukoon_admin_notifications'

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const rawOrders = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(ORDERS_KEY) || '[]',
    () => '[]'
  )
  const rawNotifs = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(NOTIFS_KEY) || '[]',
    () => '[]'
  )

  const [localOrders, setLocalOrders] = useState<Order[] | null>(null)
  const [localNotifs, setLocalNotifs] = useState<AdminNotification[] | null>(null)

  const orders: Order[] = localOrders ?? JSON.parse(rawOrders)
  const adminNotifications: AdminNotification[] = localNotifs ?? JSON.parse(rawNotifs)

  const saveOrders = (newOrders: Order[]) => {
    setLocalOrders(newOrders)
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(newOrders))
    } catch (e) {
      console.error(e)
    }
  }

  const saveNotifs = (newNotifs: AdminNotification[]) => {
    setLocalNotifs(newNotifs)
    try {
      localStorage.setItem(NOTIFS_KEY, JSON.stringify(newNotifs))
    } catch (e) {
      console.error(e)
    }
  }

  const addOrder = (orderData: Omit<Order, 'id' | 'status'>) => {
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-GB'),
    }

    const newNotif: AdminNotification = {
      id: `NTF-${Date.now()}`,
      orderId: orderId,
      message: `New Order Placed: ${newOrder.perfumeTitle} by ${newOrder.customerName}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    }

    saveOrders([newOrder, ...orders])
    saveNotifs([newNotif, ...adminNotifications])
  }

  const toggleOrderStatus = (id: string) => {
    const updated = orders.map((o) =>
      o.id === id
        ? {
            ...o,
            status: (o.status === 'Pending' ? 'Completed' : 'Pending') as 'Pending' | 'Completed',
          }
        : o
    )
    saveOrders(updated)
  }

  const declineOrder = (id: string, outOfStockItem: string) => {
    const updated = orders.map((o) =>
      o.id === id
        ? {
            ...o,
            status: 'Declined' as const,
            declineReason: outOfStockItem,
          }
        : o
    )
    saveOrders(updated)
  }

  const deleteOrder = (id: string) => {
    saveOrders(orders.filter((o) => o.id !== id))
  }

  const markAdminNotifAsRead = (id: string) => {
    saveNotifs(adminNotifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        adminNotifications,
        addOrder,
        toggleOrderStatus,
        declineOrder,
        deleteOrder,
        markAdminNotifAsRead,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrders must be used within an OrderProvider')
  return context
}