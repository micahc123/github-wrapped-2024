import { motion } from 'framer-motion'
import { GithubStats } from '../../types/github-stats'
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SummarySlideProps {
  data: GithubStats
  onNext: () => void
  username: string
}

export function SummarySlide({ data, username }: SummarySlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-purple-600 to-blue-700 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold mb-2">
            {username}'s 2024
          </h2>
          <p className="text-xl text-blue-200">
            What a year of coding!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 space-y-4"
        >
          <div className="flex justify-between items-center">
            <span>Total Commits</span>
            <span className="font-bold">{data.totalCommits}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Pull Requests</span>
            <span className="font-bold">{data.totalPullRequests}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Longest Streak</span>
            <span className="font-bold">{data.contributionStreak} days</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Top Language</span>
            <span className="font-bold">{data.topLanguages[0].name}</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <Button
            variant="secondary"
            className="gap-2"
            onClick={() => {
              // Share functionality would go here
            }}
          >
            <Share2 className="w-4 h-4" />
            Share Your Wrapped
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

