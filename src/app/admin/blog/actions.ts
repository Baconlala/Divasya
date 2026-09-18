"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";
import { PostStatus } from "@/lib/types";

const POST_STATUSES: PostStatus[] = ["draft", "published"];

async function uploadImage(file: File): Promise<string> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `blog/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("campaign-images").upload(path, file);
  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from("campaign-images").getPublicUrl(path);
  return publicUrl;
}

function readPostFields(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const author = String(formData.get("author") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const status = String(formData.get("status") || "draft");

  if (!title || !excerpt || !content || !author || !category) {
    throw new Error("Title, excerpt, content, author, and category are all required.");
  }
  if (!POST_STATUSES.includes(status as PostStatus)) {
    throw new Error("Choose a valid status.");
  }

  return {
    title,
    slug: slugify(rawSlug || title),
    excerpt,
    content,
    author,
    category,
    status: status as PostStatus,
  };
}

export async function createPost(formData: FormData) {
  const fields = readPostFields(formData);

  const coverFile = formData.get("cover_image") as File | null;
  if (!coverFile || coverFile.size === 0) {
    throw new Error("A cover image is required.");
  }
  const coverImage = await uploadImage(coverFile);

  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").insert({
    ...fields,
    cover_image: coverImage,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/blog");
  redirect("/admin/blog?saved=1");
}

export async function updatePost(id: string, formData: FormData) {
  const fields = readPostFields(formData);

  const coverFile = formData.get("cover_image") as File | null;
  const coverImage = coverFile && coverFile.size > 0 ? await uploadImage(coverFile) : null;

  const supabase = await createClient();
  const { error } = await supabase
    .from("blog_posts")
    .update({
      ...fields,
      ...(coverImage ? { cover_image: coverImage } : {}),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/blog");
  revalidatePath(`/blog/${fields.slug}`);
  redirect("/admin/blog?saved=1");
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/blog");
}
