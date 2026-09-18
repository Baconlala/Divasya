import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import GalleryItemForm from "@/components/admin/GalleryItemForm";
import { updateGalleryItem } from "@/app/admin/gallery/actions";
import { getGalleryItemById } from "@/lib/gallery";

export default async function EditGalleryItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getGalleryItemById(id);
  if (!item) notFound();

  return (
    <div>
      <Link
        href="/admin/gallery"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
      >
        <ArrowLeft size={16} /> Back to Gallery
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-maroon">Edit Photo</h1>

      <div className="mt-6 max-w-2xl rounded-2xl bg-white p-6 shadow-soft">
        <GalleryItemForm item={item} action={updateGalleryItem.bind(null, item.id)} />
      </div>
    </div>
  );
}
