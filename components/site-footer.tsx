import { ArrowUpRight, Instagram, Linkedin, Facebook } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto w-full max-w-[1400px] px-5 py-10 sm:px-6 md:px-8 md:py-14 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-3">
            <div className="text-lg font-black tracking-[0.18em] text-foreground">MEDIA DNA</div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Agencja interaktywna premium. Tworzymy systemy wzrostu, które pracują codziennie na
              wynik i sprzedaż.
            </p>
            <div className="mt-6 space-y-1 text-sm text-muted-foreground">
              <p>ul. Złotego Smoka 18</p>
              <p>02-202 Warszawa</p>
            </div>
            <a
              href="#cta"
              data-configurator-trigger="true"
              className="mt-5 inline-block text-sm text-foreground transition-colors hover:text-primary"
            >
              Skonfiguruj projekt
            </a>
          </div>

          <div className="md:col-span-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <a href="#about" className="text-muted-foreground transition-colors hover:text-foreground">
                O nas
              </a>
              <a href="/blog" className="text-muted-foreground transition-colors hover:text-foreground">
                Blog
              </a>
              <a href="#services" className="text-muted-foreground transition-colors hover:text-foreground">
                Software House
              </a>
              <a href="#impact" className="text-muted-foreground transition-colors hover:text-foreground">
                Realizacje
              </a>
              <a href="#cta" data-configurator-trigger="true" className="text-muted-foreground transition-colors hover:text-foreground">
                Skonfiguruj projekt
              </a>
              <a href="#careers" className="text-muted-foreground transition-colors hover:text-foreground">
                Kariera
              </a>
            </div>
          </div>

          <div className="md:col-span-5 md:text-right">
            <a
              href="mailto:hello@mediadna.studio"
              className="inline-flex items-center gap-2 text-3xl font-semibold tracking-tight text-foreground transition-colors hover:text-primary md:text-5xl"
            >
              hello@mediadna.studio
              <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8" />
            </a>

            <div className="mt-8 flex items-center gap-9 md:justify-end md:gap-10">
              <a href="#" aria-label="Instagram" className="text-white transition-opacity hover:opacity-75">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Behance" className="text-2xl font-semibold text-white transition-opacity hover:opacity-75">
                Bē
              </a>
              <a href="#" aria-label="LinkedIn" className="text-white transition-opacity hover:opacity-75">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Facebook" className="text-white transition-opacity hover:opacity-75">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" aria-label="Dribbble" className="text-2xl font-semibold text-white transition-opacity hover:opacity-75">
                ◌
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Media DNA. Wszelkie prawa zastrzeżone.</p>
          <a href="#" className="transition-colors hover:text-foreground">
            Polityka prywatności
          </a>
        </div>
      </div>
    </footer>
  )
}
