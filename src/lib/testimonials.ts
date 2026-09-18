import { createClient } from "@/lib/supabase/server";
import { Testimonial } from "@/lib/types";

interface TestimonialRow {
  id: string;
  name: string;
  location: string;
  quote: string;
  created_at: string;
}

function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    quote: row.quote,
    createdAt: row.created_at,
  };
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapTestimonial);
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapTestimonial(data) : null;
}
