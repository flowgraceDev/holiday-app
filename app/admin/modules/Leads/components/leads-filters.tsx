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
    <div className="bg-[#0B1020]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-wrap gap-3 items-center text-white">
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-white/10 bg-white/5 backdrop-blur-md rounded-lg px-3 py-2 text-sm w-64 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-white/10 bg-white/5 backdrop-blur-md rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
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
        className="border border-white/10 bg-white/5 backdrop-blur-md rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
      />

      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="border border-white/10 bg-white/5 backdrop-blur-md rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
      />

      <button
        onClick={handleReset}
        className="px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/10 text-white hover:bg-white/15 backdrop-blur-md"
      >
        Reset
      </button>
    </div>
  );
}