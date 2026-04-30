"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProjectConfiguratorCore } from "@/components/project-configurator-core"

const CONFIGURATOR_TRIGGER_SELECTOR = '[data-configurator-trigger="true"]'

export function ContactModalRoot() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      const trigger = target.closest(CONFIGURATOR_TRIGGER_SELECTOR)
      if (!trigger) return
      event.preventDefault()
      setOpen(true)
    }

    document.addEventListener("click", onDocumentClick)
    return () => document.removeEventListener("click", onDocumentClick)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90svh] overflow-y-auto border-border bg-card p-6 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black tracking-tight">Konfigurator projektu</DialogTitle>
          <DialogDescription>
            Odpowiedz na kilka pytań i odbierz precyzyjną wycenę.
          </DialogDescription>
        </DialogHeader>
        <ProjectConfiguratorCore variant="modal" onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
