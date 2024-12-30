import { Calendar, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Stars } from '../decorative/stars'
import { GithubStats } from '../../types/github-stats'

interface FavoriteDaySlideProps {
  data: GithubStats
  onNext: () => void
  username: string
}

export function FavoriteDaySlide({ data }: FavoriteDaySlideProps) {
  // Format the date nicely
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-yellow-500 to-orange-600 flex flex-col items-center justify-center p-6 text-white">
      <Stars />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 blur-2xl bg-yellow-300/30 rounded-full" />
        <div className="relative bg-yellow-400 text-orange-900 rounded-full p-6">
          <Calendar className="w-16 h-16" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-6">
          Your Most Productive Day
        </h2>
        <div className="text-2xl font-bold mb-4">
          {formatDate(data.mostActiveDay.date)}
        </div>
        <div className="flex items-center justify-center gap-2 text-xl text-yellow-200">
          <Star className="w-6 h-6 fill-current" />
          <span>{data.mostActiveDay.contributions} contributions</span>
        </div>
      </motion.div>
    </div>
  )
} 