// app/admin/dashboard/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import LogoutButton from "./logout-button";

export default async function AdminDashboard() {
  const cookieStore = await  cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== "vinn4200@gmail.com") {
    redirect("/admin/login");
  }

  return (
    <div className="p-6 text-xl font-semibold">
      Admin Dashboard
      {/* <LogoutButton /> */}
    </div>
  );
}