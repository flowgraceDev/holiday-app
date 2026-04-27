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
    <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 flex items-center justify-between border-b">
        <h2 className="font-semibold text-slate-900">Services</h2>
        <span className="text-xs text-slate-500">{data.length} items</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="p-4 text-left">Service</th>
              <th className="text-left">Slug</th>
              <th className="text-left">Description</th>
              <th className="text-center">Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s) => (
              <tr
                key={s.id}
                className="border-t hover:bg-slate-50 transition"
              >
                {/* Service */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-slate-900">
                        {s.title}
                      </p>
                      <p className="text-xs text-slate-500 capitalize">
                        {s.icon}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Slug */}
                <td className="text-slate-600 font-mono text-xs">
                  {s.slug}
                </td>

                {/* Description */}
                <td className="text-slate-500 max-w-[260px] truncate">
                  {s.description}
                </td>

                {/* Status */}
                <td className="text-center">
                  <button
                    onClick={() =>
                      startTransition(() =>
                        toggleServiceStatus(s.id, !s.is_active)
                      )
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                      s.is_active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {s.is_active ? "Active" : "Disabled"}
                  </button>
                </td>

                {/* Actions */}
                <td className="text-right p-4">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onEdit(s)}
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(s.id)}
                      className="inline-flex items-center gap-1 text-red-500 hover:text-red-600 text-sm"
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