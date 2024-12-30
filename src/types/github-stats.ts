export interface GithubStats {
    totalCommits: number
    topRepositories: Array<{
      name: string
      commits: number
      stars: number
      language: string
    }>
    pinnedRepositories: Array<{
      name: string
      stars: number
      language: string
    }>
    topLanguages: Array<{
      name: string
      percentage: number
    }>
    activeDays: number
    longestGap: number
    mostActiveMonth: {
      month: string
      contributions: number
    }
    totalStats: {
      stars: number
      forks: number
      repositories: number
    }
    activityByHour: Array<{
      hour: number
      commits: number
    }>
    totalPullRequests: number
    contributionStreak: number
    issues: {
      total: number
      open: number
      closed: number
      averageTimeToClose: number
      items: Array<{
        title: string
        state: string
        number: number
      }>
    }
    networkSize: {
      followers: number
      following: number
      watchers: number
      forks: number
    }
    profileViews: {
      total: number
      unique: number
      topCountries: Array<{
        country: string
        views: number
      }>
    }
}
  
export interface StorySlide {
  id: string
  component: React.ComponentType<{
    data: GithubStats
    onNext: () => void
    username: string
  }>
}
  
  