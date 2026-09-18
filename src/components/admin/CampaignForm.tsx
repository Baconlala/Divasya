"use client";

import { useState } from "react";
import Image from "next/image";
import { slugify } from "@/lib/slugify";
import { CAMPAIGN_STATUS_LABELS, CAMPAIGN_TYPE_LABELS, Campaign } from "@/lib/types";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10";

export default function CampaignForm({
  campaign,
  action,
}: {
  campaign?: Campaign;
  action: (formData: FormData) => void;
}) {
  const [title, setTitle] = useState(campaign?.title ?? "");
  const [slug, setSlug] = useState(campaign?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);
  const [removedGallery, setRemovedGallery] = useState<string[]>([]);

  return (
    <form action={action} className="space-y-5">
      <div>
        <label htmlFor="title" className="text-sm font-semibold text-maroon">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="slug" className="text-sm font-semibold text-maroon">
          URL slug
        </label>
        <input
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setSlugTouched(true);
          }}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-charcoal/50">divasya.org/campaigns/{slug || "…"}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="type" className="text-sm font-semibold text-maroon">
            Type
          </label>
          <select id="type" name="type" required defaultValue={campaign?.type ?? ""} className={inputClass}>
            <option value="" disabled>
              Select a type
            </option>
            {Object.entries(CAMPAIGN_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="text-sm font-semibold text-maroon">
            Location
          </label>
          <input
            id="location"
            name="location"
            required
            defaultValue={campaign?.location}
            placeholder="City, State"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="short_description" className="text-sm font-semibold text-maroon">
          Short description
        </label>
        <textarea
          id="short_description"
          name="short_description"
          required
          rows={2}
          defaultValue={campaign?.shortDescription}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-charcoal/50">Shown on campaign cards. 1-2 sentences.</p>
      </div>

      <div>
        <label htmlFor="story" className="text-sm font-semibold text-maroon">
          Full story
        </label>
        <textarea
          id="story"
          name="story"
          required
          rows={8}
          defaultValue={campaign?.story.join("\n\n")}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-charcoal/50">
          Separate paragraphs with a blank line — each becomes its own paragraph on the page.
        </p>
      </div>

      <div>
        <label htmlFor="cover_image" className="text-sm font-semibold text-maroon">
          Cover image {campaign ? "(leave empty to keep current)" : ""}
        </label>
        {campaign?.coverImage && (
          <div className="relative mt-2 h-32 w-48 overflow-hidden rounded-xl">
            <Image src={campaign.coverImage} alt="Current cover" fill className="object-cover" />
          </div>
        )}
        <input
          id="cover_image"
          name="cover_image"
          type="file"
          accept="image/*"
          required={!campaign}
          className="mt-2 block w-full text-sm text-charcoal/70 file:mr-4 file:rounded-full file:border-0 file:bg-sand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-maroon"
        />
      </div>

      {campaign && campaign.gallery.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-maroon">Current gallery photos</p>
          <input type="hidden" name="existing_gallery" value={JSON.stringify(campaign.gallery)} />
          <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {campaign.gallery.map((src) => (
              <label key={src} className="relative block h-24 cursor-pointer overflow-hidden rounded-xl">
                <Image src={src} alt="Gallery photo" fill className="object-cover" />
                <input
                  type="checkbox"
                  name="remove_gallery"
                  value={src}
                  checked={removedGallery.includes(src)}
                  onChange={(e) =>
                    setRemovedGallery((prev) =>
                      e.target.checked ? [...prev, src] : prev.filter((s) => s !== src)
                    )
                  }
                  className="absolute right-1.5 top-1.5 h-4 w-4"
                />
                {removedGallery.includes(src) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-maroon-dark/70 text-xs font-bold text-cream">
                    Removing
                  </div>
                )}
              </label>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-charcoal/50">Check a photo to remove it on save.</p>
        </div>
      )}

      <div>
        <label htmlFor="gallery_images" className="text-sm font-semibold text-maroon">
          Add gallery photos
        </label>
        <input
          id="gallery_images"
          name="gallery_images"
          type="file"
          accept="image/*"
          multiple
          className="mt-2 block w-full text-sm text-charcoal/70 file:mr-4 file:rounded-full file:border-0 file:bg-sand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-maroon"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="goal_amount" className="text-sm font-semibold text-maroon">
            Goal amount (₹)
          </label>
          <input
            id="goal_amount"
            name="goal_amount"
            type="number"
            min={0}
            defaultValue={campaign?.goalAmount ?? ""}
            placeholder="Leave blank for no fixed goal"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="raised_amount" className="text-sm font-semibold text-maroon">
            Raised so far (₹)
          </label>
          <input
            id="raised_amount"
            name="raised_amount"
            type="number"
            min={0}
            defaultValue={campaign?.raisedAmount ?? 0}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="donor_count" className="text-sm font-semibold text-maroon">
            Donor count
          </label>
          <input
            id="donor_count"
            name="donor_count"
            type="number"
            min={0}
            defaultValue={campaign?.donorCount ?? 0}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="status" className="text-sm font-semibold text-maroon">
          Status
        </label>
        <select
          id="status"
          name="status"
          required
          defaultValue={campaign?.status ?? "draft"}
          className={inputClass}
        >
          {Object.entries(CAMPAIGN_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-charcoal/50">
          Only &quot;Live&quot; campaigns are visible to donors on the public site.
        </p>
      </div>

      <button
        type="submit"
        className="rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-6 py-3 text-sm font-bold text-cream shadow-[0_10px_24px_-10px_rgba(193,82,47,0.6)] transition hover:-translate-y-0.5"
      >
        {campaign ? "Save Changes" : "Create Campaign"}
      </button>
    </form>
  );
}
