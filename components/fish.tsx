"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"

interface FishProps {
  id: number
  initialX: number
  initialY: number
  type: number
  direction: number
  size: number // New size parameter
  onClick: (id: number) => void
  speed?: number
  heroRef: React.RefObject<HTMLElement>
}

export default function Fish({
  id,
  initialX,
  initialY,
  type,
  direction,
  size,
  onClick,
  speed = 1,
  heroRef,
}: FishProps) {
  const controls = useAnimation()
  const fishRef = useRef<HTMLDivElement>(null)

  // Fish types: 0 = goldfish, 1 = koi, 2 = tiger fish, 3 = angelfish, 4 = clownfish
  const fishTypes = [
    {
      // Goldfish (original cute fish)
      body: ["#FF9AA2", "#FFB7B2"],
      render: (bodyColor: string, finColor: string) => (
        <>
          {/* Cute fish body - more rounded */}
          <ellipse cx="35" cy="20" rx="20" ry="15" fill={bodyColor} />

          {/* Cute tail */}
          <path d="M15 20C15 20 5 10 5 20C5 30 15 20 15 20Z" fill={finColor} />
          <path d="M15 20C20 15 25 17 25 20C25 23 20 25 15 20Z" fill={bodyColor} />

          {/* Cute eyes */}
          <circle cx="42" cy="17" r="4" fill="white" />
          <circle cx="43" cy="16" r="2" fill="black" />
          <circle cx="44" cy="15" r="0.8" fill="white" />

          {/* Cute smile */}
          <path d="M45 22C45 22 43 24 40 24" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Top fin */}
          <path d="M35 5C30 0 40 0 35 5Z" fill={finColor} />

          {/* Bottom fin */}
          <path d="M35 35C30 40 40 40 35 35Z" fill={finColor} />
        </>
      ),
    },
    {
      // Koi fish
      body: ["#FFFFFF", "#FF5252"],
      render: (bodyColor: string, finColor: string) => (
        <>
          {/* Koi body */}
          <ellipse cx="35" cy="20" rx="22" ry="14" fill={bodyColor} />

          {/* Koi tail */}
          <path d="M13 20C13 20 3 8 3 20C3 32 13 20 13 20Z" fill={finColor} />
          <path d="M13 20C18 15 23 17 23 20C23 23 18 25 13 20Z" fill={bodyColor} />

          {/* Koi eyes */}
          <circle cx="45" cy="17" r="3" fill="black" />
          <circle cx="46" cy="16" r="1" fill="white" />

          {/* Koi patterns */}
          <path d="M25 15C30 10 40 10 45 15" stroke={finColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M25 25C30 30 40 30 45 25" stroke={finColor} strokeWidth="3" strokeLinecap="round" />
          <circle cx="35" cy="20" r="5" fill={finColor} />

          {/* Koi fins */}
          <path d="M35 6C30 1 40 1 35 6Z" fill={finColor} />
          <path d="M35 34C30 39 40 39 35 34Z" fill={finColor} />
        </>
      ),
    },
    {
      // Tiger fish - more saturated colors
      body: ["#FF6D00", "#FF9100"], // More saturated orange
      render: (bodyColor: string, finColor: string) => (
        <>
          {/* Tiger fish body */}
          <ellipse cx="35" cy="20" rx="20" ry="12" fill={bodyColor} />

          {/* Tiger fish tail */}
          <path d="M15 20C15 20 5 10 5 20C5 30 15 20 15 20Z" fill={finColor} />
          <path d="M15 20C20 15 25 17 25 20C25 23 20 25 15 20Z" fill={bodyColor} />

          {/* Tiger fish eyes */}
          <circle cx="45" cy="17" r="3" fill="white" />
          <circle cx="46" cy="16" r="1.5" fill="black" />
          <circle cx="47" cy="15" r="0.8" fill="white" />

          {/* Tiger stripes - darker and more defined */}
          <path d="M25 14L45 14" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <path d="M25 20L45 20" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
          <path d="M25 26L45 26" stroke="#000000" strokeWidth="2" strokeLinecap="round" />

          {/* Cute smile */}
          <path d="M45 22C45 22 43 24 40 24" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Tiger fish fins */}
          <path d="M35 8C30 3 40 3 35 8Z" fill={finColor} />
          <path d="M35 32C30 37 40 37 35 32Z" fill={finColor} />
          <path d="M30 15L30 25" stroke={finColor} strokeWidth="6" strokeLinecap="round" />
        </>
      ),
    },
    {
      // Angelfish - cuter version
      body: ["#C7CEEA", "#B5EAD7"],
      render: (bodyColor: string, finColor: string) => (
        <>
          {/* Angelfish body */}
          <ellipse cx="30" cy="20" rx="15" ry="18" fill={bodyColor} />

          {/* Angelfish tail */}
          <path d="M15 20L5 10L5 30L15 20Z" fill={finColor} />

          {/* Angelfish eyes */}
          <circle cx="38" cy="17" r="3" fill="white" />
          <circle cx="39" cy="16" r="1.5" fill="black" />
          <circle cx="40" cy="15" r="0.8" fill="white" />

          {/* Cute smile */}
          <path d="M38 22C38 22 36 24 33 24" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Angelfish fins */}
          <path d="M30 2L30 38" stroke={finColor} strokeWidth="10" strokeLinecap="round" />
          <path d="M25 15L40 15" stroke={finColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M25 25L40 25" stroke={finColor} strokeWidth="2" strokeLinecap="round" />
        </>
      ),
    },
    {
      // Clownfish - cuter version
      body: ["#FF7F50", "#FFFFFF"],
      render: (bodyColor: string, finColor: string) => (
        <>
          {/* Clownfish body */}
          <ellipse cx="35" cy="20" rx="20" ry="15" fill={bodyColor} />

          {/* Clownfish tail */}
          <path d="M15 20C15 20 5 10 5 20C5 30 15 20 15 20Z" fill={bodyColor} />
          <path d="M15 20C20 15 25 17 25 20C25 23 20 25 15 20Z" fill={bodyColor} />

          {/* Clownfish eyes */}
          <circle cx="45" cy="17" r="3" fill="white" />
          <circle cx="46" cy="16" r="1.5" fill="black" />
          <circle cx="47" cy="15" r="0.8" fill="white" />

          {/* Cute smile */}
          <path d="M45 22C45 22 43 24 40 24" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Clownfish stripes */}
          <path d="M25 12L45 12" stroke={finColor} strokeWidth="4" strokeLinecap="round" />
          <path d="M25 20L45 20" stroke={finColor} strokeWidth="4" strokeLinecap="round" />
          <path d="M25 28L45 28" stroke={finColor} strokeWidth="4" strokeLinecap="round" />

          {/* Clownfish fins */}
          <path d="M35 5C30 0 40 0 35 5Z" fill={bodyColor} />
          <path d="M35 35C30 40 40 40 35 35Z" fill={bodyColor} />
        </>
      ),
    },
  ]

  // Get colors for this fish type
  const fishType = fishTypes[type % fishTypes.length]
  const bodyColor = fishType.body[0]
  const finColor = fishType.body[1]

  // Calculate base width and height based on size
  const baseWidth = 60 * size
  const baseHeight = 40 * size

  // Calculate padding based on fish size
  const edgePadding = 80 + size * 30

  useEffect(() => {
    // Get hero section boundaries
    const getHeroBounds = () => {
      if (!heroRef.current) return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }

      const rect = heroRef.current.getBoundingClientRect()
      return {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }
    }

    // Start swimming animation - swim from left to right across the entire frame
    const swim = async () => {
      const bounds = getHeroBounds()

      // Start position (left side)
      const startX = bounds.left + edgePadding
      const startY = bounds.top + edgePadding + Math.random() * (bounds.height - edgePadding * 2 - 60)

      // End position (right side)
      const endX = bounds.left + bounds.width - edgePadding
      const endY = bounds.top + edgePadding + Math.random() * (bounds.height - edgePadding * 2 - 60)

      // Set initial position
      await controls.start({
        x: direction > 0 ? startX : endX,
        y: startY,
        transition: { duration: 0 },
      })

      // Swim to the other side - adjust speed based on size (smaller fish swim faster)
      const swimSpeed = speed * (1.2 - size * 0.3) // Smaller fish are faster

      await controls.start({
        x: direction > 0 ? endX : startX,
        y: endY,
        transition: {
          duration: (8 + Math.random() * 4) / swimSpeed,
          ease: "linear",
        },
      })

      // When reaching the edge, start over from the other side
      swim()
    }

    // Start swimming
    swim()

    // Update boundaries when window resizes
    const handleResize = () => {
      swim()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [controls, speed, heroRef, direction, size, edgePadding])

  const handleClick = async () => {
    // Get hero section boundaries
    if (!heroRef.current) return
    const bounds = heroRef.current.getBoundingClientRect()

    // Get current fish position
    const fishRect = fishRef.current?.getBoundingClientRect()
    if (!fishRect) return

    // Calculate a random direction to swim away (upward)
    const angle = Math.PI * 1.5 + (Math.random() - 0.5)
    const distance = Math.min(bounds.width, bounds.height) * 0.3

    // Calculate new position
    let newX = fishRect.x + Math.cos(angle) * distance
    let newY = fishRect.y + Math.sin(angle) * distance

    // Ensure within bounds
    newX = Math.max(bounds.left + edgePadding, Math.min(bounds.left + bounds.width - edgePadding, newX))
    newY = Math.max(bounds.top + edgePadding, Math.min(bounds.top + bounds.height - edgePadding - 60, newY))

    // Animate swimming away
    await controls.start({
      x: newX,
      y: newY,
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.8 / speed, ease: "easeOut" },
    })

    // Notify parent component
    onClick(id)
  }

  // Calculate initial position in pixels
  const getInitialPosition = () => {
    if (!heroRef.current) return { x: 0, y: 0 }

    const bounds = heroRef.current.getBoundingClientRect()

    // Start from left or right edge based on direction
    return {
      x: direction > 0 ? bounds.left + edgePadding : bounds.left + bounds.width - edgePadding,
      y: bounds.top + edgePadding + (initialY / 100) * (bounds.height - edgePadding * 2 - 60),
    }
  }

  const initialPos = getInitialPosition()

  // Adjust clickable area based on fish size
  const clickPadding = 32 * size

  return (
    <motion.div
      ref={fishRef}
      className="absolute z-10"
      style={{
        x: initialPos.x,
        y: initialPos.y,
        scaleX: direction,
        position: "fixed", // Use fixed positioning to avoid scrolling issues
      }}
      animate={controls}
      whileHover={{ scale: 1.1 }}
    >
      <div
        className="cursor-pointer"
        onClick={handleClick}
        style={{
          padding: `${clickPadding}px`,
          margin: `-${clickPadding}px`, // Expand clickable area
        }}
      >
        <svg width={baseWidth} height={baseHeight} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Render the appropriate fish type */}
          {fishType.render(bodyColor, finColor)}

          {/* Bubbles */}
          <circle cx="10" cy="15" r="1.5" fill="white" fillOpacity="0.6" />
          <circle cx="7" cy="18" r="1" fill="white" fillOpacity="0.6" />
          <circle cx="12" cy="12" r="0.8" fill="white" fillOpacity="0.6" />
        </svg>
      </div>
    </motion.div>
  )
}
