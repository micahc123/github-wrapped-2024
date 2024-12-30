import { motion } from 'framer-motion'
import { Stars } from '../decorative/stars'
import { HexagonPattern } from '../decorative/shapes'
import { AdaptiveText } from '../adaptive-text'
import { GithubStats } from '../../types/github-stats'

interface IntroSlideProps {
  data: GithubStats
  onNext: () => void
  username: string
}

export function IntroSlide({ username }: IntroSlideProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      <Stars />
      <HexagonPattern />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center relative z-10"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-2xl mb-6"
        >
          Enough about 2024...
        </motion.h2>
        <motion.h1 
          variants={itemVariants}
          className="text-5xl font-bold mb-4"
        >
          Let's talk about you,
        </motion.h1>
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-yellow-400 to-pink-400 text-transparent bg-clip-text"
        >
          <AdaptiveText 
            text={username}
            className="font-bold"
            maxWidth={300}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

