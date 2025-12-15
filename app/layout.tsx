import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Suspense } from "react"
import { Loading } from "@/components/loading"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rushia Helper Bot - Your Ultimate Luvi Card Game Companion",
  description:
    "The ultimate Discord bot companion for Luvi Card Game. Boss notifications, card spawns, reminders, and powerful search tools.",
  keywords: ["Discord bot", "Luvi", "card game", "boss notifications", "card spawns"],
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
