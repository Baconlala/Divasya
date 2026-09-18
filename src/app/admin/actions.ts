"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";
import { CampaignStatus, CampaignType } from "@/lib/types";

const CAMPAIGN_TYPES: CampaignType[] = ["temple", "seva", "gurukul", "animal_welfare"];
const CAMPAIGN_STATUSES: CampaignStatus[] = ["draft", "live", "paused"];

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

async function uploadCampaignImage(file: File): Promise<string> {
  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("campaign-images").upload(path, file);
  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const {
    data: { publicUrl },
  } = supabase.storage.from("campaign-images").getPublicUrl(path);
  return publicUrl;
}

function readCampaignFields(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const rawSlug = String(formData.get("slug") || "").trim();
  const type = String(formData.get("type") || "");
  const location = String(formData.get("location") || "").trim();
  const shortDescription = String(formData.get("short_description") || "").trim();
  const story = String(formData.get("story") || "").trim();
  const status = String(formData.get("status") || "draft");
  const goalRaw = String(formData.get("goal_amount") || "").trim();
  const raisedRaw = String(formData.get("raised_amount") || "0").trim();
  const donorCountRaw = String(formData.get("donor_count") || "0").trim();

  if (!title || !location || !shortDescription || !story) {
    throw new Error("Title, location, short description, and story are all required.");
  }
  if (!CAMPAIGN_TYPES.includes(type as CampaignType)) {
    throw new Error("Choose a valid campaign type.");
  }
  if (!CAMPAIGN_STATUSES.includes(status as CampaignStatus)) {
    throw new Error("Choose a valid status.");
  }

  const goalAmount = goalRaw ? Math.max(0, Math.floor(Number(goalRaw))) : null;
  const raisedAmount = Math.max(0, Math.floor(Number(raisedRaw)) || 0);
  const donorCount = Math.max(0, Math.floor(Number(donorCountRaw)) || 0);

  return {
    title,
    slug: slugify(rawSlug || title),
    type: type as CampaignType,
    location,
    short_description: shortDescription,
    story,
    status: status as CampaignStatus,
    goal_amount: goalAmount,
    raised_amount: raisedAmount,
    donor_count: donorCount,
  };
}

export async function createCampaign(formData: FormData) {
  const fields = readCampaignFields(formData);

  const coverFile = formData.get("cover_image") as File | null;
  if (!coverFile || coverFile.size === 0) {
    throw new Error("A cover image is required.");
  }
  const coverImage = await uploadCampaignImage(coverFile);

  const galleryFiles = formData.getAll("gallery_images") as File[];
  const gallery = await Promise.all(
    galleryFiles.filter((f) => f.size > 0).map((f) => uploadCampaignImage(f))
  );

  const supabase = await createClient();
  const { error } = await supabase.from("campaigns").insert({
    ...fields,
    cover_image: coverImage,
    gallery,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/campaigns");
  redirect("/admin");
}

export async function updateCampaign(id: string, formData: FormData) {
  const fields = readCampaignFields(formData);

  const coverFile = formData.get("cover_image") as File | null;
  const coverImage = coverFile && coverFile.size > 0 ? await uploadCampaignImage(coverFile) : null;

  const existingGallery = JSON.parse(String(formData.get("existing_gallery") || "[]")) as string[];
  const removedGallery = formData.getAll("remove_gallery") as string[];
  const keptGallery = existingGallery.filter((url) => !removedGallery.includes(url));

  const galleryFiles = formData.getAll("gallery_images") as File[];
  const newGallery = await Promise.all(
    galleryFiles.filter((f) => f.size > 0).map((f) => uploadCampaignImage(f))
  );

  const supabase = await createClient();
  const { error } = await supabase
    .from("campaigns")
    .update({
      ...fields,
      ...(coverImage ? { cover_image: coverImage } : {}),
      gallery: [...keptGallery, ...newGallery],
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/campaigns");
  revalidatePath(`/campaigns/${fields.slug}`);
  redirect("/admin");
}

export async function deleteCampaign(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("campaigns").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/campaigns");
}
