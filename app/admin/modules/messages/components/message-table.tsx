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
  new: "bg-blue-50 text-blue-600",
  contacted: "bg-yellow-50 text-yellow-600",
  closed: "bg-gray-100 text-gray-600",
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
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">All Messages</h2>

          <p className="text-sm text-slate-500 mt-1">
            Manage customer travel enquiries
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
          {leads?.length || 0} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-200">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Traveler
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Contact
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Travel Dates
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Subject
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Message
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {leads?.map((lead) => (
              <tr
                key={lead.id}
                className="transition-colors hover:bg-slate-50/80"
              >
                <td className="px-6 py-5 align-top">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {lead.full_name}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      ID: {lead.id.slice(0, 8)}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <div className="space-y-1">
                    <p className="text-sm text-slate-700 break-all">
                      {lead.email}
                    </p>

                    <p className="text-xs text-slate-500">
                      {lead.phone || "-"}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <div className="space-y-2 min-w-[180px]">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">
                        Arrival
                      </p>

                      <p className="text-sm font-medium text-slate-700">
                        {formatDate(lead.arrival_date)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-slate-400">
                        Departure
                      </p>

                      <p className="text-sm font-medium text-slate-700">
                        {formatDate(lead.departure_date)}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <div className="max-w-[220px]">
                    <p className="line-clamp-2 font-medium text-slate-700">
                      {lead.subject || "-"}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <div className="max-w-[320px]">
                    <details className="group">
                      <summary className="line-clamp-4 cursor-pointer list-none leading-7 text-slate-600 marker:hidden">
                        {lead.message}
                      </summary>

                      <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-600">
                        {lead.message}
                      </p>

                      <span className="mt-2 inline-block text-xs font-medium text-blue-600 group-open:hidden">
                        Read more
                      </span>
                    </details>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <div className="flex flex-col gap-3 min-w-[150px]">
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                        statusStyles[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>

                    <select
                      defaultValue={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value)
                      }
                      disabled={isPending}
                      className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-black"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>

                <td className="px-6 py-5 align-top">
                  <p className="text-sm text-slate-500">
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
