import { Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { Stars } from '../decorative/stars'
import { SquarePattern } from '../decorative/shapes'
import { GithubStats } from '../../types/github-stats'

interface ProfileViewsSlideProps {
  data: GithubStats
  onNext: () => void
}

export function ProfileViewsSlide({ data }: ProfileViewsSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-violet-600 to-purple-800 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      <Stars />
      <SquarePattern />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
      >
        <Eye className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-6">
          Your Profile Caught Eyes
        </h2>
        <div className="text-8xl font-bold mb-6 bg-gradient-to-r from-violet-200 to-purple-300 text-transparent bg-clip-text">
          {data.profileViews.total}
        </div>
        <p className="text-xl text-purple-200 mb-8">
          profile views this year
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-6"
        >
          <div className="text-2xl font-bold mb-2">
            {data.profileViews.unique}
          </div>
          <div className="text-purple-200">
            unique visitors
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

