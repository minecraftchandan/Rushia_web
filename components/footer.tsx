import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-4 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/rushia.png" alt="Rushia" width={36} height={36} className="rounded-lg" />
              <span className="text-xl font-bold text-foreground">Rushia</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">Your Ultimate Companion for Luvi Card Game</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/commands"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Commands
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/support"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Support Server
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://discord.gg/mx7VhH7Jkr"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rushia Helper Bot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
