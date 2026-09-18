import Link from "next/link";
import { Plus, Pencil, Newspaper } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { POST_STATUS_LABELS } from "@/lib/types";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import SavedBanner from "@/components/admin/SavedBanner";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { deletePost } from "@/app/admin/blog/actions";

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const posts = await getAllPosts();

  return (
    <div>
      <SavedBanner show={saved === "1"} label="Post saved successfully." />
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-maroon">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-4 py-2 text-sm font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(193,82,47,0.6)]"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <AdminEmptyState
          icon={Newspaper}
          title="No posts yet."
          actionHref="/admin/blog/new"
          actionLabel="Write your first one"
        />
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-sand bg-sand/30 text-xs font-semibold uppercase tracking-wide text-charcoal/60">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-sand last:border-none">
                  <td className="px-4 py-3 font-medium text-charcoal">{p.title}</td>
                  <td className="px-4 py-3 text-charcoal/70">{p.category}</td>
                  <td className="px-4 py-3 text-charcoal/70">{p.author}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        p.status === "published"
                          ? "rounded-full bg-terracotta/10 px-2.5 py-1 text-xs font-semibold text-terracotta"
                          : "rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-charcoal/60"
                      }
                    >
                      {POST_STATUS_LABELS[p.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/${p.id}/edit`}
                        className="flex items-center gap-1 rounded-full border border-sand px-3 py-1.5 text-xs font-semibold text-charcoal/70 transition hover:border-terracotta/50 hover:text-terracotta"
                      >
                        <Pencil size={13} /> Edit
                      </Link>
                      <ConfirmDeleteButton
                        action={deletePost.bind(null, p.id)}
                        confirmLabel={`Delete "${p.title}"?`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
