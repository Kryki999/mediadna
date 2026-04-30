"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
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
      <DialogContent className="max-h-[90svh] overflow-y-auto border-border bg-card p-4 sm:max-w-2xl sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black tracking-tight sm:text-3xl">Konfigurator projektu</DialogTitle>
        </DialogHeader>
        <ProjectConfiguratorCore variant="modal" onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
