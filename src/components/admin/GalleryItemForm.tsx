"use client";

import { useState } from "react";
import Image from "next/image";
import { CAMPAIGN_TYPE_LABELS, GalleryItem } from "@/lib/types";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10";
const fileClass =
  "mt-2 block w-full text-sm text-charcoal/70 file:mr-4 file:rounded-full file:border-0 file:bg-sand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-maroon";

export default function GalleryItemForm({
  item,
  action,
}: {
  item?: GalleryItem;
  action: (formData: FormData) => void;
}) {
  const [removeBefore, setRemoveBefore] = useState(false);

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="title" className="text-sm font-semibold text-maroon">
          Title
        </label>
        <input id="title" name="title" required defaultValue={item?.title} className={inputClass} />
      </div>

      <div>
        <label htmlFor="category" className="text-sm font-semibold text-maroon">
          Category
        </label>
        <select id="category" name="category" required defaultValue={item?.category ?? ""} className={inputClass}>
          <option value="" disabled>
            Select a category
          </option>
          {Object.entries(CAMPAIGN_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="caption" className="text-sm font-semibold text-maroon">
          Caption
        </label>
        <textarea id="caption" name="caption" required rows={2} defaultValue={item?.caption} className={inputClass} />
      </div>

      <div>
        <label htmlFor="image" className="text-sm font-semibold text-maroon">
          Photo {item ? "(leave empty to keep current)" : ""}
        </label>
        {item?.image && (
          <div className="relative mt-2 h-32 w-48 overflow-hidden rounded-xl">
            <Image src={item.image} alt="Current photo" fill className="object-cover" />
          </div>
        )}
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required={!item}
          className={fileClass}
        />
        <p className="mt-1 text-xs text-charcoal/50">
          If you add a &quot;before&quot; photo below, this becomes the &quot;after&quot; shot in a before/after card.
        </p>
      </div>

      <div>
        <label htmlFor="before_image" className="text-sm font-semibold text-maroon">
          Before photo (optional)
        </label>
        {item?.beforeImage && !removeBefore && (
          <div className="mt-2 flex items-center gap-3">
            <div className="relative h-24 w-36 overflow-hidden rounded-xl">
              <Image src={item.beforeImage} alt="Current before photo" fill className="object-cover" />
            </div>
            <label className="flex items-center gap-1.5 text-xs text-charcoal/60">
              <input
                type="checkbox"
                name="remove_before_image"
                checked={removeBefore}
                onChange={(e) => setRemoveBefore(e.target.checked)}
              />
              Remove before photo
            </label>
          </div>
        )}
        <input id="before_image" name="before_image" type="file" accept="image/*" className={fileClass} />
      </div>

      <button
        type="submit"
        className="rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-6 py-3 text-sm font-bold text-cream shadow-[0_10px_24px_-10px_rgba(193,82,47,0.6)] transition hover:-translate-y-0.5"
      >
        {item ? "Save Changes" : "Add Photo"}
      </button>
    </form>
  );
}
