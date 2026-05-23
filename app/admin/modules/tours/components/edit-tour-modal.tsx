"use client";

import { useRef, useState } from "react";
import { updateTourFullAction } from "../actions";

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium text-white/60">{label}</label>
    {children}
  </div>
);

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

const Select = ({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 text-sm"
  >
    {children}
  </select>
);

type Tour = {
  id: number;
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  duration?: string;
  location?: string;
  starting_city?: string;
  max_people?: number;
  featured_image?: string;
  gallery?: string[];
  itinerary?: string;
  inclusions?: string;
  exclusions?: string;
  highlights?: string;
  featured?: boolean;
  is_active?: boolean;
  seo_title?: string;
  seo_description?: string;
  cta_text?: string;
  cta_enabled?: boolean;
  region?: string;
};

export default function EditTourModal({ tour }: { tour: Tour }) {
  const [open, setOpen] = useState(false);

  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");

  const [featuredImage, setFeaturedImage] = useState(tour.featured_image || "");

  const [galleryImages, setGalleryImages] = useState<string[]>(
    tour.gallery || [],
  );

  const formRef = useRef<HTMLFormElement>(null);

  const removeGalleryImage = (url: string) => {
    setGalleryImages((prev) => prev.filter((img) => img !== url));
  };

  const removeFeaturedImage = () => {
    setFeaturedImage("");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="opacity-0 group-hover:opacity-100 transition px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-xs font-medium hover:bg-white/[0.08]"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-4xl rounded-3xl bg-[#0B1020] border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto text-white">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
              <h2 className="text-lg font-semibold">Edit Tour</h2>

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

                  formData.set(
                    "existing_gallery",
                    JSON.stringify(galleryImages),
                  );

                  formData.set("existing_featured_image", featuredImage);

                  await updateTourFullAction(tour.id, formData);

                  setStatus("success");

                  setTimeout(() => {
                    window.location.reload();
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
                <Textarea name="description" defaultValue={tour.description} />
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
                  <Textarea name="itinerary" defaultValue={tour.itinerary} />
                </Field>

                <Field label="Highlights (JSON)">
                  <Textarea name="highlights" defaultValue={tour.highlights} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <Field label="Inclusions (JSON)">
                  <Textarea name="inclusions" defaultValue={tour.inclusions} />
                </Field>

                <Field label="Exclusions (JSON)">
                  <Textarea name="exclusions" defaultValue={tour.exclusions} />
                </Field>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <Field label="Region">
                  <Select name="region" defaultValue={tour.region || ""}>
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
                </Field>

                <Field label="SEO Title">
                  <Input name="seo_title" defaultValue={tour.seo_title} />
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

              <div className="space-y-4">
                <h3 className="font-semibold text-white">
                  Featured Image
                </h3>

                {featuredImage && (
                  <div className="relative border border-white/10 rounded-xl overflow-hidden w-full max-w-sm">
                    <img
                      src={featuredImage}
                      alt="Featured"
                      className="h-52 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={removeFeaturedImage}
                      className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md border border-white/10"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  name="featured_image"
                  accept="image/*"
                  className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/[0.08] file:text-white hover:file:bg-white/[0.12]"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white">
                  Gallery Images
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map((img) => (
                    <div
                      key={img}
                      className="relative border border-white/10 rounded-xl overflow-hidden"
                    >
                      <img
                        src={img}
                        alt="Gallery"
                        className="h-32 w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeGalleryImage(img)}
                        className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md border border-white/10"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <input
                  type="file"
                  name="gallery"
                  multiple
                  accept="image/*"
                  className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/[0.08] file:text-white hover:file:bg-white/[0.12]"
                />
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={tour.featured}
                  />
                  Featured
                </label>

                <label className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    name="is_active"
                    defaultChecked={tour.is_active}
                  />
                  Active
                </label>

                <label className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 rounded-lg">
                  <input
                    type="checkbox"
                    name="cta_enabled"
                    defaultChecked={tour.cta_enabled}
                  />
                  CTA Enabled
                </label>
              </div>

              {status === "success" && (
                <p className="text-emerald-400 text-sm">Updated</p>
              )}

              {status === "error" && (
                <p className="text-red-400 text-sm">Error</p>
              )}

              {status === "loading" && (
                <p className="text-white/60 text-sm">Updating...</p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-white/10 rounded-lg text-white/70 hover:bg-white/[0.05]"
                >
                  Cancel
                </button>

                <button
                  disabled={status === "loading"}
                  className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-lg disabled:opacity-50"
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