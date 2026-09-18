import { CheckCircle2 } from "lucide-react";

export default function SavedBanner({ show, label = "Saved successfully." }: { show: boolean; label?: string }) {
  if (!show) return null;

  return (
    <div className="mb-4 flex items-center gap-2 rounded-xl bg-terracotta/10 px-4 py-3 text-sm font-semibold text-terracotta">
      <CheckCircle2 size={16} /> {label}
    </div>
  );
}
