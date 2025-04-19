"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Plant {
  id: number
  x: number
  height: number
  width: number
  type: number
  delay: number
  color: string
  accent: string
}

export default function AquaticPlants() {
  const [plants, setPlants] = useState<Plant[]>([])

  useEffect(() => {
    // Generate plants based on screen width
    const screenWidth = window.innerWidth
    const plantCount = Math.max(8, Math.floor(screenWidth / 120))
    const newPlants = []

    // Plant types: 0 = round seaweed, 1 = cute kelp, 2 = puffy coral
    for (let i = 0; i < plantCount; i++) {
      const plantType = Math.floor(Math.random() * 3)
      const baseColor = getRandomCuteColor(plantType)

      newPlants.push({
        id: i,
        x: (i / (plantCount - 1)) * 100, // Distribute evenly across the bottom
        height: 70 + Math.random() * 40, // Random height
        width: 25 + Math.random() * 30, // Random width
        type: plantType, // Random plant type
        delay: Math.random() * 0.5, // Random animation delay
        color: baseColor.main,
        accent: baseColor.accent,
      })
    }

    setPlants(newPlants)
  }, [])

  // Generate cute color combinations
  function getRandomCuteColor(type: number) {
    // Softer, more pastel colors for a cute look
    const colors = [
      // Round seaweed - soft greens
      { main: "#a8d5ba", accent: "#d1f0e0" },
      { main: "#8fcfa4", accent: "#c9ebd7" },
      { main: "#b5e8c3", accent: "#d8f5e0" },

      // Cute kelp - blue-greens
      { main: "#7ec4cf", accent: "#b4e4ec" },
      { main: "#8ed1bf", accent: "#c5e9dd" },
      { main: "#9adbc8", accent: "#c7ede2" },

      // Puffy coral - pink-purples
      { main: "#d4b2d8", accent: "#e9d4ec" },
      { main: "#c1a8d1", accent: "#e0d1e9" },
      { main: "#dbbdd6", accent: "#eddbe9" },
    ]

    // Select from the appropriate color group
    const startIdx = type * 3
    const colorIdx = startIdx + Math.floor(Math.random() * 3)
    return colors[colorIdx]
  }

  return (
    <div className="absolute bottom-0 left-0 w-full h-[30vh] pointer-events-none z-0">
      {plants.map((plant) => (
        <motion.div
          key={plant.id}
          className="absolute bottom-0"
          style={{
            left: `${plant.x}%`,
            zIndex: Math.floor(plant.type * 3),
          }}
          animate={{
            y: [0, -5, 0],
            x: [0, plant.type === 0 ? 8 : 4, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 3 + plant.type * 2,
            ease: "easeInOut",
            delay: plant.delay,
          }}
        >
          {plant.type === 0 && (
            // Round, cute seaweed
            <div
              style={{
                height: `${plant.height}px`,
                width: `${plant.width}px`,
                position: "relative",
              }}
            >
              {[...Array(4)].map((_, i) => {
                const size = plant.width * (0.7 - i * 0.1)
                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      bottom: i * (plant.height / 5),
                      left: `${(plant.width - size) / 2}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: plant.color,
                      boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px ${plant.accent}`,
                      zIndex: 10 - i,
                    }}
                    animate={{
                      x: [0, i % 2 === 0 ? 5 : -5, 0],
                      y: [0, -3, 0],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2 + i * 0.5,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                )
              })}

              {/* Stem */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  bottom: 0,
                  left: `${plant.width / 2 - 2}px`,
                  width: "4px",
                  height: `${plant.height}px`,
                  backgroundColor: plant.color,
                  zIndex: 0,
                }}
                animate={{
                  skewX: [0, 5, 0, -5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />
            </div>
          )}

          {plant.type === 1 && (
            // Cute kelp with heart-shaped leaves
            <div
              style={{
                height: `${plant.height}px`,
                width: `${plant.width * 1.5}px`,
                position: "relative",
              }}
            >
              <motion.div
                className="absolute bottom-0 rounded-full"
                style={{
                  width: `${plant.width / 8}px`,
                  height: `${plant.height}px`,
                  backgroundColor: plant.color,
                  left: `${plant.width / 2}px`,
                  transformOrigin: "bottom",
                  zIndex: 1,
                }}
                animate={{
                  skewX: [0, 3, 0, -3, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                }}
              />

              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: `${plant.height * 0.2 + i * (plant.height * 0.15)}px`,
                    zIndex: i % 2 === 0 ? 2 : 0,
                  }}
                  animate={{
                    rotateZ: [i % 2 === 0 ? 5 : -5, i % 2 === 0 ? 15 : -15, i % 2 === 0 ? 5 : -5],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3 + i * 0.2,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                >
                  {/* Heart-shaped leaf */}
                  <div
                    style={{
                      position: "relative",
                      width: `${plant.width}px`,
                      height: `${plant.width / 2}px`,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: `${plant.width / 2}px`,
                        height: `${plant.width / 2}px`,
                        backgroundColor: plant.color,
                        borderRadius: "50% 50% 0 50%",
                        transform: "rotate(-45deg)",
                        transformOrigin: "bottom right",
                        boxShadow: `inset -1px -1px 3px rgba(0,0,0,0.1), inset 2px 2px 3px ${plant.accent}`,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: `${plant.width / 2}px`,
                        height: `${plant.width / 2}px`,
                        backgroundColor: plant.color,
                        borderRadius: "50% 50% 50% 0",
                        transform: "rotate(45deg)",
                        transformOrigin: "bottom left",
                        boxShadow: `inset -1px -1px 3px rgba(0,0,0,0.1), inset 2px 2px 3px ${plant.accent}`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {plant.type === 2 && (
            // Puffy, cute coral
            <div
              style={{
                height: `${plant.height * 0.7}px`,
                width: `${plant.width * 1.2}px`,
                position: "relative",
              }}
            >
              <motion.div
                className="absolute bottom-0"
                style={{
                  width: `${plant.width}px`,
                  height: `${plant.height * 0.7}px`,
                  transformOrigin: "bottom center",
                }}
                animate={{
                  rotateZ: [0, 2, 0, -2, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: "easeInOut",
                }}
              >
                {/* Base */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: `${plant.width / 4}px`,
                    width: `${plant.width / 2}px`,
                    height: `${plant.height * 0.2}px`,
                    backgroundColor: plant.color,
                    borderRadius: `${plant.width / 4}px ${plant.width / 4}px 0 0`,
                    boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px ${plant.accent}`,
                  }}
                />

                {/* Puffy tops */}
                {[...Array(5)].map((_, i) => {
                  const size = plant.width * (0.3 + Math.random() * 0.2)
                  const posX = plant.width / 2 - size / 2 + (Math.random() * plant.width * 0.5 - plant.width * 0.25)
                  const posY = plant.height * 0.2 + Math.random() * (plant.height * 0.3)

                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        bottom: posY,
                        left: posX,
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: plant.color,
                        boxShadow: `inset -2px -2px 4px rgba(0,0,0,0.1), inset 2px 2px 4px ${plant.accent}`,
                      }}
                      animate={{
                        y: [0, -3, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2 + Math.random() * 2,
                        ease: "easeInOut",
                        delay: i * 0.2,
                      }}
                    />
                  )
                })}
              </motion.div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
