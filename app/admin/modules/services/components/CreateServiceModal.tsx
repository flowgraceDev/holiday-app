// app/admin/module/services/components/CreateServiceModal.tsx
"use client";

import { useState } from "react";
import { createService } from "../actions";

export default function CreateServiceModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    icon: "car",
    route: "",
  });

  const [file, setFile] = useState<File | null>(null);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!file) return;

    setLoading(true);

    try {
      await createService(form, file);
      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[420px] rounded-xl p-5 space-y-3">
        <h2 className="text-lg font-semibold">Create Service</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Slug"
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Route"
          onChange={(e) =>
            setForm({ ...form, route: e.target.value })
          }
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="file"
          className="w-w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:text-white hover:file:bg-neutral-800"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <div className="flex justify-end gap-2 pt-3">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-3 py-1 bg-black text-white rounded"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  )
}