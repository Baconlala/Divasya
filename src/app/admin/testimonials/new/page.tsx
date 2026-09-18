import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { createTestimonial } from "@/app/admin/testimonials/actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <Link
        href="/admin/testimonials"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark"
      >
        <ArrowLeft size={16} /> Back to Testimonials
      </Link>
      <h1 className="mt-4 font-display text-2xl font-bold text-maroon">New Testimonial</h1>

      <div className="mt-6 max-w-xl rounded-2xl bg-white p-6 shadow-soft">
        <TestimonialForm action={createTestimonial} />
      </div>
    </div>
  );
}
