'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

export function Stars() {
  const stars = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      x: `${(i * 20) % 100 - 50}%`,
      y: `${Math.floor(i / 5) * 25 - 50}%`,
      delay: (i * 0.2) % 2
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-200"
          initial={{
            opacity: 0,
            scale: 0,
            x: star.x,
            y: star.y
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: star.x,
            y: star.y
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  )
}

