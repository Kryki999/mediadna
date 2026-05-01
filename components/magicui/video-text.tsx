"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type VideoTextProps = {
  text: string
  src: string
  /**
   * Tailwind classes that control text size, weight, family, letter-spacing.
   * The component renders a hidden <span> with these classes, measures it,
   * and draws the video clipped to the same exact text shape.
   * Examples: "text-[300px] font-black tracking-[-0.04em] leading-none"
   */
  className?: string
}

// Augment HTMLVideoElement with requestVideoFrameCallback / cancelVideoFrameCallback
// (TS lib.dom.d.ts ships these as "experimental" depending on version, so declare loosely)
type VideoFrameCallback = (now: DOMHighResTimeStamp, metadata: unknown) => void
type RVFCVideo = HTMLVideoElement & {
  requestVideoFrameCallback?: (cb: VideoFrameCallback) => number
  cancelVideoFrameCallback?: (handle: number) => void
}

export function VideoText({ text, src, className }: VideoTextProps) {
  const measureRef = useRef<HTMLSpanElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const measure = measureRef.current
    const canvas = canvasRef.current
    const video = videoRef.current as RVFCVideo | null
    if (!measure || !canvas || !video) return

    // alpha:true preserves transparency from destination-in compositing.
    // NOTE: do NOT pass desynchronized:true here — it lets the browser present
    // intermediate paint states, which causes a visible flash of the raw video
    // frame before the destination-in composite finishes clipping it to the
    // text shape. Synchronized presentation is required for compositing canvases.
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let isVisible = false
    let fontsReady = false
    let videoPlaying = false

    // Cached per-style measurements — recomputed only inside sync().
    // draw() reads these without touching the DOM, getComputedStyle, or measureText.
    let cachedFont = ""
    let cachedLetterSpacing = "" // "" means "do not set (== normal)"
    let cachedAscent = 0
    let cachedWidth = 0
    let cachedVisibleH = 0
    let cachedDpr = 1

    const buildFont = (cs: CSSStyleDeclaration) =>
      `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`

    function sync() {
      const cs = getComputedStyle(measure!)
      const font = buildFont(cs)
      const ls = cs.letterSpacing && cs.letterSpacing !== "normal" ? cs.letterSpacing : ""

      // Apply font + letter-spacing to the context BEFORE measuring so that
      // measureText() returns letter-spacing-aware widths.
      ctx!.font = font
      if (ls) {
        try {
          // @ts-expect-error - letterSpacing exists at runtime on modern browsers
          ctx!.letterSpacing = ls
        } catch {
          /* older browser fallback */
        }
      }

      const m = ctx!.measureText(text)
      const width = m.width
      const ascent = m.actualBoundingBoxAscent
      const descent = m.actualBoundingBoxDescent
      const visibleH = ascent + descent
      if (width === 0 || visibleH === 0) return

      const dpr = window.devicePixelRatio || 1
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${visibleH}px`
      canvas!.width = Math.max(1, Math.round(width * dpr))
      canvas!.height = Math.max(1, Math.round(visibleH * dpr))

      // Setting canvas.width/height resets the context state, so re-apply font
      // + letterSpacing once now and trust the cache for subsequent draws.
      ctx!.font = font
      if (ls) {
        try {
          // @ts-expect-error - letterSpacing exists at runtime on modern browsers
          ctx!.letterSpacing = ls
        } catch {
          /* noop */
        }
      }

      cachedFont = font
      cachedLetterSpacing = ls
      cachedAscent = ascent
      cachedWidth = width
      cachedVisibleH = visibleH
      cachedDpr = dpr
    }

    function draw() {
      if (video!.readyState < 2) return
      const W = canvas!.width
      const H = canvas!.height
      if (W === 0 || H === 0) return

      const cssW = cachedWidth
      const cssH = cachedVisibleH

      ctx!.save()
      ctx!.clearRect(0, 0, W, H)
      // After this scale, all drawing units are CSS pixels (DPR-aware).
      ctx!.scale(cachedDpr, cachedDpr)

      // Draw current video frame
      ctx!.drawImage(video!, 0, 0, cssW, cssH)

      // Mask: keep video pixels only where text glyphs land
      ctx!.globalCompositeOperation = "destination-in"
      // Re-set font on each draw because save/restore + composite changes can
      // reset it on some browsers; the value is cached so it's just a string assign.
      ctx!.font = cachedFont
      if (cachedLetterSpacing) {
        try {
          // @ts-expect-error - letterSpacing exists at runtime on modern browsers
          ctx!.letterSpacing = cachedLetterSpacing
        } catch {
          /* noop */
        }
      }
      ctx!.fillStyle = "#000"
      ctx!.textAlign = "left"
      ctx!.textBaseline = "alphabetic"
      ctx!.fillText(text, 0, cachedAscent)

      ctx!.restore()
    }

    // ----- Frame loop: prefer requestVideoFrameCallback, fall back to rAF -----

    const useRVFC = typeof video.requestVideoFrameCallback === "function"
    let rafId = 0
    let rvfcHandle = 0
    let loopActive = false

    function tickRAF() {
      if (!loopActive) return
      draw()
      rafId = requestAnimationFrame(tickRAF)
    }

    function tickRVFC() {
      if (!loopActive) return
      draw()
      rvfcHandle = video!.requestVideoFrameCallback!(tickRVFC)
    }

    function startLoop() {
      if (loopActive) return
      loopActive = true
      if (useRVFC) {
        rvfcHandle = video!.requestVideoFrameCallback!(tickRVFC)
      } else {
        rafId = requestAnimationFrame(tickRAF)
      }
    }

    function stopLoop() {
      loopActive = false
      if (useRVFC && rvfcHandle && video!.cancelVideoFrameCallback) {
        video!.cancelVideoFrameCallback(rvfcHandle)
        rvfcHandle = 0
      }
      if (rafId) {
        cancelAnimationFrame(rafId)
        rafId = 0
      }
    }

    function syncPlayback() {
      if (fontsReady && isVisible) {
        if (!videoPlaying) {
          // First time we become visible: this also kicks off network fetch +
          // decode for preload="none" videos. Browser handles caching after that.
          video!.play().then(() => {
            videoPlaying = true
          }).catch(() => {
            /* autoplay blocked or interrupted; will retry on next visibility change */
          })
        }
        startLoop()
      } else {
        if (videoPlaying) {
          video!.pause()
          videoPlaying = false
        }
        stopLoop()
      }
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        syncPlayback()
      },
      { threshold: 0.05 },
    )

    const ro = new ResizeObserver(() => {
      sync()
    })

    io.observe(canvas)
    ro.observe(measure)
    sync()

    document.fonts.ready.then(() => {
      fontsReady = true
      sync()
      syncPlayback()
    })

    return () => {
      stopLoop()
      io.disconnect()
      ro.disconnect()
      if (videoPlaying) video.pause()
    }
  }, [text, src, className])

  return (
    <span className={cn("relative inline-block leading-none align-middle", className)}>
      {/*
        Hidden span — out of flow. Used only to read computed font properties
        via getComputedStyle (font-size, weight, family, letter-spacing).
        Its presence does NOT push layout: canvas alone dictates wrapper size,
        so there is no whitespace from font ascender/descender padding.
      */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none invisible absolute -z-10 select-none whitespace-nowrap"
      >
        {text}
      </span>
      {/* Canvas IS the visible element — sized to actual glyph bounds */}
      <canvas
        ref={canvasRef}
        className="block"
        aria-label={text}
        role="img"
      />
      {/*
        Hidden video source. preload="none" defers the network fetch + decode
        until IntersectionObserver triggers play() — cuts initial page-load cost.
      */}
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        className="hidden"
      />
    </span>
  )
}
