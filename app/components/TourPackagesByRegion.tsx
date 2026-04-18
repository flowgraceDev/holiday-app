// app/components/TourPackages.tsx
import Link from "next/link";
import Image from "next/image";
import { getToursByRegion, Region } from "../lib/supabase/actions/public/tours";

type Props = {
  region: Region;
};

export default async function TourByRegions({ region }: Props) {
  console.log("request comes",region)
  const res = await getToursByRegion(region);
console.log("res",res)
  if (!res.success) return null;

  const tours = res.data;

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-14 max-w-2xl">
          <p className="text-yellow-600 font-semibold tracking-widest uppercase text-sm flex items-center gap-2">
            <span className="w-8 h-[2px] bg-yellow-500" />
            {region} India
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mt-3 capitalize">
            {region} Tour Packages
          </h2>

          <p className="text-slate-600 mt-3 text-sm md:text-base">
            Explore best tours in {region} India.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {tours.map((tour: any, index: number) => (
            <Link key={tour.id} href={`/tours/${tour.slug}`} prefetch={false}>
              <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300">

                <div className="relative h-60 overflow-hidden bg-slate-100">

                  <Image
                    src={tour.featured_image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading={index < 3 ? "eager" : "lazy"}
                    priority={index === 0}
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xl text-slate-900 text-xs px-3 py-1 rounded-full">
                    {tour.duration}
                  </div>

                </div>

                <div className="p-5 space-y-3">

                  <h3 className="font-semibold text-lg text-slate-900 line-clamp-2">
                    {tour.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-500">★★★★★</span>
                    <span className="text-slate-500">(25 Reviews)</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="font-semibold text-slate-900">
                      ₹{tour.price}
                      <span className="text-slate-500 text-sm font-normal"> / person</span>
                    </p>

                    <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition">
                      Book
                    </button>
                  </div>

                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}