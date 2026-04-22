// app/admin/dashboard/layout.tsx
import { ReactNode } from "react";
import Sidebar from "@/app/admin/components/admin/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}