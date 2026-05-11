"use client";

import { useEffect, useRef, useState } from "react";
import { updateContactAction, getContactAction } from "../actions";

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

type ContactData = {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  highlight?: string;
  section_title?: string;
  section_highlight?: string;
  section_description?: string;
  map_url?: string;
  image_url?: string[];
};

export default function EditContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [data, setData] = useState<ContactData | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) return;

    (async () => {
      const res = await getContactAction();
      setData(res as ContactData);
    })();
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium"
      >
        Edit Contact
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Edit Contact Section</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <form
              ref={formRef}
              action={async (formData) => {
                try {
                  if (!data?.id) return;

                  setStatus("loading");

                  await updateContactAction(data.id, formData);

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
                <h3 className="font-semibold text-neutral-800">
                  Hero Section
                </h3>

                <div className="grid grid-cols-2 gap-5">
                  <Input
                    name="title"
                    defaultValue={data?.title}
                    placeholder="Title"
                    required
                  />
                  <Input
                    name="subtitle"
                    defaultValue={data?.subtitle}
                    placeholder="Subtitle"
                  />
                </div>

                <Textarea
                  name="description"
                  defaultValue={data?.description}
                  placeholder="Description"
                />

                <Input
                  name="highlight"
                  defaultValue={data?.highlight}
                  placeholder="Highlight Text"
                />

                {/* MULTIPLE IMAGES */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Hero Images (Multiple)
                  </label>
                  <input
                    name="images"
                    type="file"
                    multiple
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white"
                  />
                </div>

                {/* PREVIEW EXISTING */}
                {data?.image_url?.length ? (
                  <div className="flex flex-wrap gap-3">
                    {data.image_url.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        className="h-20 w-28 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                ) : null}
              </div>

              {/* SECTION */}
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-800">
                  Content Section
                </h3>

                <Input
                  name="section_title"
                  defaultValue={data?.section_title}
                  placeholder="Section Title"
                />
                <Input
                  name="section_highlight"
                  defaultValue={data?.section_highlight}
                  placeholder="Section Highlight"
                />
                <Textarea
                  name="section_description"
                  defaultValue={data?.section_description}
                  placeholder="Section Description"
                />
              </div>

              {/* MAP */}
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-800">Map</h3>
                <Input
                  name="map_url"
                  defaultValue={data?.map_url}
                  placeholder="Google Map Embed URL"
                />
              </div>

              {status === "success" && (
                <p className="text-green-600 text-sm">
                  Updated successfully
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm">
                  Something went wrong
                </p>
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