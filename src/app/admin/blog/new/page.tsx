import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { createPost } from "@/app/admin/blog/actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <Link
        href="/admin/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-maroon">New Post</h1>

      <div className="mt-6 max-w-2xl rounded-2xl bg-white p-6 shadow-soft">
        <BlogPostForm action={createPost} />
      </div>
    </div>
  );
}
