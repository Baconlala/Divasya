import type { ReactNode } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Logo from "@/components/Logo";
import { signOut } from "@/app/admin/actions";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-sand/40">
      <header className="border-b border-sand bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="font-display text-lg font-bold text-maroon">Divasya Admin</span>
          </Link>

          {user && (
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-charcoal/60 sm:inline">{user.email}</span>
              <form action={signOut}>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-full border border-sand px-3.5 py-1.5 text-sm font-semibold text-charcoal/70 transition hover:border-terracotta/50 hover:text-terracotta"
                >
                  <LogOut size={14} /> Log out
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
