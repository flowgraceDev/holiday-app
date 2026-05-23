"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getDestinations } from "@/app/lib/supabase/actions/public/services";

type Destination = {
  id: string;
  name: string;
  image_url: string;
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSIjZTVlN2ViIj48L3N2Zz4=";

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await getDestinations();

        if (!mounted) return;

        setDestinations(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const optimizedDestinations = useMemo(
    () =>
      destinations.map((d) => ({
        ...d,
        image_url: `${d.image_url}?width=1200&quality=60`,
      })),
    [destinations]
  );

  if (loading) {
    return <div className="h-[400px]" />;
  }

  if (!optimizedDestinations.length) return null;

  const featured = optimizedDestinations[0];
  const rest = optimizedDestinations.slice(1, 5);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 pb-24">
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
          <div className="group relative h-[360px] overflow-hidden rounded-2xl lg:col-span-2 bg-slate-100 isolate">
            <Image
              src={featured.image_url}
              alt={featured.name}
              fill
              unoptimized
              priority
              quality={60}
              draggable={false}
              placeholder="blur"
              blurDataURL={blurDataURL}
              sizes="(max-width:1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-slate-900 backdrop-blur">
              Featured
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-xl font-semibold text-white md:text-2xl">
                {featured.name}
              </h3>

              <p className="mt-1 text-sm text-white/70">
                Premium curated tour experience
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {rest.map((d, index) => (
              <div
                key={d.id}
                className="group relative h-[170px] overflow-hidden rounded-xl bg-slate-100 isolate"
              >
                <Image
                  src={d.image_url}
                  alt={d.name}
                  fill
                  unoptimized
                  quality={50}
                  loading="lazy"
                  draggable={false}
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  sizes="(max-width:1024px) 50vw, 16vw"
                  className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />

                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-xs font-medium text-white">
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