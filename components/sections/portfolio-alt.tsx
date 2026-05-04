type PortfolioCard = {
  id: string
  title: string
  description: string
  badge: string
  imageSrc: string
}

const portfolioCards: PortfolioCard[] = [
  {
    id: "detailing",
    title: "Auto Detailing Premium",
    description: "Nowa strona usługowa i system leadowy dla studia car care.",
    badge: "Nowość",
    imageSrc: "/impact-1.jpg",
  },
  {
    id: "architektura",
    title: "Studio Architektury",
    description: "Odświeżony branding online i landing pod zapytania high-ticket.",
    badge: "Nowość",
    imageSrc: "/impact-2.jpg",
  },
  {
    id: "eventy",
    title: "Kampania Eventowa",
    description: "Strona wydarzenia i automatyzacja zapisów z social media.",
    badge: "Nowość",
    imageSrc: "/impact-3.jpg",
  },
  {
    id: "ecommerce",
    title: "Sklep Beauty",
    description: "Migracja sklepu i poprawa konwersji na mobile.",
    badge: "Nowość",
    imageSrc: "/impact-2.jpg",
  },
  {
    id: "saas",
    title: "Landing SaaS",
    description: "Szybki launch strony produktu z onboardingiem trial.",
    badge: "Nowość",
    imageSrc: "/impact-1.jpg",
  },
]

function PortfolioCarouselCard({ card }: { card: PortfolioCard }) {
  return (
    <article className="relative h-[470px] w-[360px] flex-none overflow-hidden rounded-[26px] md:h-[550px] md:w-[430px]">
      <img src={card.imageSrc} alt={card.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/15 bg-[#0b1222]/82 p-4 text-white backdrop-blur-md md:inset-x-5 md:bottom-5 md:p-5">
        <h3 className="text-lg font-bold tracking-tight md:text-xl">{card.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{card.description}</p>
        <span className="mt-4 inline-flex rounded-full border border-[#3e66ff]/40 bg-[#1f3ea6]/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#a9c0ff]">
          {card.badge}
        </span>
      </div>
    </article>
  )
}

export function PortfolioAlt() {
  const loopedCards = [...portfolioCards, ...portfolioCards]

  return (
    <section
      id="impact"
      className="relative overflow-hidden border-t border-white/10 bg-background py-10 md:py-20"
      aria-label="Portfolio"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(47,124,255,0.12)_0%,rgba(47,124,255,0)_55%)]"
      />
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-[0.2em] text-white/85">Portfolio</span>
          <h2 className="mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl">
            Zaufany partner agencyjny
            <br />
            dla startupow i biznesow
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base font-medium leading-relaxed text-white/85 md:text-lg">
            Uruchamiamy strony szybko i profesjonalnie. Dostajesz kompletne wdrozenie, wsparcie
            ekspertow i gotowosc do skalowania od pierwszych dni.
          </p>
        </div>

        <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max gap-5 md:gap-6 motion-safe:[animation:portfolio-marquee_42s_linear_infinite]">
            {loopedCards.map((card, index) => (
              <PortfolioCarouselCard key={`${card.id}-${index}`} card={card} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes portfolio-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  )
}
