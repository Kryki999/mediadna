import { BlogPostCard } from "@/components/blog-post-card"
import type { BlogPost } from "@/lib/blog"

export function BlogListStatic({ posts }: { posts: BlogPost[] }) {
  const featuredPosts = posts.slice(0, 3)
  const rest = posts.slice(3)

  return (
    <>
      {featuredPosts.length > 0 ? (
        <div className="blog-featured">
          {featuredPosts[0] ? (
            <div className="blog-featured__hero">
              <BlogPostCard
                featured
                post={{
                  slug: featuredPosts[0].slug,
                  title: featuredPosts[0].title,
                  excerpt: featuredPosts[0].excerpt,
                  publishedAt: featuredPosts[0].publishedAt,
                  coverImage: featuredPosts[0].coverImage,
                }}
              />
            </div>
          ) : null}
          <div className="blog-featured__sidebar">
            {featuredPosts[1] ? (
              <div className="blog-featured__sidebar-item">
                <BlogPostCard
                  post={{
                    slug: featuredPosts[1].slug,
                    title: featuredPosts[1].title,
                    excerpt: featuredPosts[1].excerpt,
                    publishedAt: featuredPosts[1].publishedAt,
                    coverImage: featuredPosts[1].coverImage,
                  }}
                />
              </div>
            ) : null}
            {featuredPosts[2] ? (
              <div className="blog-featured__sidebar-item">
                <BlogPostCard
                  post={{
                    slug: featuredPosts[2].slug,
                    title: featuredPosts[2].title,
                    excerpt: featuredPosts[2].excerpt,
                    publishedAt: featuredPosts[2].publishedAt,
                    coverImage: featuredPosts[2].coverImage,
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {rest.length > 0 ? (
        <div className="blog-grid">
          {rest.map((post) => (
            <div key={post.slug} className="blog-grid__item">
              <BlogPostCard
                post={{
                  slug: post.slug,
                  title: post.title,
                  excerpt: post.excerpt,
                  publishedAt: post.publishedAt,
                  coverImage: post.coverImage,
                }}
              />
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
