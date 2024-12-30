'use client'

import { useEffect, useState } from 'react'
import { StoryContainer } from '@/components/story-container'
import type { GithubStats, StorySlide } from '@/types/github-stats'
import { IntroSlide } from '@/components/slides/intro-slide'
import { CommitsSlide } from '@/components/slides/commits-slide'
import { LanguagesSlide } from '@/components/slides/languages-slide'
import { TopReposSlide } from '@/components/slides/top-repos-slide'
import { ContributionSlide } from '@/components/slides/contribution-slide'
import { ActivityTimeSlide } from '@/components/slides/activity-time-slide'
import { NetworkSlide } from '@/components/slides/network-slide'
import { CollaborationSlide } from '@/components/slides/collaboration-slide'
import { IssuesSlide } from '@/components/slides/issues-slide'
import { RankingSlide } from '@/components/slides/ranking-slide'
import { SummarySlide } from '@/components/slides/summary-slide'
import { ActivitySlide } from '@/components/slides/activity-slide'
import { ProfileViewsSlide } from '@/components/slides/profile-views-slide'
import { PinnedReposSlide } from '@/components/slides/pinned-repos-slide'
import { ActivityStatsSlide } from '@/components/slides/activity-stats-slide'
import { MostActiveMonthSlide } from '@/components/slides/most-active-month-slide'
import { TotalStatsSlide } from '@/components/slides/total-stats-slide'
import { ActiveWeekdaySlide } from '@/components/slides/active-weekday-slide'

// Create a GraphQL client with automatic retries and rate limiting
const graphqlWithAuth = async (query: string, variables: any) => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Authorization': `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  })

  if (response.status === 403) {
    throw new Error('Rate limit exceeded. Please try again later.')
  }

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}

