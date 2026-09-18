import { UserPlus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import { inviteAdmin, removeAdmin } from "@/app/admin/users/actions";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.listUsers();
  if (error) throw new Error(error.message);

  const users = data.users.sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-maroon">Admins</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        Anyone signed in here can manage the whole site — only invite people you trust.
        Public signup is disabled, so this is the only way new admin accounts get created.
      </p>

      <form
        action={inviteAdmin}
        className="mt-6 flex max-w-md items-end gap-3 rounded-2xl bg-white p-5 shadow-soft"
      >
        <div className="flex-1">
          <label htmlFor="email" className="text-sm font-semibold text-maroon">
            Invite by email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="colleague@example.com"
            className="mt-1.5 w-full rounded-xl border border-sand px-4 py-2.5 text-sm outline-none transition focus:border-terracotta focus:ring-4 focus:ring-terracotta/10"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-terracotta to-terracotta-dark px-4 py-2.5 text-sm font-semibold text-cream shadow-[0_8px_20px_-8px_rgba(193,82,47,0.6)]"
        >
          <UserPlus size={16} /> Invite
        </button>
      </form>
      <p className="mt-2 text-xs text-charcoal/45">
        Sends a Supabase invite email with a link to set a password. Supabase&apos;s free tier
        sends very few emails per hour — if it doesn&apos;t arrive, create the user directly
        from the Supabase dashboard instead (Authentication → Users → Add user).
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-soft">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-sand bg-sand/30 text-xs font-semibold uppercase tracking-wide text-charcoal/60">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Last sign-in</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-sand last:border-none">
                <td className="px-4 py-3 font-medium text-charcoal">
                  {u.email}
                  {u.id === currentUser?.id && (
                    <span className="ml-2 rounded-full bg-sand px-2 py-0.5 text-xs font-semibold text-charcoal/60">
                      You
                    </span>
                  )}
                  {!u.email_confirmed_at && (
                    <span className="ml-2 rounded-full bg-gold/20 px-2 py-0.5 text-xs font-semibold text-maroon">
                      Invited — pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-charcoal/70">
                  {new Date(u.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-charcoal/70">
                  {u.last_sign_in_at
                    ? new Date(u.last_sign_in_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Never"}
                </td>
                <td className="px-4 py-3">
                  {u.id !== currentUser?.id && (
                    <div className="flex justify-end">
                      <ConfirmDeleteButton
                        action={removeAdmin.bind(null, u.id)}
                        confirmLabel={`Remove admin access for ${u.email}?`}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
