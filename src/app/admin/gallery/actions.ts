"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CampaignType } from "@/lib/types";

const CAMPAIGN_TYPES: CampaignType[] = ["temple", "seva", "gurukul", "animal_welfare"];

async function uploadImage(file: File): Promise<string> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `gallery/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("campaign-images").upload(path, file);
  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from("campaign-images").getPublicUrl(path);
  return publicUrl;
}

function readFields(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const category = String(formData.get("category") || "");
  const caption = String(formData.get("caption") || "").trim();

  if (!title || !caption) {
    throw new Error("Title and caption are required.");
  }
  if (!CAMPAIGN_TYPES.includes(category as CampaignType)) {
    throw new Error("Choose a valid category.");
  }

  return { title, category: category as CampaignType, caption };
}

export async function createGalleryItem(formData: FormData) {
  const fields = readFields(formData);

  const imageFile = formData.get("image") as File | null;
  if (!imageFile || imageFile.size === 0) {
    throw new Error("An image is required.");
  }
  const image = await uploadImage(imageFile);

  const beforeFile = formData.get("before_image") as File | null;
  const beforeImage = beforeFile && beforeFile.size > 0 ? await uploadImage(beforeFile) : null;

  const supabase = await createClient();
  const { error } = await supabase.from("gallery_items").insert({
    ...fields,
    image,
    before_image: beforeImage,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/gallery");
  redirect("/admin/gallery?saved=1");
}

export async function updateGalleryItem(id: string, formData: FormData) {
  const fields = readFields(formData);

  const imageFile = formData.get("image") as File | null;
  const image = imageFile && imageFile.size > 0 ? await uploadImage(imageFile) : null;

  const beforeFile = formData.get("before_image") as File | null;
  const removeBefore = formData.get("remove_before_image") === "on";
  const beforeImage = beforeFile && beforeFile.size > 0 ? await uploadImage(beforeFile) : null;

  const supabase = await createClient();
  const { error } = await supabase
    .from("gallery_items")
    .update({
      ...fields,
      ...(image ? { image } : {}),
      ...(beforeImage ? { before_image: beforeImage } : removeBefore ? { before_image: null } : {}),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/gallery");
  redirect("/admin/gallery?saved=1");
}

export async function deleteGalleryItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/gallery");
}
