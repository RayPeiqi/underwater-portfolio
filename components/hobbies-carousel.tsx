"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export default function HobbiesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Sample hobby images
  const hobbies = [
    { id: 1, title: "Photography", image: "/placeholder.svg?height=300&width=400" },
    { id: 2, title: "Painting", image: "/placeholder.svg?height=300&width=400" },
    { id: 3, title: "Hiking", image: "/placeholder.svg?height=300&width=400" },
    { id: 4, title: "Cooking", image: "/placeholder.svg?height=300&width=400" },
    { id: 5, title: "Reading", image: "/placeholder.svg?height=300&width=400" },
    { id: 6, title: "Music", image: "/placeholder.svg?height=300&width=400" },
  ]

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrolling = false
    let scrollAmount = 0
    const speed = 0.5

    const scroll = () => {
      if (!container) return

      scrollAmount += speed
      container.scrollLeft = scrollAmount

      // Reset when we reach the end
      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0
      }

      if (scrolling) {
        requestAnimationFrame(scroll)
      }
    }

    // Start auto-scrolling
    scrolling = true
    requestAnimationFrame(scroll)

    // Pause on hover/touch
    const handleMouseEnter = () => {
      scrolling = false
    }

    const handleMouseLeave = () => {
      scrolling = true
      requestAnimationFrame(scroll)
    }

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)
    container.addEventListener("touchstart", handleMouseEnter)
    container.addEventListener("touchend", handleMouseLeave)

    return () => {
      scrolling = false
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
      container.removeEventListener("touchstart", handleMouseEnter)
      container.removeEventListener("touchend", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {hobbies.map((hobby) => (
        <motion.div
          key={hobby.id}
          className="flex-shrink-0 snap-center w-[300px] rounded-xl overflow-hidden group"
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-[200px] overflow-hidden">
            <Image
              src={hobby.image || "/placeholder.svg"}
              alt={hobby.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {hobby.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
