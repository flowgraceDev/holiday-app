// lib/auth/admin.ts
import { supabaseAdmin } from "../supabase/connection/admin";

export async function verifyAdmin(email: string, password: string) {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) throw error;

  const user = data.users.find((u) => u.email === email);

  if (!user) return null;

  return user;
}