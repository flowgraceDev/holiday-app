// app/admin/modules/hero/components/hero-list.tsx
import { getHeroes } from "@/app/lib/supabase/actions/admin/adminCreate";
import CreateHeroModal from "./create-hero-modal";
import Image from "next/image";
import DeleteHeroButton from "./delete-hero-button";
import EditHeroModal from "./edit-hero-modal";

export const dynamic = "force-dynamic";

export default async function HeroList() {
  const heroes = await getHeroes();

  return (
    <div className="min-h-screen bg-[#0B1020] p-10 space-y-10 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
          Hero Sections
        </h1>
        <CreateHeroModal />
      </div>

      <div className="grid gap-6">
        {heroes.map((h) => (
          <div
            key={h.id}
            className="group relative flex items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-sm hover:shadow-md transition-transform duration-200 will-change-transform"
          >
            <div className="relative h-32 w-56 overflow-hidden rounded-2xl border border-white/10 shrink-0">
              <Image
                src={h.image_url}
                alt={h.title}
                width={224}
                height={128}
                sizes="224px"
                loading="eager"
                className="object-cover rounded-2xl"
              />
            </div>

            <div className="flex-1 space-y-2 min-w-0">
              <p className="text-base font-semibold text-white truncate">
                {h.title}
              </p>
              <p className="text-sm text-white/60 line-clamp-2">
                {h.subtitle}
              </p>

              <div className="flex items-center gap-4 pt-2 text-xs flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full ${
                    h.is_active
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {h.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <EditHeroModal hero={h} />
            <DeleteHeroButton id={h.id} />
          </div>
        ))}
      </div>
    </div>
  );
}