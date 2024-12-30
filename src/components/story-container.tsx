'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Share2, Twitter, Link2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StoryProgress } from './story-progress'
import { GithubStats, StorySlide } from '../types/github-stats'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface StoryContainerProps {
  slides: StorySlide[]
  data: GithubStats
  username: string
}

const SLIDE_DURATION = 6000 // 6 seconds per slide

export function StoryContainer({ slides, data, username }: StoryContainerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(true) // Start paused
  const [isMuted, setIsMuted] = useState(false)
  const [showCopied, setShowCopied] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isUnwrapped, setIsUnwrapped] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio('/music-1.mp3')
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    // Clean up
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Try to play audio when user interacts
  useEffect(() => {
    if (hasInteracted && audioRef.current && !isPaused) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error)
      })
    }
  }, [hasInteracted, isPaused])

  const handleNext = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1)
    }
  }, [currentSlideIndex, slides.length, hasInteracted])

  const handleTimeComplete = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1)
    }
  }, [currentSlideIndex, slides.length])

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasInteracted) {
      setHasInteracted(true)
    }
    setIsPaused(!isPaused)
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!hasInteracted) {
      setHasInteracted(true)
    }
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const handleShare = async (type: 'twitter' | 'copy') => {
    const url = `${window.location.origin}/wrapped/${username}`
    
    if (type === 'twitter') {
      const text = `Check out my GitHub Wrapped for 2024! 🚀\n\n`
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      window.open(twitterUrl, '_blank')
    } else if (type === 'copy') {
      await navigator.clipboard.writeText(url)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    }
  }

  const handleUnwrap = () => {
    setIsUnwrapped(true)
    setHasInteracted(true)
    setIsPaused(false)
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error)
      })
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black relative overflow-hidden px-4">
      {/* Wavy animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-purple-500/20">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 animate-wave"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 500 Q 250 300 500 500 T 1000 500 L 1000 1000 L 0 1000 Z' fill='%23fff'/%3E%3C/svg%3E\")",
                backgroundRepeat: 'repeat-x',
                backgroundSize: '1000px 1000px',
                animationDelay: `${i * -5}s`,
                top: `${i * 10}%`
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {!isUnwrapped ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="relative z-20 text-center"
          >
            <h1 className="text-4xl font-bold text-white mb-8">
              Your GitHub Story 2024
            </h1>
            <Button
              onClick={handleUnwrap}
              className="bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white text-xl px-8 py-6 rounded-full"
            >
              Unwrap Your Year
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-[320px] h-[690px] overflow-hidden rounded-3xl shadow-2xl bg-black border border-white/10"
          >
            <StoryProgress
              totalSlides={slides.length}
              currentSlide={currentSlideIndex}
              onTimeComplete={!isPaused ? handleTimeComplete : undefined}
              duration={SLIDE_DURATION}
            />
            
            {/* Controls */}
            <div className="absolute top-4 right-3 z-50 flex gap-1.5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white rounded-full"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-black/90 backdrop-blur-xl border-white/20">
                  <DropdownMenuItem onClick={() => handleShare('twitter')} className="text-white hover:bg-white/10 cursor-pointer gap-2">
                    <Twitter className="w-4 h-4" />
                    Share on Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('copy')} className="text-white hover:bg-white/10 cursor-pointer gap-2">
                    {showCopied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                    {showCopied ? 'Copied!' : 'Copy Link'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white rounded-full"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white rounded-full"
                onClick={togglePause}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </Button>
            </div>

            {/* Slides */}
            <div 
              className="h-full w-full touch-none"
              onClick={handleNext}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlideIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="h-full w-full"
                >
                  {slides.map((Slide, index) => (
                    index === currentSlideIndex && (
                      <Slide.component 
                        key={Slide.id} 
                        data={data} 
                        onNext={handleNext}
                        username={username}
                      />
                    )
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

