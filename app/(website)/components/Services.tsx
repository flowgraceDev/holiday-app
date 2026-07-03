"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaSuitcaseRolling,
  FaCar,
  FaPlane,
  FaTrain,
  FaRoute,
} from "react-icons/fa";
import { useEffect, useMemo, useState } from "react";
import { getServices } from "../../lib/supabase/actions/public/services";

type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  route: string;
  is_active: boolean;
};

const getIcon = (service: Service) => {
  const text = `${service.title} ${service.slug}`.toLowerCase();

  if (text.includes("car")) return FaCar;
  if (text.includes("flight")) return FaPlane;
  if (text.includes("train")) return FaTrain;
  if (text.includes("tour")) return FaSuitcaseRolling;
  if (text.includes("track") || text.includes("trek")) return FaRoute;

  return FaRoute;
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSIjZTVlN2ViIj48L3N2Zz4=";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const res = await getServices();

      if (!mounted) return;

      setServices(res || []);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const activeServices = useMemo(
    () =>
      services
        .filter((s) => s.is_active)
        .map((s) => ({
          ...s,
          title: s.title.trim(),
          slug: s.slug.trim(),
          route: s.route.trim(),
          image: `${s.image}?width=800&quality=60`,
        })),
    [services],
  );

  const count = activeServices.length;

  const isScroll = count > 5;

  const containerClass = isScroll
    ? "flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2 pb-2 will-change-scroll"
    : "flex justify-center flex-wrap gap-5";

  const itemClass = isScroll ? "min-w-[200px] snap-start" : "w-[200px]";

  return (
    <section className="pt-6 pb-16 bg-transparent py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="flex items-center justify-center gap-2 text-sm font-semibold tracking-widest uppercase text-yellow-600">
            <span className="w-8 h-[2px] bg-yellow-500" />
            Our Services
            <span className="w-8 h-[2px] bg-yellow-500" />
          </p>

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Travel <span className="text-yellow-600">Solutions</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm leading-relaxed text-slate-600 md:text-base">
            Crafted journeys for seamless travel across India & beyond.
          </p>
        </div>

        <div className={containerClass}>
          {activeServices.map((s, index) => {
            const Icon = getIcon(s);

            return (
              <Link
                key={s.id}
                href={s.route}
                prefetch={false}
                className={`group overflow-hidden rounded bg-white shadow-sm transition-all duration-300 hover:shadow-md active:scale-[0.98] ${itemClass}`}
              >
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    unoptimized
                    quality={60}
                    loading={index < 2 ? "eager" : "lazy"}
                    priority={index < 2}
                    draggable={false}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    sizes="(max-width:768px) 50vw, 20vw"
                    className="object-cover object-center transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]"
                  />

                  <div className="absolute inset-0 bg-black/35" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <Icon className="mb-1 text-2xl" />

                    <span className="px-2 text-center text-xs font-semibold leading-tight">
                      {s.title}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
