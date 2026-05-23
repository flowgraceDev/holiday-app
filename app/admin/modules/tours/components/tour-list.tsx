// app/admin/modules/tours/components/tour-list.tsx

import { getTours } from "@/app/lib/supabase/actions/admin/adminCreate";
import CreateTourModal from "./create-tour-modal";
import Image from "next/image";
import TourStatusToggle from "./tour-status-toggle";
import EditTourModal from "./edit-tour-modal";

export const dynamic = "force-dynamic";

const TOUR_REGIONS = [
  "north",
  "south",
  "east",
  "west",
  "central",
  "india-nepal",
] as const;

type TourRegion = (typeof TOUR_REGIONS)[number];

const REGION_LABELS: Record<TourRegion, string> = {
  north: "North India",
  south: "South India",
  east: "East India",
  west: "West India",
  central: "Central India",
  "india-nepal": "India & Nepal",
};

type Props = {
  searchParams?: {
    searchParams?: {
      region?: string | string[];
    };
  };
};

export default async function TourList({ searchParams }: Props) {
  const tours = await getTours();

  const rawRegion =
    typeof searchParams?.searchParams?.region === "string"
      ? searchParams.searchParams.region
      : Array.isArray(searchParams?.searchParams?.region)
      ? searchParams.searchParams.region[0]
      : undefined;

  const activeRegion: TourRegion | undefined =
    rawRegion && (TOUR_REGIONS as readonly string[]).includes(rawRegion)
      ? (rawRegion as TourRegion)
      : undefined;

  const filteredTours = activeRegion
    ? tours.filter((t) => t.region === activeRegion)
    : [];

  const renderEmpty = (label: string) => (
    <div className="p-10 text-center text-sm text-white/60 border border-white/10 rounded-3xl bg-white/[0.03]">
      {label}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B1020] p-10 space-y-12 text-white">
      {activeRegion ? (
        <section className="space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-xl font-semibold text-white">
              {REGION_LABELS[activeRegion]}
            </h2>

            <span className="text-sm text-white/60">
              {filteredTours.length} tours in {activeRegion} region
            </span>

            <CreateTourModal />
          </div>

          {filteredTours.length === 0 ? (
            renderEmpty("No tours found for this region")
          ) : (
            <div className="grid gap-6">
              {filteredTours.map((t) => (
                <div
                  key={t.id}
                  className="group relative flex items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-sm"
                >
                  <div className="relative h-32 w-56 overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={t.featured_image}
                      alt={t.title}
                      width={224}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="truncate font-semibold text-white">
                      {t.title}
                    </p>

                    <p className="line-clamp-2 text-sm text-white/60">
                      {t.short_description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-xs text-white/60">
                      <span
                        className={`rounded-full px-3 py-1 border ${
                          t.is_active
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                      >
                        {t.is_active ? "Active" : "Inactive"}
                      </span>

                      <span className="capitalize">{t.region}</span>
                      <span>{t.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <EditTourModal tour={t} />
                    <TourStatusToggle id={t.id} isActive={t.is_active} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : (
        <div className="p-10 text-center text-white/60">
          Select a region to view tours
        </div>
      )}
    </div>
  );
}