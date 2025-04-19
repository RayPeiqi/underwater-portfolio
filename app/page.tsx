"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Fish from "@/components/fish"
import AquaticPlants from "@/components/aquatic-plants"
import HobbiesCarousel from "@/components/hobbies-carousel"
import CareerSection from "@/components/career-section"
import EducationSection from "@/components/education-section"
import Bubbles from "@/components/bubbles"
import LightRays from "@/components/light-rays"

export default function Home() {
  const [fishes, setFishes] = useState<
    Array<{ id: number; x: number; y: number; type: number; direction: number; size: number }>
  >([])
  const heroRef = useRef<HTMLElement>(null)
  const [nextId, setNextId] = useState(0)

  // Fish swimming speed - increase for faster movement, decrease for slower
  const fishSpeed = 1.2 // Adjust this value to control fish speed

  // Generate a random fish
  const generateRandomFish = (id: number) => {
    // Generate random size between 0.6 (small) and 1.4 (large)
    const size = 0.6 + Math.random() * 0.8

    return {
      id,
      x: 10 + Math.random() * 80, // Keep within 10-90% of hero width
      y: 10 + Math.random() * 70, // Keep within 10-80% of hero height
      type: Math.floor(Math.random() * 5), // 5 fish types (0-4)
      direction: Math.random() > 0.5 ? 1 : -1, // Random direction (left or right)
      size, // Random size
    }
  }

  // Generate a balanced set of fish with different sizes
  const generateBalancedFishSet = (count: number) => {
    const fishSet = []

    // Ensure we have at least one of each size category
    // Small fish (0.6-0.8)
    fishSet.push({
      id: 0,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      type: Math.floor(Math.random() * 5),
      direction: Math.random() > 0.5 ? 1 : -1,
      size: 0.6 + Math.random() * 0.2,
    })

    // Medium fish (0.8-1.0)
    fishSet.push({
      id: 1,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      type: Math.floor(Math.random() * 5),
      direction: Math.random() > 0.5 ? 1 : -1,
      size: 0.8 + Math.random() * 0.2,
    })

    // Large fish (1.0-1.4)
    fishSet.push({
      id: 2,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      type: Math.floor(Math.random() * 5),
      direction: Math.random() > 0.5 ? 1 : -1,
      size: 1.0 + Math.random() * 0.4,
    })

    // Add remaining fish with random sizes
    for (let i = 3; i < count; i++) {
      fishSet.push(generateRandomFish(i))
    }

    return fishSet
  }

  useEffect(() => {
    // Generate initial fish with balanced sizes
    const initialFishCount = 6 // 6 fish
    const newFishes = generateBalancedFishSet(initialFishCount)

    setFishes(newFishes)
    setNextId(initialFishCount)
  }, [])

  const handleFishClick = (id: number) => {
    // Remove the clicked fish
    setFishes((prev) => prev.filter((fish) => fish.id !== id))

    // Add a new fish to replace it
    setTimeout(() => {
      setFishes((prev) => [...prev, generateRandomFish(nextId)])
      setNextId((prev) => prev + 1)
    }, 500)
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <LightRays />
        <Bubbles />

        {/* Fish */}
        {fishes.map((fish) => (
          <Fish
            key={fish.id}
            id={fish.id}
            initialX={fish.x}
            initialY={fish.y}
            type={fish.type}
            direction={fish.direction}
            size={fish.size}
            onClick={handleFishClick}
            speed={fishSpeed}
            heroRef={heroRef}
          />
        ))}

        {/* Aquatic Plants */}
        <AquaticPlants />

        {/* Name with minimalist styling - non-selectable */}
        <div className="z-10 text-center select-none">
          <motion.h1
            className="text-6xl md:text-8xl font-light text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
          >
            Pei Qi
          </motion.h1>

          {/* Reflection effect - more subtle */}
          <motion.div
            className="mt-2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1.5 }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-light text-white opacity-20 blur-[1px] scale-y-[-0.6] translate-y-[-10px]"
              animate={{
                scaleY: [-0.6, -0.65, -0.6],
                translateY: [-10, -8, -10],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
              style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
            >
              Pei Qi
            </motion.h1>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-200/80"></div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative z-10 bg-white/80 backdrop-blur-md rounded-t-3xl pt-16 pb-20 px-4 md:px-8">
        {/* Hobbies Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8">Hobbies</h2>
          <HobbiesCarousel />
        </div>

        {/* Career Section */}
        <div className="max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8">Career</h2>
          <CareerSection />
        </div>

        {/* Education Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8">Education</h2>
          <EducationSection />
        </div>
      </section>
    </main>
  )
}
