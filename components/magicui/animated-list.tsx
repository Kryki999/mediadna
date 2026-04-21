"use client"

import { AnimatePresence, motion } from "motion/react"
import React, {
  type ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from "react"

import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0.96, opacity: 0, y: 24 },
    animate: { scale: 1, opacity: 1, y: 0, originY: 0 },
    exit: { scale: 0.96, opacity: 0, y: -8 },
    transition: { type: "spring" as const, stiffness: 320, damping: 34 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(function AnimatedList({
  children,
  className,
  delay = 1400,
  ...props
}: AnimatedListProps) {
  const [index, setIndex] = useState(0)
  const childrenArray = useMemo(
    () => React.Children.toArray(children),
    [children],
  )

  useEffect(() => {
    if (childrenArray.length === 0) return
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % childrenArray.length)
    }, delay)
    return () => clearTimeout(timeout)
  }, [index, delay, childrenArray.length])

  const itemsToShow = useMemo(
    () => childrenArray.slice(0, index + 1).reverse(),
    [index, childrenArray],
  )

  return (
    <div
      className={cn("flex flex-col items-center gap-3", className)}
      {...props}
    >
      <AnimatePresence>
        {itemsToShow.map((item) => (
          <AnimatedListItem key={(item as React.ReactElement).key}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  )
})
