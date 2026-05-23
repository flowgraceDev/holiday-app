"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteDestinationAction } from "../actions";

export default function DeleteDestinationButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteDestinationAction(id);
        setOpen(false);
        router.refresh();
      } catch {
        setOpen(false);
      }
    });
  };

  return (
    <>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setOpen(true)}
          className="opacity-0 group-hover:opacity-100 transition flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/20 hover:text-red-300 shadow-sm"
        >
          Delete Destination
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#0B1020] border border-white/10 p-6 shadow-xl text-white">
            <h3 className="text-base font-semibold text-white">
              Delete Destination
            </h3>

            <p className="text-sm text-white/60 mt-2">
              Are you sure you want to delete this destination?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border border-white/10 text-sm text-white/70 hover:bg-white/[0.05]"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-sm hover:opacity-90 transition disabled:opacity-50"
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