"use client";

import { useRef, useState } from "react";
import { createDestinationAction } from "../actions";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-sm"
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-sm min-h-[90px]"
  />
);

export default function CreateDestinationModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
      >
        Add Destination
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#0B1020] rounded-2xl shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto text-white">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-lg font-semibold">Create Destination</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form
              ref={formRef}
              action={async (formData) => {
                try {
                  setStatus("loading");
                  await createDestinationAction(formData);
                  setStatus("success");
                  formRef.current?.reset();
                  setTimeout(() => {
                    setOpen(false);
                    setStatus("idle");
                  }, 1000);
                } catch {
                  setStatus("error");
                }
              }}
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-2 gap-5">
                <Input name="name" required placeholder="Name" />
                <Input name="slug" required placeholder="Slug" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Image
                </label>

                <input
                  name="image"
                  type="file"
                  required
                  className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/[0.08] file:text-white hover:file:bg-white/[0.12]"
                />
              </div>

              {status === "success" && (
                <p className="text-emerald-400 text-sm">Created</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm">Error</p>
              )}
              {status === "loading" && (
                <p className="text-white/60 text-sm">Creating...</p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-white/10 text-white/70 rounded-lg hover:bg-white/[0.05]"
                >
                  Cancel
                </button>

                <button
                  disabled={status === "loading"}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg disabled:opacity-50"
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