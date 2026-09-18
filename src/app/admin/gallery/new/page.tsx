import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GalleryItemForm from "@/components/admin/GalleryItemForm";
import { createGalleryItem } from "@/app/admin/gallery/actions";

export default function NewGalleryItemPage() {
  return (
    <div>
      <Link
        href="/admin/gallery"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
      >
        <ArrowLeft size={16} /> Back to Gallery
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-maroon">New Photo</h1>

      <div className="mt-6 max-w-2xl rounded-2xl bg-white p-6 shadow-soft">
        <GalleryItemForm action={createGalleryItem} />
      </div>
    </div>
  );
}
