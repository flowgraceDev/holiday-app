// app/components/destinations.tsx
import Image from "next/image";
import { getDestinations } from "@/app/lib/supabase/actions/admin/adminCreate";

export default async function Destinations() {
  const destinations = await getDestinations();

  if (!destinations?.length) return null;

  const featured = destinations[0];
  const rest = destinations.slice(1, 5);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="absolute -left-40 top-20 w-[500px] h-[500px] bg-blue-200/20 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-[2px] bg-yellow-500" />
            <p className="text-sm font-semibold tracking-widest text-yellow-600 uppercase">
              Destinations
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 leading-tight">
            Explore Top Indian Destinations
          </h2>

          <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
            Discover curated travel experiences across India’s most iconic cities,
            heritage sites and cultural landmarks.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="relative lg:col-span-2 h-[420px] rounded-3xl overflow-hidden group shadow-xl">
            <Image
              src={featured.image_url}
              alt={featured.name}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-xl text-slate-900 text-xs px-3 py-1 rounded-full font-medium">
              Featured Destination
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-white">
                {featured.name}
              </h3>
              <p className="text-white/70 text-sm mt-1">
                Premium curated tour experience
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {rest.map((d) => (
              <div
                key={d.id}
                className="relative h-[200px] rounded-2xl overflow-hidden group shadow-md"
              >
                <Image
                  src={d.image_url}
                  alt={d.name}
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />

                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-sm">
                    {d.name}
                  </p>
                </div>

                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-yellow-400/40 transition" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}