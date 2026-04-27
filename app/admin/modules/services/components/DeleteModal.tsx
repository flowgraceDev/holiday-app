// app/admin/module/services/components/DeleteModal.tsx
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[360px] rounded-xl p-5">
        <h2 className="font-semibold text-lg">Delete Service</h2>
        <p className="text-sm text-slate-500 mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 mt-5">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}