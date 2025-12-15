import { Button } from "@/components/ui/button"
import { Bot, ExternalLink } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12">
          {/* Background decoration */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-[80px]" />

          <div className="relative text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              Ready to Level Up Your Server?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-pretty text-lg text-muted-foreground">
              Join thousands of servers using Rushia Helper Bot to enhance their Luvi gaming experience.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="w-full bg-primary hover:bg-primary/90 sm:w-auto">
                <a href="https://discord.com/oauth2/authorize" target="_blank" rel="noopener noreferrer">
                  <Bot className="mr-2 h-5 w-5" />
                  Add to Discord
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
                <a href="https://discord.gg/support" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Join Support Server
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
