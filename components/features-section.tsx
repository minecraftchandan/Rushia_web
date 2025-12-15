import { Bell, Search, Clock, Shield, Zap, Settings } from "lucide-react"

const features = [
  {
    icon: Bell,
    title: "Boss & Card Notifications",
    description:
      "Get instant alerts when bosses spawn or rare cards appear. Configure tier-specific and rarity-specific roles.",
  },
  {
    icon: Search,
    title: "Powerful Card Search",
    description: "Search through 1000+ cards instantly with fuzzy matching, multi-term filtering, and batch searches.",
  },
  {
    icon: Clock,
    title: "Smart Reminders",
    description:
      "Personal notifications for expeditions, stamina, raids, and more. Customize how and when you're notified.",
  },
  {
    icon: Shield,
    title: "Multi-Role System",
    description: "Advanced notification system with separate roles for each boss tier and card rarity.",
  },
  {
    icon: Zap,
    title: "Instant Detection",
    description: "Automatic detection of game events with near-instant notification delivery to your server.",
  },
  {
    icon: Settings,
    title: "Easy Configuration",
    description: "Simple slash commands to set up everything. No coding required, just a few clicks.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32" id="features">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">Everything You Need</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Packed with features to enhance your Luvi experience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
