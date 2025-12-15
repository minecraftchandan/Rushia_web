"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/rushia.png" alt="Rushia" width={36} height={36} className="rounded-lg" />
          <span className="text-xl font-bold text-foreground">Rushia</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link href="/support" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Support
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="https://discord.com/oauth2/authorize?client_id=1441694586333429923&permissions=2147993664&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener noreferrer">
              Invite Bot
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border/40 bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link href="/" className="text-sm font-medium text-foreground" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link href="/support" className="text-sm font-medium text-muted-foreground" onClick={() => setIsOpen(false)}>
              Support
            </Link>
            <Button asChild className="w-full bg-primary hover:bg-primary/90">
              <a href="https://discord.com/oauth2/authorize?client_id=1441694586333429923&permissions=2147993664&integration_type=0&scope=bot+applications.commands" target="_blank" rel="noopener noreferrer">
                Invite Bot
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
