"use client";

import { useTransition, useEffect, useState } from "react";
import { updateLeadStatus } from "@/app/admin/modules/Leads/actions";
import Image from "next/image";

type Tour = {
  id: string;
  title: string;
  location: string;
  duration: string;
  featured_image: string;
};

type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  arrival_date: string | null;
  departure_date: string | null;
  number_of_people: number | null;
  message: string | null;
  status: string;
  created_at: string;
  tour?: Tour | null;
};

const statuses = ["new", "contacted", "qualified", "converted", "closed"];

const statusStyles: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-200 border border-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-200 border border-yellow-500/20",
  qualified: "bg-purple-500/10 text-purple-200 border border-purple-500/20",
  converted: "bg-green-500/10 text-green-200 border border-green-500/20",
  closed: "bg-white/5 text-white/60 border border-white/10",
};

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleStatusChange = (id: string, status: string) => {
    startTransition(() => {
      updateLeadStatus(id, status);
    });
  };

  const formatDate = (date?: string | null) => {
    if (!mounted || !date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl text-white">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/5 backdrop-blur-xl">
        <h2 className="text-lg font-semibold text-white">All Inquiries</h2>

        <span className="text-sm text-white/50">
          {leads?.length || 0} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/50">
            <tr>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Tour</th>
              <th className="px-6 py-4 text-left">Arrival</th>
              <th className="px-6 py-4 text-left">Departure</th>
              <th className="px-6 py-4 text-left">People</th>
              <th className="px-6 py-4 text-left">Message</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Created</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {leads?.map((lead) => (
              <tr key={lead.id} className="transition-colors hover:bg-white/5">
                <td className="px-6 py-4 align-top">
                  <div className="space-y-1">
                    <div className="font-semibold text-white">
                      {lead.full_name}
                    </div>

                    <div className="text-xs text-white/50">{lead.email}</div>

                    <div className="text-xs text-white/40">{lead.phone}</div>
                  </div>
                </td>

                <td className="px-6 py-4 align-top">
                  {lead.tour ? (
                    <div className="flex items-start gap-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                        <Image
                          src={lead.tour.featured_image}
                          alt={lead.tour.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="font-semibold text-white/90">
                          {lead.tour.title}
                        </div>

                        <div className="text-xs text-white/50">
                          {lead.tour.location}
                        </div>

                        <div className="text-xs text-white/40">
                          {lead.tour.duration}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-white/40">
                      No tour linked
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 align-top font-medium text-white/70">
                  {formatDate(lead.arrival_date)}
                </td>

                <td className="px-6 py-4 align-top font-medium text-white/70">
                  {formatDate(lead.departure_date)}
                </td>

                <td className="px-6 py-4 align-top font-semibold text-white/80">
                  {lead.number_of_people || "-"}
                </td>

                <td className="max-w-[280px] px-6 py-4 align-top">
                  <p className="line-clamp-3 text-sm leading-relaxed text-white/60">
                    {lead.message || "No message provided"}
                  </p>
                </td>

                <td className="px-6 py-4 align-top">
                  <div className="flex flex-col gap-2">
                    <span
                      className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium capitalize backdrop-blur-md ${
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
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 pr-8 text-xs text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10 appearance-none"
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
                  </div>
                </td>

                <td className="px-6 py-4 align-top text-xs text-white/50">
                  {formatDate(lead.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
