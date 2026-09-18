import { createClient } from "@/lib/supabase/server";
import { Campaign, CampaignStatus, CampaignType } from "@/lib/types";

interface CampaignRow {
  id: string;
  title: string;
  slug: string;
  type: CampaignType;
  location: string;
  short_description: string;
  story: string;
  cover_image: string;
  gallery: string[] | null;
  goal_amount: number | null;
  raised_amount: number;
  donor_count: number;
  status: CampaignStatus;
  created_at: string;
}

function mapCampaign(row: CampaignRow): Campaign {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    type: row.type,
    location: row.location,
    shortDescription: row.short_description,
    story: row.story
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
    coverImage: row.cover_image,
    gallery: row.gallery ?? [],
    goalAmount: row.goal_amount,
    raisedAmount: Number(row.raised_amount),
    donorCount: row.donor_count,
    status: row.status,
    createdAt: row.created_at,
  };
}

// Row Level Security decides what comes back here: anonymous visitors only
// ever see status = 'live' campaigns, a signed-in admin sees everything.
// There is no separate "admin" query — the database enforces the split.
export async function getAllCampaigns(): Promise<Campaign[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapCampaign);
}

export async function getCampaignBySlug(slug: string): Promise<Campaign | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data ? mapCampaign(data) : null;
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data ? mapCampaign(data) : null;
}

export async function getCampaignsByType(type: string): Promise<Campaign[]> {
  const campaigns = (await getAllCampaigns()).filter((c) => c.status === "live");
  if (type === "all") return campaigns;
  return campaigns.filter((c) => c.type === type);
}

export async function getFeaturedCampaigns(count = 3): Promise<Campaign[]> {
  const campaigns = await getAllCampaigns();
  return campaigns.filter((c) => c.status === "live").slice(0, count);
}
