import { motion } from 'framer-motion'
import { Star, GitFork, Box } from 'lucide-react'
import { GithubStats } from '../../types/github-stats'

interface TotalStatsSlideProps {
  data: GithubStats
  onNext: () => void
  username: string
}

export function TotalStatsSlide({ data }: TotalStatsSlideProps) {
  const stats = [
    { icon: Star, value: data.totalStats.stars, label: 'Total Stars' },
    { icon: GitFork, value: data.totalStats.forks, label: 'Total Forks' },
    { icon: Box, value: data.totalStats.repositories, label: 'Repositories' }
  ]

  return (
    <div className="h-full w-full bg-gradient-to-br from-yellow-500 to-orange-600 flex flex-col items-center justify-center p-6 text-white">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Your Total Impact
      </h2>
      <div className="space-y-6 w-full max-w-md">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 flex items-center gap-4"
          >
            <stat.icon className="w-8 h-8" />
            <div>
              <div className="text-3xl font-bold">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-orange-200">
                {stat.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 