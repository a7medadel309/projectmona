"use client"
import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { useCart } from '@/context/CartContext'

export default function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalAmount, isCartOpen, setIsCartOpen } = useCart()

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 cursor-pointer"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#F8F6F0] z-50 border-l border-[#E8E3D9] shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E8E3D9] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6F48]">Your Selection</span>
                <h2 className="text-xl font-light text-[#121212]">Sanctuary Basket</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full border border-[#E8E3D9] flex items-center justify-center text-[#736E65] hover:text-[#121212] transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <p className="font-serif italic text-2xl text-[#9E9B97]">Empty Vessel</p>
                  <p className="text-xs text-[#736E65] font-light">Your olfactory reserve has no selected extraits yet.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl border border-[#E8E3D9] flex items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="w-14 h-18 bg-[#F8F6F0] rounded-xl border border-[#E8E3D9] flex items-center justify-center text-[10px] text-[#8C6F48] font-serif">
                      EDP
                    </div>

                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-[#121212]">{item.title}</h4>
                      <p className="text-[11px] text-[#736E65] font-light">{item.volume || '100ml'}</p>
                      <p className="text-xs text-[#121212] font-semibold mt-1">
                        {item.price.toLocaleString()} EGP
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] text-[#9E9B97] hover:text-red-500 transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                      <div className="flex items-center border border-[#E8E3D9] rounded-full px-2 py-0.5 bg-[#F8F6F0] text-xs">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-1.5 hover:text-[#8C6F48] cursor-pointer">-</button>
                        <span className="px-2 font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-1.5 hover:text-[#8C6F48] cursor-pointer">+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-[#E8E3D9] space-y-4">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-[#736E65] font-light uppercase tracking-wider text-xs">Subtotal</span>
                  <span className="text-xl font-light text-[#121212]">{(totalAmount || 0).toLocaleString()} EGP</span>
                </div>
                <p className="text-[10px] text-[#9E9B97] font-light">Complimentary white-glove shipping on domestic orders.</p>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full py-4 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium text-center hover:bg-[#8C6F48] transition-all shadow-md cursor-pointer"
                >
                  Proceed to Reserve • {(totalAmount || 0).toLocaleString()} EGP
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}