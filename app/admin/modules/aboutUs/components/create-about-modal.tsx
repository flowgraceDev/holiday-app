// app/admin/modules/about/components/create-about-modal.tsx
"use client";

import { useState, useRef } from "react";
import { createAbout } from "../actions";

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

export default function CreateAboutModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium"
      >
        Create About
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border max-h-[90vh] overflow-y-auto">

            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">About Section Editor</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <form
              ref={formRef}
              action={async (formData) => {
                try {
                  setStatus("loading");
                  await createAbout(formData);
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
                  <Input name="hero_title" placeholder="Hero Title" required />
                  <Input name="hero_subtitle" placeholder="Hero Subtitle" />
                </div>

                <Textarea name="hero_description" placeholder="Hero Description" />

                <div>
                  <label className="text-sm font-medium">Hero Image</label>
                  <input
                    name="hero_image"
                    type="file"
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white"
                  />
                </div>
              </div>

              {/* INTRO */}
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-800">Intro Section</h3>

                <Input name="intro_title" placeholder="Intro Title" />
                <Textarea name="intro_para1" placeholder="Paragraph 1" />
                <Textarea name="intro_para2" placeholder="Paragraph 2" />

                <div>
                  <label className="text-sm font-medium">Intro Image</label>
                  <input
                    name="intro_image"
                    type="file"
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white"
                  />
                </div>
              </div>

              {/* SERVICES */}
              <Textarea
                name="services"
                placeholder="Services (comma separated)"
              />

              {/* VISION / MISSION */}
              <div className="grid grid-cols-2 gap-5">
                <Textarea name="vision" placeholder="Vision" />
                <Textarea name="mission" placeholder="Mission" />
              </div>

              {/* FOOTER */}
              <Textarea name="footer_text" placeholder="Footer Text" />

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