'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StoryProgress } from './story-progress'
import { GithubStats, StorySlide } from '../types/github-stats'

interface StoryContainerProps {
  slides: StorySlide[]
  data: GithubStats
  username: string
}

const SLIDE_DURATION = 4000 // 4 seconds per slide

export function StoryContainer({ slides, data, username }: StoryContainerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState(0)

  const tracks = [
    '/music/track1.mp3',
    '/music/track2.mp3',
    '/music/track3.mp3',
    '/music/track4.mp3',
    '/music/track5.mp3'
  ]

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(tracks[currentTrack])
    audioRef.current.loop = true
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  const handleNext = useCallback(() => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
      // Change track every 4 slides
      if (currentSlideIndex % 4 === 0) {
        const nextTrack = (currentTrack + 1) % tracks.length
        setCurrentTrack(nextTrack)
        if (audioRef.current) {
          audioRef.current.src = tracks[nextTrack]
          if (!isPaused && !isMuted) {
            audioRef.current.play()
          }
        }
      }
    }
  }, [currentSlideIndex, slides.length, currentTrack, tracks, isPaused, isMuted])

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPaused(!isPaused)
    if (audioRef.current) {
      isPaused ? audioRef.current.play() : audioRef.current.pause()
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black">
      <div className="relative w-[390px] h-[844px] overflow-hidden rounded-3xl shadow-2xl bg-black border border-white/10">
        <StoryProgress
          totalSlides={slides.length}
          currentSlide={currentSlideIndex}
          onTimeComplete={!isPaused ? handleNext : undefined}
          duration={SLIDE_DURATION}
        />
        
        {/* Controls */}
        <div className="absolute top-14 right-4 z-50 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white rounded-full"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white rounded-full"
            onClick={togglePause}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
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
      </div>
    </div>
  )
}

