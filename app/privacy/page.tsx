import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">Effective December 6, 2024</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-border/50">
            <h2 className="text-2xl font-bold mb-4 text-foreground">What This Means for You</h2>
            <p className="text-muted-foreground leading-relaxed">
              We built Rushia Helper Bot to make your Luvi gaming experience better, not to collect your personal information. 
              This policy explains exactly what data we need to make the bot work and how we protect it.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Information We Collect</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-card/30 rounded-xl p-6 border border-border/30">
                <h3 className="font-semibold text-lg mb-3 text-foreground">What We Store</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Your Discord server settings</li>
                  <li>• Notification preferences you choose</li>
                  <li>• Basic usage logs for debugging</li>
                  <li>• Your reminder settings</li>
                </ul>
              </div>
              <div className="bg-card/30 rounded-xl p-6 border border-border/30">
                <h3 className="font-semibold text-lg mb-3 text-foreground">What We Don't Store</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Your message content</li>
                  <li>• Personal conversations</li>
                  <li>• Email addresses or real names</li>
                  <li>• Payment information</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">How We Use Your Data</h2>
            <div className="bg-card/30 rounded-xl p-8 border border-border/30">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Everything we collect serves one purpose: making the bot work for you. Here's what that means:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Send you boss and card notifications when you want them</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Remember your reminder preferences across servers</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-muted-foreground">Fix bugs and improve performance</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Data Security & Retention</h2>
            <div className="space-y-6">
              <div className="bg-card/30 rounded-xl p-6 border border-border/30">
                <h3 className="font-semibold text-xl mb-4 text-foreground">How We Protect Your Data</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Your data is stored in encrypted databases with industry-standard security. We use the same level of 
                  protection that banks and other financial institutions use.
                </p>
              </div>
              
              <div className="bg-card/30 rounded-xl p-6 border border-border/30">
                <h3 className="font-semibold text-xl mb-4 text-foreground">How Long We Keep It</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>• <strong>Logs:</strong> Automatically deleted after 30 days</p>
                  <p>• <strong>Reminders:</strong> Deleted immediately after they're sent</p>
                  <p>• <strong>Server settings:</strong> Kept until you remove the bot</p>
                  <p>• <strong>Your preferences:</strong> Kept until you ask us to delete them</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Data Sharing</h2>
            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-8">
              <h3 className="font-semibold text-xl mb-4 text-foreground">We Never Sell Your Data</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Your data is not for sale. We don't work with advertisers, data brokers, or anyone else who wants to 
                buy information about you. The only time we might share data is if we're legally required to do so.
              </p>
              <div className="bg-card/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Exception:</strong> We use MongoDB Atlas to store data, which means MongoDB (our hosting provider) 
                  has access to encrypted data for technical purposes only.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Your Rights</h2>
            <div className="bg-card/30 rounded-xl p-8 border border-border/30">
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                You have complete control over your data. Here's what you can do:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Request Your Data</h4>
                  <p className="text-muted-foreground text-sm">Ask us for a copy of everything we have about you</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Delete Your Data</h4>
                  <p className="text-muted-foreground text-sm">Request complete removal of your information</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Correct Mistakes</h4>
                  <p className="text-muted-foreground text-sm">Fix any incorrect information we might have</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Stop Processing</h4>
                  <p className="text-muted-foreground text-sm">Ask us to stop using your data for specific purposes</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Changes to This Policy</h2>
            <div className="bg-card/30 rounded-xl p-6 border border-border/30">
              <p className="text-muted-foreground leading-relaxed">
                If we need to update this privacy policy, we'll let you know through our support server. 
                We won't make major changes without giving you a heads up first.
              </p>
            </div>
          </section>

          <footer className="text-center py-8 border-t border-border/30">
            <p className="text-muted-foreground mb-4">
              Questions about this policy? Contact us through our support server.
            </p>
            <div className="w-16 h-1 bg-primary/50 mx-auto rounded-full"></div>
          </footer>
        </div>
      </div>

      <Footer />
    </main>
  )
}
