// app/components/Hero.tsx

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
    <section className="relative w-full h-[55vh] overflow-hidden rounded-xl sm:rounded-2xl isolate">
      {optimizedItems.map((item, i) => (
        <div
          key={`${item.image}-${i}`}
          className={`absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl transition-opacity duration-700 will-change-opacity ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
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
              className={`text-white text-2xl sm:text-4xl md:text-5xl font-light leading-tight tracking-wide
              [text-shadow:0_2px_8px_rgba(0,0,0,0.9)]
              ${dancing.className}`}
            >
              {item.title}
            </h2>
          </div>
        </div>
      ))}

      <div className="hidden md:block absolute bottom-8 right-6 md:right-10 w-full max-w-sm z-20 text-right">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-[2px]">
          <h2
            className={`rounded-xl bg-black/60 px-4 py-2 text-4xl text-yellow-300 lg:text-5xl ${dancing.className}`}
          >
            {current.title}
          </h2>

          <h3 className="mt-2 inline-block rounded-lg bg-black/40 px-3 py-1 text-sm text-white">
            {current.subtitle}
          </h3>

          <p className="mt-2 inline-block rounded-lg bg-black/30 px-3 py-1 text-xs text-white/80">
            {current.desc}
          </p>

          <button
            onClick={() => router.push("/about")}
            className="mt-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 px-5 py-2 text-xs font-semibold shadow-lg transition-all hover:from-yellow-600 hover:to-yellow-700 active:scale-95"
          >
            Start Your Journey
          </button>
        </div>
      </div>

      <div className="md:hidden absolute bottom-0 left-0 right-0 z-20">
        <div className="flex items-center justify-between bg-black/50 p-4 backdrop-blur-md">
          <div>
            <h3 className={`text-lg text-white ${dancing.className}`}>
              {current.title}
            </h3>

            <p className="text-xs text-white/70">{current.subtitle}</p>
          </div>

          <button
            onClick={() => router.push("/about")}
            className="rounded-full bg-yellow-500 px-4 py-2 text-xs font-semibold text-black active:scale-95"
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
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-yellow-400" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}