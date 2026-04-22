"use client"

import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type IconCloudItem = {
  icon: LucideIcon
  label: string
}

type IconCloudProps = {
  items: IconCloudItem[]
  className?: string
}

export function IconCloud({ items, className }: IconCloudProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-2xl", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(24,112,255,0.18),transparent_45%)]" />
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-zinc-950/70" />

      <div className="absolute inset-0 [transform-style:preserve-3d] perspective-[900px]">
        {items.map((item, index) => {
          const Icon = item.icon
          const angle = (360 / Math.max(items.length, 1)) * index
          const radius = 96 + (index % 2) * 18
          const duration = 16 + (index % 4) * 2
          const delay = index * 0.16
          return (
            <div
              key={item.label}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={
                {
                  "--orbit-angle": `${angle}deg`,
                  "--orbit-radius": `${radius}px`,
                } as React.CSSProperties
              }
            >
              <div
                className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-zinc-900/85 text-zinc-100 shadow-[0_0_24px_-16px_rgba(46,149,255,0.9)] backdrop-blur transition-transform hover:scale-110 hover:border-primary/45 hover:text-primary"
                style={{
                  animation: `icon-cloud-orbit ${duration}s linear infinite`,
                  animationDelay: `${delay}s`,
                }}
              >
                <Icon className="h-4.5 w-4.5" />
                <span className="sr-only">{item.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
