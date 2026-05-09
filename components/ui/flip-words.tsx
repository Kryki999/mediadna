"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export const FlipWords = ({
  words,
  duration = 3000,
  className,
  phraseLayout = "split",
  singleCycle = false,
  onCycleComplete,
  restartKey = 0,
}: {
  words: string[]
  duration?: number
  className?: string
  /** `split` — każde słowo w osobnym wierszu (jak dotąd). `whole` — całe hasło jako jeden blok. */
  phraseLayout?: "split" | "whole"
  /** Po pokazaniu ostatniego wyrazu wywołuje `onCycleComplete` zamiast wracać do początku. */
  singleCycle?: boolean
  onCycleComplete?: () => void
  /** Zmiana wartości resetuje cykl do `words[0]` i znów pozwala na animacje. */
  restartKey?: number | string
}) => {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const prefersReducedMotion = useReducedMotion()
  const cycleDoneRef = useRef(false)

  useEffect(() => {
    cycleDoneRef.current = false
    setCurrentWord(words[0])
    setIsAnimating(false)
  }, [restartKey, words])

  const startAnimation = useCallback(() => {
    const idx = words.indexOf(currentWord)
    const next = words[idx + 1] ?? words[0]
    setCurrentWord(next)
    setIsAnimating(true)
  }, [currentWord, words])

  useEffect(() => {
    if (cycleDoneRef.current) return
    if (!isAnimating) {
      const t = window.setTimeout(() => {
        const idx = words.indexOf(currentWord)
        if (singleCycle && idx === words.length - 1) {
          cycleDoneRef.current = true
          onCycleComplete?.()
          return
        }
        startAnimation()
      }, duration)
      return () => window.clearTimeout(t)
    }
  }, [
    isAnimating,
    duration,
    startAnimation,
    currentWord,
    words,
    singleCycle,
    onCycleComplete,
  ])

  const dur = prefersReducedMotion ? 0 : 0.32

  const body =
    phraseLayout === "whole" ? (
      <span className="block text-center leading-[0.92]">{currentWord}</span>
    ) : (
      <>
        {currentWord.split(/\s+/).filter(Boolean).map((segment, index) => (
          <span key={`${currentWord}-${index}-${segment}`} className="block leading-[1.06]">
            {segment}
          </span>
        ))}
      </>
    )

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => setIsAnimating(false)}>
      <motion.div
        key={currentWord}
        className={cn("flex w-full flex-col items-center justify-center text-center", className)}
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
        transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
      >
        {body}
      </motion.div>
    </AnimatePresence>
  )
}
