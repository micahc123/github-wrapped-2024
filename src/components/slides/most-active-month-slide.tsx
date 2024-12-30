import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { GithubStats } from '../../types/github-stats'

interface MostActiveMonthSlideProps {
  data: GithubStats
  onNext: () => void
  username: string
}

export function MostActiveMonthSlide({ data }: MostActiveMonthSlideProps) {
  return (
    <div className="h-full w-full bg-gradient-to-br from-green-600 to-emerald-800 flex flex-col items-center justify-center p-6 text-white">
      <Calendar className="w-16 h-16 mb-6" />
      <h2 className="text-3xl font-bold mb-8 text-center">
        Your Most Active Month
      </h2>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center"
      >
        <div className="text-4xl font-bold mb-4">
          {data.mostActiveMonth.month}
        </div>
        <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-200 to-emerald-300 text-transparent bg-clip-text">
          {data.mostActiveMonth.contributions}
        </div>
        <div className="text-xl text-green-200">
          contributions
        </div>
      </motion.div>
    </div>
  )
} 