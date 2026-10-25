"use client"
import React, { createContext, useContext, useState } from 'react'

const ADMIN_EMAILS = [
  'ahmeda.elsayed764@gmail.com',
  'admin@sukoon.com',
]

interface User {
  name: string
  email: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (email: string, name?: string) => void
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    try {
      const savedUser = localStorage.getItem('sukoon_user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })

  const login = (email: string, name?: string) => {
    const isUserAdmin = ADMIN_EMAILS.includes(email.trim().toLowerCase())
    const newUser: User = {
      name: name || email.split('@')[0],
      email: email.trim().toLowerCase(),
      isAdmin: isUserAdmin,
    }
    setUser(newUser)
    try {
      localStorage.setItem('sukoon_user', JSON.stringify(newUser))
    } catch (e) {
      console.error(e)
    }
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem('sukoon_user')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: !!user?.isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}