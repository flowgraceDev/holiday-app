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
        className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:opacity-90 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition shadow-sm"
      >
        Add Hero
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#0B1020] shadow-2xl border border-white/10">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Create Hero
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition"
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
                <label className="text-sm font-medium text-white/70">
                  Title
                </label>

                <input
                  name="title"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Subtitle
                </label>

                <input
                  name="subtitle"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Image
                </label>

                <input
                  name="image"
                  type="file"
                  required
                  className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-500 file:text-white hover:file:bg-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 border border-white/10 rounded-lg px-3 py-2.5 bg-white/[0.03]">
                  <input
                    type="checkbox"
                    name="is_active"
                    defaultChecked
                    className="h-4 w-4 accent-indigo-500"
                  />
                  <span className="text-sm text-white/80">
                    Active
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">
                    Sort Order
                  </label>

                  <input
                    name="sort_order"
                    type="number"
                    defaultValue={0}
                    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {status === "success" && (
                <p className="text-sm text-green-400">Hero created successfully</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400">Something went wrong</p>
              )}
              {status === "loading" && (
                <p className="text-sm text-white/60">Creating...</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border border-white/10 text-sm text-white/70 hover:bg-white/[0.05]"
                >
                  Cancel
                </button>

                <button
                  disabled={status === "loading"}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
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