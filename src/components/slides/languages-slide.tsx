import { motion } from 'framer-motion'
import { GithubStats } from '../../types/github-stats'

interface LanguagesSlideProps {
  data: GithubStats
  onNext: () => void
}

export function LanguagesSlide({ data }: LanguagesSlideProps) {
  const colors: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-400',
    Python: 'bg-green-500',
    CSS: 'bg-pink-500',
    HTML: 'bg-orange-500',
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-indigo-600 to-violet-900 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Your Programming Languages
        </h2>
        <div className="space-y-6">
          {data.topLanguages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span>{lang.name}</span>
                <span>{lang.percentage}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${colors[lang.name] || 'bg-gray-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

