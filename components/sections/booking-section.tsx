"use client"

import React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

export function BookingSection() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null)

  return (
    <section id="cta" className="w-full border-t border-border bg-background py-16 md:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="rounded-[32px] border border-border bg-card/50 p-4 md:p-12">
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex h-full flex-col justify-between space-y-8">
              <div className="space-y-4">
                <h2 className="text-display-fade text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
                  Sprawdzmy, czy Media DNA to dobry kierunek dla Twojej marki
                </h2>
                <p className="max-w-[450px] text-lg font-medium text-muted-foreground">
                  Umow 15-minutowa rozmowe i zobacz, jak mozemy poukladac Twoj system pozyskiwania
                  klientow.
                </p>
              </div>

              <div className="mt-auto space-y-6 pt-4">
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Dzialamy z Warszawy i zdalnie w calej Polsce
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Wszystkie godziny sa pokazywane w Twojej lokalnej strefie czasowej
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col items-center md:items-end">
              <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 rounded-xl border border-primary/20 bg-primary/10 p-4">
                  <div className="flex items-center gap-2">
                    <Badge className="rounded-full px-2 py-0 text-[10px]">SZYBKO</Badge>
                    <span className="text-sm font-bold text-foreground">Wysokie zainteresowanie</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Jesli nie znajdziesz terminu, zostaw kontakt przez szybki formularz - odezwiemy
                    sie z alternatywnymi godzinami.
                  </p>
                </div>

                <div className="flex flex-col gap-6 overflow-hidden rounded-[24px] border border-border bg-background/70 p-3 shadow-2xl md:p-6">
                  <div className="flex w-full justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(value) => {
                        setDate(value)
                        setSelectedSlot(null)
                      }}
                      className="w-full rounded-md border-none bg-transparent p-0 shadow-none"
                    />
                  </div>

                  <Separator className="bg-border" />

                  <div className="w-full space-y-3">
                    <p className="text-center text-xs font-bold uppercase text-muted-foreground">
                      Dostepne godziny
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {["9:00", "10:30", "14:00", "16:30"].map((time) => (
                        <Button
                          key={time}
                          variant={selectedSlot === time ? "default" : "outline"}
                          className="w-full"
                          onClick={() => setSelectedSlot(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                    <Button className="mt-2 w-full rounded-full" disabled={!date || !selectedSlot}>
                      {selectedSlot ? `Potwierdz ${selectedSlot}` : "Wybierz godzine"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
