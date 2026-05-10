"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDestinations } from "@/app/lib/supabase/actions/public/services";

type Destination = {
  id: string;
  name: string;
  image_url: string;
};

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await getDestinations();
        setDestinations(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, []);

  if (loading) {
    return <div className="h-[400px]" />;
  }

  if (!destinations.length) return null;

  const featured = destinations[0];
  const rest = destinations.slice(1, 5);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50  pb-24">
      <div className="absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-200/20 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-[2px] w-8 bg-yellow-500" />

            <p className="text-xs font-semibold uppercase tracking-widest text-yellow-600">
              Destinations
            </p>

            <span className="h-[2px] w-8 bg-yellow-500" />
          </div>

          <h2 className="text-2xl font-semibold leading-tight text-slate-900 md:text-4xl">
            Explore Top Indian Destinations
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Discover curated travel experiences across India’s iconic locations.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="group relative h-[360px] overflow-hidden rounded-2xl lg:col-span-2">
            <Image
              src={featured.image_url}
              alt={featured.name}
              fill
              sizes="(max-width:1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute top-4 left-4 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-slate-900 backdrop-blur">
              Featured
            </div>

            <div className="absolute right-5 bottom-5 left-5">
              <h3 className="text-xl font-semibold text-white md:text-2xl">
                {featured.name}
              </h3>

              <p className="mt-1 text-sm text-white/70">
                Premium curated tour experience
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {rest.map((d) => (
              <div
                key={d.id}
                className="group relative h-[170px] overflow-hidden rounded-xl"
              >
                <Image
                  src={d.image_url}
                  alt={d.name}
                  fill
                  sizes="(max-width:1024px) 50vw, 16vw"
                  quality={20}
                  loading="lazy"
                  className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />

                <div className="absolute right-2 bottom-2 left-2">
                  <p className="text-xs font-medium text-white">{d.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
