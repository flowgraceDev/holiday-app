// app/admin/components/admin/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/dashboard/hero", label: "Hero" },
  { href: "/admin/dashboard/tours", label: "Tours" },
  { href: "/admin/dashboard/destinations", label: "Destinations" },
  { href: "/admin/dashboard/about", label: "About Us" },
  { href: "/admin/dashboard/contact", label: "Contact" },
  { href: "/admin/dashboard/leads", label: "Leads" },
  { href: "/admin/dashboard/messages", label: "Messages" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col">
      <div className="text-lg font-bold mb-6">Admin</div>
      <nav className="space-y-2">
        {links.map((l) => {
          const isActive = pathname.startsWith(l.href);

          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-3 py-2 rounded-lg text-sm ${
                isActive ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}