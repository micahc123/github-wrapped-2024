'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')
    if (username) {
      router.push(`/wrapped/${username}`)
    }
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-hidden">
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
        <h1 className="text-6xl font-bold text-white mb-4 font-mono">
          GitHub Wrapped
        </h1>
        <h2 className="text-xl text-neutral-400 mb-12">
          Your Year in Code 2024
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
          <input
            type="text"
            name="username"
            placeholder="Enter your GitHub username"
            className="w-full max-w-md px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200"
          >
            <span>View Your Wrapped</span>
          </button>
        </form>
        <a
          href="https://github.com/micahchoo/git-wrapped"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 text-neutral-400 hover:text-white transition-colors"
        >
          Star on GitHub
        </a>
      </div>
    </main>
  )
}

