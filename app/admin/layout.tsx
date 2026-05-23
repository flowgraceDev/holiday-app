// app/admin/layout.tsx
import { ReactNode } from "react";

export default function AdminRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="admin-root">
      {children}
    </div>
  );
}