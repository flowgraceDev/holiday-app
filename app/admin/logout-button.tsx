// app/admin/dashboard/logout-button.tsx
"use client";

import { createClient } from "@/app/lib/supabase/connection/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  async function onLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <button
      onClick={onLogout}
      className="bg-red-500 text-white px-4 py-2"
    >
      Logout
    </button>
  );
}