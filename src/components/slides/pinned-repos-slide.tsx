import { motion } from 'framer-motion'
import { Pin } from 'lucide-react'
import { GithubStats } from '../../types/github-stats'

interface PinnedReposSlideProps {
  data: GithubStats
  onNext: () => void
  username: string
}

export function PinnedReposSlide({ data }: PinnedReposSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-600 to-indigo-900 flex flex-col items-center justify-center p-6 text-white">
      <Pin className="w-16 h-16 mb-6" />
      <h2 className="text-3xl font-bold mb-8 text-center">
        Your Pinned Repositories
      </h2>
      <div className="space-y-4 w-full max-w-md">
        {data.pinnedRepositories.map((repo, index) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-4"
          >
            <h3 className="font-semibold text-lg mb-2">{repo.name}</h3>
            <div className="flex justify-between text-sm text-blue-200">
              <span>{repo.language}</span>
              <span>⭐ {repo.stars}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 