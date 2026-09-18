"use client";

import { Testimonial } from "@/lib/types";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10";

export default function TestimonialForm({
  testimonial,
  action,
}: {
  testimonial?: Testimonial;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-maroon">
            Name
          </label>
          <input id="name" name="name" required defaultValue={testimonial?.name} className={inputClass} />
        </div>
        <div>
          <label htmlFor="location" className="text-sm font-semibold text-maroon">
            Location
          </label>
          <input
            id="location"
            name="location"
            required
            defaultValue={testimonial?.location}
            placeholder="City, State"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote" className="text-sm font-semibold text-maroon">
          Quote
        </label>
        <textarea
          id="quote"
          name="quote"
          required
          rows={4}
          defaultValue={testimonial?.quote}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-6 py-3 text-sm font-bold text-cream shadow-[0_10px_24px_-10px_rgba(193,82,47,0.6)] transition hover:-translate-y-0.5"
      >
        {testimonial ? "Save Changes" : "Add Testimonial"}
      </button>
    </form>
  );
}
