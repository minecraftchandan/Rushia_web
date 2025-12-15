"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MessageCircle, BookOpen, Users, AlertCircle, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-10" style={{ backgroundImage: 'url(/img.png)' }} />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />

        <div className="container mx-auto px-4">
          <div className="mx-auto mb-24 max-w-3xl text-center">
            <h1 className="mb-6 text-6xl font-bold text-foreground">Need Help?</h1>
            <p className="text-xl text-muted-foreground">Get support from our community or find answers in our documentation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
            <button onClick={() => window.open('https://discord.gg/mx7VhH7Jkr', '_blank')} className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-8 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors mb-4">
                  <MessageCircle className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Discord Community</h3>
                <p className="text-muted-foreground mb-6">Join thousands of players and get instant help from our community</p>
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Join Now <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </button>

            <a href="/features" className="group relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 to-accent/5 p-8 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/20 group-hover:bg-accent/30 transition-colors mb-4">
                  <BookOpen className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Documentation</h3>
                <p className="text-muted-foreground mb-6">Learn how to use all features with our comprehensive guides</p>
                <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                  Read Docs <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-12">
              <div className="flex items-center gap-3 mb-12">
                <Zap className="h-7 w-7 text-primary" />
                <h2 className="text-3xl font-bold text-foreground">Quick Answers</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground text-lg">Getting Started</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-1">How do I add Rushia?</p>
                      <p className="text-sm text-muted-foreground">Click "Add to Discord" button. You need "Manage Server" permission.</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">What permissions are needed?</p>
                      <p className="text-sm text-muted-foreground">Read messages, send messages, embed links, add reactions, and mention roles.</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Is Rushia free?</p>
                      <p className="text-sm text-muted-foreground">Yes, completely free with no premium features.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground text-lg">Features & Setup</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-1">How do I set up boss notifications?</p>
                      <p className="text-sm text-muted-foreground">Use `/set-boss-role` command to configure notifications.</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Can I customize reminders?</p>
                      <p className="text-sm text-muted-foreground">Yes, use `/notifications` to customize all reminder settings.</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">How do I report bugs?</p>
                      <p className="text-sm text-muted-foreground">Join our Discord and report in the support channel.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-6">Still need help?</p>
            <Button size="lg" asChild>
              <a href="https://discord.gg/mx7VhH7Jkr" target="_blank" rel="noopener noreferrer">
                Join Our Discord Server
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
