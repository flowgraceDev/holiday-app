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
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1020]/60 backdrop-blur-xl p-4 text-white shadow-2xl">
      <div className="relative">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 pr-8 text-sm text-white outline-none focus:border-white/20 focus:ring-2 focus:ring-white/10"
        >
          <option value="" className="bg-[#0B1020] text-white">
            All Status
          </option>
          <option value="new" className="bg-[#0B1020] text-white">
            New
          </option>
          <option value="contacted" className="bg-[#0B1020] text-white">
            Contacted
          </option>
          <option value="closed" className="bg-[#0B1020] text-white">
            Closed
          </option>
        </select>

        <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/40 text-xs">
          ▾
        </div>
      </div>

      <button
        onClick={reset}
        className="rounded-xl border border-white/10 bg-red-600 px-4 py-2 text-sm text-white/70 hover:bg-white/10 transition"
      >
        Reset
      </button>
    </div>
  );
}