"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Bubble {
  id: number
  size: number
  x: number
  delay: number
  duration: number
}

export default function Bubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    // Generate random bubbles
    const newBubbles = []
    const bubbleCount = Math.max(15, Math.floor(window.innerWidth / 80))

    for (let i = 0; i < bubbleCount; i++) {
      newBubbles.push({
        id: i,
        size: 5 + Math.random() * 20,
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 5 + Math.random() * 10,
      })
    }

    setBubbles(newBubbles)

    // Regenerate bubbles periodically
    const interval = setInterval(() => {
      setBubbles((prev) => {
        const newBubble = {
          id: prev.length > 0 ? Math.max(...prev.map((b) => b.id)) + 1 : 0,
          size: 5 + Math.random() * 20,
          x: Math.random() * 100,
          delay: 0,
          duration: 5 + Math.random() * 10,
        }

        return [...prev.slice(-20), newBubble]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute bottom-0 rounded-full bg-white/30 backdrop-blur-sm"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
          }}
          initial={{ y: "100%" }}
          animate={{
            y: "-120%",
            x: [0, bubble.size > 15 ? 20 : 10, 0],
          }}
          transition={{
            y: {
              duration: bubble.duration,
              delay: bubble.delay,
              ease: "easeOut",
            },
            x: {
              duration: bubble.duration / 3,
              delay: bubble.delay,
              repeat: 3,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </div>
  )
}
