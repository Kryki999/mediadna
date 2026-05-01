import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { BlogBackLink } from "@/components/blog-back-link"
import { formatBlogDate } from "@/components/blog-post-card"
import { getAllPosts, getPostBySlug, getPostSlugs, hrefBlogPost, type BlogContentBlock } from "@/lib/blog"

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ from?: string }>
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) {
    return { title: "Artykuł nie znaleziony | Media DNA Studio" }
  }
  return {
    title: `${post.title} | Blog Media DNA`,
    description: post.excerpt,
  }
}

function ArticleBody({ blocks }: { blocks: BlogContentBlock[] }) {
  return (
    <div className="mt-10">
      {blocks.map((block, i) => {
        if (block.type === "h2") {
          return (
            <h2
              key={i}
              className="mt-10 text-balance text-2xl font-black tracking-tight text-white first:mt-0 md:mt-12 md:text-3xl"
            >
              {block.text}
            </h2>
          )
        }
        if (block.type === "h3") {
          return (
            <h3 key={i} className="mt-8 text-xl font-bold tracking-tight text-white md:text-2xl">
              {block.text}
            </h3>
          )
        }
        if (block.type === "p") {
          return (
            <p key={i} className="mt-4 text-base font-medium leading-relaxed text-white/85 md:text-lg">
              {block.text}
            </p>
          )
        }
        if (block.type === "blockquote") {
          return (
            <blockquote
              key={i}
              className="my-8 border-l-4 border-primary pl-4 text-lg font-medium italic leading-relaxed text-white/75"
            >
              {block.text}
            </blockquote>
          )
        }
        if (block.type === "ul") {
          return (
            <ul
              key={i}
              className="mt-4 list-disc space-y-2 pl-6 text-base font-medium leading-relaxed text-white/85 md:text-lg"
            >
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )
        }
        return null
      })}
    </div>
  )
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { from } = await searchParams
  const fromHome = from === "home"

  const post = getPostBySlug(slug)
  if (!post) {
    notFound()
  }

  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  const backHref = fromHome ? "/#blog" : "/blog"
  const backLabelTop = fromHome ? "Wróć na stronę główną" : "Wróć do bloga"
  const backLabelBottom = fromHome ? "Wróć na stronę główną" : "Wróć do wszystkich artykułów"

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <SiteNav />
      <article>
        <div className="mx-auto w-full max-w-4xl px-5 pb-6 pt-24 sm:px-6 md:px-8 md:pb-8 md:pt-28 lg:px-10">
          <BlogBackLink href={backHref} label={backLabelTop} />
        </div>

        <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 md:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_80px_-24px_rgba(0,85,255,0.35)]">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="h-auto w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" aria-hidden />
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-10 sm:px-6 md:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{post.category}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4" aria-hidden />
              {formatBlogDate(post.publishedAt)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden />
              {post.readTimeMin} min czytania
            </span>
          </div>

          <h1 className="text-display-fade mt-6 text-balance text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="text-subhead mt-6 border-l-4 border-primary pl-4 text-lg leading-relaxed md:text-xl">
            {post.excerpt}
          </p>

          <ArticleBody blocks={post.body} />

          {related.length > 0 ? (
            <div className="mt-16 border-t border-border pt-12">
              <h2 className="text-lg font-black tracking-tight text-white">Czytaj dalej</h2>
              <ul className="mt-4 space-y-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={hrefBlogPost(p.slug, fromHome)}
                      className="text-base font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-14 border-t border-border pt-10">
            <BlogBackLink href={backHref} label={backLabelBottom} />
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  )
}
