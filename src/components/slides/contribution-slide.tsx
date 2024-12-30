import { Calendar } from 'lucide-react'
import { motion } from 'framer-motion'
import { GithubStats } from '../../types/github-stats'

interface ContributionSlideProps {
  data: GithubStats
  onNext: () => void
}

export function ContributionSlide({ data }: ContributionSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-green-500 to-emerald-700 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full text-center">
        <Calendar className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">
          Your Longest Streak
        </h2>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-8xl font-bold mb-4"
        >
          {data.contributionStreak}
        </motion.div>
        <p className="text-xl">
          consecutive days of contributions
        </p>
      </div>
    </div>
  )
}

