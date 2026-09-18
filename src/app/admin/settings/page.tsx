import { getSiteSettings } from "@/lib/settings";
import { updateSiteSettings } from "@/app/admin/settings/actions";
import SavedBanner from "@/components/admin/SavedBanner";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const settings = await getSiteSettings();

  return (
    <div>
      <SavedBanner show={saved === "1"} label="Settings saved successfully." />
      <h1 className="font-display text-2xl font-bold text-maroon">Site Settings</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        These four numbers appear in the impact stats strip on the homepage.
      </p>

      <form action={updateSiteSettings} className="mt-6 max-w-xl space-y-5 rounded-2xl bg-white p-6 shadow-soft">
        <div>
          <label htmlFor="stat_raised" className="text-sm font-semibold text-maroon">
            Amount raised
          </label>
          <input
            id="stat_raised"
            name="stat_raised"
            required
            defaultValue={settings.statRaised}
            placeholder="₹3.2 Cr+"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="stat_temples" className="text-sm font-semibold text-maroon">
            Temples &amp; trusts supported
          </label>
          <input
            id="stat_temples"
            name="stat_temples"
            required
            defaultValue={settings.statTemples}
            placeholder="58"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="stat_donors" className="text-sm font-semibold text-maroon">
            Donors
          </label>
          <input
            id="stat_donors"
            name="stat_donors"
            required
            defaultValue={settings.statDonors}
            placeholder="12,400+"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="stat_funds_percent" className="text-sm font-semibold text-maroon">
            Percentage of funds reaching the ground
          </label>
          <input
            id="stat_funds_percent"
            name="stat_funds_percent"
            required
            defaultValue={settings.statFundsPercent}
            placeholder="96%"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-6 py-3 text-sm font-bold text-cream shadow-[0_10px_24px_-10px_rgba(193,82,47,0.6)] transition hover:-translate-y-0.5"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
