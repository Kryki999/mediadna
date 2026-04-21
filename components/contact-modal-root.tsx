"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const CONTACT_TRIGGER_SELECTOR = '[data-contact-trigger="true"]'

export function ContactModalRoot() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      const trigger = target.closest(CONTACT_TRIGGER_SELECTOR)
      if (!trigger) return
      event.preventDefault()
      setOpen(true)
    }

    document.addEventListener("click", onDocumentClick)
    return () => document.removeEventListener("click", onDocumentClick)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-border bg-card p-6 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black tracking-tight">Porozmawiajmy</DialogTitle>
          <DialogDescription>
            Zostaw kontakt, a odezwiemy sie z propozycja kolejnego kroku.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Imie</Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Np. Jan"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-method">E-mail lub telefon</Label>
            <Input
              id="contact-method"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Np. hello@firma.pl / +48 500 000 000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Krotka wiadomosc</Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Napisz, czego potrzebujesz."
              className="min-h-28"
            />
          </div>

          <Button type="button" className="w-full rounded-full">
            Wyslij zapytanie
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
