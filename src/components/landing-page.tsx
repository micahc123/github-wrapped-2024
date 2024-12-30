'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Github, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LandingPage() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (username) {
      // Check if user exists before redirecting
      try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        if (response.ok) {
          router.push(`/wrapped/${username}`)
        } else {
          // You might want to add error handling UI here
          console.error('User not found')
        }
      } catch (error) {
        console.error('Error checking username:', error)
      }
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Animated gradient wave */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="relative z-10 flex flex-col items-center max-w-2xl px-4">
        <h1 className="font-mono text-6xl md:text-7xl font-bold text-white mb-4 text-center">
          GitHub Wrapped
        </h1>
        <p className="text-xl text-neutral-400 mb-12 text-center">
          Your Year in Code 2024
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <Input
            type="text"
            placeholder="Enter your GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-lg"
          />
          <Button 
            type="submit"
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg font-medium"
            disabled={!username}
          >
            <Github className="w-5 h-5 mr-2" />
            View Your Wrapped
          </Button>
        </form>

        <div className="flex gap-4 mt-12">
          <a
            href="https://github.com/yourusername/git-wrapped"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            Star on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

