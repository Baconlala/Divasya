"use client";

import { Trash2 } from "lucide-react";

export default function ConfirmDeleteButton({
  action,
  confirmLabel,
}: {
  action: () => Promise<void>;
  confirmLabel: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`${confirmLabel} This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-1 rounded-full border border-sand px-3 py-1.5 text-xs font-semibold text-charcoal/60 transition hover:border-red-300 hover:text-red-500"
      >
        <Trash2 size={13} /> Delete
      </button>
    </form>
  );
}
