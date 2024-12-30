import { motion } from 'framer-motion'
import { Calendar, Timer } from 'lucide-react'
import { GithubStats } from '../../types/github-stats'

interface ActivityStatsSlideProps {
  data: GithubStats
  onNext: () => void
  username: string
}

export function ActivityStatsSlide({ data }: ActivityStatsSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-600 to-pink-700 flex flex-col items-center justify-center p-6 text-white">
      <Calendar className="w-16 h-16 mb-6" />
      <h2 className="text-3xl font-bold mb-12 text-center">
        Your Activity Stats
      </h2>
      <div className="space-y-8 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center"
        >
          <div className="text-6xl font-bold mb-2">
            {data.activeDays}
          </div>
          <div className="text-xl text-purple-200">
            Active Days
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 text-center"
        >
          <div className="text-6xl font-bold mb-2">
            {data.longestGap}
          </div>
          <div className="text-xl text-purple-200">
            Days Longest Break
          </div>
        </motion.div>
      </div>
    </div>
  )
} 