// app/components/TourPackagesClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Tour = {
  id: string;
  slug: string;
  title: string;
  featured_image: string;
  duration: string;
  price: number;
};

function formatTitle(title: string) {
  if (!title) return "";

  const words = title.trim().split(" ");
  const short = words.slice(0, 3).join(" ");

  return words.length > 3 ? short + "..." : short;
}
export default function TourPackagesClient({ tours }: { tours: Tour[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const duplicated = [...tours, ...tours];

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 280;
    el.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, []);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      const cardWidth = el.firstElementChild?.clientWidth || 280;
      el.scrollBy({ left: cardWidth, behavior: "smooth" });

      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      }
    }, 3000);
  }, []);

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [startAutoScroll]);

  return (
    <section className="relative py-2 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden -mt-6">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="mb-4 text-center px-1 md:px-0">
          <p className="text-yellow-600 font-semibold tracking-widest uppercase text-[10px] flex items-center justify-center gap-2 mb-1">
            <span className="w-5 h-[2px] bg-yellow-500" />
            Plan Your Trip
            <span className="w-5 h-[2px] bg-yellow-500" />
          </p>

          <h2 className="text-lg md:text-xl font-semibold text-slate-900 mb-1">
            Curated Travel
          </h2>

          <p className="text-slate-600 text-[11px] md:text-xs max-w-sm mx-auto leading-tight">
            Discover top destinations crafted for seamless journeys.
          </p>
        </div>

        <div className="hidden md:flex absolute right-4 top-20 gap-2 z-10">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 rounded-full bg-white border shadow flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 rounded-full bg-white border shadow flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 no-scrollbar"
        >
          {duplicated.map((tour, index) => (
            <Link
              key={`${tour.id}-${index}`}
              href={`/tours/${tour.slug}`}
              className="group min-w-[80%] sm:min-w-[45%] lg:min-w-[23%] snap-start"
              prefetch={false}
            >
              <div className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={tour.featured_image}
                    alt={tour.title}
                    fill
                    sizes="(max-width:768px) 80vw, (max-width:1200px) 40vw, 30vw"
                    quality={30}
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-900 text-sm font-semibold line-clamp-2">
                      {formatTitle(tour.title)}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {tour.duration}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-900 text-sm font-semibold">
                      ₹{tour.price}
                    </p>
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