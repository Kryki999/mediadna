"use client"

import { ProjectConfiguratorCore } from "@/components/project-configurator-core"

export function ProjectConfiguratorSection() {
  return (
    <section id="konfigurator" className="w-full border-t border-border bg-background py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="rounded-3xl border border-border bg-card/50 p-5 md:p-8">
          <div className="mb-6 space-y-3 md:mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Planer projektu</p>
            <h2 className="text-balance text-3xl font-black tracking-tight md:text-5xl">
              Zbudujmy system, który realnie dowozi klientów
            </h2>
            <p className="max-w-2xl text-muted-foreground md:text-lg">
              Wypełnij konfigurator i otrzymaj konkretną propozycję działania dopasowaną do Twojej branży.
            </p>
          </div>
          <ProjectConfiguratorCore variant="inline" />
        </div>
      </div>
    </section>
  )
}
