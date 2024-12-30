import { GitPullRequest } from 'lucide-react'
import { motion } from 'framer-motion'
import { GithubStats } from '../../types/github-stats'

interface CollaborationSlideProps {
  data: GithubStats
  onNext: () => void
}

export function CollaborationSlide({ data }: CollaborationSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-pink-500 to-rose-700 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full text-center">
        <GitPullRequest className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">
          You Opened
        </h2>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-8xl font-bold mb-4"
        >
          {data.totalPullRequests}
        </motion.div>
        <p className="text-xl">
          pull requests this year
        </p>
      </div>
    </div>
  )
}

