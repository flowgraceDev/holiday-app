"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { dancing } from "@/app/fonts";
import { useRouter } from "next/navigation";

const content = [
  {
    title: "Travel India",
    subtitle: "No Surprises",
    desc: "Clear, smooth itineraries.",
  },
  {
    title: "Travel Comfortably",
    subtitle: "Zero Stress",
    desc: "Everything handled for you.",
  },
  {
    title: "Go Your Way",
    subtitle: "Stay Flexible",
    desc: "Plans that fit your time.",
  },
  {
    title: "Real Experiences",
    subtitle: "Beyond Tours",
    desc: "Authentic, well-planned trips.",
  },
];

export type HeroItem = {
  image: string;
  title: string;
};

export default function Hero({ items = [] }: { items?: HeroItem[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(id);
  }, [items.length]);

  const current = content[index % content.length];

  const optimizedItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      image: `${item.image}?width=1600&quality=70`,
    }));
  }, [items]);

  return (
    <section className="relative isolate h-[60vh] w-full overflow-hidden rounded-xl sm:rounded-2xl">
      {optimizedItems.map((item, i) => (
        <div
          key={`${item.image}-${i}`}
          className={`absolute inset-0 overflow-hidden rounded-xl transition-opacity duration-700 will-change-opacity sm:rounded-2xl ${
            i === index ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
            quality={70}
            unoptimized
            sizes="100vw"
            className="object-cover object-center md:object-[50%_20%]"
          />

          <div className="absolute inset-0 bg-black/20" />

          {/* Image title - Bottom Right */}
          <div className="absolute bottom-6 right-6 z-20">
            <h2
              className={`text-right text-2xl font-light leading-tight tracking-wide text-white sm:text-4xl md:text-5xl [text-shadow:0_2px_8px_rgba(0,0,0,0.9)] ${dancing.className}`}
            >
              {item.title}
            </h2>
          </div>

          {/* Glass Card - Bottom Left */}
          <div className="absolute bottom-6 left-6 z-20 hidden max-w-md md:block">
            <div className="rounded-3xl border border-white/15 bg-black/35 p-6 backdrop-blur-xl shadow-2xl">
              <h2
                className={`text-4xl text-yellow-300 ${dancing.className}`}
              >
                {current.title}
              </h2>

              <h3 className="mt-2 text-xl font-semibold text-white">
                {current.subtitle}
              </h3>

              <p className="mt-3 text-sm leading-7 text-white/85">
                {current.desc}
              </p>

              <button
                onClick={() => router.push("/about")}
                className="mt-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 px-6 py-3 font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/30"
              >
                Start Your Journey →
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Mobile Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-20 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`text-2xl text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.95)] ${dancing.className}`}
            >
              {current.title}
            </h3>

            <p className="text-sm text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.95)]">
              {current.subtitle}
            </p>
          </div>

          <button
            onClick={() => router.push("/about")}
            className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-black shadow-lg active:scale-95"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {optimizedItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index
                ? "w-8 bg-yellow-400"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}