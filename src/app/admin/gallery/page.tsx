import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, Image as ImageIcon } from "lucide-react";
import { getAllGalleryItems } from "@/lib/gallery";
import { CAMPAIGN_TYPE_LABELS } from "@/lib/types";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import SavedBanner from "@/components/admin/SavedBanner";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { deleteGalleryItem } from "@/app/admin/gallery/actions";

export default async function AdminGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const items = await getAllGalleryItems();

  return (
    <div>
      <SavedBanner show={saved === "1"} label="Photo saved successfully." />
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-maroon">Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-4 py-2 text-sm font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(193,82,47,0.6)]"
        >
          <Plus size={16} /> New Photo
        </Link>
      </div>

      {items.length === 0 ? (
        <AdminEmptyState
          icon={ImageIcon}
          title="No gallery photos yet."
          actionHref="/admin/gallery/new"
          actionLabel="Add your first one"
        />
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl bg-white shadow-soft">
              <div className="relative h-40 w-full">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-terracotta">
                  {CAMPAIGN_TYPE_LABELS[item.category]}
                </span>
                <h3 className="mt-1 font-display text-sm font-bold text-maroon">{item.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-charcoal/60">{item.caption}</p>
                <div className="mt-3 flex items-center gap-2">
                  <Link
                    href={`/admin/gallery/${item.id}/edit`}
                    className="flex items-center gap-1 rounded-full border border-sand px-3 py-1.5 text-xs font-semibold text-charcoal/70 transition hover:border-terracotta/50 hover:text-terracotta"
                  >
                    <Pencil size={13} /> Edit
                  </Link>
                  <ConfirmDeleteButton
                    action={deleteGalleryItem.bind(null, item.id)}
                    confirmLabel={`Delete "${item.title}"?`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
