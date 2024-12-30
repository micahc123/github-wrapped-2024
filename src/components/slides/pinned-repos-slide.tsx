import { motion } from 'framer-motion'
import { GithubStats } from '../../types/github-stats'
import { Stars } from '../decorative/stars'

interface PinnedReposSlideProps {
  data: GithubStats
  onNext: () => void
  username: string
}

export function PinnedReposSlide({ data }: PinnedReposSlideProps) {
  const pinnedCount = data.pinnedRepositories.length
  
  // Determine grid layout and card sizes based on count
  const getGridClass = () => {
    switch (pinnedCount) {
      case 1:
        return 'grid-cols-1 max-w-sm'
      case 2:
        return 'grid-cols-2 max-w-xl'
      case 3:
        return 'grid-cols-3 max-w-2xl'
      case 4:
        return 'grid-cols-2 max-w-xl'
      case 5:
      case 6:
        return 'grid-cols-3 max-w-2xl'
      default:
        return 'grid-cols-3 max-w-2xl'
    }
  }

  const getCardSize = () => {
    switch (pinnedCount) {
      case 1:
        return 'h-48'
      case 2:
        return 'h-44'
      case 3:
        return 'h-40'
      case 4:
        return 'h-36'
      case 5:
      case 6:
        return 'h-32'
      default:
        return 'h-32'
    }
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center p-6 text-white">
      <Stars />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold">
          Your Pinned Repositories
        </h2>
      </motion.div>

      <div className={`grid ${getGridClass()} gap-3 w-full`}>
        {data.pinnedRepositories.map((repo, index) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${getCardSize()} bg-white/10 backdrop-blur-lg rounded-lg p-4 flex flex-col justify-between hover:bg-white/20 transition-colors`}
          >
            <div>
              <h3 className="font-semibold text-sm mb-1 truncate">
                {repo.name}
              </h3>
              <div className="text-xs text-blue-200">
                {repo.language || 'No language'}
              </div>
            </div>
            <div className="flex items-center text-xs text-blue-200">
              <span>⭐ {repo.stars}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 