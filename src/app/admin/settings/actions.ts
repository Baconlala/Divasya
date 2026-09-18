"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateSiteSettings(formData: FormData) {
  const statRaised = String(formData.get("stat_raised") || "").trim();
  const statTemples = String(formData.get("stat_temples") || "").trim();
  const statDonors = String(formData.get("stat_donors") || "").trim();
  const statFundsPercent = String(formData.get("stat_funds_percent") || "").trim();

  if (!statRaised || !statTemples || !statDonors || !statFundsPercent) {
    throw new Error("All four stats are required.");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({
      stat_raised: statRaised,
      stat_temples: statTemples,
      stat_donors: statDonors,
      stat_funds_percent: statFundsPercent,
    })
    .eq("id", true);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  redirect("/admin/settings?saved=1");
}
