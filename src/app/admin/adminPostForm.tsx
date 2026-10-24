'use client'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AdminPostForm = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !description) {
      toast.error('Please complete all formulation details')
      return
    }

    toast.success('New formulation archived successfully')
    setTitle('')
    setPrice('')
    setDescription('')
  }

  return (
    <form className="flex flex-col gap-6 text-left" onSubmit={handleSubmit}>
      <div className="border-b border-[#F8F6F0] pb-3">
        <h3 className="text-base font-medium text-[#121212]">Formulation Details</h3>
        <p className="text-xs text-[#736E65] font-light mt-0.5">
          Enter the identity and notes for the new perfume flacon
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-[0.15em] text-[#121212] font-medium" htmlFor="perfume-title">
            Flacon / Edition Name
          </label>
          <input
            type="text"
            id="perfume-title"
            placeholder="e.g. Amber & Velvet Woods"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] transition-all"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] uppercase tracking-[0.15em] text-[#121212] font-medium" htmlFor="perfume-price">
            Retail Value (EGP)
          </label>
          <input
            type="number"
            id="perfume-price"
            placeholder="1850"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] transition-all"
          />
        </div>
      </div>

      {/* Description / Accords */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] uppercase tracking-[0.15em] text-[#121212] font-medium" htmlFor="perfume-desc">
          Olfactory Narrative & Notes
        </label>
        <textarea
          id="perfume-desc"
          rows={4}
          placeholder="Detailed description of base notes, sillage, and inspiration..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#F8F6F0] border border-[#E8E3D9] text-xs text-[#121212] placeholder-[#9E9B97] focus:outline-none focus:ring-1 focus:ring-[#8C6F48] resize-none transition-all"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#8C6F48] transition-all duration-300 shadow-sm cursor-pointer"
        >
          Archive Formulation
        </button>
      </div>
    </form>
  )
}

export default AdminPostForm