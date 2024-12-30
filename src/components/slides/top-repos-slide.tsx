import { GithubStats } from '../../types/github-stats'
import { motion } from 'framer-motion'

interface TopReposSlideProps {
  data: GithubStats
  onNext: () => void
}

export function TopReposSlide({ data }: TopReposSlideProps) {
  const top3Repos = data.topRepositories.slice(0, 3)

  return (
    <div className="h-full w-full bg-gradient-to-br from-pink-500 to-purple-700 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full">
        <h2 className="text-4xl font-bold mb-12 text-center pt-12">
          Your Top Repositories
        </h2>
        <div className="space-y-6">
          {top3Repos.map((repo, index) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-5"
            >
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 flex items-center justify-center text-3xl font-bold mr-3">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl break-all">{repo.name}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between pl-[52px]">
                <p className="text-sm text-pink-200">
                  {repo.commits} commits • {repo.stars} stars
                </p>
                <div className="text-sm font-medium px-3 py-1.5 rounded-full bg-white/20 ml-2">
                  {repo.language}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

