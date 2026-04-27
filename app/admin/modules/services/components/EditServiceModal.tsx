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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[450px] rounded-2xl p-5 space-y-3 shadow-lg">
        <h2 className="text-lg font-semibold">Update Service</h2>

        <input
          className="w-full border p-2 rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          value={form.route}
          onChange={(e) =>
            setForm({ ...form, route: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2 rounded"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* IMAGE PREVIEW */}
        <div className="space-y-2">
          <p className="text-xs text-slate-500">Current Image</p>
          <img
            src={form.image}
            alt="service"
            className="w-full h-32 object-cover rounded-lg border"
          />
        </div>

        {/* NEW IMAGE UPLOAD */}
        <input
          type="file"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        {/* STATUS */}
        <select
          className="w-full border p-2 rounded"
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

        <div className="flex justify-end gap-2 pt-3">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-3 py-1 bg-black text-white rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}