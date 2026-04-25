// app/admin/dashboard/leads/_components/leads-filters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function LeadsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams();

      if (search.trim()) params.set("search", search.trim());
      if (status) params.set("status", status);
      if (from) params.set("from", from);
      if (to) params.set("to", to);

      const query = params.toString();
      router.push(`/admin/dashboard/leads${query ? `?${query}` : ""}`);
    }, 400);

    return () => clearTimeout(delay);
  }, [search, status, from, to, router]);

  const handleReset = () => {
    setSearch("");
    setStatus("");
    setFrom("");
    setTo("");
    router.push("/admin/dashboard/leads");
  };

  return (
    <div className="bg-white border rounded-2xl p-4 flex flex-wrap gap-3 items-center">
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm w-64"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm"
      >
        <option value="">All Status</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="qualified">Qualified</option>
        <option value="converted">Converted</option>
        <option value="closed">Closed</option>
      </select>

      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm"
      />

      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm"
      />

      <button
        onClick={handleReset}
        className="px-4 py-2 text-sm rounded-lg border bg-gray-100 hover:bg-gray-200"
      >
        Reset
      </button>
    </div>
  );
}