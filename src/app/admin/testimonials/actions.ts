"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function readFields(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const location = String(formData.get("location") || "").trim();
  const quote = String(formData.get("quote") || "").trim();

  if (!name || !location || !quote) {
    throw new Error("Name, location, and quote are all required.");
  }

  return { name, location, quote };
}

export async function createTestimonial(formData: FormData) {
  const fields = readFields(formData);

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(fields);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/admin/testimonials?saved=1");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const fields = readFields(formData);

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(fields).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/admin/testimonials?saved=1");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
}
