import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, FileText, AlertTriangle, Lock, Scale, Mail } from "lucide-react"

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <FileText className="h-4 w-4" />
                Legal Document
              </div>
              <h1 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">Terms of Service</h1>
              <p className="text-muted-foreground">Last Updated: December 6, 2024</p>
            </div>

            {/* Quick Summary Card */}
            <div className="mb-12 rounded-xl border border-primary/30 bg-primary/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="mb-2 font-semibold text-foreground">Quick Summary</h2>
                  <p className="text-sm text-muted-foreground">
                    By using Rushia Helper Bot, you agree to use it responsibly, comply with Discord's Terms, and
                    understand that the service is provided "as is" without guarantees.
                  </p>
                </div>
              </div>
            </div>

            {/* Terms Content */}
            <div className="space-y-8">
              {/* Section 1 */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    1
                  </span>
                  Acceptance of Terms
                </h2>
                <p className="text-muted-foreground">
                  By inviting and using Rushia Helper Bot ("the Bot"), you agree to be bound by these Terms of Service.
                  If you do not agree to these terms, please do not use the Bot.
                </p>
              </div>

              {/* Section 2 */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    2
                  </span>
                  Description of Service
                </h2>
                <p className="mb-4 text-muted-foreground">
                  Rushia Helper Bot provides automated notifications, reminders, and utility features for Discord
                  servers playing the Luvi card game, including:
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    "Boss and card spawn notifications",
                    "Stamina, expedition, and raid reminders",
                    "Card search functionality",
                    "Inventory management tools",
                    "Multi-role notification system",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3 */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    3
                  </span>
                  User Responsibilities
                </h2>
                <p className="mb-4 text-muted-foreground">You agree to:</p>
                <ul className="space-y-2">
                  {[
                    "Use the Bot in compliance with Discord's Terms of Service",
                    "Not abuse, exploit, or attempt to disrupt the Bot's functionality",
                    "Not use the Bot for illegal activities or harassment",
                    "Provide accurate information when configuring Bot settings",
                    "Respect rate limits and usage guidelines",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1 text-green-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 4 */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    4
                  </span>
                  Bot Permissions
                </h2>
                <p className="mb-4 text-muted-foreground">The Bot requires specific Discord permissions to function:</p>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    "Read Messages/View Channels",
                    "Send Messages",
                    "Embed Links",
                    "Add Reactions",
                    "Mention Roles",
                    "Use Slash Commands",
                  ].map((perm) => (
                    <div key={perm} className="rounded-lg bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                      {perm}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  You are responsible for managing these permissions in your server.
                </p>
              </div>

              {/* Section 5 */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <Lock className="h-5 w-5 text-primary" />
                  Data Collection and Usage
                </h2>
                <p className="mb-4 text-muted-foreground">The Bot collects and stores:</p>
                <ul className="space-y-2">
                  {[
                    "Server IDs and configuration settings",
                    "User IDs for reminder functionality",
                    "Message IDs for tracking processed events",
                    "Command usage logs for performance monitoring",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 mt-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-muted-foreground">
                  See our{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>{" "}
                  for detailed information.
                </p>
              </div>

              {/* Section 6 */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Service Availability
                </h2>
                <ul className="space-y-2">
                  {[
                    'The Bot is provided "as is" without guarantees of uptime',
                    "We reserve the right to modify, suspend, or discontinue the Bot at any time",
                    "Scheduled maintenance may occur with or without notice",
                    "We are not liable for any data loss or service interruptions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 mt-2 rounded-full bg-yellow-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 7 - Prohibited Activities */}
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Prohibited Activities
                </h2>
                <p className="mb-4 text-muted-foreground">You may not:</p>
                <ul className="space-y-2">
                  {[
                    "Reverse engineer or attempt to extract the Bot's source code",
                    "Use the Bot to spam or harass users",
                    "Attempt to overload or crash the Bot",
                    "Resell or redistribute the Bot's services",
                    "Use the Bot in violation of Discord's Terms of Service",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-destructive">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 8 */}
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <Scale className="h-5 w-5 text-primary" />
                  Limitation of Liability
                </h2>
                <p className="mb-4 text-muted-foreground">The Bot developers are not liable for:</p>
                <ul className="space-y-2">
                  {[
                    "Any damages arising from Bot usage or downtime",
                    "Loss of data or server configurations",
                    "Actions taken by server administrators using the Bot",
                    "Third-party integrations or services",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 mt-2 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 9 & 10 */}
              <div className="grid gap-8 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 text-xl font-semibold text-foreground">Changes to Terms</h2>
                  <p className="text-sm text-muted-foreground">
                    We reserve the right to modify these Terms at any time. Continued use of the Bot after changes
                    constitutes acceptance of the new Terms.
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="mb-4 text-xl font-semibold text-foreground">Termination</h2>
                  <p className="text-sm text-muted-foreground">
                    We reserve the right to terminate Bot access for any server violating these Terms, remove the Bot
                    from servers engaging in prohibited activities, and ban users who abuse the Bot's functionality.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact
                </h2>
                <p className="text-muted-foreground">
                  For questions about these Terms, contact us via our Discord support server or email:{" "}
                  <a href="mailto:support@rushiabot.com" className="text-primary hover:underline">
                    support@rushiabot.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
