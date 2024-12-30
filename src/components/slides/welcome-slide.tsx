import { Star } from 'lucide-react'
import { GithubStats } from '../../types/github-stats'

interface WelcomeSlideProps {
  data: GithubStats
  onNext: () => void
  username: string
}

export function WelcomeSlide({ username }: WelcomeSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-600 to-purple-900 flex flex-col items-center justify-center p-6 text-white">
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-yellow-400/30 rounded-full" />
        <div className="relative bg-yellow-400 text-black rounded-full p-8 mb-8">
          <Star className="w-20 h-20" />
        </div>
      </div>
      <h1 className="text-5xl font-bold text-center mb-4">
        GitHub Wrapped 2024
      </h1>
      <p className="text-xl text-center text-purple-200">
        Your year in code
      </p>
    </div>
  )
}

