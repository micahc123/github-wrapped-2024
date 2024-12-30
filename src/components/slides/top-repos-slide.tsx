import { GithubStats } from '../../types/github-stats'
import { motion } from 'framer-motion'

interface TopReposSlideProps {
  data: GithubStats
  onNext: () => void
}

export function TopReposSlide({ data }: TopReposSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-pink-500 to-purple-700 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Your Top Repositories
        </h2>
        <div className="space-y-4">
          {data.topRepositories.map((repo, index) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 flex items-center"
            >
              <div className="w-8 h-8 flex items-center justify-center text-2xl font-bold mr-4">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{repo.name}</h3>
                <p className="text-sm text-pink-200">
                  {repo.commits} commits • {repo.stars} stars
                </p>
              </div>
              <div className="text-sm font-medium px-3 py-1 rounded-full bg-white/20">
                {repo.language}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

