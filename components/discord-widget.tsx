"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const DISCORD_ID = "587709425708695552"

const STATUS_COLOR: Record<string, string> = {
  online:  "#23a55a",
  idle:    "#f0b232",
  dnd:     "#f23f43",
  offline: "#80848e",
}

const STATUS_LABEL: Record<string, string> = {
  online:  "Online",
  idle:    "Idle",
  dnd:     "Do Not Disturb",
  offline: "Offline",
}

type Activity = {
  name: string
  type: number
  state?: string
  details?: string
  application_id?: string
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
  timestamps?: {
    start?: number
    end?: number
  }
}

type LanyardData = {
  discord_status: string
  discord_user: {
    username: string
    global_name: string | null
    avatar: string
    id: string
    banner?: string
    accent_color?: number
  }
  activities: Activity[]
  spotify?: {
    song: string
    artist: string
    album: string
    album_art_url: string
    track_id: string
  } | null
}

function getActivityImage(activity: Activity): string | null {
  if (!activity.assets?.large_image) return null
  const img = activity.assets.large_image
  if (img.startsWith("mp:external/")) {
    return "https://media.discordapp.net/external/" + img.slice("mp:external/".length)
  }
  if (img.startsWith("spotify:")) {
    return `https://i.scdn.co/image/${img.slice("spotify:".length)}`
  }
  if (activity.application_id) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`
  }
  return null
}

function getSmallActivityImage(activity: Activity): string | null {
  if (!activity.assets?.small_image || !activity.application_id) return null
  const img = activity.assets.small_image
  if (img.startsWith("mp:external/")) {
    return "https://media.discordapp.net/external/" + img.slice("mp:external/".length)
  }
  return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${img}.png`
}

