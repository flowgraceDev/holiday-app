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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0B1020] w-[460px] rounded-3xl p-6 space-y-4 border border-white/10 shadow-2xl text-white">
        <h2 className="text-lg font-semibold">Create Service</h2>

        <input
          className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
          placeholder="Title"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
          placeholder="Slug"
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value })
          }
        />

        <input
          className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
          placeholder="Route"
          onChange={(e) =>
            setForm({ ...form, route: e.target.value })
          }
        />

        <textarea
          className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20"
          placeholder="Description"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <input
          type="file"
          className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/[0.08] file:text-white hover:file:bg-white/[0.12]"
          onChange={(e) =>
            setFile(e.target.files?.[0] || null)
          }
        />

        <div className="flex justify-end gap-3 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-white/10 text-white/70 hover:bg-white/[0.05]"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}