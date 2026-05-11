"use client";

import { useState, useRef, useMemo } from "react";
import { updateAbout } from "../actions";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
  />
);

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm min-h-[90px]"
  />
);

type About = any;

export default function UpdateAboutModal({ about }: { about: About }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const parsedHero = useMemo(() => {
    try {
      return typeof about?.hero === "string"
        ? JSON.parse(about.hero)
        : about?.hero;
    } catch {
      return about?.hero || {};
    }
  }, [about]);

  const parsedIntro = useMemo(() => {
    try {
      return typeof about?.intro === "string"
        ? JSON.parse(about.intro)
        : about?.intro;
    } catch {
      return about?.intro || {};
    }
  }, [about]);

  const [heroImages, setHeroImages] = useState<string[]>(
    parsedHero?.images || []
  );

  const [introImage, setIntroImage] = useState<string | null>(
    parsedIntro?.image_url || null
  );

  const removeHeroImage = (url: string) => {
    setHeroImages((prev) => prev.filter((i) => i !== url));
  };

  const removeIntroImage = () => setIntroImage(null);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium"
      >
        Edit About
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Update About Section</h2>
              <button onClick={() => setOpen(false)}>✕</button>
            </div>

            <form
              action={async (formData) => {
                try {
                  setStatus("loading");

                  formData.set(
                    "hero_images_existing",
                    JSON.stringify(heroImages)
                  );

                  formData.set("intro_image_existing", introImage || "");

                  await updateAbout(formData);

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
              <input type="hidden" name="id" value={about?.id} />

              {/* HERO */}
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-800">
                  Hero Section
                </h3>

                <div className="grid grid-cols-2 gap-5">
                  <Input
                    name="hero_title"
                    defaultValue={parsedHero?.title}
                  />
                  <Input
                    name="hero_subtitle"
                    defaultValue={parsedHero?.subtitle}
                  />
                </div>

                <Textarea
                  name="hero_description"
                  defaultValue={parsedHero?.description}
                />

                <div>
                  <label className="text-sm font-medium">Hero Images</label>

                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {heroImages.map((img) => (
                      <div
                        key={img}
                        className="relative border rounded-lg overflow-hidden"
                      >
                        <img
                          src={img}
                          className="w-full h-28 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeHeroImage(img)}
                          className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  <input
                    name="hero_images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full mt-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white"
                  />
                </div>
              </div>

              {/* INTRO */}
              <div className="space-y-4">
                <h3 className="font-semibold text-neutral-800">
                  Intro Section
                </h3>

                <Input
                  name="intro_title"
                  defaultValue={parsedIntro?.title}
                />

                <Textarea
                  name="intro_para1"
                  defaultValue={parsedIntro?.para1}
                />

                <Textarea
                  name="intro_para2"
                  defaultValue={parsedIntro?.para2}
                />

                <div>
                  <label className="text-sm font-medium">Intro Image</label>

                  <div className="mt-3">
                    {introImage ? (
                      <div className="relative w-48 border rounded-lg overflow-hidden">
                        <img
                          src={introImage}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeIntroImage}
                          className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-500">
                        No image uploaded
                      </p>
                    )}
                  </div>

                  <input
                    name="intro_image"
                    type="file"
                    accept="image/*"
                    className="w-full mt-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-black file:text-white"
                  />
                </div>
              </div>

              {/* SERVICES */}
              <Textarea
                name="services"
                defaultValue={about?.services?.join(", ")}
              />

              <div className="grid grid-cols-2 gap-5">
                <Textarea
                  name="vision"
                  defaultValue={about?.vision}
                />
                <Textarea
                  name="mission"
                  defaultValue={about?.mission}
                />
              </div>

              <Textarea
                name="footer_text"
                defaultValue={about?.footer_text}
              />

              {status === "success" && (
                <p className="text-green-600 text-sm">Updated successfully</p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm">Something went wrong</p>
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