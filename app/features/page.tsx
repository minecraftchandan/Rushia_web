"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "motion/react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Settings, User, Search, Package, Heart,
  BarChart2, Zap, Bell, Shield, Smile,
  ChevronDown, Terminal,
} from "lucide-react"

const NAV = [
  { id: "slash-commands", label: "Slash Commands", icon: Zap },
  { id: "server-config",  label: "Server Config",  icon: Settings },
  { id: "personal",       label: "Personal",       icon: User },
  { id: "card-search",    label: "Card Search",    icon: Search },
  { id: "inventory",      label: "Inventory",      icon: Package },
  { id: "wishlist",       label: "Wishlist",       icon: Heart },
  { id: "prefix-admin",   label: "Admin Commands", icon: Shield },
  { id: "quick",          label: "Quick Commands", icon: BarChart2 },
  { id: "reactions",      label: "Reactions",      icon: Smile },
  { id: "auto-features",  label: "Auto Features",  icon: Bell },
]

function AnimatedItem({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.15, once: false })
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

function Code({ label, children }: { label?: string; children: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-white/6">
      {label && (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/4 border-b border-white/6">
          <Terminal className="h-3 w-3 text-muted-foreground/50" />
          <span className="text-[10px] font-medium text-muted-foreground/60 tracking-wider uppercase">{label}</span>
        </div>
      )}
      <pre className="overflow-x-auto bg-[#0a0a0c] px-4 py-3 text-xs lg:text-sm font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
        {children}
      </pre>
    </div>
  )
}

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-primary/8 px-1.5 py-0.5 text-[10px] font-mono font-medium text-primary/80 border border-primary/15">
      {children}
    </span>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-1.5 grid-cols-1 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-2 text-xs lg:text-sm text-muted-foreground">
          <span className="text-primary/40 text-[10px] shrink-0">—</span>
          {item}
        </li>
      ))}
    </ul>
  )
}

