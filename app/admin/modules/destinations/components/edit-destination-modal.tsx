// app/admin/modules/destinations/components/edit-destination-modal.tsx
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
  const [slug, setSlug] = useState(
    destination.slug 
  );
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
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 shrink-0"
      >
        <Pencil className="h-4 w-4" />
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <h2 className="text-xl font-semibold text-neutral-900">
                Edit Destination
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-neutral-100"
              >
                <X className="h-5 w-5 text-neutral-600" />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Name
                </label>

                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Destination name"
                  className="h-11 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Slug
                </label>

                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Destination Slug"
                  className="h-11 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none transition focus:border-black"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Replace Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFile(e.target.files?.[0])
                  }
                  className="block w-full rounded-xl border border-neutral-200 p-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-11 rounded-xl border border-neutral-200 px-5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={pending}
                  className="h-11 rounded-xl bg-black px-5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
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