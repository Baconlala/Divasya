import { createClient } from "@/lib/supabase/server";
import { SiteSettings } from "@/lib/types";

interface SiteSettingsRow {
  stat_raised: string;
  stat_temples: string;
  stat_donors: string;
  stat_funds_percent: string;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("stat_raised, stat_temples, stat_donors, stat_funds_percent")
    .eq("id", true)
    .single<SiteSettingsRow>();

  if (error) throw error;
  return {
    statRaised: data.stat_raised,
    statTemples: data.stat_temples,
    statDonors: data.stat_donors,
    statFundsPercent: data.stat_funds_percent,
  };
}
