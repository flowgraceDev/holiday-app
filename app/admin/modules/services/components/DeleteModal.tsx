"use client";

import { deleteService } from "../actions";

export default function DeleteModal({
  open,
  id,
  onClose,
  onSuccess,
}: {
  open: boolean;
  id: string | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  if (!open || !id) return null;

  const handleDelete = async () => {
    await deleteService(id);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#0B1020] w-[380px] rounded-3xl p-6 border border-white/10 shadow-2xl text-white">
        <h2 className="font-semibold text-lg">Delete Service</h2>

        <p className="text-sm text-white/60 mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-white/10 text-white/70 hover:bg-white/[0.05]"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}