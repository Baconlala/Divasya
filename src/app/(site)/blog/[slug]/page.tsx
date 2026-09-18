import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/Container";
import { getPostBySlug } from "@/lib/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return { title: post ? post.title : "Blog" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || post.status !== "published") notFound();

  return (
    <Container className="max-w-3xl py-10 sm:py-14">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <span className="mt-6 block text-xs font-semibold uppercase tracking-wide text-terracotta">
        {post.category}
      </span>
      <h1 className="mt-2 font-display text-3xl font-bold text-maroon sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-charcoal/50">
        {post.author} ·{" "}
        {new Date(post.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="relative mt-6 h-64 w-full overflow-hidden rounded-2xl shadow-premium sm:h-96">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="mt-8 space-y-4 text-[17px] leading-relaxed text-charcoal/75">
        {post.content.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </Container>
  );
}
