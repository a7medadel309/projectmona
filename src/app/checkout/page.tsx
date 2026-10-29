"use client"
import React, { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/AuthContext'

const emptySubscribe = () => () => {}
type CheckoutCartItem = {
  id: string | number
  title: string
  price?: number
  volume?: string | number
  quantity: number
}

type CheckoutCart = {
  cart: CheckoutCartItem[]
  totalAmount: number
  clearCart?: () => void
}

const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, totalAmount, clearCart } = useCart() as CheckoutCart
  const { addOrder } = useOrders()
  const { user } = useAuth() as {
    user?: { id?: string; email?: string; name?: string; phone?: string } | null
  }
  const isMounted = useIsMounted()
  const [completed, setCompleted] = useState(false)

  // Form states
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!cart || cart.length === 0) {
      toast.error('Your flacon basket is empty.')
      return
    }

    const customerFullName = `${firstName} ${lastName}`.trim()
    const fullDeliveryAddress = `${address}, ${city}`.trim()
    const perfumeTitles = cart
      .map((item: CheckoutCartItem) => `${item.title} (x${item.quantity || 1})`)
      .join(', ')

    // 1. تسجيل الطلب في Context
    addOrder({
      customerName: customerFullName || 'Private Client',
      phone: phone,
      perfumeTitle: perfumeTitles,
      totalPrice: totalAmount,
      userEmail: user?.email,
      userId: user?.id,
    })

    // 2. الحفظ في localStorage
    const orderId = `SKN-${Math.floor(1000 + Math.random() * 9000)}-EG`
    const orderDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

    const newOrder = {
      id: orderId,
      date: orderDate,
      status: 'Macerating',
      totalAmount: totalAmount,
      userEmail: user?.email,
      userId: user?.id,
      customer: {
        name: customerFullName,
        phone,
        address: fullDeliveryAddress,
        email: user?.email,
      },
      items: cart.map((item: CheckoutCartItem) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        volume: item.volume,
        quantity: item.quantity,
      })),
    }

    try {
      const existing = JSON.parse(localStorage.getItem('sukoon_orders') || '[]')
      localStorage.setItem('sukoon_orders', JSON.stringify([newOrder, ...existing]))
    } catch (err) {
      console.error(err)
    }

    // 3. إرسال الإشعار الفوري لموبايلك على تليجرام
    try {
      fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          customerName: customerFullName,
          phone,
          address: fullDeliveryAddress,
          perfumeTitle: perfumeTitles,
          totalPrice: totalAmount,
        }),
      })
    } catch (error) {
      console.error(error)
    }

    if (clearCart) clearCart()
    setCompleted(true)
    toast.success('Order confirmed. Your flacons are being prepared.')
  }

  if (!isMounted) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#F8F6F0]">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8C6F48] font-mono animate-pulse">
          Loading Checkout Sanctuary...
        </span>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#F8F6F0] px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-[#E8E3D9] text-center space-y-5 shadow-xs">
          <span className="w-12 h-12 rounded-full bg-[#F8F6F0] text-[#8C6F48] inline-flex items-center justify-center text-xl font-serif">
            ✦
          </span>
          <h1 className="text-3xl font-light text-[#121212]">Order Sealed</h1>
          <p className="text-xs text-[#736E65] font-light leading-relaxed">
            Thank you for choosing Sukoon. Your extrait is entering its final inspection and will be dispatched with utmost care.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/profile"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] hover:bg-[#8C6F48] transition-all text-center"
            >
              View in Sanctuary
            </Link>
            <Link
              href="/posts"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white border border-[#E8E3D9] text-[#121212] text-xs uppercase tracking-[0.2em] hover:bg-[#F8F6F0] transition-all text-center"
            >
              Continue Journey
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#F8F6F0] px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-[#E8E3D9] text-center space-y-4 shadow-xs">
          <h2 className="text-2xl font-light text-[#121212]">Your Basket is Empty</h2>
          <p className="text-xs text-[#736E65]">
            There are no formulations selected for private checkout yet.
          </p>
          <Link
            href="/posts"
            className="inline-block mt-2 px-8 py-3 rounded-full bg-[#121212] text-white text-xs uppercase tracking-widest hover:bg-[#8C6F48] transition-all"
          >
            Explore Extraits
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-10 text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6F48] font-medium">Finalizing Order</span>
          <h1 className="text-4xl font-light text-[#121212] tracking-tight">Private Checkout</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-start">
          <form onSubmit={handlePlaceOrder} className="md:col-span-2 bg-white p-8 md:p-10 rounded-3xl border border-[#E8E3D9] shadow-xs space-y-6">
            <h3 className="text-sm font-medium text-[#121212] uppercase tracking-wider">Courier Destination</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#736E65] uppercase">First Name</label>
                <input 
                  required 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ahmed"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#736E65] uppercase">Last Name</label>
                <input 
                  required 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Adel"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]" 
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-[#736E65] uppercase">Residence Address</label>
              <input 
                required 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street, Building, Apartment" 
                className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]" 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#736E65] uppercase">City / Governorate</label>
                <input 
                  required 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Suez / Cairo" 
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#736E65] uppercase">Contact Number</label>
                <input 
                  required 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010XXXXXXXX" 
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]" 
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#F8F6F0] space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-[#121212] font-medium">Payment Protocol</h4>
              <div className="p-4 rounded-xl border border-[#8C6F48]/40 bg-[#F8F6F0] flex items-center gap-3">
                <input type="radio" checked readOnly className="accent-[#121212]" />
                <span className="text-xs text-[#121212] font-medium">Cash on Private Delivery (Courier)</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all cursor-pointer shadow-sm"
            >
              Confirm Dispatch
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-3xl border border-[#E8E3D9] shadow-xs space-y-6">
            <h3 className="text-xs uppercase tracking-wider font-medium text-[#121212]">Order Overview</h3>
            
            <div className="space-y-3 divide-y divide-[#F8F6F0]">
              {cart.map((item: CheckoutCartItem) => (
                <div key={item.id} className="pt-3 first:pt-0 flex justify-between items-center text-xs">
                  <div>
                    <p className="text-[#121212] font-medium">{item.title}</p>
                    <p className="text-[10px] text-[#736E65]">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-[#121212] font-mono" suppressHydrationWarning>
                    {((item.price || 0) * item.quantity).toLocaleString()} EGP
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#F8F6F0] space-y-2 text-xs">
              <div className="flex justify-between text-[#736E65]">
                <span>Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between text-base font-medium text-[#121212] pt-2 border-t border-[#F8F6F0]">
                <span>Total</span>
                <span className="text-[#8C6F48] font-mono" suppressHydrationWarning>
                  {(totalAmount || 0).toLocaleString()} EGP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}