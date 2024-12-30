interface ContributionGridProps {
  data: number[][]
}

export function ContributionGrid({ data }: ContributionGridProps) {
  const getColor = (count: number) => {
    if (count === 0) return 'bg-emerald-100/20'
    if (count < 5) return 'bg-emerald-300'
    if (count < 10) return 'bg-emerald-400'
    return 'bg-emerald-500'
  }

  return (
    <div className="grid grid-cols-7 gap-1">
      {data.map((week, i) => (
        <div key={i} className="grid gap-1">
          {week.map((day, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-3 h-3 rounded-sm ${getColor(day)}`}
              title={`${day} contributions`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

