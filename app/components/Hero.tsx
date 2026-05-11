// app/components/Hero.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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
    }, 4000);

    return () => clearInterval(id);
  }, [items.length]);

  const current = content[index % content.length];

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">

      {/* SLIDER IMAGES */}
      {items.map((item, i) => (
        <div key={item.image} className="absolute inset-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={i === 0}
            quality={80}
            sizes="100vw"
            className={`object-cover object-center will-change-transform transform-gpu transition-all duration-700 ease-out ${
              i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />

          <div
            className={`absolute inset-0 flex items-end justify-start p-6 md:p-10 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2
              className={`text-white text-3xl sm:text-5xl md:text-4xl font-light leading-tight tracking-wide 
              [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_0_24px_rgba(0,0,0,0.45)]
              ${dancing.className}`}
            >
              {item.title}
            </h2>
          </div>
        </div>
      ))}

      {/* OVERLAY CARD (same style slider logic) */}
      <div className="absolute bottom-8 right-6 md:right-10 w-full max-w-sm z-10 text-right">
        <div className="bg-white/20 border border-white/30 rounded-2xl p-5 shadow-2xl backdrop">
          <h2
            className={`text-2xl md:text-3xl text-yellow-400 ${dancing.className}`}
          >
            {current.title}
          </h2>

          <h3 className="mt-1 text-sm text-white">
            {current.subtitle}
          </h3>

          <p className="mt-1 text-white/80 text-xs">
            {current.desc}
          </p>

          <button
            onClick={() => router.push("/about")}
            className="mt-4 px-5 py-2 text-xs font-semibold rounded-full 
            bg-gradient-to-r from-yellow-500 to-yellow-600 
            hover:from-yellow-600 hover:to-yellow-700 
            transition-all shadow-lg active:scale-95"
          >
            Start Your Journey
          </button>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {items.map((_, i) => (
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