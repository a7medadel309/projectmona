'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import RegisterForm from '../register/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#F8F6F0] px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full bg-white p-8 md:p-12 rounded-3xl border border-[#E8E3D9] shadow-sm space-y-6"
      >
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C6F48] font-medium">
            Join The Society
          </span>
          <h1 className="text-3xl font-light text-[#121212] tracking-tight">
            Create Account
          </h1>
          <p className="text-xs text-[#736E65] font-light">
            Enjoy early private access to limited extraits and bespoke macerations
          </p>
        </div>

        {/* Form Component */}
        <RegisterForm />

        {/* Footer Navigation */}
        <div className="text-center pt-2 border-t border-[#F8F6F0]">
          <p className="text-xs text-[#736E65] font-light">
            Already have a membership?{' '}
            <Link href="/login" className="text-[#8C6F48] font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}