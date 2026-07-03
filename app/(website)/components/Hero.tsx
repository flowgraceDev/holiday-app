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
    <section className="relative isolate h-[55vh] w-full overflow-hidden rounded-xl sm:rounded-2xl">
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

          <div className="absolute inset-0 flex items-end p-4 sm:p-6 md:p-10">
            <h2
              className={`text-2xl font-light leading-tight tracking-wide text-white sm:text-4xl md:text-5xl [text-shadow:0_2px_8px_rgba(0,0,0,0.9)] ${dancing.className}`}
            >
              {item.title}
            </h2>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 right-6 z-20 hidden w-full max-w-sm text-right md:block md:right-10">
        <div>
          <h2
            className={`text-4xl text-yellow-300 lg:text-5xl [text-shadow:0_2px_10px_rgba(0,0,0,0.95)] ${dancing.className}`}
          >
            {current.title}
          </h2>

          <h3 className="mt-2 text-lg font-medium text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.95)]">
            {current.subtitle}
          </h3>

          <p className="mt-2 text-sm text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.95)]">
            {current.desc}
          </p>

          <button
            onClick={() => router.push("/about")}
            className="mt-5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-5 py-2 text-sm font-semibold text-black shadow-lg transition-all hover:from-yellow-600 hover:to-yellow-700 active:scale-95"
          >
            Start Your Journey
          </button>
        </div>
      </div>

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

      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {optimizedItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-yellow-400" : "w-2 bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}