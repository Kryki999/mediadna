"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    id: "item-1",
    question: "Ile trwa wdrożenie pełnego systemu?",
    answer:
      "Pierwsze efekty widzisz zwykle po kilku tygodniach, a pełne wdrożenie systemu zależy od zakresu. Każdy etap jest rozpisany i realizowany iteracyjnie.",
  },
  {
    id: "item-2",
    question: "Czy współpraca obejmuje tylko marketing?",
    answer:
      "Nie. Łączymy stronę, treści, reklamę i analitykę w jeden proces, dzięki czemu wszystkie elementy wspierają ten sam cel biznesowy.",
  },
  {
    id: "item-3",
    question: "Jak wygląda start współpracy?",
    answer:
      "Zaczynamy od krótkiej konsultacji i audytu obecnej sytuacji. Na tej podstawie układamy priorytety i plan działań na pierwsze tygodnie.",
  },
  {
    id: "item-4",
    question: "Czy mogę wdrożyć tylko jeden element systemu?",
    answer:
      "Tak, ale rekomendujemy podejście systemowe. Pojedyncze elementy też realizujemy, jeśli mają jasny cel i pasują do Twojego etapu rozwoju.",
  },
]

export function Faq() {
  return (
    <section className="relative border-t border-border bg-background py-20 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-10 text-center md:mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Najczęstsze pytania
          </span>
          <h2 className="text-display-fade mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            FAQ
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="overflow-hidden rounded-3xl border border-border bg-card/40"
        >
          {faqItems.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="px-5 md:px-7">
              <AccordionTrigger className="py-5 text-base font-semibold tracking-tight hover:no-underline md:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm font-medium leading-relaxed text-muted-foreground md:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
