"use client";

import Image from "next/image";
import { useTransition } from "react";
import { toggleServiceStatus } from "../actions";
import { Trash2, Pencil } from "lucide-react";

type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  is_active: boolean;
};

export default function ServicesList({
  data,
  onDelete,
  onEdit,
}: {
  data: Service[];
  onDelete: (id: string) => void;
  onEdit: (item: Service) => void;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="bg-[#0B1020] border border-white/10 rounded-3xl overflow-hidden shadow-xl text-white">
      <div className="p-6 flex items-center justify-between border-b border-white/10 bg-white/[0.02]">
        <div>
          <h2 className="text-lg font-semibold tracking-wide">Services</h2>
          <p className="text-xs text-white/60 mt-1">
            Manage all service offerings
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white/60">
          {data.length} items
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-white/60 text-xs uppercase tracking-wider">
            <tr>
              <th className="p-5 text-left">Service</th>
              <th className="text-left">Slug</th>
              <th className="text-left">Description</th>
              <th className="text-center">Status</th>
              <th className="text-right p-5">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/10">
            {data.map((s) => (
              <tr
                key={s.id}
                className="hover:bg-white/[0.03] transition-all duration-200"
              >
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <p className="font-semibold text-white text-base">
                        {s.title}
                      </p>
                      <p className="text-xs text-white/60 capitalize">
                        {s.icon}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="text-white/60 font-mono text-xs">{s.slug}</td>

                <td className="text-white/60 max-w-[320px] truncate">
                  {s.description}
                </td>

                <td className="text-center">
                  <button
                    disabled={pending}
                    onClick={() =>
                      startTransition(() =>
                        toggleServiceStatus(s.id, !s.is_active)
                      )
                    }
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition border ${
                      s.is_active
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}
                  >
                    {s.is_active ? "Active" : "Disabled"}
                  </button>
                </td>

                <td className="text-right p-5">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => onEdit(s)}
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(s.id)}
                      className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-medium transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}