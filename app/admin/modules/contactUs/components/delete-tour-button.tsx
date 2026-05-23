"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteContactAction } from "../actions";

export default function DeleteContactButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteContactAction(id);
        setOpen(false);
        router.refresh();
      } catch {
        setOpen(false);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="opacity-0 group-hover:opacity-100 transition px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-xs font-medium hover:bg-red-500/30 backdrop-blur-md"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#0B1020]/80 backdrop-blur-xl">
          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl p-6 text-white">
            <h3 className="text-base font-semibold text-white">
              Delete Contact
            </h3>

            <p className="text-sm text-white/60 mt-2">
              Are you sure you want to delete this contact section?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm text-white hover:bg-white/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm hover:bg-red-500/30 transition disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}