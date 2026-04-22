// app/admin/modules/hero/components/create-hero-modal.tsx
"use client";

import { useState, useRef } from "react";
import { createHeroAction } from "../actions";

export default function CreateHeroModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
      >
        Add Hero
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-neutral-200">
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-neutral-800">
                Create Hero
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-neutral-500 hover:text-neutral-800 transition"
              >
                ✕
              </button>
            </div>

            <form
              ref={formRef}
              action={async (formData) => {
                try {
                  setStatus("loading");
                  await createHeroAction(formData);
                  setStatus("success");
                  formRef.current?.reset();
                  setTimeout(() => {
                    setOpen(false);
                    setStatus("idle");
                  }, 1200);
                } catch {
                  setStatus("error");
                }
              }}
              className="p-6 space-y-5"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Title
                </label>
                <input
                  name="title"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Subtitle
                </label>
                <input
                  name="subtitle"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Image
                </label>
                <input
                  name="image"
                  type="file"
                  required
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:text-white hover:file:bg-neutral-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border border-neutral-300 rounded-lg px-3 py-2.5">
                  <input
                    type="checkbox"
                    name="is_active"
                    defaultChecked
                    className="h-4 w-4 accent-neutral-900"
                  />
                  <span className="text-sm text-neutral-700">
                    Active
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Sort Order
                  </label>
                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={0}
                    className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
                  />
                </div>
              </div>

              {status === "success" && (
                <p className="text-sm text-green-600">Hero created successfully</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">Something went wrong</p>
              )}
              {status === "loading" && (
                <p className="text-sm text-neutral-500">Creating...</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-sm hover:bg-neutral-100 transition"
                >
                  Cancel
                </button>
                <button
                  disabled={status === "loading"}
                  className="px-5 py-2.5 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition disabled:opacity-50"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}