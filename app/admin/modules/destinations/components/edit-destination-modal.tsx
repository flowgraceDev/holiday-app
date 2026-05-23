"use client";

import { useEffect, useState, useTransition } from "react";
import { Pencil, X } from "lucide-react";
import { updateDestinationAction } from "../actions";

type Props = {
  destination: {
    id: string;
    name: string;
    slug: string;
  };
};

export default function EditDestinationModal({
  destination,
}: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const [name, setName] = useState(destination.name);
  const [slug, setSlug] = useState(destination.slug);
  const [file, setFile] = useState<File | undefined>();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const onClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    startTransition(async () => {
      await updateDestinationAction(
        destination.id,
        {
          name,
          slug,
        },
        file
      );

      onClose();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-sm font-medium text-white/80 transition hover:bg-white/[0.08]"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0B1020] border border-white/10 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-white/[0.02]">
              <h2 className="text-xl font-semibold text-white">
                Edit Destination
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/[0.05]"
              >
                <X className="h-5 w-5 text-white/70" />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Destination name"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Slug
                </label>

                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Destination Slug"
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Replace Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFile(e.target.files?.[0])
                  }
                  className="block w-full rounded-xl border border-white/10 p-3 text-sm text-white file:mr-4 file:rounded-lg file:border-0 file:bg-white/[0.08] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-white/[0.12]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 rounded-xl border border-white/10 px-5 text-sm font-medium text-white/70 transition hover:bg-white/[0.05]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={pending}
                  className="h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {pending ? "Updating..." : "Update Destination"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}