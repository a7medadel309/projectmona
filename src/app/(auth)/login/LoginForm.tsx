'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { useAuth } from '@/context/AuthContext'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }

    // Login process
    login(email)
    toast.success('Welcome back to Sukoon Sanctuary')
    router.push('/')
  }

  const handleSocialAuth = (provider: string) => {
    login(`patron@${provider.toLowerCase()}.com`, `${provider} Patron`)
    toast.success(`Signed in with ${provider}`)
    router.push('/')
  }

  return (
    <form className="flex flex-col gap-5 text-left" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] uppercase tracking-[0.15em] text-[#121212] font-medium" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          placeholder="client@sanctuary.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] uppercase tracking-[0.15em] text-[#121212] font-medium" htmlFor="password">
            Password
          </label>
          <Link href="#" className="text-[10px] tracking-wider text-[#8C6F48] hover:underline">
            Forgot password?
          </Link>
        </div>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] transition-all"
        />
      </div>

      <div className="flex items-center text-xs text-[#736E65]">
        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-[#E8E3D9] text-[#121212] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#121212]"
          />
          <span className="font-light">Remember my session</span>
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all duration-300 shadow-sm mt-1 cursor-pointer"
      >
        Sign In to Sanctuary
      </button>

      <div className="flex items-center gap-3 text-[11px] text-[#9E9B97] pt-2 uppercase tracking-wider">
        <span className="flex-1 border-t border-[#E8E3D9]" />
        <span>or enter with</span>
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

export default LoginForm