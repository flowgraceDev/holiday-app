// app/admin/modules/tours/components/create-tour-modal.tsx
"use client";

import { useState, useRef } from "react";
import { createTourAction } from "../actions";

const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
  />
);

const Textarea = ({
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm min-h-[90px]"
  />
);

const Select = ({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm bg-white"
  >
    {children}
  </select>
);

export default function CreateTourModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
      >
        Add Tour
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Create Tour</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <form
              ref={formRef}
              action={async (formData) => {
                try {
                  setStatus("loading");
                  await createTourAction(formData);
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
                <Input name="title" required placeholder="Title" />
                <Input name="slug" required placeholder="Slug" />
              </div>

              <Textarea
                name="short_description"
                placeholder="Short Description"
              />

              <Textarea name="description" placeholder="Description" />

              <div className="grid grid-cols-3 gap-5">
                <Input name="duration" placeholder="Duration" />
                <Input name="location" placeholder="Location" />
                <Input name="starting_city" placeholder="Starting City" />
              </div>

              <div className="grid grid-cols-3 gap-5">
                <Input
                  name="max_people"
                  type="number"
                  placeholder="Max People"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <Textarea name="itinerary" placeholder="Itinerary (JSON)" />
                <Textarea name="highlights" placeholder="Highlights (JSON)" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <Textarea name="inclusions" placeholder="Inclusions (JSON)" />
                <Textarea name="exclusions" placeholder="Exclusions (JSON)" />
              </div>

              <div className="grid grid-cols-3 gap-5">
                <Select name="region" defaultValue="">
                  <option value="" disabled>
                    Select Region
                  </option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                  <option value="central">Central</option>
                  <option value="india-nepal">India-Nepal</option>
                </Select>

                <Input name="seo_title" placeholder="SEO Title" />

                <Input
                  name="seo_description"
                  placeholder="SEO Description"
                />
              </div>

              <Input name="cta_text" placeholder="CTA Text" />

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 border px-3 py-2 rounded-lg">
                  <input type="checkbox" name="featured" />
                  Featured
                </label>

                <label className="flex items-center gap-2 border px-3 py-2 rounded-lg">
                  <input type="checkbox" name="is_active" defaultChecked />
                  Active
                </label>

                <label className="flex items-center gap-2 border px-3 py-2 rounded-lg">
                  <input type="checkbox" name="cta_enabled" defaultChecked />
                  CTA Enabled
                </label>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Featured Image
                  </label>

                  <input
                    name="featured_image"
                    type="file"
                    required
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:text-white hover:file:bg-neutral-800"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Gallery
                  </label>

                  <input
                    name="gallery"
                    type="file"
                    multiple
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-neutral-900 file:text-white hover:file:bg-neutral-800"
                  />
                </div>
              </div>

              {status === "success" && (
                <p className="text-green-600 text-sm">Created</p>
              )}

              {status === "error" && (
                <p className="text-red-600 text-sm">Error</p>
              )}

              {status === "loading" && (
                <p className="text-neutral-500 text-sm">Creating...</p>
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