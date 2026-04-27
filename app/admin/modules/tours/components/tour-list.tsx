// app/admin/modules/tours/components/tour-list.tsx
import { getTours } from "@/app/lib/supabase/actions/admin/adminCreate";
import CreateTourModal from "./create-tour-modal";
import Image from "next/image";
import TourStatusToggle from "./tour-status-toggle";
import EditTourModal from "./edit-tour-modal";

export const dynamic = "force-dynamic";

export default async function TourList() {
  const tours = await getTours();

  return (
    <div className="p-10 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Tours
        </h1>
        <CreateTourModal />
      </div>

      <div className="grid gap-6">
        {tours.map((t) => (
          <div
            key={t.id}
            className="group relative flex items-center gap-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="relative h-32 w-56 overflow-hidden rounded-2xl border shrink-0">
              <Image
                src={t.featured_image}
                alt={t.title}
                width={224}
                height={128}
                className="object-cover rounded-2xl"
              />
            </div>

            <div className="flex-1 space-y-2 min-w-0">
              <p className="text-base font-semibold text-neutral-900 truncate">
                {t.title}
              </p>
              <p className="text-sm text-neutral-500 line-clamp-2">
                {t.short_description}
              </p>

              <div className="flex items-center gap-4 pt-2 text-xs text-neutral-500 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full ${
                    t.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {t.is_active ? "Active" : "Inactive"}
                </span>

                {t.featured && (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    Featured
                  </span>
                )}

                <span>₹ {t.price}</span>
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
    </div>
  );
}