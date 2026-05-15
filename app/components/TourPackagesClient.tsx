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
  const short = words.slice(0, 5).join(" ");
  return words.length > 5 ? short + "..." : short;
}

export default function TourPackagesClient({ tours }: { tours: Tour[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const duplicated = [...tours, ...tours];

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.firstElementChild as HTMLElement | null;
    const cardWidth = card?.offsetWidth || 240;

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

      const card = el.firstElementChild as HTMLElement | null;
      const cardWidth = card?.offsetWidth || 240;

      el.scrollBy({ left: cardWidth, behavior: "smooth" });

      if (el.scrollLeft >= el.scrollWidth / 2) {
        el.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
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
    <section className="relative  bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 relative">
        <div className="mb-4 sm:mb-6 text-center">
          <p className="text-yellow-600 font-semibold tracking-widest uppercase text-[11px] sm:text-sm flex items-center justify-center gap-2">
            <span className="w-6 sm:w-10 h-[2px] bg-yellow-500" />
            Discover top destinations
            <span className="w-6 sm:w-10 h-[2px] bg-yellow-500" />
          </p>
        </div>

        {/* ARROWS */}
        <div className="hidden md:flex absolute right-2 sm:right-4 top-10 sm:top-14 gap-2 z-10">
          <button
            onClick={() => scroll("left")}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 shadow-lg flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 shadow-lg flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* CARDS */}
        <div
          ref={scrollRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 no-scrollbar"
        >
          {duplicated.map((tour, index) => (
            <Link
              key={`${tour.id}-${index}`}
              href={`/tours/${tour.slug}`}
              className="group flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[22%] snap-start"
              prefetch={false}
            >
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg transition-all duration-300 active:scale-[0.98]">
                <div className="relative h-40 sm:h-44 overflow-hidden">
                  <Image
                    src={tour.featured_image}
                    alt={tour.title}
                    fill
                    sizes="(max-width:640px) 85vw, (max-width:1024px) 45vw, 25vw"
                    quality={50}
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-2 sm:p-3 flex items-center justify-between">
                  <h3 className="text-slate-900 text-[11px] sm:text-xs font-semibold line-clamp-2">
                    {formatTitle(tour.title)}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}