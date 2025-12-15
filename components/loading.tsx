"use client"

import Image from "next/image"

export function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/rushia.png" alt="Loading" width={32} height={32} className="animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-semibold text-foreground">Loading...</p>
          <div className="flex gap-1">
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
