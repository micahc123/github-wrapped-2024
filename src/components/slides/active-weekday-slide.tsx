import { Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { Stars } from '../decorative/stars'
import { GithubStats } from '../../types/github-stats'

interface ActiveWeekdaySlideProps {
  data: GithubStats
  onNext: () => void
  username: string
}

export function ActiveWeekdaySlide({ data }: ActiveWeekdaySlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center p-6 text-white">
      <Stars />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 blur-2xl bg-blue-300/30 rounded-full" />
        <div className="relative bg-blue-400 text-blue-900 rounded-full p-6">
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
          Your Power Day
        </h2>
        <div className="text-5xl font-bold mb-4">
          {data.mostActiveWeekday.day}
        </div>
        <div className="text-xl text-blue-200">
          {data.mostActiveWeekday.contributions} contributions
        </div>
      </motion.div>
    </div>
  )
} 