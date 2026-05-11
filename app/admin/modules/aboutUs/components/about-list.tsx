import { getAbout } from "@/app/lib/supabase/actions/admin/adminCreate";
import CreateAboutModal from "./create-about-modal";
import UpdateAboutModal from "./edit-about-model";
import Image from "next/image";
import DeleteAboutButton from "./delete-about-button";

export const dynamic = "force-dynamic";

export default async function AboutList() {
  const about = await getAbout();

  return (
    <div className="space-y-10 p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">
          About Section
        </h1>

        {!about ? (
          <CreateAboutModal />
        ) : (
          <UpdateAboutModal about={about} />
        )}
      </div>

      {about && (
        <div className="grid gap-8">
          {/* ACTIONS */}
          <div className="flex items-center justify-end rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
            <DeleteAboutButton id={about?.id} />
          </div>

          {/* HERO */}
          <div className="group relative rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-5 grid grid-cols-4 gap-3">
              {about.hero?.images?.length ? (
                about.hero.images.map((img: string, i: number) => (
                  <div
                    key={i}
                    className="relative h-24 w-full overflow-hidden rounded-xl border"
                  >
                    <Image
                      src={img || "/placeholder.jpg"}
                      alt={`hero-${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="text-sm text-neutral-500">No images</div>
              )}
            </div>

            <div className="space-y-1">
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
            <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-2xl border">
              <Image
                src={about.intro?.image_url || "/placeholder.jpg"}
                alt="intro"
                width={176}
                height={112}
                className="h-full w-full object-cover"
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
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">
              Services
            </h2>

            <div className="flex flex-wrap gap-2">
              {about.services?.map((s: string, i: number) => (
                <span
                  key={i}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* VISION / MISSION */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-black p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-white">
                Vision
              </h3>
              <p className="text-sm text-white/80">{about.vision}</p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-yellow-400 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-black">
                Mission
              </h3>
              <p className="text-sm text-black/80">{about.mission}</p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">
              Footer
            </h2>
            <p className="text-sm text-neutral-600">
              {about.footer_text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}