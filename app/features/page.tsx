"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Settings, User, HelpCircle, Search, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

const commandCategories = [
  {
    id: "server-config",
    title: "Server Configuration Commands",
    icon: Settings,
    description: "Requires: Manage Roles Permission",
    commands: [
      {
        name: "/set-boss-role [role]",
        title: "Configure Boss Spawn Notifications",
        description: "Set up automatic notifications when bosses spawn in the Luvi game. When a boss appears, the bot will ping the specified role with boss details.",
        usage: "/set-boss-role role:@BossHunters",
        features: ["Detects all boss tiers (Tier 1, 2, 3)", "Instant notifications with boss name and tier", "Works with legacy single-role system", "Leave role empty to disable notifications"],
        example: { title: "Example Output:", content: "@BossHunters Tier 3 Boss Spawned!\nBoss: Shadow Dragon" },
      },
      {
        name: "/set-card-role [role]",
        title: "Configure Card Spawn Notifications",
        description: "Get notified when rare cards spawn in the game. Perfect for collectors who don't want to miss limited-time cards.",
        usage: "/set-card-role role:@CardCollectors",
        features: ["Detects all rarities (Common, Uncommon, Rare, Exotic, Legendary)", "Shows card name, series, and rarity", "Instant alerts in your server", "Leave role empty to disable notifications"],
        example: { title: "Example Output:", content: "@CardCollectors A Legendary card just spawned!\nNaruto Uzumaki from Naruto Series" },
      },
      {
        name: "/multi-roles",
        title: "Advanced Multi-Role Notification System",
        description: "Upgrade from single-role notifications to tier-specific and rarity-specific roles. Perfect for large servers with dedicated teams.",
        subcommands: [
          { title: "Enable Multi-Role System:", usage: "/multi-roles enable", description: "Activates the advanced notification system with separate roles for each tier and rarity." },
          { title: "Configure Boss Tier Roles:", usage: "/multi-roles set-boss tier:tier1 role:@Tier1Hunters\n/multi-roles set-boss tier:tier2 role:@Tier2Elite\n/multi-roles set-boss tier:tier3 role:@Tier3Legends" },
          { title: "Configure Card Rarity Roles:", usage: "/multi-roles set-card rarity:common role:@CommonCollectors\n/multi-roles set-card rarity:uncommon role:@UncommonHunters\n/multi-roles set-card rarity:rare role:@RareCollectors\n/multi-roles set-card rarity:exotic role:@ExoticHunters\n/multi-roles set-card rarity:legendary role:@LegendaryElite" },
          { title: "Disable Multi-Role System:", usage: "/multi-roles disable", description: "Returns to single-role system using /set-boss-role and /set-card-role." },
        ],
        benefits: ["Targeted notifications for specific tiers/rarities", "Reduce notification spam for casual players", "Organize your community by interest level", "Easy toggle between single and multi-role modes"],
      },
    ],
  },
  {
    id: "personal",
    title: "Personal Settings Commands",
    icon: User,
    description: "Customize your personal preferences",
    commands: [
      {
        name: "/notifications",
        title: "Manage Your Personal Notification Preferences",
        description: "Customize which reminders you receive and how you receive them. All settings are per-user and work across all servers.",
        subcommands: [
          { title: "View Current Settings:", usage: "/notifications view", description: "Displays your current notification preferences for all reminder types." },
          { title: "Configure Notification Types:", usage: "/notifications set type:expedition enabled:true\n/notifications set type:stamina enabled:true\n/notifications set type:raid enabled:true\n/notifications set type:raidSpawnReminder enabled:true" },
          { title: "DM Notification Settings:", usage: "/dm enable type:expedition\n/dm enable type:stamina\n/dm disable type:expedition" },
        ],
        notificationTypes: [
          { name: "expedition", desc: "Get reminded when your expedition cards are ready to claim" },
          { name: "stamina", desc: "Receive alerts when your stamina reaches 100%" },
          { name: "raid", desc: "Get notified when raid fatigue wears off" },
          { name: "raidSpawnReminder", desc: "30-minute cooldown reminder for raid spawns" },
        ],
        features: ["Per-user customization", "Choose between server or DM notifications", "Disable specific reminder types", "Settings persist across all servers"],
      },
    ],
  },
  {
    id: "help",
    title: "Help & Information Commands",
    icon: HelpCircle,
    description: "Get help and learn about the bot",
    commands: [
      {
        name: "/help",
        title: "Interactive Help Menu with Categories",
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
        features: ["Interactive dropdown navigation", "Organized by category", "Ephemeral responses (only you can see)", "Detailed examples and use cases"],
      },
    ],
  },
  {
    id: "card-search",
    title: "Card Search Commands",
    icon: Search,
    description: "No permissions required - Available to everyone",
    commands: [
      {
        name: "@bot f <query> or @bot find <query>",
        title: "Search Through 1000+ Cards Instantly",
        description: "Powerful card search system with fuzzy matching and multi-term support.",
        examples: [
          { title: "Single Card Search:", code: "@Rushia f naruto\n@Rushia find luffy\n@Rushia f bleach ice" },
          { title: "Multi-Card Search (Comma-Separated):", code: "@Rushia f naruto,luffy,goku\n@Rushia find shanks,zoro,sanji" },
          { title: "Advanced Filtering:", code: "@Rushia f fire duelist        → Fire element duelist cards\n@Rushia find support light     → Light element support cards\n@Rushia f naruto legendary     → Legendary Naruto cards" },
        ],
        searchFeatures: ["Fuzzy matching (typo-tolerant)", "Multi-term filtering (element, role, series)", "Multiple results with numbered selection", "Instant results with card details", "Card images and full stats", "Batch search with comma separation"],
        outputExamples: [
          { title: "Single Result:", content: "Card: Naruto Uzumaki\nSeries: Naruto\nElement: Fire\nRole: Duelist\n[Card Image]" },
          { title: "Multiple Results:", content: "Found 3 results:\n1. Naruto Uzumaki - Naruto | Fire Duelist\n2. Naruto (Sage Mode) - Naruto | Light Duelist\n3. Naruto (Nine-Tails) - Naruto | Fire Frontline\n\nReply with number to select" },
          { title: "Batch Search:", content: "Search Results (3 queries)\n✅ naruto\n  Naruto Uzumaki\n  Naruto | Fire Duelist\n\n✅ luffy\n  Monkey D. Luffy\n  One Piece | Normal Duelist\n\n❌ invalidcard\n  No card found" },
        ],
      },
    ],
  },
  {
    id: "inventory",
    title: "Inventory Management",
    icon: Package,
    description: "Mention-based commands",
    commands: [
      {
        name: "React with 🔍 on Inventory",
        title: "Advanced Message Generator",
        description: "Build complex inventory search commands with an interactive interface.",
        steps: ["React with 🔍 on your inventory", 'Select cards from dropdown (or use "Select All")', 'Click "Add" to add selected cards', 'Click "Next Section" to add filters', "Select element, grade, rarity filters", "Get generated command ready to use"],
        generatedExample: "@Luvi inv -name Naruto,Luffy,Goku -element fire,dark -grade a,s -rarity legendary,exotic",
        features: ["Select All option for bulk adding", "Multi-select for elements, grades, rarities", "Real-time command preview", "Works with inventory pagination", "Saves time on complex searches"],
      },
    ],
  },
]

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="group relative">
      <pre className="overflow-x-auto rounded-lg bg-background/50 border border-border p-3 text-sm">
        <code className="text-foreground/90 whitespace-pre-wrap">{children}</code>
      </pre>
    </div>
  )
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section id="commands" className="relative py-16 md:py-24">
        <div className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-10" style={{ backgroundImage: 'url(/img.png)' }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
        
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-foreground md:text-6xl">Know Every Command</h1>
            <p className="text-xl text-muted-foreground">Complete guide to unlock the full potential of Rushia Helper Bot</p>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
              <button onClick={() => document.getElementById('server-config')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="py-6 px-4 flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/50 hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group cursor-pointer">
                <Settings className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Server Config</span>
              </button>
              <button onClick={() => document.getElementById('personal')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="py-6 px-4 flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/50 hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group cursor-pointer">
                <User className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Personal</span>
              </button>
              <button onClick={() => document.getElementById('help')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="py-6 px-4 flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/50 hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group cursor-pointer">
                <HelpCircle className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Help</span>
              </button>
              <button onClick={() => document.getElementById('card-search')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="py-6 px-4 flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/50 hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group cursor-pointer">
                <Search className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Card Search</span>
              </button>
              <button onClick={() => document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="py-6 px-4 flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card/50 hover:bg-primary/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group cursor-pointer">
                <Package className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-sm">Inventory</span>
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {commandCategories.map((category) => (
              <div key={category.id} id={category.id} className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden scroll-mt-20">
                <div className="border-b border-border/30 bg-gradient-to-r from-primary/5 to-accent/5 p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-border/30">
                  {category.commands.map((command) => (
                    <div key={command.name} className="p-8 hover:bg-muted/20 transition-colors">
                      <div className="mb-6">
                        <code className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary inline-block">{command.name}</code>
                        <h4 className="mt-4 text-xl font-bold text-foreground">{command.title}</h4>
                        <p className="mt-2 text-muted-foreground leading-relaxed">{command.description}</p>
                      </div>

                      {"usage" in command && command.usage && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-foreground">Usage:</p>
                          <CodeBlock>{command.usage}</CodeBlock>
                        </div>
                      )}

                      {"subcommands" in command && command.subcommands && (
                        <div className="mb-4 space-y-4">
                          <p className="text-sm font-medium text-foreground">Subcommands:</p>
                          {command.subcommands.map((sub, idx) => (
                            <div key={idx} className="rounded-lg bg-muted/30 p-4">
                              <p className="mb-2 font-medium text-foreground">{sub.title}</p>
                              <CodeBlock>{sub.usage}</CodeBlock>
                              {sub.description && <p className="mt-2 text-sm text-muted-foreground">{sub.description}</p>}
                            </div>
                          ))}
                        </div>
                      )}

                      {"features" in command && command.features && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-foreground">Features:</p>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {command.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />{feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {"benefits" in command && command.benefits && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-foreground">Benefits:</p>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {command.benefits.map((benefit) => (
                              <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="text-green-500">✓</span>{benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {"example" in command && command.example && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-foreground">{command.example.title}</p>
                          <CodeBlock>{command.example.content}</CodeBlock>
                        </div>
                      )}

                      {"notificationTypes" in command && command.notificationTypes && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-foreground">Available Notification Types:</p>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {command.notificationTypes.map((type) => (
                              <div key={type.name} className="rounded-lg bg-muted/30 p-3">
                                <code className="text-sm font-medium text-primary">{type.name}</code>
                                <p className="mt-1 text-xs text-muted-foreground">{type.desc}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {"categories" in command && command.categories && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-foreground">Help Categories:</p>
                          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                            {command.categories.map((cat) => (
                              <div key={cat.name} className="flex items-center gap-2 rounded-lg bg-muted/30 p-3">
                                <span className="text-lg">{cat.emoji}</span>
                                <div>
                                  <p className="text-sm font-medium text-foreground">{cat.name}</p>
                                  <p className="text-xs text-muted-foreground">{cat.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {"examples" in command && command.examples && (
                        <div className="mb-4 space-y-4">
                          <p className="text-sm font-medium text-foreground">Examples:</p>
                          {command.examples.map((ex, idx) => (
                            <div key={idx}>
                              <p className="mb-2 text-sm text-muted-foreground">{ex.title}</p>
                              <CodeBlock>{ex.code}</CodeBlock>
                            </div>
                          ))}
                        </div>
                      )}

                      {"searchFeatures" in command && command.searchFeatures && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-foreground">Search Features:</p>
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {command.searchFeatures.map((feature) => (
                              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="h-1.5 w-1.5 rounded-full bg-primary" />{feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {"outputExamples" in command && command.outputExamples && (
                        <div className="mb-4 space-y-4">
                          <p className="text-sm font-medium text-foreground">Output Examples:</p>
                          {command.outputExamples.map((ex, idx) => (
                            <div key={idx}>
                              <p className="mb-2 text-sm text-muted-foreground">{ex.title}</p>
                              <CodeBlock>{ex.content}</CodeBlock>
                            </div>
                          ))}
                        </div>
                      )}

                      {"steps" in command && command.steps && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-foreground">How to Use:</p>
                          <ol className="space-y-2">
                            {command.steps.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">{idx + 1}</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {"generatedExample" in command && command.generatedExample && (
                        <div className="mb-4">
                          <p className="mb-2 text-sm font-medium text-foreground">Generated Command Example:</p>
                          <CodeBlock>{command.generatedExample}</CodeBlock>
                        </div>
                      )}
                    </div>
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
