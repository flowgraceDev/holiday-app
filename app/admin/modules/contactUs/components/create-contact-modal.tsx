"use client";

import { useState, useRef } from "react";
import { createContactAction } from "../actions";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="space-y-1">
    {props.name && (
      <label className="text-xs text-white/60 capitalize">
        {String(props.name).replace(/_/g, " ")}
      </label>
    )}
    <input
      {...props}
      className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
    />
  </div>
);

const Textarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => (
  <div className="space-y-1">
    {props.name && (
      <label className="text-xs text-white/60 capitalize">
        {String(props.name).replace(/_/g, " ")}
      </label>
    )}
    <textarea
      {...props}
      className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm min-h-[90px] focus:outline-none focus:ring-2 focus:ring-white/20"
    />
  </div>
);

export default function CreateContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 text-white px-5 py-2.5 rounded-xl text-sm font-medium"
      >
        Create Contact
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1020]/80 backdrop-blur-xl">
          <div className="w-full max-w-4xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl max-h-[90vh] overflow-y-auto text-white">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                Contact Section Editor
              </h2>
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
              <div className="space-y-4">
                <h3 className="font-semibold text-white/80">
                  Hero Section
                </h3>

                <div className="grid grid-cols-2 gap-5">
                  <Input name="title" placeholder="Title" required />
                  <Input name="subtitle" placeholder="Subtitle" />
                </div>

                <Textarea name="description" placeholder="Description" />

                <Input name="highlight" placeholder="Highlight Text" />

                <div className="space-y-2">
                  <label className="text-xs text-white/60">
                    Hero Images (Multiple)
                  </label>
                  <input
                    name="images"
                    type="file"
                    multiple
                    className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/15"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white/80">
                  Content Section
                </h3>

                <Input
                  name="section_title"
                  placeholder="Section Title"
                />
                <Input
                  name="section_highlight"
                  placeholder="Section Highlight"
                />
                <Textarea
                  name="section_description"
                  placeholder="Section Description"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-white/80">Map</h3>
                <Input
                  name="map_url"
                  placeholder="Google Map Embed URL"
                />
              </div>

              {status === "success" && (
                <p className="text-green-400 text-sm">
                  Saved successfully
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong
                </p>
              )}
              {status === "loading" && (
                <p className="text-white/50 text-sm">Saving...</p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-white/10 rounded-lg text-white"
                >
                  Cancel
                </button>

                <button
                  disabled={status === "loading"}
                  className="px-5 py-2.5 bg-white/10 border border-white/10 text-white rounded-lg disabled:opacity-50 hover:bg-white/15"
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