function ActivityCard({ activity, spotify }: { activity: Activity; spotify?: LanyardData["spotify"] }) {
  const isSpotify = activity.type === 2 && spotify
  const largeImg = isSpotify ? spotify!.album_art_url : getActivityImage(activity)
  const smallImg = getSmallActivityImage(activity)

  const typeLabel =
    activity.type === 0 ? "Playing" :
    activity.type === 2 ? "Listening to" :
    activity.type === 3 ? "Watching" :
    activity.type === 4 ? "Custom Status" :
    activity.type === 5 ? "Competing in" : "Activity"

  const title = isSpotify ? spotify!.song : activity.name
  const line1 = isSpotify ? spotify!.artist : activity.details
  const line2 = isSpotify ? spotify!.album : activity.state

  return (
    <div className="rounded-xl bg-white/5 border border-white/8 p-3 space-y-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">{typeLabel}</p>
      <div className="flex items-start gap-3">
        {largeImg && (
          <div className="relative shrink-0">
            <img
              src={largeImg}
              alt={title}
              width={48}
              height={48}
              className="rounded-lg object-cover w-12 h-12"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
            />
            {smallImg && (
              <img
                src={smallImg}
                alt=""
                width={16}
                height={16}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#111114] object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
              />
            )}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-white/90 leading-snug truncate">{title}</p>
          {line1 && <p className="text-[11px] text-white/50 leading-snug truncate mt-0.5">{line1}</p>}
          {line2 && <p className="text-[11px] text-white/40 leading-snug truncate">{line2}</p>}
        </div>
      </div>
    </div>
  )
}

export function DiscordWidget() {
  const [data, setData] = useState<LanyardData | null>(null)
  const [open, setOpen] = useState(false)
  const [greeting, setGreeting] = useState(false)

  useEffect(() => {
    async function fetchPresence() {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
        const json = await res.json()
        if (json.success) setData(json.data)
      } catch {}
    }
    fetchPresence()
    const interval = setInterval(fetchPresence, 15000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!data) return
    const t1 = setTimeout(() => setGreeting(true), 800)
    const t2 = setTimeout(() => setGreeting(false), 5000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [!!data])

  if (!data) return null

  const { discord_status, discord_user, activities, spotify } = data
  const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png?size=256`
  const bannerUrl = discord_user.banner
    ? `https://cdn.discordapp.com/banners/${discord_user.id}/${discord_user.banner}.${discord_user.banner.startsWith("a_") ? "gif" : "png"}?size=480`
    : null
  const accentHex = discord_user.accent_color
    ? `#${discord_user.accent_color.toString(16).padStart(6, "0")}`
    : null

  const statusColor = STATUS_COLOR[discord_status] ?? STATUS_COLOR.offline
  const displayName = discord_user.global_name ?? discord_user.username

  // filter out custom status (type 4) from activity list for display
  const visibleActivities = activities.filter((a) => a.type !== 4)
  const customStatus = activities.find((a) => a.type === 4)

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">

      {/* Popup card */}
      {open && (
        <div className="mb-1 w-72 rounded-2xl border border-white/10 bg-[#111114]/98 backdrop-blur-xl shadow-2xl overflow-hidden"
          style={{ animation: "fadeSlideUp 0.18s ease" }}
        >
          {/* Business card */}
          <div className="relative h-28 w-full overflow-hidden select-none" onContextMenu={(e) => e.preventDefault()}>
            <img src="/card.png" alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]" />
            <div className="relative z-10 flex items-center gap-4 h-full px-5">
              <div className="relative shrink-0 w-16 h-16">
                {/* Animated glow */}
                <div className="absolute inset-0 rounded-full animate-pulse" style={{ boxShadow: `0 0 12px 4px ${statusColor}55, 0 0 24px 8px ${statusColor}22` }} />
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="relative z-10 w-16 h-16 rounded-full object-cover ring-1 ring-white/20 shadow-xl pointer-events-none"
                  draggable={false}
                />
              </div>
              <div className="min-w-0">
                <p className="text-base font-bold text-white leading-tight tracking-tight drop-shadow">{displayName}</p>
                <p className="text-[11px] text-white/50 mt-0.5">@{discord_user.username}</p>
                {customStatus?.state && (
                  <p className="text-[11px] text-white/35 mt-1.5 italic truncate">"{customStatus.state}"</p>
                )}
                <img
                  src="/code.png"
                  alt="badge"
                  className="mt-2 h-5 w-auto object-contain opacity-80"
                  draggable={false}
                />
                <p className="text-[10px] text-white/70 mt-1 italic">If it works, don&apos;t touch it</p>
              </div>
            </div>
          </div>

          {/* Activities */}
          {visibleActivities.length > 0 && (
            <div className="px-4 pb-4 pt-3 space-y-2">
              <div className="h-px bg-white/8 mb-3" />
              {visibleActivities.map((activity, i) => (
                <ActivityCard
                  key={i}
                  activity={activity}
                  spotify={activity.type === 2 ? spotify : undefined}
                />
              ))}
            </div>
          )}

          {visibleActivities.length === 0 && <div className="pb-1" />}
        </div>
      )}

      {/* Greeting bubble */}
      {greeting && !open && (
        <div className="flex items-center gap-2" style={{ animation: "fadeSlideUp 0.2s ease" }}>
          <div className="relative bg-[#111114]/95 border border-white/10 text-white text-xs px-3 py-2 rounded-xl shadow-lg backdrop-blur-xl whitespace-nowrap">
            Hey there! I&apos;m the dev 👋
            <span className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[#111114]/95" />
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative w-12 h-12 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-transform duration-150 focus:outline-none ring-2 ring-white/10 hover:ring-white/20"
        aria-label="Discord presence"
      >
        <img
          src={avatarUrl}
          alt={displayName}
          width={48}
          height={48}
          className="rounded-full w-12 h-12 object-cover"
        />
        <span
          className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-background"
          style={{ backgroundColor: statusColor }}
        />
      </button>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
    </div>
  )
}
