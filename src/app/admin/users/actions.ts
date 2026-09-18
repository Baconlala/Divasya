"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function inviteAdmin(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  if (!email) throw new Error("An email address is required.");

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.inviteUserByEmail(email);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
}

export async function removeAdmin(userId: string) {
  const supabase = await createClient();
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  if (currentUser?.id === userId) {
    throw new Error("You can't remove your own admin account while signed in as it.");
  }

  const admin = createAdminClient();

  const { data: list, error: listError } = await admin.auth.admin.listUsers();
  if (listError) throw new Error(listError.message);
  if (list.users.length <= 1) {
    throw new Error("Can't remove the last remaining admin account.");
  }

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/users");
}
