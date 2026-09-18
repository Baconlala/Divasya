import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { updateTestimonial } from "@/app/admin/testimonials/actions";
import { getTestimonialById } from "@/lib/testimonials";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await getTestimonialById(id);
  if (!testimonial) notFound();

  return (
    <div>
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
      >
        <ArrowLeft size={16} /> Back to Testimonials
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-maroon">Edit Testimonial</h1>

      <div className="mt-6 max-w-xl rounded-2xl bg-white p-6 shadow-soft">
        <TestimonialForm
          testimonial={testimonial}
          action={updateTestimonial.bind(null, testimonial.id)}
        />
      </div>
    </div>
  );
}
