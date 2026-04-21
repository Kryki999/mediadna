"use client"

import { useCallback, useEffect, useState, type TouchEvent } from "react"
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react"
import { reelsData, type ReelItem } from "@/components/sections/reels-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function ReelsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const openReel = (index: number) => {
    setCurrentIndex(index)
    setModalOpen(true)
  }

  const navigate = useCallback((direction: "prev" | "next") => {
    setCurrentIndex((prev) => {
      if (direction === "prev") return Math.max(0, prev - 1)
      return Math.min(reelsData.length - 1, prev + 1)
    })
  }, [])

  const current = reelsData[currentIndex]
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < reelsData.length - 1
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
  }

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStart) return
    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStart.x
    const deltaY = touch.clientY - touchStart.y
    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)
    if (absX > 50 && absX > absY * 1.5) {
      if (deltaX < 0 && hasNext) navigate("next")
      if (deltaX > 0 && hasPrev) navigate("prev")
    }
    setTouchStart(null)
  }

  useEffect(() => {
    if (!modalOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && hasPrev) navigate("prev")
      if (event.key === "ArrowRight" && hasNext) navigate("next")
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [modalOpen, hasPrev, hasNext, navigate])

  return (
    <>
      <Carousel
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {reelsData.map((reel, index) => (
            <CarouselItem
              key={reel.id}
              className="pl-4 basis-[84%] sm:basis-[58%] md:basis-[37%] lg:basis-[25%]"
            >
              <ReelCard reel={reel} onOpen={() => openReel(index)} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1 top-[35%] border-border bg-background/80 hover:bg-background md:-left-4" />
        <CarouselNext className="right-1 top-[35%] border-border bg-background/80 hover:bg-background md:-right-4" />
      </Carousel>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            "!p-0 gap-0 overflow-hidden border-border/70 bg-card/95 backdrop-blur-xl",
            "max-h-[90vh] w-[calc(100vw-2rem)]",
            "md:max-h-[85vh] md:max-w-[900px]",
          )}
        >
          {current && (
            <>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="absolute right-3 top-3 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm"
                aria-label="Zamknij"
              >
                <X className="h-5 w-5" />
              </button>

              {hasPrev && (
                <button
                  type="button"
                  onClick={() => navigate("prev")}
                  className="absolute left-3 top-1/2 z-40 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm md:inline-flex"
                  aria-label="Poprzednia rolka"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              {hasNext && (
                <button
                  type="button"
                  onClick={() => navigate("next")}
                  className="absolute right-3 top-1/2 z-40 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm md:inline-flex"
                  aria-label="Nastepna rolka"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}

              <div
                className="relative h-full max-h-[90vh] w-full touch-pan-y overflow-y-auto md:max-h-[85vh] md:overflow-hidden"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <div className="flex flex-col md:h-[85vh] md:flex-row">
                  <div className="relative aspect-[9/16] bg-black md:h-full md:w-[320px] md:min-w-[320px] md:shrink-0 md:aspect-auto">
                    <video
                      key={current.id}
                      src={current.videoUrl}
                      controls
                      autoPlay
                      playsInline
                      poster={current.posterUrl}
                      className="absolute inset-0 h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6 md:h-full md:overflow-hidden md:p-0">
                    <div className="flex flex-1 flex-col md:overflow-y-auto md:p-8 md:pt-10 md:pb-8 md:justify-center">
                      <DialogHeader className="mb-5 pr-10">
                        <DialogTitle className="text-3xl font-black tracking-tight">{current.title}</DialogTitle>
                        <DialogDescription>{current.views}</DialogDescription>
                      </DialogHeader>

                      {current.services && current.services.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {current.services.map((service) => (
                            <span
                              key={service}
                              className="rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs text-muted-foreground"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex gap-2 md:hidden">
                      <Button
                        variant="outline"
                        className="flex-1"
                        disabled={!hasPrev}
                        onClick={() => navigate("prev")}
                      >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Poprzednia
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        disabled={!hasNext}
                        onClick={() => navigate("next")}
                      >
                        Nastepna
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-4 text-center text-sm text-muted-foreground md:hidden">
                      {currentIndex + 1} / {reelsData.length}
                    </div>

                    <div className="mt-5 hidden border-t border-border/60 p-6 text-center text-sm text-muted-foreground md:block">
                      {currentIndex + 1} / {reelsData.length}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function ReelCard({ reel, onOpen }: { reel: ReelItem; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group block w-full overflow-hidden rounded-2xl border border-border/70 bg-card/85 text-left",
        "transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_36px_-12px_var(--primary)]",
      )}
      aria-label={`Odtworz wideo: ${reel.title}`}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        <img
          src={reel.posterUrl}
          alt={reel.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-primary/35 bg-primary/20 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-primary/30">
            <Play className="h-6 w-6 fill-primary-foreground text-primary-foreground" />
          </span>
        </div>
      </div>
      <div className="space-y-2 bg-card/95 px-4 py-4">
        <p className="line-clamp-2 text-sm font-semibold leading-tight text-foreground">{reel.title}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{reel.views}</p>
        </div>
      </div>
    </button>
  )
}
