import Link from "next/link";
import { Plus, Pencil, Quote } from "lucide-react";
import { getAllTestimonials } from "@/lib/testimonials";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import SavedBanner from "@/components/admin/SavedBanner";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { deleteTestimonial } from "@/app/admin/testimonials/actions";

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const testimonials = await getAllTestimonials();

  return (
    <div>
      <SavedBanner show={saved === "1"} label="Testimonial saved successfully." />
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-maroon">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-4 py-2 text-sm font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(193,82,47,0.6)]"
        >
          <Plus size={16} /> New Testimonial
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <AdminEmptyState
          icon={Quote}
          title="No testimonials yet."
          actionHref="/admin/testimonials/new"
          actionLabel="Add your first one"
        />
      ) : (
        <div className="mt-6 space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="rounded-2xl bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-maroon">
                    {t.name} <span className="font-normal text-charcoal/50">· {t.location}</span>
                  </p>
                  <p className="mt-1.5 text-sm text-charcoal/70">{t.quote}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/testimonials/${t.id}/edit`}
                    className="flex items-center gap-1 rounded-full border border-sand px-3 py-1.5 text-xs font-semibold text-charcoal/70 transition hover:border-terracotta/50 hover:text-terracotta"
                  >
                    <Pencil size={13} /> Edit
                  </Link>
                  <ConfirmDeleteButton
                    action={deleteTestimonial.bind(null, t.id)}
                    confirmLabel={`Delete this testimonial from ${t.name}?`}
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
