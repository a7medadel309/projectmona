"use client"
import React, { createContext, useContext, useState, useSyncExternalStore } from 'react'
import { toast } from 'react-toastify'

export interface CartItem {
  id: number
  title: string
  price: number
  volume?: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  totalAmount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, delta: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'sukoon_cart'
const EMPTY_CART: CartItem[] = []

// دالة المزامنة مع LocalStorage والأحداث داخل التطبيق
const subscribe = (callback: () => void) => {
  if (typeof window === 'undefined') return () => {}
  window.addEventListener('storage', callback)
  window.addEventListener('sukoon_cart_updated', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('sukoon_cart_updated', callback)
  }
}

let cachedRaw: string | null = null
let cachedCart: CartItem[] = []

const getSnapshot = (): CartItem[] => {
  if (typeof window === 'undefined') return EMPTY_CART
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (raw !== cachedRaw) {
      cachedRaw = raw
      cachedCart = raw ? JSON.parse(raw) : EMPTY_CART
    }
    return cachedCart
  } catch {
    return EMPTY_CART
  }
}

const getServerSnapshot = (): CartItem[] => EMPTY_CART

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cart = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const saveCart = (newCart: CartItem[]) => {
    try {
      const raw = JSON.stringify(newCart)
      localStorage.setItem(CART_STORAGE_KEY, raw)
      cachedRaw = raw
      cachedCart = newCart
      window.dispatchEvent(new Event('sukoon_cart_updated'))
    } catch (e) {
      console.error(e)
    }
  }

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const current = getSnapshot()
    const existing = current.find((i) => i.id === item.id)
    let updated: CartItem[]

    if (existing) {
      toast.info(`Increased quantity for ${item.title}`)
      updated = current.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
    } else {
      toast.success(`${item.title} added to basket`)
      updated = [...current, { ...item, quantity: 1 }]
    }

    saveCart(updated)
    setIsCartOpen(true) // فتح درج السلة تلقائياً عند إضافة أي عطر
  }

  const removeFromCart = (id: number) => {
    const current = getSnapshot()
    const updated = current.filter((i) => i.id !== id)
    saveCart(updated)
    toast.error('Item removed from basket')
  }

  const updateQuantity = (id: number, delta: number) => {
    const current = getSnapshot()
    const updated = current
      .map((i) => {
        if (i.id === id) {
          const newQty = i.quantity + delta
          return newQty > 0 ? { ...i, quantity: newQty } : null
        }
        return i
      })
      .filter(Boolean) as CartItem[]
    saveCart(updated)
  }

  const clearCart = () => {
    saveCart([])
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}