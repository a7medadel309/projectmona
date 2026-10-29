'use client'
import React, { useSyncExternalStore } from 'react'
import { useOrders, type Order } from '@/context/OrderContext'
import { useAuth } from '@/context/AuthContext'

const subscribe = () => () => {}
const useIsMounted = () => useSyncExternalStore(subscribe, () => true, () => false)

export default function UserOrderTracker() {
  const isMounted = useIsMounted()
  const { orders } = useOrders()
  const { user } = useAuth()

  if (!isMounted || !orders || orders.length === 0) return null

  // إظهار الإشعار الخاص بطلبات المستخدم الحالي فقط
  const userOrders = orders.filter((o: Order) => {
    if (!user) return true // إذا لم يكن هناك login، يظهر آخر طلب محلي
    return (
      (o.userEmail && o.userEmail === user.email) ||
      (user.name && o.customerName.toLowerCase() === user.name.toLowerCase())
    )
  })

  if (userOrders.length === 0) return null

  const latestOrder = userOrders[0]

  return (
    <div className="w-full max-w-xl mx-auto my-4 px-4">
      <div className="p-5 rounded-3xl border border-[#E8E3D9] bg-white shadow-xs space-y-3">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase">
          <span className="text-[#8C6F48]">Atelier Dispatch Notice</span>
          <span className="text-[#736E65]">{latestOrder.id}</span>
        </div>

        <div className="flex items-start gap-3">
          <span
            className={`w-3 h-3 mt-1 rounded-full shrink-0 ${
              latestOrder.status === 'Completed'
                ? 'bg-emerald-500'
                : latestOrder.status === 'Declined'
                ? 'bg-rose-500'
                : 'bg-amber-400 animate-pulse'
            }`}
          />
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-[#121212]">
              {latestOrder.status === 'Completed' && 'Order Confirmed & Prepared'}
              {latestOrder.status === 'Pending' && 'Under Collecting & Maceration'}
              {latestOrder.status === 'Declined' && 'Order Declined — Out of Stock'}
            </h4>
            <p className="text-xs text-[#736E65] font-light leading-relaxed">
              {latestOrder.status === 'Completed' &&
                'Your reserve has been inspected, bottled, and handed to the private courier.'}
              {latestOrder.status === 'Pending' &&
                'Your flacons are currently under collecting and preparing for final sealing.'}
              {latestOrder.status === 'Declined' && (
                <span>
                  We apologize, the selected edition{' '}
                  <strong className="font-semibold text-rose-600">
                    ({latestOrder.declineReason || 'Extraction'})
                  </strong>{' '}
                  is currently out of stock at our atelier.
                </span>
              )}
            </p>
            <div className="pt-1">
              <span className="inline-block text-[11px] font-mono text-[#121212] bg-[#F8F6F0] px-3 py-1 rounded-lg border border-[#E8E3D9]">
                {latestOrder.perfumeTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}