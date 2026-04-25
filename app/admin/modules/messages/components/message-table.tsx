// app/admin/dashboard/contactus/_components/message-table.tsx
"use client";

import { useTransition, useEffect, useState } from "react";
import { updateContactStatus } from "@/app/admin/modules/messages/actions";

type Contact = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
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

  const formatDate = (date: string) => {
    if (!mounted) return "";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="text-lg font-semibold">All Messages</h2>
        <span className="text-sm text-gray-500">
          {leads?.length || 0} total
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Contact</th>
              <th className="px-6 py-3 text-left">Message</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Created</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {leads?.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {lead.full_name}
                </td>

                <td className="px-6 py-4">
                  <div className="text-xs text-gray-500">{lead.email}</div>
                  <div className="text-xs text-gray-400">{lead.phone}</div>
                </td>

                <td className="px-6 py-4 max-w-[320px]">
                  <p className="line-clamp-3 text-gray-600">
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