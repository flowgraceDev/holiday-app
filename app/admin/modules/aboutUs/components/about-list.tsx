import { getAbout } from "@/app/lib/supabase/actions/admin/adminCreate";
import CreateAboutModal from "./create-about-modal";
import UpdateAboutModal from "./edit-about-model";
import Image from "next/image";
import DeleteAboutButton from "./delete-about-button";

export const dynamic = "force-dynamic";

export default async function AboutList() {
  const about = await getAbout();

  return (
    <div className="space-y-10 p-10 bg-[#0B1020] min-h-screen text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
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
          <div className="flex items-center justify-end rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-sm">
            <DeleteAboutButton id={about?.id} />
          </div>

          <div className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm">
            <div className="mb-5 grid grid-cols-4 gap-3">
              {about.hero?.images?.length ? (
                about.hero.images.map((img: string, i: number) => (
                  <div
                    key={i}
                    className="relative h-24 w-full overflow-hidden rounded-xl border border-white/10"
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
                <div className="text-sm text-white/60">No images</div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-lg font-semibold text-white">
                {about.hero?.title}
              </p>

              <p className="text-sm text-white/70">
                {about.hero?.subtitle}
              </p>

              <p className="text-sm text-white/60 line-clamp-2">
                {about.hero?.description}
              </p>
            </div>
          </div>

          <div className="group relative flex items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm">
            <div className="relative h-28 w-44 shrink-0 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={about.intro?.image_url || "/placeholder.jpg"}
                alt="intro"
                width={176}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-1">
              <p className="text-lg font-semibold text-white">
                {about.intro?.title}
              </p>

              <p className="text-sm text-white/70">
                {about.intro?.para1}
              </p>

              <p className="text-sm text-white/60 line-clamp-2">
                {about.intro?.para2}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Services
            </h2>

            <div className="flex flex-wrap gap-2">
              {about.services?.map((s: string, i: number) => (
                <span
                  key={i}
                  className="rounded-full bg-white/[0.06] px-3 py-1 text-sm text-white/80 border border-white/10"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-black to-[#0B1020] p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-white">
                About Us
              </h3>
              <p className="text-sm text-white/80">{about.vision}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-yellow-400 to-amber-500 p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-semibold text-black">
                About Our Drivers
              </h3>
              <p className="text-sm text-black/80">{about.mission}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-white">
              Footer
            </h2>
            <p className="text-sm text-white/70">
              {about.footer_text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}