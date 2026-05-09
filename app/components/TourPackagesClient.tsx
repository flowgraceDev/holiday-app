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
  return words.length > 3 ? short + "..." : short;
}

export default function TourPackagesClient({ tours }: { tours: Tour[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const duplicated = [...tours, ...tours];

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 260;
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

      const cardWidth = el.firstElementChild?.clientWidth || 260;
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
    <section className="relative py-4 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden -mt-6">
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* HEADER */}
        <div className="mb-5 text-center">
          <p className="text-yellow-600 font-semibold tracking-widest uppercase text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-yellow-500" />
       Discover top destinations crafted for seamless journeys.
            <span className="w-8 h-[2px] bg-yellow-500" />
          </p>

          {/* <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
           
          </p> */}
        </div>

        {/* ARROWS */}
        <div className="hidden md:flex absolute right-4 top-20 gap-2 z-10">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        {/* CARDS */}
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
              className="group min-w-[75%] sm:min-w-[40%] lg:min-w-[20%] snap-start"
              prefetch={false}
            >
              <div className="rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {/* IMAGE */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={tour.featured_image}
                    alt={tour.title}
                    fill
                    sizes="(max-width:768px) 75vw, (max-width:1200px) 40vw, 25vw"
                    quality={30}
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-900 text-xs font-semibold line-clamp-2">
                      {formatTitle(tour.title)}
                    </h3>
                  </div>

                  <div className="text-right">
                    {/* <p className="text-slate-900 text-xs font-semibold">
                      ₹{tour.price}
                    </p> */}
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
