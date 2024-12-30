import { Network } from 'lucide-react'
import { motion } from 'framer-motion'
import { Stars } from '../decorative/stars'
import { GithubStats } from '../../types/github-stats'

interface NetworkSlideProps {
  data: GithubStats
  onNext: () => void
}

export function NetworkSlide({ data }: NetworkSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-indigo-600 to-violet-900 flex flex-col items-center justify-center p-6 text-white">
      <Stars />
      <Network className="w-16 h-16 mb-6" />
      <h2 className="text-3xl font-bold mb-8 text-center">
        Your Code's Reach
      </h2>
      <div className="space-y-6 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-full p-8 aspect-square flex flex-col items-center justify-center"
        >
          <div className="text-6xl font-bold mb-2">
            {data.networkSize.forks}
          </div>
          <div className="text-xl text-indigo-200">
            Repository Forks
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="text-2xl mb-1">
            {data.networkSize.watchers} Watchers
          </div>
          <div className="text-indigo-200">
            are following your work
          </div>
        </motion.div>
      </div>
    </div>
  )
}

