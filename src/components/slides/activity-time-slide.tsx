import { Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Stars } from '../decorative/stars'
import { GithubStats } from '../../types/github-stats'

interface ActivityTimeSlideProps {
  data: GithubStats
  onNext: () => void
}

export function ActivityTimeSlide({ data }: ActivityTimeSlideProps) {
  const maxCommits = Math.max(...data.activityByHour.map(h => h.commits))

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-600 to-blue-900 flex flex-col items-center justify-center p-6 text-white">
      <Stars />
      <Clock className="w-16 h-16 mb-6" />
      <h2 className="text-3xl font-bold mb-8 text-center">
        Your Most Productive Hour
      </h2>
      <div className="w-full max-w-md">
        <div className="flex items-end h-48 gap-1">
          {data.activityByHour.map((hour, i) => (
            <motion.div
              key={hour.hour}
              className="flex-1 bg-white/20 rounded-t-lg"
              initial={{ height: 0 }}
              animate={{ height: `${(hour.commits / maxCommits) * 100}%` }}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-blue-200">
          <span>9 AM</span>
          <span>1 PM</span>
          <span>5 PM</span>
        </div>
      </div>
      <div className="mt-8 text-xl text-center">
        You're most active at{' '}
        <span className="font-bold">
          {data.activityByHour.reduce((a, b) => 
            a.commits > b.commits ? a : b
          ).hour}:00
        </span>
      </div>
    </div>
  )
}

