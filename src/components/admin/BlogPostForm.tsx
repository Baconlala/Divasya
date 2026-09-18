"use client";

import { useState } from "react";
import Image from "next/image";
import { slugify } from "@/lib/slugify";
import { BlogPost, POST_STATUS_LABELS } from "@/lib/types";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10";

export default function BlogPostForm({
  post,
  action,
}: {
  post?: BlogPost;
  action: (formData: FormData) => void;
}) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(false);

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
        <p className="mt-1 text-xs text-charcoal/50">divasya.org/blog/{slug || "…"}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="author" className="text-sm font-semibold text-maroon">
            Author
          </label>
          <input id="author" name="author" required defaultValue={post?.author} className={inputClass} />
        </div>
        <div>
          <label htmlFor="category" className="text-sm font-semibold text-maroon">
            Category
          </label>
          <input
            id="category"
            name="category"
            required
            defaultValue={post?.category}
            placeholder="e.g. Transparency, Field Notes"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="text-sm font-semibold text-maroon">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-charcoal/50">Shown on the blog listing card. 1-2 sentences.</p>
      </div>

      <div>
        <label htmlFor="content" className="text-sm font-semibold text-maroon">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={10}
          defaultValue={post?.content.join("\n\n")}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-charcoal/50">
          Separate paragraphs with a blank line — each becomes its own paragraph on the page.
        </p>
      </div>

      <div>
        <label htmlFor="cover_image" className="text-sm font-semibold text-maroon">
          Cover image {post ? "(leave empty to keep current)" : ""}
        </label>
        {post?.coverImage && (
          <div className="relative mt-2 h-32 w-48 overflow-hidden rounded-xl">
            <Image src={post.coverImage} alt="Current cover" fill className="object-cover" />
          </div>
        )}
        <input
          id="cover_image"
          name="cover_image"
          type="file"
          accept="image/*"
          required={!post}
          className="mt-2 block w-full text-sm text-charcoal/70 file:mr-4 file:rounded-full file:border-0 file:bg-sand file:px-4 file:py-2 file:text-sm file:font-semibold file:text-maroon"
        />
      </div>

      <div>
        <label htmlFor="status" className="text-sm font-semibold text-maroon">
          Status
        </label>
        <select id="status" name="status" required defaultValue={post?.status ?? "draft"} className={inputClass}>
          {Object.entries(POST_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-charcoal/50">
          Only &quot;Published&quot; posts are visible on the public blog.
        </p>
      </div>

      <button
        type="submit"
        className="rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-6 py-3 text-sm font-bold text-cream shadow-[0_10px_24px_-10px_rgba(193,82,47,0.6)] transition hover:-translate-y-0.5"
      >
        {post ? "Save Changes" : "Create Post"}
      </button>
    </form>
  );
}
