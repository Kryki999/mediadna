const cards = [
  {
    img: "/mockup-1.jpg",
    label: "Automotive · Detailing",
    title: "BlackGloss Studio",
    tag: "Web · Brand",
  },
  {
    img: "/mockup-2.jpg",
    label: "Fashion · DTC",
    title: "Maison Noir",
    tag: "E-commerce",
  },
  {
    img: "/mockup-3.jpg",
    label: "SaaS · Analytics",
    title: "Pulse Analytics",
    tag: "Product UI",
  },
  {
    img: "/impact-1.jpg",
    label: "Auto Detailing",
    title: "Detailing Growth",
    tag: "System",
  },
  {
    img: "/impact-2.jpg",
    label: "Architektura",
    title: "Interior Leads",
    tag: "Lejki",
  },
  {
    img: "/impact-3.jpg",
    label: "Eventy",
    title: "Event Engine",
    tag: "Content",
  },
  {
    img: "/reel-1.jpg",
    label: "Reels",
    title: "Social Launch",
    tag: "Video",
  },
  {
    img: "/reel-2.jpg",
    label: "Wizerunek",
    title: "Founder Story",
    tag: "Brand",
  },
  {
    img: "/reel-3.jpg",
    label: "Kampanie",
    title: "Ad Momentum",
    tag: "Ads",
  },
]

const columnCards = [cards.slice(0, 3), cards.slice(3, 6), cards.slice(6, 9)]

export function ScrollingCards() {
  return (
    <section className="relative border-border bg-background pb-10 pt-0 max-md:border-t-0 md:border-t md:pb-16 md:pt-14">
      <div className="mx-auto w-full max-w-[1400px] px-0 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(300px,420px)_1fr] md:gap-10">
          <div className="grid h-[24rem] grid-cols-3 gap-1 overflow-hidden border-y border-border/70 bg-card/30 p-1 md:hidden sm:gap-2 sm:rounded-3xl sm:border sm:p-2">
            {columnCards.map((column, columnIndex) => (
              <div
                key={`mobile-col-${columnIndex}`}
                className="relative overflow-hidden rounded-xl border border-border/60 bg-card/40 p-0.5 sm:rounded-2xl sm:p-1"
              >
                <div
                  className={`flex flex-col gap-2 ${
                    columnIndex === 1 ? "animate-scroll-up-slow" : "animate-scroll-down-slow"
                  }`}
                >
                  {[...column, ...column].map((c, i) => (
                    <article
                      key={`mobile-${c.title}-${i}`}
                      className="overflow-hidden rounded-xl border border-border/70 bg-card/90"
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <img src={c.img || "/placeholder.svg"} alt={`Realizacja ${c.title}`} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-transparent" />
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="px-5 sm:px-0 md:sticky md:top-28 md:h-fit">
            <div className="space-y-6 md:space-y-10">
              <p className="text-lg font-medium leading-relaxed text-foreground md:text-xl">
                Zaufanie{" "}
                <span className="text-brand-fade text-2xl font-black tracking-tight md:text-3xl">+50</span>{" "}
                dynamicznie rosnących marek i liderów w swoich branżach.
              </p>

              <p className="text-lg font-medium leading-relaxed text-foreground md:text-xl">
                Ponad{" "}
                <span className="text-brand-fade text-2xl font-black tracking-tight md:text-3xl">10 milionów</span>{" "}
                wyświetleń naszych rolek, które zamieniły czystą uwagę w realny zysk.
              </p>
            </div>
          </aside>

          <div className="hidden h-[42rem] grid-cols-3 gap-4 overflow-hidden md:grid">
            {columnCards.map((column, columnIndex) => (
              <div key={columnIndex} className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/30 p-2">
                <div
                  className={`flex flex-col gap-4 ${
                    columnIndex === 1 ? "animate-scroll-up-slow" : "animate-scroll-down-slow"
                  }`}
                >
                  {[...column, ...column].map((c, i) => (
                    <article
                      key={`${c.title}-${i}`}
                      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/90"
                    >
                      <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <img
                          src={c.img || "/placeholder.svg"}
                          alt={`Realizacja ${c.title}`}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                        <div className="absolute right-3 top-3 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-[11px] text-foreground backdrop-blur">
                          {c.tag}
                        </div>
                      </div>
                      <div className="px-4 py-4">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{c.label}</p>
                        <h3 className="mt-1 text-xl font-extrabold tracking-tight">{c.title}</h3>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

