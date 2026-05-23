// components/admin/DeleteAboutButton.tsx
"use client";

import { useState, useTransition } from "react";
import { deleteAbout } from "./../actions";

export default function DeleteAboutButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      await deleteAbout(id);
      setOpen(false);
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        disabled={pending}
        className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition shadow-sm disabled:opacity-50"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1020]/80 backdrop-blur-xl p-4">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-6 text-white">
            <h2 className="text-lg font-semibold text-white">Confirm Delete</h2>

            <p className="mt-2 text-sm text-white/50">
              Are you sure you want to delete this item?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={pending}
                className="px-4 py-2 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                No
              </button>

              <button
                onClick={handleDelete}
                disabled={pending}
                className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-sm font-medium hover:bg-red-500/30 transition disabled:opacity-50"
              >
                {pending ? "Deleting..." : "Yes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
