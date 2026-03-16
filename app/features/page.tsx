"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Settings, User, HelpCircle, Search, Package, Heart, Clock, BarChart2, ChevronRight } from "lucide-react"

const categories = [
  { id: "server-config", label: "Server Config", icon: Settings },
  { id: "personal",      label: "Personal",      icon: User },
  { id: "help",          label: "Help",           icon: HelpCircle },
  { id: "card-search",   label: "Card Search",    icon: Search },
  { id: "inventory",     label: "Inventory",      icon: Package },
  { id: "wishlist",      label: "Wishlist",       icon: Heart },
  { id: "role-delay",    label: "Role Delay",     icon: Clock },
  { id: "quick",         label: "Quick",          icon: BarChart2 },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted/40 border border-border/50 px-4 py-3 text-sm">
      <code className="text-foreground/90 whitespace-pre-wrap font-mono">{children}</code>
    </pre>
  )
}

function Tag({ children }: { children: string }) {
  return (
    <code className="inline-block rounded-md bg-primary/10 border border-primary/20 px-2.5 py-1 text-xs font-semibold text-primary">
      {children}
    </code>
  )
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-1.5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
          <ChevronRight className="h-3.5 w-3.5 text-primary flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function SectionHeader({ id, icon: Icon, title, badge }: { id: string; icon: any; title: string; badge: string }) {
  return (
    <div id={id} className="scroll-mt-24 flex items-center gap-4 mb-6 pb-4 border-b border-border/40">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{badge}</p>
      </div>
    </div>
  )
}

