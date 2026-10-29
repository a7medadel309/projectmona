'use client'
import React, { useSyncExternalStore } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useOrders, type Order } from '@/context/OrderContext'

const emptySubscribe = () => () => {}
const useIsMounted = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export default function ProfilePage() {
  const isMounted = useIsMounted()
  const router = useRouter()
  const { user, logout } = useAuth() as {
    user?: { id?: string; email?: string; name?: string; phone?: string; role?: string; isAdmin?: boolean } | null
    logout?: () => void
  }
  const { orders } = useOrders()

  if (!isMounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C6F48] animate-pulse">
          Retrieving Sanctuary Identity...
        </span>
      </div>
    )
  }

  const isAdmin = Boolean(
    user?.role === 'admin' || user?.isAdmin === true || user?.email?.includes('admin')
  )

  // التصفية: الأدمن يشاهد الكل، والعميل يشاهد الطلبات المرتبطة بإيميله أو معرّفه فقط
  const visibleOrders = isAdmin
    ? orders
    : (orders || []).filter((o: Order) => {
        if (!user) return false

        const currentEmail = (user.email || '').trim().toLowerCase()
        const orderEmail = (o.userEmail || '').trim().toLowerCase()

        // 1. التطابق المباشر عبر الإيميل المسجل به الطلب (الأولوية القصوى)
        if (orderEmail && currentEmail && orderEmail === currentEmail) return true

        // 2. التطابق عبر معرّف الحساب (userId)
        if (o.userId && user.id && o.userId === user.id) return true

        // 3. Fallback للطلبات القديمة التي لم يُسجل فيها userEmail
        const emailPrefix = currentEmail.split('@')[0]
        const customerName = (o.customerName || '').trim().toLowerCase()
        if (emailPrefix && customerName && (customerName.includes(emailPrefix) || emailPrefix.includes(customerName.replace(/\s+/g, '')))) {
          return true
        }

        // 4. Fallback إضافي عبر رقم الهاتف إن تطابق
        if (user.phone && o.phone && (user.phone.includes(o.phone) || o.phone.includes(user.phone))) {
          return true
        }

        return false
      })

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* بطاقة الهوية والملف الشخصي */}
      <div className="p-8 rounded-3xl bg-white border border-[#E8E3D9] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#121212] text-[#F8F6F0] flex items-center justify-center font-serif text-xl border border-[#E8E3D9]">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : isAdmin ? 'AD' : 'CL'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-medium text-[#121212]">
                {user?.name || (isAdmin ? 'Atelier Overseer' : 'Private Collector')}
              </h1>
              <span
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isAdmin
                    ? 'bg-[#121212] text-[#F8F6F0]'
                    : 'bg-[#F8F6F0] text-[#8C6F48] border border-[#E8E3D9]'
                }`}
              >
                {isAdmin ? 'Sanctuary Admin' : 'Verified Collector'}
              </span>
            </div>
            <p className="text-xs text-[#736E65] font-mono mt-1">
              {user?.email || (isAdmin ? 'admin@sukoon.atelier' : 'collector@sukoon.store')}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (logout) logout()
            router.push('/')
          }}
          className="px-5 py-2.5 rounded-full border border-[#E8E3D9] text-xs font-mono uppercase tracking-widest text-[#736E65] hover:text-rose-600 hover:border-rose-200 transition-colors cursor-pointer"
        >
          Terminate Session
        </button>
      </div>

      {isAdmin ? (
        /* واجهة المشرف (Admin View) */
        <div className="space-y-6">
          <div className="border-b border-[#E8E3D9] pb-3 flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#8C6F48]">
              Administrative Operations
            </h2>
            <span className="text-xs text-[#736E65] font-mono">Full Access Clearance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-[#E8E3D9] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#736E65]">Command Dashboard</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs text-[#736E65] leading-relaxed">
                Direct access to formulation catalogs, price adjustment controls, and client dispatch management.
              </p>
              <Link
                href="/admin"
                className="inline-block w-full py-3 text-center bg-[#121212] text-[#F8F6F0] rounded-xl text-xs font-mono uppercase tracking-widest hover:bg-[#8C6F48] transition-colors"
              >
                Launch Sanctuary Atelier
              </Link>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8E3D9] shadow-xs space-y-3">
              <span className="text-xs font-mono uppercase text-[#736E65]">Current Dispatches</span>
              <div className="text-2xl font-light text-[#121212]">
                {orders.length} Recorded Orders
              </div>
              <p className="text-xs text-[#736E65]">
                {orders.filter((o) => o.status === 'Pending').length} Pending immediate verification.
              </p>
              <div className="pt-2">
                <Link
                  href="/admin"
                  className="text-xs font-mono text-[#8C6F48] hover:underline cursor-pointer"
                >
                  Review pending queue &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* واجهة العميل (Collector View) */
        <div className="space-y-6">
          <div className="border-b border-[#E8E3D9] pb-3 flex items-center justify-between">
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#8C6F48]">
              Collector Reserve History
            </h2>
            <span className="text-xs text-[#736E65] font-mono">
              {visibleOrders.length} Total Extractions
            </span>
          </div>

          {visibleOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E3D9] space-y-3">
              <p className="font-serif italic text-xl text-[#9E9B97]">No Active Commissions</p>
              <p className="text-xs text-[#736E65]">
                You have not acquired or reserved any flacons yet under this account.
              </p>
              <Link
                href="/posts"
                className="inline-block mt-2 px-6 py-2.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs font-mono uppercase tracking-widest hover:bg-[#8C6F48] transition-colors"
              >
                Explore Olfactory Archive
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleOrders.map((order: Order) => (
                <div
                  key={order.id}
                  className="p-6 bg-white rounded-3xl border border-[#E8E3D9] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-mono text-[#8C6F48]">{order.id}</span>
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full ${
                          order.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : order.status === 'Declined'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <h3 className="text-base font-medium text-[#121212] mt-1">{order.perfumeTitle}</h3>
                    {order.status === 'Declined' && order.declineReason && (
                      <p className="text-xs text-rose-600 font-mono">
                        Unavailable: {order.declineReason} is depleted at the atelier.
                      </p>
                    )}
                    <p className="text-xs text-[#736E65] font-mono">
                      Recipient: {order.customerName} • {order.phone}
                    </p>
                  </div>

                  <div className="text-right border-t md:border-t-0 pt-3 md:pt-0 border-[#F8F6F0]">
                    <span className="text-base font-semibold text-[#121212] block">
                      {order.totalPrice.toLocaleString()} EGP
                    </span>
                    <span className="text-[11px] font-mono text-[#736E65]">
                      {order.date || 'Standard Domestic Dispatch'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}