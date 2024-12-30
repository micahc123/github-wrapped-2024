import { CircleCheck, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Stars } from '../decorative/stars'
import { GithubStats } from '../../types/github-stats'

interface IssuesSlideProps {
  data: GithubStats
  onNext: () => void
}

export function IssuesSlide({ data }: IssuesSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-green-600 to-emerald-800 flex flex-col items-center justify-center p-6 text-white">
      <Stars />
      <CircleCheck className="w-16 h-16 mb-6" />
      <h2 className="text-3xl font-bold mb-8 text-center">
        Issue Resolution Master
      </h2>
      <div className="space-y-8 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6"
        >
          <div className="text-5xl font-bold mb-2">
            {data.issues.closed}
          </div>
          <div className="text-green-200">
            Issues Closed
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <Clock className="w-8 h-8" />
          <div>
            <div className="text-xl font-semibold">
              {data.issues.averageTimeToClose} hours
            </div>
            <div className="text-green-200">
              Average Time to Close
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

