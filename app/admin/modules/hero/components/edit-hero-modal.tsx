// app/admin/modules/hero/components/edit-hero-modal.tsx
"use client";

import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { Pencil, X } from "lucide-react";
import { updateHeroAction } from "../actions";

type Hero = {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  is_active: boolean;
};

export default function EditHeroModal({ hero }: { hero: Hero }) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    title: hero.title,
    subtitle: hero.subtitle,
    image_url: hero.image_url,
    is_active: hero.is_active,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        await updateHeroAction({
          id: hero.id,
          title: formData.title,
          subtitle: formData.subtitle,
          is_active: formData.is_active,
        });

        setOpen(false);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center justify-center rounded-xl bg-yellow-400 px-4 text-sm font-medium text-black transition hover:bg-yellow-500"
      >
        <Pencil className="mr-2 h-4 w-4" />
        Edit
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Edit Hero
                </h2>

                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 transition hover:bg-neutral-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Title
                  </label>

                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-black placeholder:text-neutral-500 outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Subtitle
                  </label>

                  <textarea
                    rows={4}
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        subtitle: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-neutral-300 px-4 py-3 text-black placeholder:text-neutral-500 outline-none focus:border-black"
                  />
                </div>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }))
                    }
                    className="h-4 w-4"
                  />

                  <span className="text-sm text-neutral-700">Active Hero</span>
                </label>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={pending}
                    className="rounded-2xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
                  >
                    {pending ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
