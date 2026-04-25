// app/admin/modules/destinations/components/destination-list.tsx
import { getDestinations } from "@/app/lib/supabase/actions/admin/adminCreate";
import CreateDestinationModal from "./create-destination-modal";
import Image from "next/image";
import DeleteDestinationButton from "./delete-destinations-button";

export const dynamic = "force-dynamic";

export default async function DestinationList() {
  const destinations = await getDestinations();

  return (
    <div className="p-10 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Destinations
        </h1>
        <CreateDestinationModal />
      </div>

      <div className="grid gap-6">
        {destinations.map((d) => (
          <div
            key={d.id}
            className="group relative flex items-center gap-6 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm hover:shadow-md transition-transform duration-200 will-change-transform"
          >
            <div className="relative h-32 w-56 overflow-hidden rounded-2xl border shrink-0">
              <Image
                src={d.image_url}
                alt={d.name}
                width={224}
                height={128}
                sizes="224px"
                loading="lazy"
                className="object-cover rounded-2xl"
              />
            </div>

            <div className="flex-1 space-y-2 min-w-0">
              <p className="text-base font-semibold text-neutral-900 truncate">
                {d.name}
              </p>
              <p className="text-sm text-neutral-500 line-clamp-2">
                {d.description}
              </p>

              {/* <div className="flex items-center gap-4 pt-2 text-xs text-neutral-500 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full ${
                    d.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {d.is_active ? "Active" : "Inactive"}
                </span>

                {d.featured && (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    Featured
                  </span>
                )}

                {d.region && <span>{d.region}</span>}
              </div> */}
            </div>

            <DeleteDestinationButton id={d.id} />
          </div>
        ))}
      </div>
    </div>
  );
}