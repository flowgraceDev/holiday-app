// app/admin/modules/destinations/components/destination-list.tsx

import { getDestinations } from "@/app/lib/supabase/actions/admin/adminCreate";
import CreateDestinationModal from "./create-destination-modal";
import Image from "next/image";
import DeleteDestinationButton from "./delete-destinations-button";
import EditDestinationModal from "./edit-destination-modal";

export const dynamic = "force-dynamic";

export default async function DestinationList() {
  const destinations = await getDestinations();

  return (
    <div className="min-h-screen bg-[#0B1020] space-y-10 p-10 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
          Destinations
        </h1>

        <CreateDestinationModal />
      </div>

      <div className="grid gap-6">
        {destinations.map((d) => (
          <div
            key={d.id}
            className="group relative rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-sm"
          >
            <DeleteDestinationButton id={d.id} />

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 lg:h-32 lg:w-56">
                <Image
                  src={d.image_url}
                  alt={d.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 224px"
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1 space-y-2">
                  <h2 className="truncate text-lg font-semibold text-white">
                    {d.name}
                  </h2>

                  <p className="text-sm leading-6 text-white/60">
                    {d.slug}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start shrink-0">
                  <EditDestinationModal
                    destination={{
                      id: d.id,
                      name: d.name,
                      slug: d.slug,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}