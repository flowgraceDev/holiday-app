// app/admin/dashboard/contactus/_components/message-filters.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function ContactFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [status, setStatus] = useState(params.get("status") || "");

  useEffect(() => {
    const delay = setTimeout(() => {
      const query = new URLSearchParams();

      if (status) query.set("status", status);

      router.replace(`${pathname}${query.toString() ? `?${query}` : ""}`);
    }, 300);

    return () => clearTimeout(delay);
  }, [status, pathname, router]);

  const reset = () => {
    setStatus("");
    router.replace(pathname);
  };

  return (
    <div className="bg-white border rounded-2xl p-4 flex items-center gap-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm"
      >
        <option value="">All Status</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="closed">Closed</option>
      </select>

      <button
        onClick={reset}
        className="px-4 py-2 text-sm rounded-lg border bg-gray-100 hover:bg-gray-200"
      >
        Reset
      </button>
    </div>
  );
}