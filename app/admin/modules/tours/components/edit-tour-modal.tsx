// app/admin/modules/tours/components/edit-tour-modal.tsx
"use client";

import { useState, useRef } from "react";
import { updateTourFullAction } from "../actions";

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-neutral-600">
      {label}
    </label>
    {children}
  </div>
);

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

export default function EditTourModal({ tour }: { tour: any }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="opacity-0 group-hover:opacity-100 transition px-3 py-1.5 rounded-lg bg-neutral-800 text-white text-xs font-medium"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Edit Tour</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <form
              ref={formRef}
              action={async (formData) => {
                try {
                  setStatus("loading");
                  await updateTourFullAction(tour.id, formData);
                  setStatus("success");
                  setTimeout(() => {
                    setOpen(false);
                    setStatus("idle");
                  }, 800);
                } catch {
                  setStatus("error");
                }
              }}
              className="p-6 space-y-6"
            >
              <div className="grid grid-cols-2 gap-5">
                <Field label="Title">
                  <Input name="title" defaultValue={tour.title} required />
                </Field>
                <Field label="Slug">
                  <Input name="slug" defaultValue={tour.slug} required />
                </Field>
              </div>

              <Field label="Short Description">
                <Textarea
                  name="short_description"
                  defaultValue={tour.short_description}
                />
              </Field>

              <Field label="Description">
                <Textarea
                  name="description"
                  defaultValue={tour.description}
                />
              </Field>

              <div className="grid grid-cols-3 gap-5">
                <Field label="Duration">
                  <Input name="duration" defaultValue={tour.duration} />
                </Field>
                <Field label="Location">
                  <Input name="location" defaultValue={tour.location} />
                </Field>
                <Field label="Starting City">
                  <Input
                    name="starting_city"
                    defaultValue={tour.starting_city}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <Field label="Price">
                  <Input
                    name="price"
                    type="number"
                    defaultValue={tour.price}
                  />
                </Field>
                <Field label="Discount Price">
                  <Input
                    name="discount_price"
                    type="number"
                    defaultValue={tour.discount_price}
                  />
                </Field>
                <Field label="Max People">
                  <Input
                    name="max_people"
                    type="number"
                    defaultValue={tour.max_people}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <Field label="Itinerary (JSON)">
                  <Textarea
                    name="itinerary"
                    defaultValue={JSON.stringify(tour.itinerary)}
                  />
                </Field>
                <Field label="Highlights (JSON)">
                  <Textarea
                    name="highlights"
                    defaultValue={JSON.stringify(tour.highlights)}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <Field label="Inclusions (JSON)">
                  <Textarea
                    name="inclusions"
                    defaultValue={JSON.stringify(tour.inclusions)}
                  />
                </Field>
                <Field label="Exclusions (JSON)">
                  <Textarea
                    name="exclusions"
                    defaultValue={JSON.stringify(tour.exclusions)}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <Field label="Region">
                  <Input name="region" defaultValue={tour.region} />
                </Field>
                <Field label="SEO Title">
                  <Input
                    name="seo_title"
                    defaultValue={tour.seo_title}
                  />
                </Field>
                <Field label="SEO Description">
                  <Input
                    name="seo_description"
                    defaultValue={tour.seo_description}
                  />
                </Field>
              </div>

              <Field label="CTA Text">
                <Input name="cta_text" defaultValue={tour.cta_text} />
              </Field>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 border px-3 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={tour.featured}
                  />
                  Featured
                </label>
                <label className="flex items-center gap-2 border px-3 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    name="is_active"
                    defaultChecked={tour.is_active}
                  />
                  Active
                </label>
                <label className="flex items-center gap-2 border px-3 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    name="cta_enabled"
                    defaultChecked={tour.cta_enabled}
                  />
                  CTA Enabled
                </label>
              </div>

              {status === "success" && (
                <p className="text-green-600 text-sm">Updated</p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm">Error</p>
              )}
              {status === "loading" && (
                <p className="text-neutral-500 text-sm">Updating...</p>
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}