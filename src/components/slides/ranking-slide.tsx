import { Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import { Stars } from '../decorative/stars'
import { GithubStats } from '../../types/github-stats'

interface RankingSlideProps {
  data: GithubStats
  onNext: () => void
}

export function RankingSlide({ data }: RankingSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-yellow-500 to-orange-600 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
      <Stars />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="relative"
      >
        <div className="absolute inset-0 blur-3xl bg-yellow-300/30 rounded-full" />
        <div className="relative bg-yellow-400 text-orange-900 rounded-full p-8 mb-8">
          <Trophy className="w-20 h-20" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-6">
          You're in the top
        </h2>
        <div className="text-8xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-yellow-400 text-transparent bg-clip-text">
          0.1%
        </div>
        <p className="text-xl text-yellow-100">
          of GitHub contributors worldwide
        </p>
      </motion.div>
    </div>
  )
}

