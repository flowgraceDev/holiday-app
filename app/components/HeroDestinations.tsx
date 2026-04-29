// app/components/destinations.tsx
import Image from "next/image";
import { getDestinations } from "@/app/lib/supabase/actions/public/services";

export const revalidate = 300;

export default  function Destinations() {
  const destinations:any = getDestinations();

  if (!destinations?.length) return null;

  const featured = destinations[0];
  const rest = destinations.slice(1, 5);

  return (
    <section className="relative pt-16 pb-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="absolute -left-40 top-20 w-[400px] h-[400px] bg-blue-200/20 blur-2xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-10 max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-yellow-500" />
            <p className="text-xs font-semibold tracking-widest text-yellow-600 uppercase">
              Destinations
            </p>
          </div>

          <h2 className="text-2xl md:text-4xl font-semibold text-slate-900 leading-tight">
            Explore Top Indian Destinations
          </h2>

          <p className="mt-3 text-slate-600 text-sm md:text-base leading-relaxed">
            Discover curated travel experiences across India’s iconic locations.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="relative lg:col-span-2 h-[360px] rounded-2xl overflow-hidden group">
            <Image
              src={featured.image_url}
              alt={featured.name}
              fill
              sizes="(max-width:1024px) 100vw, 66vw"
              priority={false}
              className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-[10px] px-2 py-1 rounded-full font-medium">
              Featured
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-xl md:text-2xl font-semibold text-white">
                {featured.name}
              </h3>
               <p className="text-white/70 text-sm mt-1">
                Premium curated tour experience
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {rest.map((d:any) => (
              <div
                key={d.id}
                className="relative h-[170px] rounded-xl overflow-hidden group"
              >
                <Image
                  src={d.image_url}
                  alt={d.name}
                  fill
                  sizes="(max-width:1024px) 50vw, 16vw"
                  quality={20}
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium">
                    {d.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}