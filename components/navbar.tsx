"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 right-0 z-50 flex justify-end px-6 py-4 w-full transition-all duration-300 ${
        scrolled ? "bg-white/20 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex gap-8">
        {["About Me", "Projects", "Contact"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="relative text-white font-medium hover:text-blue-100 transition-colors group"
          >
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
      </div>
    </motion.nav>
  )
}
