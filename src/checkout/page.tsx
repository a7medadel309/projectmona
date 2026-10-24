"use client"
import React, { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { toast } from 'react-toastify'
import Link from 'next/link'

export default function CheckoutPage() {
  const { cart, totalAmount } = useCart()
  const [completed, setCompleted] = useState(false)

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setCompleted(true)
    toast.success("Order confirmed. Your flacons are being prepared.")
  }

  if (completed) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#F8F6F0] px-6">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-[#E8E3D9] text-center space-y-5">
          <span className="w-12 h-12 rounded-full bg-[#F8F6F0] text-[#8C6F48] inline-flex items-center justify-center text-xl font-serif">
            ✦
          </span>
          <h1 className="text-3xl font-light text-[#121212]">Order Sealed</h1>
          <p className="text-xs text-[#736E65] font-light leading-relaxed">
            Thank you for choosing Sukoon. Your extrait is entering its final inspection and will be dispatched with utmost care.
          </p>
          <Link
            href="/posts"
            className="inline-block mt-4 px-8 py-3 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em]"
          >
            Continue Journey
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

        <div className="grid md:grid-cols-3 gap-10">
          
          {/* Shipping Form */}
          <form onSubmit={handlePlaceOrder} className="md:col-span-2 bg-white p-8 md:p-10 rounded-3xl border border-[#E8E3D9] space-y-6">
            <h3 className="text-sm font-medium text-[#121212] uppercase tracking-wider">Courier Destination</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#736E65] uppercase">First Name</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#736E65] uppercase">Last Name</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-[#736E65] uppercase">Residence Address</label>
              <input required type="text" placeholder="Street, Building, Apartment" className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#736E65] uppercase">City / Governorate</label>
                <input required type="text" placeholder="Cairo / Suez" className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212]" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] text-[#736E65] uppercase">Contact Number</label>
                <input required type="tel" placeholder="+20 1..." className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212]" />
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
              className="w-full py-4 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all cursor-pointer"
            >
              Confirm Dispatch
            </button>
          </form>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-3xl border border-[#E8E3D9] h-fit space-y-6">
            <h3 className="text-xs uppercase tracking-wider font-medium text-[#121212]">Order Overview</h3>
            
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs">
                  <div>
                    <p className="text-[#121212] font-medium">{item.title}</p>
                    <p className="text-[10px] text-[#736E65]">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-[#121212]">{(item.price * item.quantity).toLocaleString()} EGP</span>
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
                <span>{totalAmount.toLocaleString()} EGP</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}