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
import { getServices } from "../lib/supabase/actions/public/services";

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

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getServices();
      setServices(res || []);
    })();
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
        })),
    [services],
  );

  const count = activeServices.length;

  const isScroll = count > 5;

  const containerClass = isScroll
    ? "flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-2"
    : "flex justify-center flex-wrap gap-5";

  const itemClass = isScroll ? "min-w-[200px] snap-start" : "w-[200px]";

  return (
    <section className="pt-6 pb-16 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-yellow-600 font-semibold tracking-widest uppercase text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-yellow-500" />
            Our Services
            <span className="w-8 h-[2px] bg-yellow-500" />
          </p>

          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Travel Solutions
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Crafted journeys for seamless travel across India & beyond.
          </p>
        </div>

        <div className={containerClass}>
          {activeServices.map((s) => {
            const Icon = getIcon(s);

            return (
              <Link
                key={s.id}
                href={s.route}
                className={`group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition ${itemClass}`}
              >
                {/* INCREASED IMAGE HEIGHT */}
                <div className="relative h-40 w-full">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    quality={80}
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover object-center will-change-transform transform-gpu group-hover:scale-105 transition-transform duration-500 ease-out"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSIjMTExIj48L3N2Zz4="
                  />
                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <Icon className="text-2xl mb-1" />
                    <span className="text-xs font-semibold text-center px-2 leading-tight">
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
