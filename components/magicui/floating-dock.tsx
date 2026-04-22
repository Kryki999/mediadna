"use client"

import type { LucideIcon } from "lucide-react"
import {
  BriefcaseBusiness,
  Home,
  Layers3,
  Mail,
  Sparkles,
} from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

type DockLink = {
  label: string
  href: string
  icon: LucideIcon
}

const dockLinks: DockLink[] = [
  { label: "Start", href: "#top", icon: Home },
  { label: "Realizacje", href: "#impact", icon: Layers3 },
  { label: "Oferta", href: "#services", icon: BriefcaseBusiness },
  { label: "Proces", href: "#ecosystem", icon: Sparkles },
  { label: "Kontakt", href: "#cta", icon: Mail },
]

type DockItemProps = {
  item: DockLink
  mouseX: ReturnType<typeof useMotionValue<number>>
}

function DockItem({ item, mouseX }: DockItemProps) {
  const itemRef = useRef<HTMLAnchorElement>(null)
  const distance = useTransform(mouseX, (value) => {
    const bounds = itemRef.current?.getBoundingClientRect()
    if (!bounds || value === Number.NEGATIVE_INFINITY) return Number.POSITIVE_INFINITY
    return value - (bounds.x + bounds.width / 2)
  })

  const width = useSpring(useTransform(distance, [-160, 0, 160], [48, 70, 48]), {
    stiffness: 260,
    damping: 18,
    mass: 0.2,
  })
  const iconScale = useSpring(useTransform(distance, [-150, 0, 150], [1, 1.22, 1]), {
    stiffness: 280,
    damping: 20,
    mass: 0.2,
  })
  const glowOpacity = useSpring(
    useTransform(distance, [-150, -20, 0, 20, 150], [0.08, 0.2, 0.4, 0.2, 0.08]),
    {
      stiffness: 260,
      damping: 22,
    },
  )

  return (
    <motion.a
      ref={itemRef}
      href={item.href}
      aria-label={item.label}
      className="group relative inline-flex size-12 items-center justify-center rounded-full text-white/85 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#5aa6ff]"
      style={{ width, height: width }}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full border border-white/12 bg-white/[0.02]"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.16), 0 8px 26px rgba(0,0,0,0.45), 0 0 22px rgba(65,133,255,0.28)",
          opacity: glowOpacity,
        }}
      />
      <motion.span style={{ scale: iconScale }} className="relative z-10">
        <item.icon className="size-5" />
      </motion.span>
      <span className="pointer-events-none absolute -top-9 rounded-md border border-white/15 bg-[#0a0d14]/95 px-2 py-1 text-xs text-white/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {item.label}
      </span>
    </motion.a>
  )
}

export function FloatingDock({ className }: { className?: string }) {
  const mouseX = useMotionValue(Number.NEGATIVE_INFINITY)

  return (
    <div
      className={cn(
        "pointer-events-none relative z-20 flex w-full justify-center px-2",
        className,
      )}
    >
      <motion.nav
        aria-label="Szybka nawigacja"
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/42 p-2 backdrop-blur-xl"
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Number.NEGATIVE_INFINITY)}
      >
        {dockLinks.map((item) => (
          <DockItem key={item.label} item={item} mouseX={mouseX} />
        ))}
      </motion.nav>
    </div>
  )
}
