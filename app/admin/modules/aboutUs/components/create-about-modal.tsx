// app/admin/modules/about/components/create-about-modal.tsx
"use client";

import { useState, useRef } from "react";
import { createAbout } from "../actions";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10 placeholder:text-white/40"
  />
);

const Textarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => (
  <textarea
    {...props}
    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/10 placeholder:text-white/40 min-h-[110px]"
  />
);

export default function CreateAboutModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 text-white px-6 py-3 rounded-xl text-sm font-medium transition shadow-sm"
      >
        Create About
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1020]/80 backdrop-blur-xl p-4">
          <div className="w-full max-w-5xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl max-h-[90vh] overflow-y-auto text-white">
            <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">
                About Section Editor
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/10 transition"
              >
                ✕
              </button>
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
              className="p-6 space-y-10"
            >
              <div className="space-y-4">
                <h3 className="font-semibold text-white/80">
                  Hero Section
                </h3>

                <div className="grid grid-cols-2 gap-5">
                  <Input name="hero_title" placeholder="Hero Title" required />
                  <Input name="hero_subtitle" placeholder="Hero Subtitle" />
                </div>

                <Textarea
                  name="hero_description"
                  placeholder="Hero Description"
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">
                    Hero Images
                  </label>

                  <input
                    name="hero_images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/15"
                  />

                  <p className="text-xs text-white/40">
                    You can upload multiple hero images
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white/80">
                  Intro Section
                </h3>

                <Input name="intro_title" placeholder="Intro Title" />
                <Textarea name="intro_para1" placeholder="Paragraph 1" />
                <Textarea name="intro_para2" placeholder="Paragraph 2" />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">
                    Intro Image
                  </label>

                  <input
                    name="intro_image"
                    type="file"
                    className="w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/15"
                  />
                </div>
              </div>

              <Textarea
                name="services"
                placeholder="Services (comma separated)"
              />

              <div className="grid grid-cols-2 gap-5">
                <Textarea name="vision" placeholder="Vision" />
                <Textarea name="mission" placeholder="Mission" />
              </div>

              <Textarea name="footer_text" placeholder="Footer Text" />

              {status === "success" && (
                <p className="text-green-400 text-sm">Saved successfully</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm">Something went wrong</p>
              )}
              {status === "loading" && (
                <p className="text-white/50 text-sm">Saving...</p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2.5 border border-white/10 rounded-xl text-sm font-medium text-white hover:bg-white/10 transition"
                >
                  Cancel
                </button>

                <button
                  disabled={status === "loading"}
                  className="px-6 py-2.5 bg-white/10 border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/15 transition disabled:opacity-50"
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