// app/components/TourPackagesClient.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useCallback, useMemo } from "react";
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

  return words.length > 5 ? `${short}...` : short;
}

const AUTO_SCROLL_INTERVAL = 3500;
const CARD_FALLBACK_WIDTH = 280;

export default function TourPackagesClient({
  tours,
}: {
  tours: Tour[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const duplicatedTours = useMemo(
    () => [...tours, ...tours],
    [tours]
  );

  const getCardWidth = useCallback(() => {
    const el = scrollRef.current;

    if (!el) return CARD_FALLBACK_WIDTH;

    const card = el.firstElementChild as HTMLElement | null;

    return card?.offsetWidth || CARD_FALLBACK_WIDTH;
  }, []);

  const scroll = useCallback(
    (dir: "left" | "right") => {
      const el = scrollRef.current;

      if (!el) return;

      const cardWidth = getCardWidth();

      el.scrollBy({
        left: dir === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    },
    [getCardWidth]
  );

  const stopAutoScroll = useCallback(() => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current || tours.length <= 1) return;

    intervalRef.current = setInterval(() => {
      const el = scrollRef.current;

      if (!el) return;

      const cardWidth = getCardWidth();

      el.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });

      if (el.scrollLeft >= el.scrollWidth / 2) {
        requestAnimationFrame(() => {
          el.scrollTo({
            left: 0,
            behavior: "instant" as ScrollBehavior,
          });
        });
      }
    }, AUTO_SCROLL_INTERVAL);
  }, [getCardWidth, tours.length]);

  useEffect(() => {
    startAutoScroll();

    return () => stopAutoScroll();
  }, [startAutoScroll, stopAutoScroll]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4">
        <div className="mb-4 sm:mb-6 text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] sm:text-sm font-semibold tracking-widest uppercase text-yellow-600">
            <span className="w-6 sm:w-10 h-[2px] bg-yellow-500" />
            Discover top destinations
            <span className="w-6 sm:w-10 h-[2px] bg-yellow-500" />
          </p>
        </div>

        <div className="hidden md:flex absolute right-2 sm:right-4 top-10 sm:top-14 gap-2 z-20">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/70 text-white shadow-lg transition hover:bg-black"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black/70 text-white shadow-lg transition hover:bg-black"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 no-scrollbar will-change-scroll"
        >
          {duplicatedTours.map((tour, index) => (
            <Link
              key={`${tour.id}-${index}`}
              href={`/tours/${tour.slug}`}
              prefetch={false}
              className="group flex-shrink-0 snap-start w-[85%] sm:w-[45%] lg:w-[22%]"
            >
              <article className="overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg active:scale-[0.98]">
                <div className="relative h-40 sm:h-44 overflow-hidden bg-slate-100">
                  <Image
                    src={tour.featured_image}
                    alt={tour.title}
                    fill
                    loading="lazy"
                    quality={60}
                    unoptimized
                    draggable={false}
                    sizes="(max-width:640px) 85vw, (max-width:1024px) 45vw, 22vw"
                    className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex items-center justify-between p-2 sm:p-3">
                  <h3 className="line-clamp-2 text-[11px] sm:text-xs font-semibold text-slate-900">
                    {formatTitle(tour.title)}
                  </h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}