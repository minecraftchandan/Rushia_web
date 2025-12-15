import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const commands = [
  {
    name: "/set-boss-role",
    description: "Configure Boss Spawn Notifications",
    example: "/set-boss-role role:@BossHunters",
  },
  {
    name: "/set-card-role",
    description: "Configure Card Spawn Notifications",
    example: "/set-card-role role:@CardCollectors",
  },
  {
    name: "@bot f <query>",
    description: "Search Through 1000+ Cards Instantly",
    example: "@Rushia f naruto,luffy,goku",
  },
  {
    name: "/notifications",
    description: "Manage Personal Notification Preferences",
    example: "/notifications set type:expedition enabled:true",
  },
]

export function CommandsPreview() {
  return (
    <section className="border-t border-border bg-muted/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">Simple Commands</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Easy to use slash commands and mention-based interactions
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {commands.map((command) => (
            <div key={command.name} className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <code className="rounded bg-primary/10 px-2 py-1 font-mono text-sm text-primary">{command.name}</code>
                  <p className="mt-2 text-sm text-muted-foreground">{command.description}</p>
                </div>
                <code className="shrink-0 rounded bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground">
                  {command.example}
                </code>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/commands">
              View All Commands
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
