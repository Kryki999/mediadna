import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { BlogListStatic } from "@/components/blog-list-static"
import { getAllPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog | Media DNA Studio",
  description:
    "Artykuły o SEO, reklamach, konwersjach, social video i technologii stron www. Baza wiedzy od agencji Media DNA.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteNav />
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="mb-12 max-w-3xl md:mb-16">
            <span className="text-xs uppercase tracking-[0.2em] text-primary">Blog</span>
            <h1 className="text-display-fade mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
              Baza wiedzy
            </h1>
            <p className="text-subhead mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
              Praktyczne teksty o marketingu, produktach cyfrowych i growth — tak, żebyś mógł od razu coś z nich
              wyjąć dla swojej firmy.
            </p>
          </div>

          {posts.length > 0 ? (
            <BlogListStatic posts={posts} />
          ) : (
            <p className="text-center text-muted-foreground">Wkrótce pierwsze artykuły.</p>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