function Accordion({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <AnimatedItem>
      <div className={`border-b border-border/20 last:border-0 transition-colors duration-150 ${open ? "bg-white/[0.02]" : ""}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 py-3.5 px-1 text-left group"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className={`text-sm lg:text-base font-medium transition-colors ${open ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"}`}>
              {title}
            </span>
            {badge && <Tag>{badge}</Tag>}
          </div>
          <ChevronDown className={`h-4 w-4 text-muted-foreground/40 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="pb-5 px-1 space-y-4">
            {children}
          </div>
        )}
      </div>
    </AnimatedItem>
  )
}

function Section({ id, icon: Icon, title, badge, children, flash }: {
  id: string; icon: any; title: string; badge: string; children: React.ReactNode; flash: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.05, once: false })
  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={`scroll-mt-28 lg:scroll-mt-24 transition-all duration-700 ${flash ? "ring-1 ring-primary/30 rounded-2xl shadow-[0_0_48px_-8px_hsl(var(--primary)/0.18)]" : ""}`}
    >
      {/* Section header */}
      <div className="flex items-start justify-between gap-4 mb-1 px-1">
        <div className="flex items-center gap-3">
          <Icon className="h-4 w-4 text-primary/70 shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-semibold text-foreground/60 uppercase tracking-widest">{title}</h2>
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground/40 font-medium mt-0.5 shrink-0 hidden sm:block">{badge}</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/30 mb-1 mx-1" />

      {/* Accordion list — no card wrapper, just clean rows */}
      <div className="px-1">
        {children}
      </div>
    </motion.div>
  )
}

export default function FeaturesPage() {
  const [active, setActive] = useState("slash-commands")
  const [flash, setFlash] = useState<string | null>(null)

  function go(id: string) {
    setActive(id)
    setFlash(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setTimeout(() => setFlash(null), 1200)
  }

  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-10" style={{ backgroundImage: "url(/img.png)" }} />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      <Navbar />

      {/* Mobile sticky pill nav */}
      <div className="lg:hidden sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/15">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-none px-4 py-3">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap shrink-0 transition-all ${
                active === id
                  ? "bg-primary/12 text-primary"
                  : "text-muted-foreground/60 hover:text-foreground"
              }`}
            >
              <Icon className="h-3 w-3 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl pb-32 pt-8">
        <div className="flex gap-12 items-start">

          {/* Desktop sidebar — minimal, no card wrapper */}
          <aside className="hidden lg:flex flex-col w-44 shrink-0 sticky top-24">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40 mb-3 px-2">Categories</p>
            <nav className="flex flex-col">
              {NAV.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className={`relative flex items-center gap-2.5 px-2 py-2 text-sm transition-all text-left rounded-md ${
                    active === id
                      ? "text-foreground font-medium"
                      : "text-muted-foreground/50 hover:text-muted-foreground font-normal"
                  }`}
                >
                  {active === id && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-full" />
                  )}
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${active === id ? "text-primary" : "text-muted-foreground/30"}`} />
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0 relative">
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 z-10 bg-gradient-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 z-10 bg-gradient-to-t from-background to-transparent" />
            <div className="space-y-12 py-2">

              <Section id="slash-commands" icon={Zap} title="Slash Commands" badge="Type / in Discord" flash={flash === "slash-commands"}>
                <Accordion title="Interactive Help Menu" badge="/help">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Opens a dropdown help menu covering all bot features. Ephemeral — only you can see it.</p>
                  <Bullets items={["Dropdown category navigation", "Covers all bot features", "Ephemeral response", "Detailed examples per category"]} />
                </Accordion>
                <Accordion title="Toggle Luvi Bot Integration" badge="/config">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Enable or disable Luvi bot integration for your server. Admin only.</p>
                  <Bullets items={["Admin only", "Toggle on/off instantly", "Server-scoped setting"]} />
                </Accordion>
                <Accordion title="Notification Preferences" badge="/notifications">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">View and configure personal notification settings.</p>
                  <Code label="usage">{"/notifications view\n/notifications set <type> <enabled>"}</Code>
                  <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
                    {[
                      { name: "expedition", desc: "Expedition completes" },
                      { name: "stamina",    desc: "Stamina refills" },
                      { name: "raid",       desc: "Raid fatigue recovers" },
                      { name: "raidSpawn",  desc: "30-min after raid spawn" },
                      { name: "drop",       desc: "1-hour after drop" },
                    ].map((t) => (
                      <div key={t.name} className="rounded-md border border-border/20 bg-muted/5 px-3 py-2">
                        <code className="text-[11px] font-semibold text-primary/80">{t.name}</code>
                        <p className="text-[11px] text-muted-foreground/60 mt-0.5">{t.desc}</p>
                      </div>
                    ))}
                  </div>
                </Accordion>
                <Accordion title="Multi-Role Boss Notifications" badge="/multi-roles">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Configure separate roles per boss tier. Requires Manage Roles.</p>
                  <Code label="usage">{"/multi-roles enable\n/multi-roles disable\n/multi-roles set-boss <tier> [role]"}</Code>
                  <Bullets items={["Supports Tier 1-4", "Leave role blank to remove", "Toggle single/multi mode", "Requires Manage Roles"]} />
                </Accordion>
                <Accordion title="View Boss Role Configuration" badge="/view-settings">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">View all tier role assignments and multi-role status for your server.</p>
                  <Bullets items={["Shows all tier role assignments", "Displays multi-role status", "Server-specific"]} />
                </Accordion>
                <Accordion title="Send a Suggestion" badge="/suggestion <text>">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Send a suggestion directly to the bot owner. Max 1000 characters.</p>
                  <Code>{"/suggestion Your idea here..."}</Code>
                </Accordion>
              </Section>

              <Section id="server-config" icon={Settings} title="Server Configuration" badge="Requires Manage Roles" flash={flash === "server-config"}>
                <Accordion title="Configure Boss Spawn Notifications" badge="/set-boss-role [role]">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Set a role to ping when bosses spawn. Leave empty to disable.</p>
                  <Code label="usage">{"/set-boss-role role:@BossHunters"}</Code>
                  <Bullets items={["Detects Tier 1, 2, 3 bosses", "Instant notifications", "Leave empty to disable"]} />
                </Accordion>
                <Accordion title="Advanced Multi-Role System" badge="/multi-roles">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Tier-specific roles for large servers with dedicated teams.</p>
                  <Code label="example">{"/multi-roles set-boss tier:tier1 role:@Tier1Hunters\n/multi-roles set-boss tier:tier2 role:@Tier2Elite\n/multi-roles set-boss tier:tier3 role:@Tier3Legends"}</Code>
                  <Bullets items={["Targeted notifications per tier", "Reduce notification spam", "Easy toggle between modes"]} />
                </Accordion>
              </Section>

              <Section id="personal" icon={User} title="Personal Settings" badge="Per-user preferences" flash={flash === "personal"}>
                <Accordion title="Manage Notification Preferences" badge="/notifications">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Per-user settings that persist across all servers.</p>
                  <Code label="usage">{"/notifications view\n/notifications set type:expedition enabled:true\n/notifications set type:stamina enabled:true\n/notifications set type:raid enabled:true"}</Code>
                  <Bullets items={["Per-user customization", "Server or DM notifications", "Disable specific types", "Persists across all servers"]} />
                </Accordion>
                <Accordion title="DM Delivery Toggle" badge="/dm enable|disable <type>">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Switch reminder delivery between DM and channel on a per-type basis.</p>
                  <Code label="usage">{"/dm enable <type>\n/dm disable <type>"}</Code>
                  <div className="grid gap-2 grid-cols-2">
                    {[
                      { name: "expedition", desc: "Cards ready to claim" },
                      { name: "stamina",    desc: "Stamina refill" },
                      { name: "raidSpawn",  desc: "30-min raid spawn" },
                      { name: "drop",       desc: "1-hour drop reminder" },
                    ].map((t) => (
                      <div key={t.name} className="rounded-md border border-border/20 bg-muted/5 px-3 py-2">
                        <code className="text-[11px] font-semibold text-primary/80">{t.name}</code>
                        <p className="text-[11px] text-muted-foreground/60 mt-0.5">{t.desc}</p>
                      </div>
                    ))}
                  </div>
                  <Bullets items={["enable delivers via DM", "disable delivers in channel", "Per-type control", "Takes effect immediately"]} />
                </Accordion>
              </Section>

              <Section id="card-search" icon={Search} title="Card Search" badge="No permissions needed" flash={flash === "card-search"}>
                <Accordion title="Search 1000+ Cards Instantly" badge="rf / @bot f <query>">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Fuzzy matching, multi-term support, and comma-separated batch search.</p>
                  <Code label="examples">{"@Rushia f naruto\n@Rushia f naruto,luffy,goku\n@Rushia f fire duelist\n@Rushia f naruto legendary"}</Code>
                  <Bullets items={["Fuzzy matching (typo-tolerant)", "Multi-term filtering", "Batch search with commas", "Card images and full stats"]} />
                </Accordion>
              </Section>

              <Section id="inventory" icon={Package} title="Inventory Management" badge="Reaction-based" flash={flash === "inventory"}>
                <Accordion title="Interactive Command Builder" badge="React on inventory embed">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">React with the search emoji on any inventory embed to open an interactive filter builder.</p>
                  <ol className="space-y-2">
                    {["React on your inventory embed", "Select cards (or use \"Select All\")", "Click \"Add\" to add selected cards", "Click \"Next Section\" for filters", "Select element, grade, rarity", "Copy the generated command"].map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs lg:text-sm text-muted-foreground">
                        <span className="text-primary/40 font-mono text-[10px] mt-0.5 shrink-0 w-4">{String(i + 1).padStart(2, "0")}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                  <Code label="generated">{"@Luvi inv -name Naruto,Luffy,Goku -element fire,dark -grade a,s -rarity legendary,exotic"}</Code>
                </Accordion>
              </Section>

              <Section id="wishlist" icon={Heart} title="Wishlist Commands" badge="@Bot mention commands" flash={flash === "wishlist"}>
                <Accordion title="Add Cards to Wishlist" badge="rwa / @bot wa <name>">
                  <Code label="usage">{"@Rushia wa naruto\n@Rushia wa naruto,luffy,goku"}</Code>
                  <Bullets items={["Fuzzy card name matching", "Bulk add with commas", "Max 10 cards", "Raid spawn notifications"]} />
                </Accordion>
                <Accordion title="View Wishlist" badge="rwl / @bot wl [@user]">
                  <Code label="usage">{"@Rushia wl\n@Rushia wl @user   <- owner only"}</Code>
                  <Bullets items={["Shows element emojis", "Displays total count", "Owner can view any user"]} />
                </Accordion>
                <Accordion title="Remove from Wishlist" badge="rwr / @bot wr <name>">
                  <Code label="usage">{"@Rushia wr naruto\n@Rushia wr naruto,luffy,goku"}</Code>
                  <Bullets items={["Single or bulk removal", "Fuzzy name matching", "Instant confirmation"]} />
                </Accordion>
                <Accordion title="How Wishlist Notifications Work">
                  <div className="rounded-lg border border-border/20 bg-muted/5 p-4 space-y-3">
                    <p className="text-xs font-medium text-foreground/70">When a wishlisted raid spawns you receive:</p>
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-wider mt-0.5 w-16 shrink-0">Channel</span>
                        <p className="text-xs text-muted-foreground font-mono">@you Your wishlisted raid CardName has spawned!</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-wider mt-0.5 w-16 shrink-0">DM</span>
                        <p className="text-xs text-muted-foreground font-mono">Your wishlist raid CardName has spawned by @spawner!</p>
                      </div>
                    </div>
                  </div>
                </Accordion>
              </Section>

              <Section id="prefix-admin" icon={Shield} title="Admin & Owner Commands" badge="r prefix or @Bot" flash={flash === "prefix-admin"}>
                <Accordion title="Set Role Ping Delays" badge="@bot delay <roleId> <time>">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Stagger boss ping notifications per role. Max 59s.</p>
                  <Code label="usage">{"@Rushia delay 123456789012345678 5s\n@Rushia delay 123456789012345678 1m\n@Rushia delays   <- view all"}</Code>
                  <Bullets items={["Per-role configuration", "Max 59s (5s, 1m format)", "Short form d alias", "View all with delays"]} />
                </Accordion>
                <Accordion title="Set POG Alert Channel" badge="rsetpog / @bot setpog <#channel>">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Configure the channel for auto-forwarded POG (heart value over 99) alerts.</p>
                  <Code label="usage">{"rsetpog #pog-alerts\n@Rushia setpog #pog-alerts"}</Code>
                </Accordion>
                <Accordion title="Toggle Luvi Integration" badge="rconfig / @bot config">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Enable or disable Luvi bot integration for the server.</p>
                  <Code label="usage">{"rconfig\n@Rushia config"}</Code>
                </Accordion>
              </Section>

              <Section id="quick" icon={BarChart2} title="Quick Commands" badge="No prefix needed" flash={flash === "quick"}>
                <Accordion title="Drop Leaderboard" badge="rlb">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">View the server drop leaderboard with top droppers and real-time stats.</p>
                  <Code label="usage">{"rlb"}</Code>
                  <Bullets items={["Top droppers ranking", "Server-wide statistics", "No prefix needed", "Real-time data"]} />
                </Accordion>
              </Section>

              <Section id="reactions" icon={Smile} title="Reaction-Based Features" badge="React to Luvi messages" flash={flash === "reactions"}>
                <Accordion title="Extract Card IDs" badge="React ID on any Luvi message">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Automatically extracts and posts all card IDs as a comma-separated list, ready to paste into inventory commands.</p>
                  <Bullets items={["Works on any Luvi message", "Comma-separated output", "Instant extraction", "Useful for inventory commands"]} />
                </Accordion>
                <Accordion title="Scrape Cards by Rarity" badge="React pencil on inventory embed">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Scrapes all cards from an inventory embed grouped by rarity, with pagination.</p>
                  <Bullets items={["Groups cards by rarity", "Paginated output", "Quick bulk export"]} />
                </Accordion>
                <Accordion title="Interactive Command Builder" badge="React search on inventory embed">
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">Opens an interactive builder for advanced inventory filtering.</p>
                  <Code label="generated">{"@Luvi inv -name Naruto,Luffy -element fire -grade s -rarity legendary"}</Code>
                </Accordion>
              </Section>

              <Section id="auto-features" icon={Bell} title="Automatic Background Features" badge="Always running" flash={flash === "auto-features"}>
                <div className="grid gap-px bg-border/15 rounded-lg overflow-hidden border border-border/15">
                  {[
                    { name: "Boss Ping",          desc: "Detects Luvi boss spawns, pings configured role(s) with optional delay" },
                    { name: "Stamina Reminder",    desc: "DM or channel reminder when stamina refills to 100%" },
                    { name: "Expedition Reminder", desc: "Reminder when expedition completes and cards are ready" },
                    { name: "Raid Reminder",       desc: "Notifies when raid fatigue recovers" },
                    { name: "Raid Spawn Reminder", desc: "30-min reminder after spawning a raid boss" },
                    { name: "Drop Reminder",       desc: "1-hour reminder after using the drop command" },
                    { name: "POG Alerts",          desc: "Auto-detects heart values over 99, forwards to configured channel" },
                    { name: "Drop Tracking",       desc: "Tracks all drops and exotic/legendary counts per user per server" },
                    { name: "Raid Wishlist Ping",  desc: "Pings users in channel and DM when their wishlisted raid spawns" },
                    { name: "Series Heart Values", desc: "Shows heart values on series selection embeds automatically" },
                  ].map((f) => (
                    <AnimatedItem key={f.name}>
                      <div className="flex items-start gap-4 bg-background px-4 py-3 hover:bg-muted/5 transition-colors">
                        <span className="text-[10px] font-semibold text-primary/50 uppercase tracking-wider mt-0.5 w-32 shrink-0 leading-relaxed">{f.name}</span>
                        <p className="text-xs lg:text-sm text-muted-foreground/70 leading-relaxed">{f.desc}</p>
                      </div>
                    </AnimatedItem>
                  ))}
                </div>
              </Section>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
