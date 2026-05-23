// app/admin/login/layout.tsx
import { ReactNode } from "react";

export default function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#050816] text-white">
      {children}
    </div>
  );
}