import { GitCommit } from 'lucide-react'
import { motion } from 'framer-motion'
import { Stars } from '../decorative/stars'
import { CirclePattern } from '../decorative/shapes'
import { ContributionGrid } from '../contribution-grid'
import { GithubStats } from '../../types/github-stats'

interface CommitsSlideProps {
  data: GithubStats
  onNext: () => void
}

export function CommitsSlide({ data }: CommitsSlideProps) {
  const contributionData = Array(12).fill(0).map(() => 
    Array(7).fill(0).map(() => Math.floor(Math.random() * 15))
  )

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

  const numberVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-green-400 to-green-700 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      <Stars />
      <CirclePattern />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center">
          <motion.div variants={itemVariants}>
            <GitCommit className="w-16 h-16 mb-6" />
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-2xl font-medium mb-8 text-center"
          >
            This year, you made
          </motion.h2>
          <motion.div
            variants={numberVariants}
            className="text-7xl font-bold mb-8"
          >
            {data.totalCommits}
          </motion.div>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-center mb-8"
          >
            commits across all your repositories
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="w-full overflow-x-auto pb-2"
          >
            <ContributionGrid data={contributionData} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

