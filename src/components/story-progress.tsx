'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface StoryProgressProps {
  totalSlides: number
  currentSlide: number
  duration?: number
  onTimeComplete?: () => void
}

export function StoryProgress({ 
  totalSlides, 
  currentSlide, 
  duration = 5000,
  onTimeComplete 
}: StoryProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          onTimeComplete?.()
          return 100
        }
        return prev + 1
      })
    }, duration / 100)

    return () => clearInterval(timer)
  }, [currentSlide, duration, onTimeComplete])

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-2 bg-black/20 backdrop-blur-lg">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className="h-1 bg-white/30 rounded-full flex-1"
        >
          {index === currentSlide && (
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            />
          )}
          {index < currentSlide && (
            <div className="h-full bg-white rounded-full w-full" />
          )}
        </div>
      ))}
    </div>
  )
}

