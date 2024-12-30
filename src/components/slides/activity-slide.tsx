import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { Stars } from '../decorative/stars'
import { Waves } from '../decorative/waves'
import { GithubStats } from '../../types/github-stats'

interface ActivitySlideProps {
  data: GithubStats
  onNext: () => void
}

export function ActivitySlide({ data }: ActivitySlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      <Stars />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
      >
        <Activity className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-6">
          Your Coding Energy was
        </h2>
        <div className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-200 to-pink-300 text-transparent bg-clip-text">
          Lit Mystical
        </div>
        <p className="text-2xl text-purple-200">
          Based on your commit patterns
        </p>
      </motion.div>
      <Waves color="#fff" />
    </div>
  )
}

