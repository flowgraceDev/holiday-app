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
  new: "bg-blue-50 text-blue-600",
  contacted: "bg-yellow-50 text-yellow-600",
  qualified: "bg-purple-50 text-purple-600",
  converted: "bg-green-50 text-green-600",
  closed: "bg-gray-100 text-gray-600",
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
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          All Inquiries
        </h2>

        <span className="text-sm text-gray-500">
          {leads?.length || 0} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px] text-sm">
          <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-600">
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

          <tbody className="divide-y divide-gray-100">
            {leads?.map((lead) => (
              <tr
                key={lead.id}
                className="transition-colors hover:bg-gray-50"
              >
                <td className="px-6 py-4 align-top">
                  <div className="space-y-1">
                    <div className="font-semibold text-gray-900">
                      {lead.full_name}
                    </div>

                    <div className="text-xs text-gray-500">
                      {lead.email}
                    </div>

                    <div className="text-xs text-gray-400">
                      {lead.phone}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 align-top">
                  {lead.tour ? (
                    <div className="flex items-start gap-3">
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl border bg-gray-100">
                        <Image
                          src={lead.tour.featured_image}
                          alt={lead.tour.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="font-semibold text-gray-800">
                          {lead.tour.title}
                        </div>

                        <div className="text-xs text-gray-500">
                          {lead.tour.location}
                        </div>

                        <div className="text-xs text-gray-400">
                          {lead.tour.duration}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">
                      No tour linked
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 align-top font-medium text-gray-700">
                  {formatDate(lead.arrival_date)}
                </td>

                <td className="px-6 py-4 align-top font-medium text-gray-700">
                  {formatDate(lead.departure_date)}
                </td>

                <td className="px-6 py-4 align-top font-semibold text-gray-800">
                  {lead.number_of_people || "-"}
                </td>

                <td className="max-w-[280px] px-6 py-4 align-top">
                  <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
                    {lead.message || "No message provided"}
                  </p>
                </td>

                <td className="px-6 py-4 align-top">
                  <div className="flex flex-col gap-2">
                    <span
                      className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
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
                      className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>

                <td className="px-6 py-4 align-top text-xs text-gray-500">
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