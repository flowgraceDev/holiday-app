// app/components/Hero.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { dancing } from "@/app/fonts";
import { useRouter } from "next/navigation";

const content = [
  { title: "Travel India", subtitle: "No Surprises", desc: "Clear, smooth itineraries." },
  { title: "Travel Comfortably", subtitle: "Zero Stress", desc: "Everything handled for you." },
  { title: "Go Your Way", subtitle: "Stay Flexible", desc: "Plans that fit your time." },
  { title: "Real Experiences", subtitle: "Beyond Tours", desc: "Authentic, well-planned trips." },
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
    <section className="relative w-full h-[65vh] sm:h-[65vh] md:h-[65vh] overflow-hidden">
      {items.map((item, i) => (
        <div
          key={item.image}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={i === 0}
            quality={90}
            sizes="100vw"
            className="object-cover object-center md:object-[50%_35%]"
          />

          <div className="absolute inset-0 flex items-end p-4 sm:p-6 md:p-10">
            <h2
              className={`text-white text-2xl sm:text-4xl md:text-5xl font-light leading-tight tracking-wide 
              [text-shadow:0_2px_8px_rgba(0,0,0,0.9),0_0_24px_rgba(0,0,0,0.45)]
              ${dancing.className}`}
            >
              {item.title}
            </h2>
          </div>
        </div>
      ))}

      {/* DESKTOP / TABLET OVERLAY ONLY */}
      <div className="hidden md:block absolute bottom-8 right-6 md:right-10 w-full max-w-sm z-20 text-right">
        <div className="bg-white/20 border border-white/30 rounded-2xl p-5 shadow-2xl backdrop-blur-[2px]">
          <h2
            className={`text-4xl lg:text-5xl ${dancing.className} px-4 py-2 rounded-xl
            bg-black/60 text-yellow-300 backdrop-blur-md shadow-lg`}
          >
            {current.title}
          </h2>

          <h3 className="mt-2 text-sm text-white px-3 py-1 rounded-lg bg-black/50 backdrop-blur-sm inline-block">
            {current.subtitle}
          </h3>

          <p className="mt-2 text-white/80 text-xs px-3 py-1 rounded-lg bg-black/40 backdrop-blur-sm inline-block">
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

      {/* MOBILE CTA BAR */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-black/50 backdrop-blur-md p-4 flex items-center justify-between">
          <div>
            <h3 className={`text-white text-lg ${dancing.className}`}>
              {current.title}
            </h3>
            <p className="text-white/70 text-xs">{current.subtitle}</p>
          </div>

          <button
            onClick={() => router.push("/about")}
            className="px-4 py-2 text-xs font-semibold rounded-full 
            bg-yellow-500 text-black active:scale-95"
          >
            Explore
          </button>
        </div>
      </div>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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