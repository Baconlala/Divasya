import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { updatePost } from "@/app/admin/blog/actions";
import { getPostById } from "@/lib/blog";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-maroon">Edit Post</h1>

      <div className="mt-6 max-w-2xl rounded-2xl bg-white p-6 shadow-soft">
        <BlogPostForm post={post} action={updatePost.bind(null, post.id)} />
      </div>
    </div>
  );
}
