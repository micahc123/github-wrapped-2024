'use client'

import { useEffect, useRef, useState } from 'react'

interface AdaptiveTextProps {
  text: string
  className?: string
  maxWidth?: number
}

export function AdaptiveText({ text, className = '', maxWidth = 300 }: AdaptiveTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState(60) // Start with large font size

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Binary search for the right font size
    let min = 20 // Minimum font size
    let max = 60 // Maximum font size
    let current = max

    while (min <= max) {
      current = Math.floor((min + max) / 2)
      container.style.fontSize = `${current}px`
      
      if (container.scrollWidth > maxWidth) {
        max = current - 1
      } else {
        min = current + 1
      }
    }

    setFontSize(max)
  }, [text, maxWidth])

  return (
    <div
      ref={containerRef}
      className={`whitespace-nowrap ${className}`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {text}
    </div>
  )
}

