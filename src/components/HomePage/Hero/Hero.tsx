"use client"
import Image from 'next/image'
import Link from 'next/link'
import HeroImage from '../../../../public/sukoon brand.jpeg'
import { motion } from 'motion/react'

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#EDE7DC]/60 via-[#F8F6F0] to-[#F8F6F0]" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Hero Narrative with Staggered Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE7DC] border border-[#E8E3D9]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C6F48]"></span>
            <span className="text-xs text-[#8C6F48] tracking-widest uppercase font-medium">
              Exclusive Niche Release
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-light text-[#121212] tracking-tight leading-[1.1]">
            Where Serenity <br />
            <span className="font-serif italic font-normal text-[#8C6F48]">Leaves an Imprint</span>
          </h1>

          <p className="text-base text-[#736E65] max-w-lg leading-relaxed font-light">
            An artisanal fragrance house crafted for quiet sophistication. Formulated with rare sandalwood, rich amber accords, and velvety leather depths.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href="/posts"
              className="px-8 py-3.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] hover:bg-[#8C6F48] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Explore Collection
            </Link>
            <Link
              href="/about"
              className="px-8 py-3.5 rounded-full border border-[#C2A379] text-[#121212] text-xs uppercase tracking-[0.2em] hover:bg-[#EDE7DC] transition-all duration-300"
            >
              Our Story
            </Link>
          </div>
        </motion.div>

        {/* Floating Bottle Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          {/* Subtle back illumination */}
          <div className="absolute w-72 h-72 bg-[#C2A379]/15 rounded-full blur-3xl -z-10" />

          {/* Smooth breathing / floating effect */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="rounded-3xl p-3 bg-white/40 backdrop-blur-xs border border-white/60 shadow-2xl">
              <Image 
                src={HeroImage} 
                alt="Sukoon Signature Perfume" 
                width={480} 
                height={550}
                priority
                className="rounded-2xl object-cover max-h-115 w-auto shadow-inner"
              />
            </div>
            
            {/* Interactive Feature Tag */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md border border-[#E8E3D9] p-4 rounded-2xl shadow-xl flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#F8F6F0] flex items-center justify-center border border-[#E8E3D9] text-[#8C6F48] font-serif text-xs font-semibold">
                50ml
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-[#736E65]">Most Desired</p>
                <p className="text-sm font-medium text-[#121212]">Amber & Velvet Woods</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default Hero