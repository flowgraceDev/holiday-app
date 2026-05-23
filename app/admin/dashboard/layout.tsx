// app/admin/dashboard/layout.tsx (or your current DashboardLayout file)

import { ReactNode } from "react";
import Sidebar from "@/app/admin/components/admin/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();

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
    <div className="fixed inset-0 z-50 flex bg-[#0B1020] text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-auto">
        <main className="p-6 bg-[#0B1020] min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}