"use client"

import { useEffect, useState } from "react"
import { Server, Users, Terminal } from "lucide-react"

interface Stats {
  servers: number
  users: number
  commandsUsed: number
  remindersSent: number
}

function StatSkeleton() {
  return (
    <div className="text-center">
      <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-muted animate-pulse" />
      <div className="mx-auto h-9 w-24 rounded-lg bg-muted animate-pulse mb-2" />
      <div className="mx-auto h-4 w-16 rounded bg-muted animate-pulse" />
    </div>
  )
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return <span>{formatNumber(count)}{suffix}</span>
}

export function StatsSection() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setError(true))
  }, [])

  const statsData = stats ? [
    { label: "Servers",       value: stats.servers,      icon: Server,       suffix: "+" },
    { label: "Users",         value: stats.users,        icon: Users,        suffix: "+" },
    { label: "Commands Used", value: stats.commandsUsed, icon: Terminal,     suffix: "+" },
  ] : null

  return (
    <section className="border-y border-border bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          {!statsData ? (
            Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
          ) : error ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <div className="h-6 w-6 rounded bg-muted" />
                </div>
                <div className="text-3xl font-bold text-foreground">—</div>
                <div className="mt-1 text-sm text-muted-foreground">Unavailable</div>
              </div>
            ))
          ) : (
            statsData.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground md:text-4xl">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
