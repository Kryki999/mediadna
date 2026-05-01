import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogPostCard } from "@/components/blog-post-card"
import { getAllPosts } from "@/lib/blog"

export function BlogSection() {
  const posts = getAllPosts()
  const bentoPosts = posts.slice(0, 3)

  if (bentoPosts.length === 0) {
    return null
  }

  return (
    <section id="blog" className="relative border-t border-border bg-background py-10 md:py-20">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mb-10 max-w-3xl md:mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Blog</span>
          <h2 className="text-display-fade mt-3 text-balance text-4xl font-black leading-[1.02] tracking-tight md:text-6xl">
            Baza wiedzy
          </h2>
          <p className="text-subhead mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
            SEO, reklamy, konwersje i social — praktycznie, bez lania wody. Wybrane artykuły poniżej, pełny
            archiwum na podstronie bloga.
          </p>
        </div>

        <div className="blog-featured">
          {bentoPosts[0] ? (
            <div className="blog-featured__hero">
              <BlogPostCard
                featured
                fromHome
                post={{
                  slug: bentoPosts[0].slug,
                  title: bentoPosts[0].title,
                  excerpt: bentoPosts[0].excerpt,
                  publishedAt: bentoPosts[0].publishedAt,
                  coverImage: bentoPosts[0].coverImage,
                }}
              />
            </div>
          ) : null}

          <div className="blog-featured__sidebar">
            {bentoPosts[1] ? (
              <div className="blog-featured__sidebar-item">
                <BlogPostCard
                  fromHome
                  post={{
                    slug: bentoPosts[1].slug,
                    title: bentoPosts[1].title,
                    excerpt: bentoPosts[1].excerpt,
                    publishedAt: bentoPosts[1].publishedAt,
                    coverImage: bentoPosts[1].coverImage,
                  }}
                />
              </div>
            ) : null}
            {bentoPosts[2] ? (
              <div className="blog-featured__sidebar-item">
                <BlogPostCard
                  fromHome
                  post={{
                    slug: bentoPosts[2].slug,
                    title: bentoPosts[2].title,
                    excerpt: bentoPosts[2].excerpt,
                    publishedAt: bentoPosts[2].publishedAt,
                    coverImage: bentoPosts[2].coverImage,
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-10 flex justify-center md:mt-12">
          <Button
            variant="outline"
            size="lg"
            asChild
            className="group rounded-full border-primary/35 bg-white/[0.02] px-8 text-base font-semibold text-foreground hover:border-primary hover:bg-primary/10"
          >
            <Link href="/blog">
              Zobacz wszystkie artykuły
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
