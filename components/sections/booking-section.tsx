"use client"

import React from "react"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from "@/components/ui/separator"

export function BookingSection() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null)

  return (
    <section id="cta" className="w-full overflow-x-hidden border-t border-border bg-background py-16 md:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="overflow-hidden rounded-none border-x-0 border-border bg-card/50 md:rounded-[32px] md:border-x md:border-border md:p-12">
          <div className="grid grid-cols-1 items-start gap-0 md:grid-cols-2 md:gap-12">
            <div className="flex h-full flex-col justify-between space-y-8 p-5 pb-6 md:p-0">
              <div className="space-y-4">
                <h2 className="text-display-fade text-balance text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
                  Sprawdźmy, czy Media DNA to dobry kierunek dla Twojej marki
                </h2>
                <p className="max-w-[450px] text-lg font-medium text-muted-foreground">
                  Umów 15-minutową rozmowę i zobacz, jak możemy ułożyć Twój system pozyskiwania klientów.
                </p>
              </div>

              <div className="mt-auto space-y-6 pt-2 md:pt-4">
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Działamy z Warszawy i zdalnie w całej Polsce
                </div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Wszystkie godziny są pokazywane w Twojej lokalnej strefie czasowej
                </p>
              </div>
            </div>

            {/* Mobile: pełna szerokość viewportu — bez podwójnego marginesu wokół kalendarza */}
            <div className="min-w-0 md:flex md:w-full md:flex-col md:items-end">
              <div className="ml-[calc(50%-50vw)] w-screen max-w-[100vw] md:ml-0 md:w-full md:max-w-none">
                <div className="mx-auto w-full max-w-md space-y-6 px-4 pb-8 pt-2 md:px-0 md:pb-0 md:pt-0">
                  <div className="space-y-2 rounded-xl border border-primary/20 bg-primary/10 p-4">
                    <div className="flex items-center gap-2">
                      <Badge className="rounded-full px-2 py-0 text-[10px]">SZYBKO</Badge>
                      <span className="text-sm font-bold text-foreground">Wysokie zainteresowanie</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Jeśli nie znajdziesz terminu, zostaw kontakt przez szybki formularz — odezwiemy się z
                      alternatywnymi godzinami.
                    </p>
                  </div>

                  <div className="flex flex-col gap-6 overflow-hidden rounded-none border-x-0 border-b-0 border-t border-border bg-background/70 p-4 shadow-2xl md:rounded-[24px] md:border md:p-6">
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
                        Dostępne godziny
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
                        {selectedSlot ? `Potwierdź ${selectedSlot}` : "Wybierz godzinę"}
                      </Button>
                    </div>
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
