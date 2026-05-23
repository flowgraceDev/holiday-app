"use client";

import { useEffect, useState } from "react";
import { updateService } from "../actions";

type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  route: string;
  is_active: boolean;
};

export default function EditServiceModal({
  open,
  data,
  onClose,
  onSuccess,
}: {
  open: boolean;
  data: Service | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<Service | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (!open || !form) return null;

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateService(
        form.id,
        {
          title: form.title,
          slug: form.slug,
          description: form.description,
          image: form.image,
          icon: form.icon,
          route: form.route,
          is_active: form.is_active,
        },
        file || undefined
      );

      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0B1020] w-[480px] rounded-3xl p-6 space-y-4 shadow-2xl border border-white/10 text-white">
        <h2 className="text-lg font-semibold">Update Service</h2>

        <input
          className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
        />

        <input
          className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
          value={form.route}
          onChange={(e) =>
            setForm({ ...form, route: e.target.value })
          }
        />

        <textarea
          className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="space-y-2">
          <p className="text-xs text-white/60">Current Image</p>
          <img
            src={form.image}
            alt="service"
            className="w-full h-36 object-cover rounded-2xl border border-white/10"
          />
        </div>

        <input
          type="file"
          className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <select
          className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white"
          value={form.is_active ? "true" : "false"}
          onChange={(e) =>
            setForm({
              ...form,
              is_active: e.target.value === "true",
            })
          }
        >
          <option value="true">Active</option>
          <option value="false">Disabled</option>
        </select>

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-white/10 text-white/70 hover:bg-white/[0.05]"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}