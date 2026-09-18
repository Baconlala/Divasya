"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitContactMessage } from "@/app/(site)/contact/actions";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await submitContactMessage(new FormData(e.currentTarget));
      setSubmitted(true);
    } catch {
      setError("Something went wrong sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-premium">
        <CheckCircle2 className="text-terracotta" size={40} />
        <h3 className="mt-4 font-display text-lg font-bold text-maroon">Message received</h3>
        <p className="mt-2 text-sm text-charcoal/65">
          Thank you for reaching out — our team will get back to you within 2 business
          days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-6 shadow-premium">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold text-maroon">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            placeholder="Your name"
            className="mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold text-maroon">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="text-sm font-semibold text-maroon">
          Subject
        </label>
        <input
          id="contact-subject"
          name="subject"
          required
          placeholder="What's this about?"
          className="mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-semibold text-maroon">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Tell us more..."
          className="mt-1.5 w-full resize-none rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-linear-to-r from-terracotta to-terracotta-dark py-3 text-sm font-bold text-cream shadow-[0_10px_24px_-10px_rgba(193,82,47,0.6)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(193,82,47,0.75)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {loading ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
