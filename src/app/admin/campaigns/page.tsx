import Link from "next/link";
import { Plus, Pencil, LayoutGrid } from "lucide-react";
import { getAllCampaigns } from "@/lib/campaigns";
import { formatINR } from "@/lib/format";
import { CAMPAIGN_STATUS_LABELS, CAMPAIGN_TYPE_LABELS } from "@/lib/types";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import SavedBanner from "@/components/admin/SavedBanner";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { deleteCampaign } from "@/app/admin/actions";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const campaigns = await getAllCampaigns();

  return (
    <div>
      <SavedBanner show={saved === "1"} label="Campaign saved successfully." />
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-maroon">Campaigns</h1>
        <Link
          href="/admin/campaigns/new"
          className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-4 py-2 text-sm font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(193,82,47,0.6)]"
        >
          <Plus size={16} /> New Campaign
        </Link>
      </div>

      {campaigns.length === 0 ? (
        <AdminEmptyState
          icon={LayoutGrid}
          title="No campaigns yet."
          actionHref="/admin/campaigns/new"
          actionLabel="Create your first one"
        />
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-sand bg-sand/30 text-xs font-semibold uppercase tracking-wide text-charcoal/60">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Raised</th>
                <th className="px-4 py-3">Donors</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => (
                <tr key={c.id} className="border-b border-sand last:border-none">
                  <td className="px-4 py-3 font-medium text-charcoal">{c.title}</td>
                  <td className="px-4 py-3 text-charcoal/70">{CAMPAIGN_TYPE_LABELS[c.type]}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        c.status === "live"
                          ? "rounded-full bg-terracotta/10 px-2.5 py-1 text-xs font-semibold text-terracotta"
                          : "rounded-full bg-sand px-2.5 py-1 text-xs font-semibold text-charcoal/60"
                      }
                    >
                      {CAMPAIGN_STATUS_LABELS[c.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">{formatINR(c.raisedAmount)}</td>
                  <td className="px-4 py-3 text-charcoal/70">{c.donorCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/campaigns/${c.id}/edit`}
                        className="flex items-center gap-1 rounded-full border border-sand px-3 py-1.5 text-xs font-semibold text-charcoal/70 transition hover:border-terracotta/50 hover:text-terracotta"
                      >
                        <Pencil size={13} /> Edit
                      </Link>
                      <ConfirmDeleteButton
                        action={deleteCampaign.bind(null, c.id)}
                        confirmLabel={`Delete "${c.title}"?`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
