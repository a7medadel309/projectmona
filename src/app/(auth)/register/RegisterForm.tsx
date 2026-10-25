'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext'

const RegisterForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!termsAccepted) {
      toast.warning('Please agree to the Maison terms of service')
      return
    }

    // Register process
    login(email, name)
    toast.success(`Welcome to Sukoon Society, ${name}!`)
    router.push('/')
  }

  const handleSocialAuth = (provider: string) => {
    login(`patron@${provider.toLowerCase()}.com`, `${provider} Patron`)
    toast.success(`Registered with ${provider}`)
    router.push('/')
  }

  return (
    <form className="flex flex-col gap-4 text-left" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] uppercase tracking-[0.15em] text-[#121212] font-medium" htmlFor="name">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Alexander Reed"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] uppercase tracking-[0.15em] text-[#121212] font-medium" htmlFor="reg-email">
          Email Address
        </label>
        <input
          type="email"
          id="reg-email"
          placeholder="client@sanctuary.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-[0.15em] text-[#121212] font-medium" htmlFor="reg-pass">
            Password
          </label>
          <input
            type="password"
            id="reg-pass"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-[0.15em] text-[#121212] font-medium" htmlFor="confirm-pass">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-pass"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center text-xs text-[#736E65] pt-1">
        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="w-4 h-4 rounded border-[#E8E3D9] text-[#121212] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#121212]"
          />
          <span className="font-light text-[11px]">
            I agree to the Maison terms and private client charter
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all duration-300 shadow-sm mt-1 cursor-pointer"
      >
        Complete Registration
      </button>

      <div className="flex items-center gap-3 text-[11px] text-[#9E9B97] pt-2 uppercase tracking-wider">
        <span className="flex-1 border-t border-[#E8E3D9]" />
        <span>or sign up with</span>
        <span className="flex-1 border-t border-[#E8E3D9]" />
      </div>

      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => handleSocialAuth('Google')}
          className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-[#E8E3D9] bg-white text-[#121212] text-xs hover:bg-[#F8F6F0] transition-colors cursor-pointer"
        >
          <FaGoogle className="text-sm" />
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialAuth('GitHub')}
          className="flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-[#E8E3D9] bg-white text-[#121212] text-xs hover:bg-[#F8F6F0] transition-colors cursor-pointer"
        >
          <FaGithub className="text-sm" />
          <span>GitHub</span>
        </button>
      </div>
    </form>
  )
}

export default RegisterForm