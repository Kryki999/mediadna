"use client"

import type { LucideIcon } from "lucide-react"
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
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
  { label: "Telefon", href: "#cta", icon: Phone },
  { label: "Email", href: "#cta", icon: Mail },
  { label: "Facebook", href: "#cta", icon: Facebook },
  { label: "Instagram", href: "#cta", icon: Instagram },
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

  const tabScale = useSpring(useTransform(distance, [-180, 0, 180], [1, 1.06, 1]), {
    stiffness: 260,
    damping: 20,
    mass: 0.24,
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
      data-configurator-trigger="true"
      aria-label={item.label}
      className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full text-white/90 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#5aa6ff]"
      style={{ scale: tabScale }}
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
        <item.icon className="size-6" />
      </motion.span>
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
        className="pointer-events-auto flex flex-nowrap items-center justify-center gap-2 rounded-3xl border border-white/10 bg-black/42 p-2 backdrop-blur-xl"
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
