"use client";

import { useState, useMemo } from "react";
import { updateAbout } from "../actions";

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm"
  />
);

const Textarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) => (
  <textarea
    {...props}
    className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-transparent text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 text-sm min-h-[90px]"
  />
);

type About = any;

const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="text-xs font-medium text-white/60">{children}</label>
);

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
        className="backdrop-blur-md border border-white/10 hover:bg-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-medium"
      >
        Edit About
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1020]/70 backdrop-blur-xl">
          <div className="w-full max-w-5xl rounded-2xl border border-white/10 bg-transparent backdrop-blur-2xl  text-white max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center">
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

              <div className="space-y-4">
                <h3 className="font-semibold text-white/80">Hero Section</h3>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <Label>Title</Label>
                    <Input name="hero_title" defaultValue={parsedHero?.title} />
                  </div>

                  <div className="space-y-1">
                    <Label>Subtitle</Label>
                    <Input
                      name="hero_subtitle"
                      defaultValue={parsedHero?.subtitle}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label>Description</Label>
                  <Textarea
                    name="hero_description"
                    defaultValue={parsedHero?.description}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Hero Images</Label>

                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {heroImages.map((img) => (
                      <div
                        key={img}
                        className="relative border border-white/10 rounded-lg overflow-hidden"
                      >
                        <img
                          src={img}
                          className="w-full h-28 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeHeroImage(img)}
                          className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
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
                    className="w-full mt-3 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-white/10 file:bg-transparent file:text-white"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white/80">Intro Section</h3>

                <div className="space-y-1">
                  <Label>Title</Label>
                  <Input name="intro_title" defaultValue={parsedIntro?.title} />
                </div>

                <div className="space-y-1">
                  <Label>Paragraph 1</Label>
                  <Textarea
                    name="intro_para1"
                    defaultValue={parsedIntro?.para1}
                  />
                </div>

                <div className="space-y-1">
                  <Label>Paragraph 2</Label>
                  <Textarea
                    name="intro_para2"
                    defaultValue={parsedIntro?.para2}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Intro Image</Label>

                  <div className="mt-2">
                    {introImage ? (
                      <div className="relative w-48 border border-white/10 rounded-lg overflow-hidden">
                        <img
                          src={introImage}
                          className="w-full h-32 object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeIntroImage}
                          className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-white/40">
                        No image uploaded
                      </p>
                    )}
                  </div>

                  <input
                    name="intro_image"
                    type="file"
                    accept="image/*"
                    className="w-full mt-3 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-white/10 file:bg-transparent file:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Services</Label>
                <Textarea
                  name="services"
                  defaultValue={about?.services?.join(", ")}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                  <Label>About Us</Label>
                  <Textarea name="vision" defaultValue={about?.vision} />
                </div>

                <div className="space-y-1">
                  <Label>About Our Drivers</Label>
                  <Textarea name="mission" defaultValue={about?.mission} />
                </div>
              </div>

              <div className="space-y-1">
                <Label>Footer Text</Label>
                <Textarea
                  name="footer_text"
                  defaultValue={about?.footer_text}
                />
              </div>

              {status === "success" && (
                <p className="text-green-400 text-sm">
                  Updated successfully
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm">
                  Something went wrong
                </p>
              )}
              {status === "loading" && (
                <p className="text-white/50 text-sm">Updating...</p>
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
                  className="px-5 py-2.5 bg-transparent hover:bg-white/10 border border-white/10 text-white rounded-lg disabled:opacity-50"
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