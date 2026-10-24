import React from 'react'

const Footer = () => {
return (
    <footer className="bg-[#121212] text-[#EDE7DC] py-12 border-t border-[#2A2A2A] mt-auto">
    <div className="container mx-auto px-6 text-center space-y-3">
        <p className="text-base font-light tracking-[0.3em] uppercase">
        SUKOON HAUTE PARFUMERIE
        </p>
        <p className="text-xs text-[#9E9B97] tracking-wider">
        &copy; {new Date().getFullYear()} Sukoon Fragrances. All rights reserved.
        </p>
    </div>
    </footer>
)
}

export default Footer