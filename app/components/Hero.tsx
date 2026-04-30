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
    <section className="relative w-full h-[50vh] overflow-hidden">
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
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PScxMDAlJyBmaWxsPSIjMTExIj48L3N2Zz4="
          />

          <div
            className={`absolute inset-0 flex items-end justify-end p-6 md:p-10 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <h2
              className={`absolute bottom-6 left-6 md:bottom-1 md:left-10 
  text-white text-3xl sm:text-5xl md:text-3xl lg:text-3xl 
  font-light leading-tight tracking-wide 
  drop-shadow-[0_6px_30px_rgba(0,0,0,0.9)] 
  ${dancing.className}`}
            >
              {item.title}
            </h2>
          </div>
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute bottom-8 right-6 md:right-10 w-full max-w-sm z-10 text-right">
        <div className="bg-white/10 border border-white/20 rounded-2xl p-5 shadow-2xl ">
          <h2
            className={`text-2xl md:text-3xl text-yellow-400 ${dancing.className}`}
          >
            {current.title}
          </h2>
          <h3 className="mt-1 text-sm text-white/90">{current.subtitle}</h3>
          <p className="mt-1 text-white/70 text-xs">{current.desc}</p>
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
    </section>
  );
}