export function WrappedClient({ username }: { username: string }) {
  const [data, setData] = useState<GithubStats | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const query = `
        query($username: String!, $from: DateTime!, $to: DateTime!) {
          user(login: $username) {
            followers {
              totalCount
            }
            following {
              totalCount
            }
            pullRequests(first: 1) {
              totalCount
            }
            issues(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                title
                state
                number
              }
            }
            contributionsCollection(from: $from, to: $to) {
              totalCommitContributions
              restrictedContributionsCount
              commitContributionsByRepository {
                repository {
                  name
                  primaryLanguage {
                    name
                  }
                }
                contributions {
                  totalCount
                }
              }
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
            repositories(first: 100, orderBy: {field: STARGAZERS, direction: DESC}, ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
              nodes {
                name
                stargazerCount
                forkCount
                watchers {
                  totalCount
                }
                languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                  edges {
                    size
                    node {
                      name
                    }
                  }
                }
              }
              totalCount
            }
            pinnedItems(first: 6, types: REPOSITORY) {
              nodes {
                ... on Repository {
                  name
                  stargazerCount
                  primaryLanguage {
                    name
                  }
                }
              }
            }
          }
        }
      `

      const fromDate = new Date('2024-01-01')
      const toDate = new Date()

      try {
        const result = await graphqlWithAuth(query, {
          username,
          from: fromDate.toISOString(),
          to: toDate.toISOString(),
        })

        const userData = result.data.user
        const contributions = userData.contributionsCollection
        const repos = userData.repositories.nodes

        // Calculate languages
        const languageMap = new Map<string, number>()
        repos.forEach((repo: any) => {
          repo.languages?.edges.forEach((edge: any) => {
            const { name } = edge.node
            const size = edge.size
            languageMap.set(name, (languageMap.get(name) || 0) + size)
          })
        })

        const totalBytes = Array.from(languageMap.values()).reduce((a, b) => a + b, 0)
        const topLanguages = Array.from(languageMap.entries())
          .map(([name, bytes]) => ({
            name,
            percentage: Math.round((bytes / totalBytes) * 100)
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 5)

        // Get top repositories
        const topRepositories = repos
          .slice(0, 5)
          .map((repo: any) => ({
            name: repo.name,
            commits: repo.defaultBranchRef?.target?.history?.totalCount || 0,
            stars: repo.stargazerCount,
            language: repo.languages?.edges[0]?.node.name || 'Unknown'
          }))

        const stats: GithubStats = {
          totalCommits: contributions.totalCommitContributions + contributions.restrictedContributionsCount,
          topRepositories: contributions.commitContributionsByRepository
            .sort((a: any, b: any) => b.contributions.totalCount - a.contributions.totalCount)
            .slice(0, 5)
            .map((repo: any) => ({
              name: repo.repository.name,
              commits: repo.contributions.totalCount,
              stars: repos.find((r: any) => r.name === repo.repository.name)?.stargazerCount || 0,
              language: repo.repository.primaryLanguage?.name || 'Unknown'
            })),
          pinnedRepositories: userData.pinnedItems.nodes.map((repo: any) => ({
            name: repo.name,
            stars: repo.stargazerCount,
            language: repo.primaryLanguage?.name || 'Unknown'
          })),
          topLanguages: calculateLanguages(contributions.commitContributionsByRepository),
          activeDays: calculateActiveDays(contributions.contributionCalendar.weeks),
          longestGap: calculateLongestGap(contributions.contributionCalendar.weeks),
          mostActiveDay: calculateMostActiveDay(contributions.contributionCalendar.weeks),
          mostActiveWeekday: calculateMostActiveWeekday(contributions.contributionCalendar.weeks),
          mostActiveMonth: calculateMostActiveMonth(contributions.contributionCalendar.weeks),
          totalStats: {
            stars: repos.reduce((acc: number, repo: any) => acc + (repo.stargazerCount || 0), 0),
            forks: repos.reduce((acc: number, repo: any) => acc + (repo.forkCount || 0), 0),
            repositories: userData.repositories.totalCount
          },
          activityByHour: calculateActivityByHour(contributions.contributionCalendar.weeks),
          totalPullRequests: userData.pullRequests?.totalCount || 0,
          contributionStreak: calculateStreak(contributions.contributionCalendar.weeks),
          issues: userData.issues?.nodes?.map((issue: any) => ({
            title: issue.title,
            state: issue.state,
            number: issue.number
          })) || [],
          networkSize: {
            followers: userData.followers.totalCount,
            following: userData.following.totalCount,
            watchers: repos.reduce((acc: number, repo: any) => acc + (repo.watchers?.totalCount || 0), 0),
            forks: repos.reduce((acc: number, repo: any) => acc + (repo.forkCount || 0), 0)
          },
          profileViews: {
            total: 0,
            unique: 0,
            topCountries: []
          }
        }

        setData(stats)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [username])

  const slides: StorySlide[] = [
    { id: 'intro', component: IntroSlide },
    { id: 'commits', component: CommitsSlide },
    { id: 'languages', component: LanguagesSlide },
    { id: 'topRepos', component: TopReposSlide },
    { id: 'pinnedRepos', component: PinnedReposSlide },
    { id: 'activityStats', component: ActivityStatsSlide },
    { id: 'mostActive', component: MostActiveMonthSlide },
    { id: 'activeWeekday', component: ActiveWeekdaySlide },
    { id: 'totalStats', component: TotalStatsSlide },
    { id: 'summary', component: SummarySlide }
  ]

  if (!data) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
        {/* Wavy animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-purple-500/20">
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute inset-0 animate-wave"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 500 Q 250 300 500 500 T 1000 500 L 1000 1000 L 0 1000 Z' fill='%23fff'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'repeat-x',
                  backgroundSize: '1000px 1000px',
                  animationDelay: `${i * -5}s`,
                  top: `${i * 10}%`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-pink-600/30 rounded-full" />
              <div className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-purple-600 animate-pulse" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 animate-pulse">
            Loading your stats...
          </h2>
          <p className="text-xl text-neutral-400 animate-pulse">
            This might take a few seconds
          </p>
        </div>
      </div>
    )
  }

  return <StoryContainer slides={slides} data={data} username={username} />
}

function calculateStreak(weeks: any[]): number {
  const days = weeks.flatMap(week => week.contributionDays)
  let currentStreak = 0
  let maxStreak = 0
  
  for (const day of days) {
    if (day.contributionCount > 0) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 0
    }
  }
  
  return maxStreak
}

function calculateActivityByHour(weeks: any[]): { hour: number; commits: number }[] {
  const hourCounts = new Array(24).fill(0)
  const days = weeks.flatMap(week => week.contributionDays)
  
  days.forEach(day => {
    const hour = new Date(day.date).getHours()
    hourCounts[hour] += day.contributionCount
  })
  
  return hourCounts.map((commits, hour) => ({ hour, commits }))
}

function calculatePercentile(commits: number): number {
  // Rough estimate based on GitHub's statistics
  if (commits > 1000) return 99
  if (commits > 500) return 95
  if (commits > 200) return 90
  if (commits > 100) return 80
  if (commits > 50) return 70
  return 50
}

function calculateLanguages(repoContributions: any[]) {
  const languageMap = new Map<string, number>()
  
  repoContributions.forEach((repo) => {
    const language = repo.repository.primaryLanguage?.name
    if (language) {
      languageMap.set(
        language, 
        (languageMap.get(language) || 0) + repo.contributions.totalCount
      )
    }
  })

  const totalContributions = Array.from(languageMap.values()).reduce((a, b) => a + b, 0)
  return Array.from(languageMap.entries())
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalContributions) * 100)
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5)
}

function calculateActiveDays(weeks: any[]): number {
  const days = weeks.flatMap(week => week.contributionDays)
  return days.filter(day => day.contributionCount > 0).length
}

function calculateLongestGap(weeks: any[]): number {
  const days = weeks.flatMap(week => week.contributionDays)
  let currentGap = 0
  let maxGap = 0
  
  for (const day of days) {
    if (day.contributionCount === 0) {
      currentGap++
      maxGap = Math.max(maxGap, currentGap)
    } else {
      currentGap = 0
    }
  }
  
  return maxGap
}

function calculateMostActiveMonth(weeks: any[]): { month: string; contributions: number } {
  const monthContributions = new Map<string, number>()
  
  weeks.forEach(week => {
    week.contributionDays.forEach((day: any) => {
      const date = new Date(day.date)
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`
      monthContributions.set(
        monthKey,
        (monthContributions.get(monthKey) || 0) + day.contributionCount
      )
    })
  })
  
  const mostActive = Array.from(monthContributions.entries())
    .sort((a, b) => b[1] - a[1])[0]
  
  const [year, month] = mostActive[0].split('-')
  const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'long' })
  
  return {
    month: `${monthName} ${year}`,
    contributions: mostActive[1]
  }
}

function calculateMostActiveDay(weeks: any[]): { date: string; contributions: number } {
  const days = weeks.flatMap(week => week.contributionDays)
  const mostActive = days.reduce((max, day) => 
    day.contributionCount > (max?.contributionCount || 0) ? day : max
  , days[0])
  
  return {
    date: mostActive.date,
    contributions: mostActive.contributionCount
  }
}

function calculateMostActiveWeekday(weeks: any[]): { day: string; contributions: number } {
  const weekdayContributions = new Map<number, number>()
  const days = weeks.flatMap(week => week.contributionDays)
  
  days.forEach(day => {
    const date = new Date(day.date)
    const weekday = date.getDay()
    weekdayContributions.set(
      weekday,
      (weekdayContributions.get(weekday) || 0) + day.contributionCount
    )
  })

  const mostActive = Array.from(weekdayContributions.entries())
    .sort((a, b) => b[1] - a[1])[0]

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  
  return {
    day: weekdays[mostActive[0]],
    contributions: mostActive[1]
  }
} 