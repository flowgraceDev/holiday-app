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

export default function TourPackagesClient({ tours }: { tours: Tour[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const duplicated = [...tours, ...tours];

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 300;
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

      const cardWidth = el.firstElementChild?.clientWidth || 300;
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
    <section className="relative py-5 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mb-16 text-center">
          <p className="text-yellow-600 font-semibold tracking-widest uppercase text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-yellow-500" />
            Plan Your Trip
            <span className="w-8 h-[2px] bg-yellow-500" />
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Curated Travel Experiences
          </h2>
          <p className="mt-3 text-slate-600 text-sm md:text-base max-w-xl mx-auto">
            Discover India's most iconic destinations crafted for unforgettable
            journeys.
          </p>
        </div>

        <div className="hidden md:flex absolute right-6 top-24 gap-3 z-10">
          <button
            onClick={() => scroll("left")}
            className="w-11 h-11 rounded-full bg-white border shadow flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-11 h-11 rounded-full bg-white border shadow flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
        >
          {duplicated.map((tour, index) => (
            <Link
              key={`${tour.id}-${index}`}
              href={`/tours/${tour.slug}`}
              className="group min-w-[85%] sm:min-w-[48%] lg:min-w-[32%] snap-start"
              prefetch={false}
            >
              <div className="rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tour.featured_image}
                    alt={tour.title}
                    fill
                    sizes="(max-width:768px) 80vw, (max-width:1200px) 40vw, 30vw"
                    quality={30}
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition duration-500 will-change-transform"
                  />
                </div>

                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-900 font-semibold line-clamp-2">
                      {tour.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {tour.duration}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-slate-900 font-semibold">
                      ₹{tour.price}
                    </p>
                    <span className="text-xs text-slate-500">per person</span>
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
