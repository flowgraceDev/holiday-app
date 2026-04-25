// app/admin/modules/about/components/about-list.tsx
import { getAbout } from "@/app/lib/supabase/actions/admin/adminCreate";
import CreateAboutModal from "./create-about-modal";
import Image from "next/image";
import DeleteAboutButton from "./delete-about-button";

export const dynamic = "force-dynamic";

export default async function AboutList() {
  const about = await getAbout();

  return (
    <div className="p-10 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">
          About Section
        </h1>

        <CreateAboutModal />
        {/* <div className="flex justify-end">
                <DeleteAboutButton id={about?.id} />
              </div> */}
      </div>

      {about && (
        <div className="grid gap-8">

          {/* HERO */}
          <div className="group relative flex items-center gap-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="relative h-28 w-44 overflow-hidden rounded-2xl border shrink-0">
              <Image
                src={about.hero?.image_url || "/placeholder.jpg"}
                alt="hero"
                width={176}
                height={112}
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-1">
              <p className="text-lg font-semibold text-neutral-900">
                {about.hero?.title}
              </p>
              <p className="text-sm text-neutral-500">
                {about.hero?.subtitle}
              </p>
              <p className="text-sm text-neutral-600 line-clamp-2">
                {about.hero?.description}
              </p>
            </div>
          </div>

          {/* INTRO */}
          <div className="group relative flex items-center gap-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            
            <div className="relative h-28 w-44 overflow-hidden rounded-2xl border shrink-0">
              <Image
                src={about.intro?.image_url || "/placeholder.jpg"}
                alt="intro"
                width={176}
                height={112}
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-1">
              <p className="text-lg font-semibold text-neutral-900">
                {about.intro?.title}
              </p>
              <p className="text-sm text-neutral-500">
                {about.intro?.para1}
              </p>
              <p className="text-sm text-neutral-600 line-clamp-2">
                {about.intro?.para2}
              </p>
            </div>
          </div>

          {/* SERVICES */}
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Services</h2>

            <div className="flex flex-wrap gap-2">
              {about.services?.map((s: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* VISION / MISSION */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border bg-black text-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Vision</h3>
              <p className="text-white/80 text-sm">
                {about.vision}
              </p>
            </div>

            <div className="rounded-3xl border bg-yellow-400 text-black p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Mission</h3>
              <p className="text-black/80 text-sm">
                {about.mission}
              </p>
            </div>
          </div>

          {/* FOOTER TEXT */}
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Footer</h2>
            <p className="text-sm text-neutral-600">
              {about.footer_text}
            </p>
          </div>

        </div>
      )}
    </div>
  );
}