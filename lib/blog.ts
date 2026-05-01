export type BlogContentBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "blockquote"; text: string }
  | { type: "ul"; items: string[] }

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  category: string
  coverImage: string
  readTimeMin: number
  body: BlogContentBlock[]
}

/** `from=home` lets the article page point "Wróć" to the landing page (#blog) instead of /blog. */
export function hrefBlogPost(slug: string, entryFromHome?: boolean): string {
  return entryFromHome ? `/blog/${slug}?from=home` : `/blog/${slug}`
}

const posts: BlogPost[] = [
  {
    slug: "seo-ktore-realnie-widac-w-wynikach",
    title: "SEO, które realnie widać w wynikach — od technikaliów po treść",
    excerpt:
      "Jak poukładać SEO tak, żeby Google miało powód promować Twoją stronę wyżej, a Ty mierzył postępy w leadach, nie tylko w pozycjach.",
    publishedAt: "2026-04-18",
    category: "SEO",
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop",
    readTimeMin: 8,
    body: [
      {
        type: "p",
        text: "Wiele firm traktuje SEO jak magiczną listę tagów. Tymczasem algorytm to po prostu bardzo dokładny czytelnik: musi zrozumieć, czym się zajmujesz, komu pomagasz i dlaczego Twoja strona jest bezpieczniejszym kliknięciem niż konkurencja.",
      },
      {
        type: "h2",
        text: "Fundament: indeksowanie i szybkość",
      },
      {
        type: "p",
        text: "Zanim zaczniesz pisać teksty, upewnij się, że roboty mogą wejść na kluczowe podstrony, że nie duplikujesz treści pod wieloma adresami i że Core Web Vitals nie odstraszają użytkowników jeszcze przed pierwszym scrollowaniem.",
      },
      {
        type: "ul",
        items: [
          "Mapa strony i logiczna hierarchia nagłówków (jeden H1 na podstronę, sensowne H2/H3).",
          "Meta title i opis pod intencję wyszukiwania — nie tylko pod frazę.",
          "Schema (Article, LocalBusiness, FAQ) tam, gdzie ma to sens kontekstowo.",
        ],
      },
      {
        type: "h2",
        text: "Treść pod intencję, nie pod „gęstość słów kluczowych”",
      },
      {
        type: "p",
        text: "Dobry artykuł odpowiada na pytanie użytkownika w pierwszych akapitach, potem je pogłębia. Jeśli ktoś szuka „agencji marketingu w Warszawie”, oczekuje dowodu wykonania, procesu i kontaktu — nie samej listy synonimów.",
      },
      {
        type: "blockquote",
        text: "SEO wygrywa ten, kto łączy techniczną czystość strony z treścią, której szczerze chciałbyś przeczytać jako klient.",
      },
      {
        type: "h3",
        text: "Jak mierzyć sukces?",
      },
      {
        type: "p",
        text: "Śledź konwersje z organicu (formularz, telefon, CTA), zaangażowanie na lądowaniu oraz wzrost widoczności na zestawie fraz biznesowych — nie na pojedynczym „top 1”, który i tak nie konwertuje.",
      },
    ],
  },
  {
    slug: "strona-jak-aplikacja-pwa",
    title: "Strona, która działa jak aplikacja — PWA bez przepłacania za native",
    excerpt:
      "Instalowalna strona, offline shell, push (gdzie ma sens) i UX jak z App Store — kiedy PWA ma biznesowy sens i jak tego nie zepsuć.",
    publishedAt: "2026-04-12",
    category: "Technologia",
    coverImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1600&auto=format&fit=crop",
    readTimeMin: 7,
    body: [
      {
        type: "p",
        text: "Progressive Web App to zestaw dobrych praktyk: szybkie ładowanie, niezawodność przy słabej sieci i możliwość dodania skrótu na pulpit. Dla wielu marek to idealny punkt między kosztem natywnej aplikacji a zasięgiem strony www.",
      },
      {
        type: "h2",
        text: "Kiedy PWA jest strzałem w dziesiątkę?",
      },
      {
        type: "ul",
        items: [
          "Powtarzalne wizyty (np. B2B catalog, panel klienta, loyalty).",
          "Rynek mobilny dominuje, ale nie chcesz utrzymywać dwóch codebase’ów.",
          "Chcesz skrócić ścieżkę od reklamy do działania bez App Store w środku.",
        ],
      },
      {
        type: "h2",
        text: "UX, którego użytkownicy oczekują po „apce”",
      },
      {
        type: "p",
        text: "Pełnoekranowy tryb, płynne przejścia, stany ładowania i sensowne komunikaty błędów — to elementy, które sprawiają, że PWA nie odbiega od poczucia jakości znanej z dobrych apek.",
      },
      {
        type: "p",
        text: "Service worker pozwala cache’ować szkielet aplikacji; reszta powinna być świeża tam, gdzie liczą się dane (np. stany magazynowe). Klucz to balans: nie serwuj użytkownikowi wiecznie zastanej treści tylko dlatego, że działa offline.",
      },
      {
        type: "blockquote",
        text: "Najlepsze PWA to te, których użytkownik nie nazywa PWA — po prostu „działa szybko i wygodnie”.",
      },
    ],
  },
  {
    slug: "pozycjonowanie-ai-i-widocznosc-w-asystentach",
    title: "Wyszukiwanie przez AI i widoczność marki — nowe SEO bez starych sztamp",
    excerpt:
      "ChatGPT, Perplexity i asystenci w wyszukiwarce cytują źródła inaczej niż klasyczny Google. Jak być na ich radarze bez magicznych trików?",
    publishedAt: "2026-04-08",
    category: "AI",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
    readTimeMin: 9,
    body: [
      {
        type: "p",
        text: "Model językowy szuka wiarygodnych, powtarzalnych sygnałów: klarownych definicji, spójnych danych strukturalnych, cytowań i treści, które da się podsumować jednym zdaniem — ale nie kosztem merytoryki.",
      },
      {
        type: "h2",
        text: "AIO / GEO: o co w tym chodzi?",
      },
      {
        type: "p",
        text: "Chodzi o to, żeby Twoja ekspertyza była łatwa do znalezienia, zacytowania i powiązania z konkretnym problemem użytkownika. To znaczy: case studies z liczbami, wyraźna propozycja wartości i aktualne dane kontaktowe wielokrotnie powtórzone w spójnej formie.",
      },
      {
        type: "h3",
        text: "Praktyczny checklist",
      },
      {
        type: "ul",
        items: [
          "FAQ na stronie usług — realne pytania klientów, nie lorem ipsum.",
          "Artykuły eksperckie z nagłówkami-odpowiedziami i podsumowaniami.",
          "Profil firmy uzupełniony w Google i mediach, które model może skorelować.",
        ],
      },
      {
        type: "blockquote",
        text: "Nie „pisz pod bota”. Pisz tak jasno, że człowiek poleci Cię komuś — a bot podąży za tym samym sygnałem zaufania.",
      },
      {
        type: "p",
        text: "Monitoruj, skąd przychodzi ruch (referral, brand, organic) i czy rośnie liczba zapytań bezpośrednich — to często efekt uboczny bycia cytowanym przez narzędzia AI.",
      },
    ],
  },
  {
    slug: "reklamy-a-wzrost-sprzedazy",
    title: "Jak reklamy zwiększają sprzedaż — lejki, które kończą się na kasie",
    excerpt:
      "Zasiąg to nie przychód. Jak projektować kampanie Meta i Google tak, byś liczył zamówienia i wartość koszyka, nie kliknięcia.",
    publishedAt: "2026-04-03",
    category: "Reklamy",
    coverImage:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
    readTimeMin: 8,
    body: [
      {
        type: "p",
        text: "Reklama płatna jest jak dźwignia: źle ustawiona tnie budżet, dobrze ustawiona skaluje to, co już działa w produkcie i na stronie.",
      },
      {
        type: "h2",
        text: "Najpierw śledzenie, potem skalowanie",
      },
      {
        type: "p",
        text: "Bez poprawnego CAPI / GA4 / offline conversion firma optymalizuje na mrugnięcia zamiast na transakcje. Zanim podbijasz budżet, domknij pomiar: wartość zamówienia, leadów i długoterminowe LTV tam, gdzie ma to sens.",
      },
      {
        type: "h2",
        text: "Kreacje, które sprzedają",
      },
      {
        type: "ul",
        items: [
          "Jedno jasne przesłanie w pierwszej klatce wideo.",
          "Dowód społeczny lub liczby, które można zweryfikować.",
          "CTA dopasowany do etapu — nie „kup teraz”, gdy user pierwszy raz słyszy o marce.",
        ],
      },
      {
        type: "blockquote",
        text: "Najdroższy błąd to feed pełen świetnych grafik, które nikt nie łączy z modelem atrybucji sprzedaży.",
      },
      {
        type: "h3",
        text: "Testy, które mają sens",
      },
      {
        type: "p",
        text: "Testuj hipotezy strategiczne: inną ofertę wejściową, inny kąt problemu, inny segment. Unikaj mikro-testów kosmetycznych, które nigdy nie zmienią decyzji zakupowej.",
      },
    ],
  },
  {
    slug: "dlaczego-blog-na-stronie-jest-wazny",
    title: "Dlaczego blog na stronie firmowej jest ważny — E-E-A-T w praktyce",
    excerpt:
      "Blog to nie „SEO na siłę”. To miejsce, gdzie pokazujesz ekspertyzę, uczasz klienta i skracasz rozmowę sprzedażową.",
    publishedAt: "2026-03-28",
    category: "Content",
    coverImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop",
    readTimeMin: 6,
    body: [
      {
        type: "p",
        text: "Klienci B2B i premium często czytają przed kontaktem. Jeśli nie znajdą na Twojej stronie głębszego materiału, zakładają, że nie masz nic do powiedzenia poza slajdem cennika.",
      },
      {
        type: "h2",
        text: "Co zyskujesz jako firma?",
      },
      {
        type: "ul",
        items: [
          "Krótszy cykl sprzedaży — lead przychodzi już po przeczytaniu case’u.",
          "Materiały dla zespołu handlowego (link zamiast wyjaśniać od zera).",
          "Naturalne frazy długiego ogona bez keyword stuffingu.",
        ],
      },
      {
        type: "h2",
        text: "Jak pisać, żeby nie zmarnować czasu?",
      },
      {
        type: "p",
        text: "Wybieraj tematy powtarzalnych pytań z rozmów z klientami. Jeden porządny artykuł raz na kwartał bije dziesięć przeciętnych newsów, których nikt nie udostępnia.",
      },
      {
        type: "blockquote",
        text: "Blog jest skalowalnym sprzedawcą pracującym 24/7 — pod warunkiem, że merytorycznie dorównuje Twojej najlepszej rozmowie w biurze.",
      },
    ],
  },
  {
    slug: "jak-robic-wiralowe-rolki",
    title: "Jak planować rolki z potencjałem wiralowym — od haka po powtórzenia",
    excerpt:
      "Shorts, Reels, TikTok: algorytm karmi się retencją. Jak budować format, który ludzie dokańczają — nawet jeśli nie jesteś „komedią z internetu”.",
    publishedAt: "2026-03-22",
    category: "Social video",
    coverImage:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1600&auto=format&fit=crop",
    readTimeMin: 7,
    body: [
      {
        type: "p",
        text: "Wiral to skutek uboczny, nie gwarancja. Ale retencja to coś, co możesz zaprojektować: pierwsza sekunda, tempo montażu, kontrast dźwięku i obrazu, jasne pytanie lub obietnica w hooku.",
      },
      {
        type: "h2",
        text: "Anatomia hooka",
      },
      {
        type: "p",
        text: "W pierwszych 1,5 sekundy użytkownik decyduje, czy zostać. Pokaż ruch, twarz, tekst na ekranie lub nagły kontrast — cokolwiek, co przerywa scrollowanie.",
      },
      {
        type: "h3",
        text: "Formaty, które działają także dla marek B2B",
      },
      {
        type: "ul",
        items: [
          "„Mit vs rzeczywistość” w jednym ujęciu cięcia.",
          "Mikro-case: problem → rozwiązanie → efekt w liczbach.",
          "Behind the scenes z komentarzem eksperckim z offu.",
        ],
      },
      {
        type: "blockquote",
        text: "Jeśli da się wyciąć Twoją rolkę do jednego zdania wartościowego i nadal jest zrozumiała — masz dobry blueprint.",
      },
      {
        type: "p",
        text: "Publikuj konsekwentnie, analizuj completion rate i wracaj do zwycięskich struktur — to prostsze niż codzienne zgadywanie trendu tygodnia.",
      },
    ],
  },
  {
    slug: "landing-page-ktora-konwertuje",
    title: "Landing page, która konwertuje — anatomia oferty na jednej stronie",
    excerpt:
      "Jedna obietnica, jeden CTA, zero rozpraszaczy. Jak ułożyć landing pod kampanię płatną i nie zmarnować kosztu kliknięcia.",
    publishedAt: "2026-03-15",
    category: "Konwersje",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    readTimeMin: 7,
    body: [
      {
        type: "p",
        text: "Strona docelowa to nie skrót homepage’u. To zamknięty argument sprzedażowy: przychodzę z konkretnego obiecania reklamy i chcę zobaczyć jej spełnienie w pierwszym viewporcie.",
      },
      {
        type: "h2",
        text: "Co musi być „above the fold”?",
      },
      {
        type: "ul",
        items: [
          "Nagłówek = korzyść mierzalna lub emocjonalna, nie slogan wewnętrzny.",
          "Dowód: logo klientów, cytat, krótka liczba.",
          "Jedno dominujące CTA + ewentualny drugorzędny krok (np. ebook).",
        ],
      },
      {
        type: "h2",
        text: "Obiekcje pod nagłówkiem",
      },
      {
        type: "p",
        text: "FAQ, gwarancja, proces krok po kroku — to elementy, które obniżają tarcie. Nie chowaj ich za siódmym scrollem, jeśli wiesz, że klienci zawsze pytają o czas wdrożenia lub SLA.",
      },
      {
        type: "blockquote",
        text: "Landing testujesz na spójności z reklamą, nie na liczbie sekcji „wszytko o firmie”.",
      },
      {
        type: "h3",
        text: "Szybkość = część copywritingu",
      },
      {
        type: "p",
        text: "Wolne LCP zabija kampanie szybciej niż słaby nagłówek — bo użytkownik nigdy go nie przeczyta. Łącz copy z lekkim front-endem.",
      },
    ],
  },
]

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getPostSlugs(): string[] {
  return posts.map((p) => p.slug)
}
