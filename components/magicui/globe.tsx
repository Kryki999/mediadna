"use client"

import { cn } from "@/lib/utils"

type GlobeProps = {
  className?: string
}

export function Globe({ className }: GlobeProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-2xl", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(23,99,255,0.2),transparent_58%)]" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-zinc-950/65 shadow-[0_0_40px_-22px_rgba(39,116,255,0.9)]" />

      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-[spin_22s_linear_infinite] rounded-full border border-primary/35" />
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 animate-[spin_16s_linear_infinite_reverse] rounded-full border border-white/20" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-[spin_11s_linear_infinite] rounded-full border border-primary/30" />

      <div className="absolute left-1/2 top-1/2 h-56 w-[2px] -translate-x-1/2 -translate-y-1/2 animate-[spin_15s_linear_infinite] bg-gradient-to-b from-transparent via-white/40 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-[2px] w-56 -translate-x-1/2 -translate-y-1/2 animate-[spin_18s_linear_infinite_reverse] bg-gradient-to-r from-transparent via-primary/55 to-transparent" />
    </div>
  )
}
