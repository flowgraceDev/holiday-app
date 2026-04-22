// app/admin/modules/hero/components/hero-list.tsx
import { getHeroes, deleteHero } from "@/app/lib/supabase/actions/admin/adminCreate";
import CreateHeroModal from "./create-hero-modal";
import Image from "next/image";

export default async function HeroList() {
  const heroes = await getHeroes();

  return (
    <div className="p-10 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Hero Sections
        </h1>
        <CreateHeroModal />
      </div>

      <div className="grid gap-6">
        {heroes.map((h) => (
          <div
            key={h.id}
            className="group relative flex items-center gap-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-lg transition"
          >
            <div className="relative h-32 w-56 overflow-hidden rounded-2xl border">
              <Image
                src={h.image_url}
                alt={h.title}
                fill
                sizes="(max-width: 768px) 100vw, 224px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 space-y-2">
              <p className="text-base font-semibold text-neutral-900">
                {h.title}
              </p>
              <p className="text-sm text-neutral-500 line-clamp-2">
                {h.subtitle}
              </p>

              <div className="flex items-center gap-4 pt-2 text-xs text-neutral-500">
                <span
                  className={`px-3 py-1 rounded-full ${
                    h.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {h.is_active ? "Active" : "Inactive"}
                </span>

                <span>Order: {h.sort_order}</span>
              </div>
            </div>

            <form
              action={async () => {
                "use server";
                await deleteHero(h.id);
              }}
            >
              <button className="opacity-0 group-hover:opacity-100 transition text-sm text-red-600 hover:underline">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}