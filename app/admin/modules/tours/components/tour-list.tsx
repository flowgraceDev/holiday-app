// app/admin/modules/tours/components/tour-list.tsx
import {
  getTours,
} from "@/app/lib/supabase/actions/admin/adminCreate";
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

const REGION_LABELS: Record<(typeof TOUR_REGIONS)[number], string> = {
  north: "North India",
  south: "South India",
  east: "East India",
  west: "West India",
  central: "Central India",
  "india-nepal": "India & Nepal",
};

export default async function TourList() {
  const tours = await getTours();

  const groupedTours = TOUR_REGIONS.map((region) => ({
    region,
    tours: tours.filter((tour) => tour.region === region),
  }));

  return (
    <div className="p-10 space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">Tours</h1>
        <CreateTourModal />
      </div>

      <div className="space-y-12">
        {groupedTours.map(({ region, tours }) => (
          <section key={region} className="space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <h2 className="text-xl font-semibold text-neutral-900">
                {REGION_LABELS[region]}
              </h2>

              <span className="text-sm text-neutral-500">
                {tours.length} Tours
              </span>
            </div>

            {tours.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 py-10 text-center text-sm text-neutral-500">
                No tours available
              </div>
            ) : (
              <div className="grid gap-6">
                {tours.map((t) => (
                  <div
                    key={t.id}
                    className="group relative flex items-center gap-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative h-32 w-56 shrink-0 overflow-hidden rounded-2xl border">
                      <Image
                        src={t.featured_image}
                        alt={t.title}
                        width={224}
                        height={128}
                        className="h-full w-full rounded-2xl object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1 space-y-2">
                      <p className="truncate text-base font-semibold text-neutral-900">
                        {t.title}
                      </p>

                      <p className="line-clamp-2 text-sm text-neutral-500">
                        {t.short_description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-neutral-500">
                        <span
                          className={`rounded-full px-3 py-1 ${
                            t.is_active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {t.is_active ? "Active" : "Inactive"}
                        </span>

                        {t.featured && (
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                            Featured
                          </span>
                        )}

                        {t.region && (
                          <span className="rounded-full bg-neutral-100 px-3 py-1 capitalize text-neutral-700">
                            {t.region.replace("-", " ")}
                          </span>
                        )}

                        <span>{t.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <EditTourModal tour={t} />
                      <TourStatusToggle
                        id={t.id}
                        isActive={t.is_active}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}