function CommandCard({ command }: { command: any }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/40 hover:bg-card/70 transition-colors p-5 space-y-4">
      {command.name && <Tag>{command.name}</Tag>}
      <div>
        <h3 className="text-base font-semibold text-foreground">{command.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{command.description}</p>
      </div>

      {"usage" in command && command.usage && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Usage</p>
          <CodeBlock>{command.usage}</CodeBlock>
        </div>
      )}

      {"subcommands" in command && command.subcommands && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Subcommands</p>
          {command.subcommands.map((sub: any, i: number) => (
            <div key={i} className="rounded-lg bg-muted/30 border border-border/30 p-3 space-y-2">
              <p className="text-sm font-medium text-foreground">{sub.title}</p>
              <CodeBlock>{sub.usage}</CodeBlock>
              {sub.description && <p className="text-xs text-muted-foreground">{sub.description}</p>}
            </div>
          ))}
        </div>
      )}

      {"examples" in command && command.examples && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Examples</p>
          {command.examples.map((ex: any, i: number) => (
            <div key={i} className="space-y-1.5">
              <p className="text-xs text-muted-foreground">{ex.title}</p>
              <CodeBlock>{ex.code}</CodeBlock>
            </div>
          ))}
        </div>
      )}

      {"features" in command && command.features && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Features</p>
          <FeatureList items={command.features} />
        </div>
      )}

      {"benefits" in command && command.benefits && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Benefits</p>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {command.benefits.map((b: string) => (
              <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-green-500 text-xs">✓</span>{b}
              </li>
            ))}
          </ul>
        </div>
      )}

      {"example" in command && command.example && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{command.example.title}</p>
          <CodeBlock>{command.example.content}</CodeBlock>
        </div>
      )}

      {"notificationTypes" in command && command.notificationTypes && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Notification Types</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {command.notificationTypes.map((t: any) => (
              <div key={t.name} className="rounded-lg bg-muted/30 border border-border/30 p-3">
                <code className="text-xs font-semibold text-primary">{t.name}</code>
                <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {"categories" in command && command.categories && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Help Categories</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {command.categories.map((cat: any) => (
              <div key={cat.name} className="flex items-center gap-2 rounded-lg bg-muted/30 border border-border/30 p-3">
                <span className="text-base">{cat.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-foreground">{cat.name}</p>
                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {"searchFeatures" in command && command.searchFeatures && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Search Features</p>
          <FeatureList items={command.searchFeatures} />
        </div>
      )}

      {"outputExamples" in command && command.outputExamples && (
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Output Example</p>
          {command.outputExamples.map((ex: any, i: number) => (
            <div key={i} className="space-y-1.5">
              <p className="text-xs text-muted-foreground">{ex.title}</p>
              <CodeBlock>{ex.content}</CodeBlock>
            </div>
          ))}
        </div>
      )}

      {"steps" in command && command.steps && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">How to Use</p>
          <ol className="space-y-2">
            {command.steps.map((step: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {"generatedExample" in command && command.generatedExample && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Generated Command</p>
          <CodeBlock>{command.generatedExample}</CodeBlock>
        </div>
      )}

      {"notificationInfo" in command && command.notificationInfo && (
        <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 space-y-3">
          <p className="text-sm font-semibold text-foreground">🔔 How Wishlist Notifications Work</p>
          <ol className="space-y-3">
            {command.notificationInfo.steps.map((step: any, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">{i + 1}</span>
                <div>
                  <span className="font-semibold text-foreground">{step.label} </span>
                  {step.desc.split("\n").map((line: string, j: number) => (
                    <span key={j} className="block text-muted-foreground text-sm">{line}</span>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

const sections = [
  {
    id: "server-config", icon: Settings,
    title: "Server Configuration", badge: "Requires: Manage Roles Permission",
    commands: [
      {
        name: "/set-boss-role [role]",
        title: "Configure Boss Spawn Notifications",
        description: "Set up automatic notifications when bosses spawn in the Luvi game. The bot will ping the specified role with boss details.",
        usage: "/set-boss-role role:@BossHunters",
        features: ["Detects all boss tiers (Tier 1, 2, 3)", "Instant notifications with boss name and tier", "Works with legacy single-role system", "Leave role empty to disable"],
        example: { title: "Example Output", content: "@BossHunters Tier 3 Boss Spawned!\nBoss: Shadow Dragon" },
      },
      {
        name: "/multi-roles",
        title: "Advanced Multi-Role Notification System",
        description: "Upgrade to tier-specific and rarity-specific roles. Perfect for large servers with dedicated teams.",
        subcommands: [
          { title: "Enable Multi-Role System", usage: "/multi-roles enable", description: "Activates the advanced notification system." },
          { title: "Configure Boss Tier Roles", usage: "/multi-roles set-boss tier:tier1 role:@Tier1Hunters\n/multi-roles set-boss tier:tier2 role:@Tier2Elite\n/multi-roles set-boss tier:tier3 role:@Tier3Legends" },
          { title: "Configure Card Rarity Roles", usage: "/multi-roles set-card rarity:common role:@CommonCollectors\n/multi-roles set-card rarity:rare role:@RareCollectors\n/multi-roles set-card rarity:legendary role:@LegendaryElite" },
          { title: "Disable Multi-Role System", usage: "/multi-roles disable", description: "Returns to single-role system." },
        ],
        benefits: ["Targeted notifications per tier/rarity", "Reduce notification spam", "Organize community by interest", "Easy toggle between modes"],
      },
    ],
  },
  {
    id: "personal", icon: User,
    title: "Personal Settings", badge: "Customize your preferences",
    commands: [
      {
        name: "/notifications",
        title: "Manage Personal Notification Preferences",
        description: "Customize which reminders you receive and how. All settings are per-user and work across all servers.",
        subcommands: [
          { title: "View Current Settings", usage: "/notifications view", description: "Displays your current notification preferences." },
          { title: "Configure Notification Types", usage: "/notifications set type:expedition enabled:true\n/notifications set type:stamina enabled:true\n/notifications set type:raid enabled:true\n/notifications set type:raidSpawnReminder enabled:true" },
          { title: "DM Notification Settings", usage: "/dm enable type:expedition\n/dm enable type:stamina\n/dm disable type:expedition" },
        ],
        notificationTypes: [
          { name: "expedition", desc: "Reminded when expedition cards are ready to claim" },
          { name: "stamina", desc: "Alert when stamina reaches 100%" },
          { name: "raid", desc: "Notified when raid fatigue wears off" },
          { name: "raidSpawnReminder", desc: "30-minute cooldown reminder for raid spawns" },
        ],
        features: ["Per-user customization", "Server or DM notifications", "Disable specific types", "Persists across all servers"],
      },
    ],
  },
  {
    id: "help", icon: HelpCircle,
    title: "Help & Information", badge: "Get help and learn about the bot",
    commands: [
      {
        name: "/help",
        title: "Interactive Help Menu",
        description: "Access comprehensive bot documentation through an interactive dropdown menu system.",
        usage: "/help",
        categories: [
          { emoji: "🤖", name: "Overview", desc: "Bot introduction and feature summary" },
          { emoji: "📋", name: "Admin Commands", desc: "Server configuration guide" },
          { emoji: "👤", name: "User Commands", desc: "Personal settings and preferences" },
          { emoji: "🔍", name: "Card Search", desc: "How to search and find cards" },
          { emoji: "📦", name: "Inventory Helper", desc: "Inventory management tools" },
          { emoji: "🔧", name: "Auto Features", desc: "Automatic detection systems" },
          { emoji: "💡", name: "Tips & Tricks", desc: "Pro tips and best practices" },
        ],
        features: ["Interactive dropdown navigation", "Organized by category", "Ephemeral responses", "Detailed examples"],
      },
    ],
  },
  {
    id: "card-search", icon: Search,
    title: "Card Search", badge: "No permissions required — Available to everyone",
    commands: [
      {
        name: "@bot f <query>  or  @bot find <query>",
        title: "Search Through 1000+ Cards Instantly",
        description: "Powerful card search with fuzzy matching and multi-term support.",
        examples: [
          { title: "Single card search", code: "@Rushia f naruto\n@Rushia find luffy\n@Rushia f bleach ice" },
          { title: "Multi-card search (comma-separated)", code: "@Rushia f naruto,luffy,goku\n@Rushia find shanks,zoro,sanji" },
          { title: "Advanced filtering", code: "@Rushia f fire duelist        → Fire element duelist cards\n@Rushia find support light     → Light element support cards\n@Rushia f naruto legendary     → Legendary Naruto cards" },
        ],
        searchFeatures: ["Fuzzy matching (typo-tolerant)", "Multi-term filtering", "Instant results with card details", "Card images and full stats", "Batch search with comma separation"],
        outputExamples: [
          { title: "Single Result", content: "Card: Naruto Uzumaki\nSeries: Naruto\nElement: Fire\nRole: Duelist\n[Card Image]" },
        ],
      },
    ],
  },
  {
    id: "inventory", icon: Package,
    title: "Inventory Management", badge: "Mention-based commands",
    commands: [
      {
        name: "React with 🔍 on Inventory",
        title: "Advanced Inventory Command Generator",
        description: "Build complex inventory search commands with an interactive interface.",
        steps: [
          "React with 🔍 on your inventory",
          "Select cards from dropdown (or use \"Select All\")",
          "Click \"Add\" to add selected cards",
          "Click \"Next Section\" to add filters",
          "Select element, grade, rarity filters",
          "Get generated command ready to use",
        ],
        generatedExample: "@Luvi inv -name Naruto,Luffy,Goku -element fire,dark -grade a,s -rarity legendary,exotic",
        features: ["Select All option for bulk adding", "Multi-select filters", "Real-time command preview", "Works with inventory pagination"],
      },
    ],
  },
  {
    id: "wishlist", icon: Heart,
    title: "Wishlist Commands", badge: "Mention-based commands — Available to everyone",
    commands: [
      {
        name: "@bot wa <card name>",
        title: "Add Cards to Your Wishlist",
        description: "Add single or multiple cards to your wishlist. Get notified when they spawn in raids.",
        examples: [
          { title: "Add a single card", code: "@Rushia wa naruto" },
          { title: "Add multiple cards at once", code: "@Rushia wa naruto,luffy,goku" },
        ],
        features: ["Fuzzy card name matching", "Bulk add with comma separation", "Get raid spawn notifications", "Persists across all servers"],
      },
      {
        name: "@bot wl",
        title: "View Wishlists",
        description: "View your own wishlist or another user's wishlist (bot owner only).",
        examples: [
          { title: "View your wishlist", code: "@Rushia wl" },
          { title: "View another user's wishlist (owner only)", code: "@Rushia wl @user\n@Rushia wl <userId>" },
        ],
        features: ["Shows element emojis per card", "Displays total card count", "Owner can view any user's wishlist"],
      },
      {
        name: "@bot wr <card name>",
        title: "Remove Cards from Your Wishlist",
        description: "Remove single or multiple cards from your wishlist.",
        examples: [
          { title: "Remove a single card", code: "@Rushia wr naruto" },
          { title: "Remove multiple cards", code: "@Rushia wr naruto,luffy,goku" },
        ],
        features: ["Single or bulk removal", "Fuzzy name matching", "Instant confirmation"],
      },
      {
        name: "",
        title: "How Notifications Work",
        description: "Once you have cards in your wishlist, Rushia automatically notifies you when they spawn in a raid.",
        notificationInfo: {
          steps: [
            { label: "Add cards", desc: "to your wishlist using `wa`" },
            { label: "When someone spawns a raid", desc: "with your wishlisted card, you get:\n📢 Channel ping: \"@user Your wishlisted raid CardName 🔥 has spawned!\"\n📩 Personal DM: \"Your wishlist raid CardName 🔥 has spawned by @spawner!\"" },
            { label: "Never miss", desc: "your wanted cards again!" },
          ],
        },
      },
    ],
  },
  {
    id: "role-delay", icon: Clock,
    title: "Role Delay Commands", badge: "Mention-based commands — Manage notification timing",
    commands: [
      {
        name: "@bot delay <roleId> <time>",
        title: "Set Role Ping Delays",
        description: "Set a delay in milliseconds before pinging a specific role for boss spawns. Useful for staggering notifications.",
        examples: [
          { title: "Set delay (full form)", code: "@Rushia delay 123456789012345678 5000" },
          { title: "Set delay (short form)", code: "@Rushia d 123456789012345678 3000" },
          { title: "View all configured delays", code: "@Rushia delays" },
        ],
        features: ["Per-role delay configuration", "Millisecond precision", "Short form `d` alias", "View all delays with `delays`"],
      },
    ],
  },
  {
    id: "quick", icon: BarChart2,
    title: "Quick Commands", badge: "No prefix needed — Type directly in chat",
    commands: [
      {
        name: "rlb",
        title: "Drop Leaderboard",
        description: "View the server's drop leaderboard showing top droppers and statistics.",
        usage: "rlb",
        features: ["Top droppers ranking", "Server-wide statistics", "No prefix or mention needed", "Real-time data"],
      },
    ],
  },
]

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-10" style={{ backgroundImage: "url(/img.png)" }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />

        <div className="container mx-auto px-4 max-w-5xl">

          {/* Hero */}
          <div className="text-center mb-14">
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">Command Reference</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Every Command, Explained</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">Complete guide to unlock the full potential of Rushia Helper Bot</p>
          </div>

          {/* Nav Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-14">
            {categories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 hover:bg-primary/10 hover:border-primary/50 text-sm font-medium text-muted-foreground hover:text-primary transition-all"
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-14">
            {sections.map((section) => (
              <div key={section.id}>
                <SectionHeader id={section.id} icon={section.icon} title={section.title} badge={section.badge} />
                <div className="space-y-4">
                  {section.commands.map((cmd, i) => (
                    <CommandCard key={i} command={cmd} />
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
