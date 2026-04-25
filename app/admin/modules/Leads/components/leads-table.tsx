// app/admin/dashboard/leads/_components/leads-table.tsx
"use client";

import { useTransition, useEffect, useState } from "react";
import { updateLeadStatus } from "@/app/admin/modules/Leads/actions";
import Image from "next/image";

type Tour = {
  id: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  discount_price: number;
  featured_image: string;
};

type Lead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  travel_date: string;
  number_of_people: number;
  message: string;
  status: string;
  created_at: string;
  tour?: Tour;
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

  const formatDate = (date: string) => {
    if (!mounted) return "";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">All Leads</h2>
        <span className="text-sm text-gray-500">
          {leads?.length || 0} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Tour</th>
              <th className="px-6 py-3 text-left">Travel</th>
              <th className="px-6 py-3 text-left">People</th>
              <th className="px-6 py-3 text-left">Message</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Created</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {leads?.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">
                    {lead.full_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {lead.email}
                  </div>
                  <div className="text-xs text-gray-400">
                    {lead.phone}
                  </div>
                </td>

                <td className="px-6 py-4">
                  {lead.tour && (
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden border">
                        <Image
                          src={lead.tour.featured_image}
                          alt={lead.tour.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-800">
                          {lead.tour.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lead.tour.location}
                        </div>
                        <div className="text-xs text-gray-400">
                          {lead.tour.duration}
                        </div>
                        <div className="text-xs font-medium text-green-600">
                          ₹{lead.tour.discount_price || lead.tour.price}
                        </div>
                      </div>
                    </div>
                  )}
                </td>

                <td className="px-6 py-4">
                  {formatDate(lead.travel_date)}
                </td>

                <td className="px-6 py-4 font-medium">
                  {lead.number_of_people}
                </td>

                <td className="px-6 py-4 max-w-[280px]">
                  <p className="line-clamp-2 text-gray-600">
                    {lead.message}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                      className="text-xs border rounded-md px-2 py-1 bg-white"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-500 text-xs">
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