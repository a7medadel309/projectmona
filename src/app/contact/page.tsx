'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { IoMailOutline, IoCallOutline, IoLogoWhatsapp } from 'react-icons/io5'

export default function ContactPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  // Bayanat el-Tawasol bta3tak
  const ADMIN_EMAIL = 'ahmeda.elsayed764@gmail.com'
  const ADMIN_PHONE = '+201065872312'
  const WHATSAPP_NUMBER = '201065872312' 

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName || !message) {
      toast.error('Please enter your name and inquiry message.')
      return
    }

    // Byfta7 email el-client m3mul template jahz yeb3at 3ala emailak direct
    const mailtoSubject = encodeURIComponent(subject ? `[Sukoon Inquiry] ${subject}` : `[Sukoon Inquiry] Message from ${fullName}`)
    const mailtoBody = encodeURIComponent(
      `Patron Name: ${fullName}\nPatron Email: ${email || 'Not provided'}\n\nMessage:\n${message}`
    )

    window.location.href = `mailto:${ADMIN_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`
    toast.success('Opening your mail dispatch...')
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] py-16">
      <div className="container mx-auto px-6 max-w-4xl space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C6F48] font-medium">
            Atelier Liaison
          </span>
          <h1 className="text-3xl md:text-5xl font-light text-[#121212] tracking-tight">
            Direct Concierge
          </h1>
          <p className="text-xs text-[#736E65] font-light max-w-md mx-auto">
            Connect directly with the atelier master for private commissions, formulation inquiries, or client dispatches.
          </p>
        </div>

        {/* Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email Direct Card */}
          <a
            href={`mailto:${ADMIN_EMAIL}`}
            className="p-6 bg-white rounded-3xl border border-[#E8E3D9] shadow-xs flex flex-col items-center text-center space-y-2 hover:border-[#8C6F48] transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#F8F6F0] flex items-center justify-center text-[#8C6F48] group-hover:bg-[#121212] group-hover:text-white transition-colors">
              <IoMailOutline className="w-5 h-5" />
            </div>
            <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Direct Email</p>
            <p className="text-xs font-medium text-[#121212] truncate max-w-full">{ADMIN_EMAIL}</p>
          </a>

          {/* WhatsApp Direct Card */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Ahmed, I am inquiring about Sukoon Parfums.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-white rounded-3xl border border-[#E8E3D9] shadow-xs flex flex-col items-center text-center space-y-2 hover:border-[#8C6F48] transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#F8F6F0] flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <IoLogoWhatsapp className="w-5 h-5" />
            </div>
            <p className="text-[10px] uppercase tracking-wider text-[#736E65]">WhatsApp Desk</p>
            <p className="text-xs font-medium text-[#121212]">Chat with Master</p>
          </a>

          {/* Phone Call Card */}
          <a
            href={`tel:${ADMIN_PHONE}`}
            className="p-6 bg-white rounded-3xl border border-[#E8E3D9] shadow-xs flex flex-col items-center text-center space-y-2 hover:border-[#8C6F48] transition-all group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#F8F6F0] flex items-center justify-center text-[#8C6F48] group-hover:bg-[#121212] group-hover:text-white transition-colors">
              <IoCallOutline className="w-5 h-5" />
            </div>
            <p className="text-[10px] uppercase tracking-wider text-[#736E65]">Voice Liaison</p>
            <p className="text-xs font-medium text-[#121212]">{ADMIN_PHONE}</p>
          </a>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-10 rounded-3xl border border-[#E8E3D9] shadow-xs max-w-2xl mx-auto"
        >
          <div className="border-b border-[#F8F6F0] pb-4 mb-6">
            <h2 className="text-xl font-light text-[#121212]">Dispatch a Message</h2>
            <p className="text-xs text-[#736E65] font-light mt-1">
              Your inquiry will be prepared and routed directly to the master email inbox
            </p>
          </div>

          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#121212] font-medium">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Karim Hegazy"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#121212] font-medium">
                  Your Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. client@sanctuary.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#121212] font-medium">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Bespoke Formulation Inquiry"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] uppercase tracking-wider text-[#121212] font-medium">
                Inquiry Details
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your bespoke fragrance request or order question..."
                className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all cursor-pointer shadow-sm"
            >
              Route Directly to Master Inbox
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  )
}