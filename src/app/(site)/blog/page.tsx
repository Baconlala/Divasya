import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { getAllPosts } from "@/lib/data/blog";

export const metadata = { title: "Blog" };

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Stories, updates, and transparency notes"
        description="Field notes from the causes we support, and plain explanations of how Divasya works behind the scenes."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={i * 100}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-lg"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-terracotta">
                      {post.category}
                    </span>
                    <h2 className="mt-2 font-display text-lg font-bold leading-snug text-maroon">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-charcoal/65">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-charcoal/60">
                      {post.author} ·{" "}
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
