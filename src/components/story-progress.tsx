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
  duration = 4000,
  onTimeComplete 
}: StoryProgressProps) {

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
              animate={{ width: '100%' }}
              transition={{ 
                duration: duration / 1000,
                ease: "linear",
                onComplete: () => onTimeComplete?.()
              }}
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

