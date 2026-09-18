import { Mail, MailOpen } from "lucide-react";
import { getAllMessages } from "@/lib/messages";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import AdminEmptyState from "@/components/admin/AdminEmptyState";
import { deleteMessage, markMessageRead } from "@/app/admin/messages/actions";

export default async function AdminMessagesPage() {
  const messages = await getAllMessages();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-maroon">Messages</h1>
      <p className="mt-1 text-sm text-charcoal/60">Submissions from the site&apos;s contact form.</p>

      {messages.length === 0 ? (
        <AdminEmptyState icon={Mail} title="No messages yet." />
      ) : (
        <div className="mt-6 space-y-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl bg-white p-5 shadow-soft ${m.status === "new" ? "ring-1 ring-terracotta/30" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {m.status === "new" ? (
                      <Mail size={14} className="shrink-0 text-terracotta" />
                    ) : (
                      <MailOpen size={14} className="shrink-0 text-charcoal/40" />
                    )}
                    <p className="font-semibold text-maroon">{m.subject}</p>
                  </div>
                  <p className="mt-1 text-sm text-charcoal/60">
                    {m.name} · {m.email}
                  </p>
                  <p className="mt-2 text-sm text-charcoal/75">{m.message}</p>
                  <p className="mt-2 text-xs text-charcoal/40">
                    {new Date(m.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {m.status === "new" && (
                    <form action={markMessageRead.bind(null, m.id)}>
                      <button
                        type="submit"
                        className="rounded-full border border-sand px-3 py-1.5 text-xs font-semibold text-charcoal/70 transition hover:border-terracotta/50 hover:text-terracotta"
                      >
                        Mark read
                      </button>
                    </form>
                  )}
                  <ConfirmDeleteButton
                    action={deleteMessage.bind(null, m.id)}
                    confirmLabel="Delete this message?"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
