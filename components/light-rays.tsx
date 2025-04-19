"use client"

import { motion } from "framer-motion"

export default function LightRays() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bg-blue-100/20 blur-md"
          style={{
            left: `${10 + i * 20}%`,
            width: "40px",
            height: "100%",
            transformOrigin: "top",
          }}
          initial={{ scaleY: 0.7, opacity: 0.3 }}
          animate={{
            scaleY: [0.7, 0.9, 0.7],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            delay: i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
