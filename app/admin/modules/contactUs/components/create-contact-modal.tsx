// app/admin/modules/contactUs/components/create-contact-modal.tsx
"use client";
import { useState, useRef } from "react";
import { createContactAction } from "../actions";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
  />
);

const Textarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => (
  <textarea
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm min-h-[90px]"
  />
);

export default function CreateContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium"
      >
        Create Contact
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Contact Section Editor</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <form
              ref={formRef}
              action={async (formData) => {
                try {
                  setStatus("loading");
                  await createContactAction(formData);
                  setStatus("success");

                  setTimeout(() => {
                    setOpen(false);
                    setStatus("idle");
                  }, 1000);
                } catch {
                  setStatus("error");
                }
              }}
              className="p-6 space-y-8"
            >
              {/* HERO */}
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-800">Hero Section</h3>

                <div className="grid grid-cols-2 gap-5">
                  <Input name="title" placeholder="Title" required />
                  <Input name="subtitle" placeholder="Subtitle" />
                </div>

                <Textarea name="description" placeholder="Description" />
                <Input name="highlight" placeholder="Highlight Text" />

                <div>
                  <label className="text-sm font-medium">Hero Image</label>
                  <input
                    name="image"
                    type="file"
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white"
                  />
                </div>
              </div>

              {/* SECTION */}
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-800">Content Section</h3>

                <Input name="section_title" placeholder="Section Title" />
                <Input name="section_highlight" placeholder="Section Highlight" />
                <Textarea name="section_description" placeholder="Section Description" />
              </div>

              {/* MAP */}
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-800">Map</h3>
                <Input name="map_url" placeholder="Google Map Embed URL" />
              </div>

              {status === "success" && (
                <p className="text-green-600 text-sm">Saved successfully</p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm">Something went wrong</p>
              )}
              {status === "loading" && (
                <p className="text-neutral-500 text-sm">Saving...</p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  disabled={status === "loading"}
                  className="px-5 py-2.5 bg-black text-white rounded-lg disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}