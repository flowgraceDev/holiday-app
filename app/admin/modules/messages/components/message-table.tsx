"use client";

import { useTransition, useEffect, useState } from "react";
import { updateContactStatus } from "@/app/admin/modules/messages/actions";

type Contact = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  subject?: string;
  arrival_date?: string;
  departure_date?: string;
  message: string;
  status: string;
  created_at: string;
};

const statuses = ["new", "contacted", "closed"];

const statusStyles: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-200 border border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-200 border border-yellow-500/20",
  closed: "bg-white/5 text-white/60 border border-white/10",
};

export default function ContactsTable({ leads }: { leads: Contact[] }) {
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleStatusChange = (id: string, status: string) => {
    startTransition(() => {
      updateContactStatus(id, status);
    });
  };

  const formatDate = (date?: string) => {
    if (!mounted || !date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0B1020]/60 backdrop-blur-2xl shadow-2xl text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-white/5 backdrop-blur-xl">
        <div>
          <h2 className="text-lg font-semibold text-white">
            All Messages
          </h2>

          <p className="text-sm text-white/50 mt-1">
            Manage customer travel enquiries
          </p>
        </div>

        <span className="rounded-full bg-white/10 border border-white/10 px-4 py-2 text-sm font-medium text-white/70">
          {leads?.length || 0} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-white/5">
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white/50">
                Traveler
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white/50">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white/50">
                Travel Dates
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white/50">
                Subject
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white/50">
                Message
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white/50">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-white/50">
                Created
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {leads?.map((lead) => (
              <tr
                key={lead.id}
                className="transition-all duration-200 hover:bg-white/5"
              >
                <td className="px-6 py-5 align-top">
                  <div>
                    <p className="font-semibold text-white">
                      {lead.full_name}
                    </p>

                    <p className="text-xs text-white/40 mt-1">
                      ID: {lead.id.slice(0, 8)}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <div className="space-y-1">
                    <p className="text-sm text-white/70 break-all">
                      {lead.email}
                    </p>

                    <p className="text-xs text-white/50">
                      {lead.phone || "-"}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <div className="space-y-2 min-w-[180px]">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-white/40">
                        Arrival
                      </p>
                      <p className="text-sm font-medium text-white/70">
                        {formatDate(lead.arrival_date)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-white/40">
                        Departure
                      </p>
                      <p className="text-sm font-medium text-white/70">
                        {formatDate(lead.departure_date)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <div className="max-w-[220px]">
                    <p className="line-clamp-2 font-medium text-white/70">
                      {lead.subject || "-"}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <div className="max-w-[320px]">
                    <details className="group">
                      <summary className="cursor-pointer list-none leading-7 text-white/60 line-clamp-4">
                        {lead.message}
                      </summary>

                      <p className="mt-3 whitespace-pre-wrap leading-7 text-white/60">
                        {lead.message}
                      </p>

                      <span className="mt-2 inline-block text-xs font-medium text-white/40 group-open:hidden">
                        Read more
                      </span>
                    </details>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <div className="flex flex-col gap-3 min-w-[150px]">
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize backdrop-blur-md ${
                        statusStyles[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>

                    <div className="relative">
                      <select
                        defaultValue={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value)
                        }
                        disabled={isPending}
                        className="appearance-none w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-8 text-xs text-white outline-none focus:border-white/20 focus:ring-2 focus:ring-white/10"
                      >
                        {statuses.map((s) => (
                          <option
                            key={s}
                            value={s}
                            className="bg-[#0B1020] text-white"
                          >
                            {s}
                          </option>
                        ))}
                      </select>

                      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/40 text-xs">
                        ▾
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <p className="text-sm text-white/50">
                    {formatDate(lead.created_at)}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}