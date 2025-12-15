"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Zap,
  Bell,
  Search,
  Hash,
  Volume2,
  ChevronDown,
  Plus,
  Settings,
  Mic,
  Headphones,
  Gift,
  ImageIcon,
  Smile,
  PlusCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

type ChannelName = "boss-alerts" | "card-roles" | "bot-commands"

interface ChannelContent {
  name: string
  description: string
  messages: React.ReactNode
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [activeChannel, setActiveChannel] = useState<ChannelName>("boss-alerts")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChannel((prev) => {
        if (prev === "boss-alerts") return "card-roles"
        if (prev === "card-roles") return "bot-commands"
        return "boss-alerts"
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const channelContents: Record<ChannelName, ChannelContent> = {
    "boss-alerts": {
      name: "boss-alerts",
      description: "Get notified when bosses spawn",
      messages: (
        <div className="flex items-start gap-2 group text-xs">
          <Image src="/rushia.png" alt="Rushia" width={32} height={32} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-medium text-[#f2f3f5]">Rushia</span>
              <span className="px-1 py-0.5 rounded text-[8px] font-semibold bg-[#5865f2] text-white">BOT</span>
            </div>
            <div className="mt-1 rounded overflow-hidden border-l-2 border-[#5865f2] bg-[#2b2d31] p-2">
              <p className="font-semibold text-white text-xs">Tier 3 Boss Spawned!</p>
              <div className="mt-1 grid grid-cols-2 gap-1 text-xs">
                <div><span style={{ color: "#949ba4" }}>Boss:</span></div>
                <div><span className="text-white">Shadow Dragon</span></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "card-roles": {
      name: "card-roles",
      description: "Card drop role pings",
      messages: (
        <div className="flex items-start gap-2 group text-xs">
          <Image src="/rushia.png" alt="Rushia" width={32} height={32} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="font-medium text-[#f2f3f5]">Rushia</span>
              <span className="px-1 py-0.5 rounded text-[8px] font-semibold bg-[#5865f2] text-white">BOT</span>
            </div>
            <div className="mt-1 rounded overflow-hidden border-l-2 border-[#ed4245] bg-[#2b2d31] p-2">
              <p className="font-semibold text-white text-xs">Legendary Card!</p>
              <div className="mt-1 text-xs">
                <span className="text-[#faa61a]">Naruto Uzumaki</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "bot-commands": {
      name: "bot-commands",
      description: "Use bot commands here",
      messages: (
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center flex-shrink-0 text-white font-semibold text-xs">Y</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <span className="font-medium text-[#f2f3f5]">You</span>
              </div>
              <p className="text-[#dbdee1]"><span className="text-[#5865f2] font-medium">@Rushia</span> f naruto</p>
            </div>
          </div>
          <div className="flex items-start gap-2 group">
            <Image src="/rushia.png" alt="Rushia" width={32} height={32} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                <span className="font-medium text-[#f2f3f5]">Rushia</span>
                <span className="px-1 py-0.5 rounded text-[7px] font-semibold bg-[#5865f2] text-white">BOT</span>
              </div>
              <div className="rounded overflow-hidden border-l-2 border-[#faa61a] bg-[#2b2d31] p-2">
                <p className="font-semibold text-white text-xs">Found 3 results</p>
                <div className="mt-1 space-y-1 text-xs">
                  <div><span className="text-[#faa61a]">Naruto Uzumaki</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(88,101,242,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(88,101,242,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Discord Bot for Luvi
              </span>
              
              <h1 className="text-5xl font-bold leading-tight">
                Never Miss Another
                <span className="block text-primary">Boss or Card</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Rushia automatically detects boss spawns and card drops, sends you reminders, and helps you search through 1000+ cards instantly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <a href="https://discord.com/oauth2/authorize?client_id=1441694586333429923&permissions=2147993664&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener noreferrer">
                  Add to Discord
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/features">
                  View Commands
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <span className="text-sm">Boss Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-primary" />
                <span className="text-sm">Card Search</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm">Reminders</span>
              </div>
            </div>
          </div>

          <div className="relative -ml-16">
            <div className="absolute -inset-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl blur-xl" />
            <div className="relative bg-[#1e1f22] rounded-xl shadow-xl overflow-hidden border border-border/20">
              <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: "#1e1f22" }}>
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>

              <div className="flex h-96">
                <div className="w-14 flex-shrink-0 flex flex-col items-center gap-1 py-2 px-1.5" style={{ backgroundColor: "#1e1f22" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer hover:rounded-lg transition-all" style={{ backgroundColor: "#5865f2" }}>
                    <svg width="20" height="15" viewBox="0 0 28 20" fill="white">
                      <path d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461742 10.3416 0C8.49087 0.318797 6.68679 0.879656 4.97999 1.67671C1.42635 6.77177 0.378219 11.7398 0.918518 16.6355C2.99701 18.1608 5.25918 19.3515 7.69858 20C8.22773 19.281 8.69818 18.5175 9.10213 17.7182C8.31799 17.4163 7.56325 17.0385 6.84992 16.5914C7.05518 16.4445 7.25519 16.2921 7.44894 16.1342C11.7016 18.0875 16.3488 18.0875 20.5536 16.1342C20.7486 16.2921 20.9486 16.4445 21.1525 16.5914C20.4379 17.0385 19.6832 17.4163 18.8991 17.7182C19.3031 18.5175 19.7735 19.281 20.3027 20C22.7433 19.3515 25.0067 18.1608 27.0827 16.6355C27.7166 10.8625 26.2095 5.94309 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34055 12.4784 7.34055 11.0585C7.34055 9.63855 8.37568 8.47861 9.68041 8.47861C10.9864 8.47861 12.0421 9.63855 12.0203 11.0585C12.0203 12.4784 10.9851 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9762 12.4784 15.9762 11.0585C15.9762 9.63855 17.0113 8.47861 18.3161 8.47861C19.6208 8.47861 20.6778 9.63855 20.6559 11.0585C20.6559 12.4784 19.6208 13.6383 18.3161 13.6383Z" />
                    </svg>
                  </div>
                  <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: "#35363c" }} />
                  <div className="w-9 h-9 rounded-lg hover:rounded-md transition-all cursor-pointer flex items-center justify-center text-white font-semibold text-xs" style={{ backgroundColor: "#5865f2" }}>LC</div>
                  <div className="w-9 h-9 rounded-lg hover:rounded-md transition-all cursor-pointer flex items-center justify-center text-white/60 font-semibold text-xs" style={{ backgroundColor: "#313338" }}>RH</div>
                  <div className="w-9 h-9 rounded-lg hover:rounded-md transition-all cursor-pointer flex items-center justify-center text-white/60 font-semibold text-xs" style={{ backgroundColor: "#313338" }}>GG</div>
                  <div className="w-9 h-9 rounded-lg hover:rounded-md hover:bg-[#23a559] transition-all cursor-pointer flex items-center justify-center group" style={{ backgroundColor: "#313338" }}>
                    <Plus className="h-4 w-4 text-[#23a559] group-hover:text-white transition-colors" />
                  </div>
                </div>

                <div className="w-40 flex-shrink-0 flex flex-col" style={{ backgroundColor: "#2b2d31" }}>
                  <div className="h-9 px-2 flex items-center justify-between border-b shadow-sm cursor-pointer hover:bg-[#35363c] transition-colors text-xs" style={{ borderColor: "#1e1f22" }}>
                    <span className="font-semibold text-white">Luvi</span>
                    <ChevronDown className="h-3 w-3 text-white/60" />
                  </div>

                  <div className="flex-1 overflow-y-auto p-1 text-xs">
                    <div className="mb-1">
                      <div className="flex items-center gap-0.5 px-1 py-1 font-semibold uppercase tracking-wide cursor-pointer hover:text-white/80" style={{ color: "#949ba4" }}>
                        <ChevronDown className="h-2.5 w-2.5" />
                        <span className="text-xs">Text</span>
                      </div>
                      <div className="space-y-0.5">
                        <div onClick={() => setActiveChannel("boss-alerts")} className={`flex items-center gap-1 px-1 py-0.5 rounded cursor-pointer transition-colors ${activeChannel === "boss-alerts" ? "bg-[#404249] text-[#f2f3f5]" : "text-[#949ba4] hover:bg-[#35363c] hover:text-[#dbdee1]"}`}>
                          <Hash className="h-3 w-3" style={{ color: activeChannel === "boss-alerts" ? "#f2f3f5" : "#80848e" }} />
                          <span className="text-xs">boss</span>
                        </div>
                        <div onClick={() => setActiveChannel("card-roles")} className={`flex items-center gap-1 px-1 py-0.5 rounded cursor-pointer transition-colors ${activeChannel === "card-roles" ? "bg-[#404249] text-[#f2f3f5]" : "text-[#949ba4] hover:bg-[#35363c] hover:text-[#dbdee1]"}`}>
                          <Hash className="h-3 w-3" style={{ color: activeChannel === "card-roles" ? "#f2f3f5" : "#80848e" }} />
                          <span className="text-xs">cards</span>
                        </div>
                        <div onClick={() => setActiveChannel("bot-commands")} className={`flex items-center gap-1 px-1 py-0.5 rounded cursor-pointer transition-colors ${activeChannel === "bot-commands" ? "bg-[#404249] text-[#f2f3f5]" : "text-[#949ba4] hover:bg-[#35363c] hover:text-[#dbdee1]"}`}>
                          <Hash className="h-3 w-3" style={{ color: activeChannel === "bot-commands" ? "#f2f3f5" : "#80848e" }} />
                          <span className="text-xs">cmds</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-9 px-1 flex items-center gap-1" style={{ backgroundColor: "#232428" }}>
                    <div className="relative">
                      <div className="w-6 h-6 rounded-full bg-[#5865f2] flex items-center justify-center text-white text-xs font-semibold">Y</div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#232428] bg-[#23a559]" />
                    </div>
                    <div className="flex items-center gap-0.5">
                      <Mic className="h-3 w-3 text-[#b5bac1] cursor-pointer hover:text-white/80" />
                      <Headphones className="h-3 w-3 text-[#b5bac1] cursor-pointer hover:text-white/80" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col" style={{ backgroundColor: "#313338" }}>
                  <div className="h-9 px-2 flex items-center gap-1 border-b shadow-sm text-xs" style={{ borderColor: "#1e1f22" }}>
                    <Hash className="h-3.5 w-3.5 text-[#80848e]" />
                    <span className="font-semibold text-white">{channelContents[activeChannel].name}</span>
                  </div>

                  <div className="flex-1 overflow-y-auto p-2">{channelContents[activeChannel].messages}</div>

                  <div className="p-1.5">
                    <div className="flex items-center gap-1 px-2 py-1.5 rounded text-xs" style={{ backgroundColor: "#383a40" }}>
                      <PlusCircle className="h-3 w-3 text-[#b5bac1] cursor-pointer hover:text-white/80" />
                      <input type="text" placeholder="Message" className="flex-1 bg-transparent text-[#dbdee1] placeholder-[#6d6f78] outline-none text-xs" readOnly />
                      <Gift className="h-3 w-3 text-[#b5bac1] cursor-pointer hover:text-white/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
