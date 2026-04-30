import { ProjectConfiguratorCore } from "@/components/project-configurator-core"

export default function ConfiguratorPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-24 sm:px-6 md:px-8">
      <div className="mx-auto w-full max-w-4xl rounded-3xl border border-border bg-card/60 p-5 md:p-8">
        <div className="mb-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Media DNA Studio</p>
          <h1 className="text-balance text-3xl font-black tracking-tight md:text-5xl">Planer projektu</h1>
          <p className="text-muted-foreground md:text-lg">
            Opisz projekt, zakres i cele. Wrócimy do Ciebie z dopasowanym planem działania.
          </p>
        </div>
        <ProjectConfiguratorCore variant="inline" />
      </div>
    </main>
  )
}
