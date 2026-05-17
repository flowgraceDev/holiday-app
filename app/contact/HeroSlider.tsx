"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  images: string[];
  title?: string;
  subtitle?: string;
  description?: string;
  dancing?: { className?: string };
};

export default function HeroSlider({
  images,
  title,
  subtitle,
  description,
  dancing,
}: Props) {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!images?.length) return;

    const id = setInterval(() => {
      setIndex((p) => (p + 1) % images.length);
    }, 4000);

    return () => clearInterval(id);
  }, [images?.length]);

  if (!images?.length) return null;

  return (
    <section className="relative w-full h-[55vh] sm:h-[55vh] md:h-[55vh] overflow-hidden">
      {/* BACKGROUND */}
      {images.map((img, i) => (
        <div key={img} className="absolute inset-0">
          <Image
            src={img}
            alt="hero"
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover object-center md:object-[50%_30%] lg:object-[50%_25%] transition-all duration-700 ease-out will-change-transform ${
              i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />

        </div>
      ))}

      {/* DESKTOP CARD (fixed layering + responsive safe) */}
      <div className="hidden md:block absolute bottom-6 md:bottom-8 right-4 md:right-10 z-30 w-full max-w-sm">
        <div className="bg-white/20 border border-white/30 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md text-right">
          <div className="space-y-2">
            <h2
              className={`text-xl sm:text-2xl md:text-3xl px-3 sm:px-4 py-2 rounded-xl bg-black/60 text-yellow-300 shadow-lg ${
                dancing?.className || ""
              }`}
            >
              {title}
            </h2>

            <h3 className="text-xs sm:text-sm text-white px-3 py-1 rounded-lg bg-black/50 inline-block">
              {subtitle}
            </h3>

            <p className="text-white/80 text-[11px] sm:text-xs leading-relaxed px-3 py-1 rounded-lg bg-black/40 inline-block">
              {description}
            </p>
          </div>

          <button
            onClick={() => router.push("/about")}
            className="mt-3 sm:mt-4 px-4 sm:px-5 py-2 text-[11px] sm:text-xs font-semibold rounded-full 
            bg-gradient-to-r from-yellow-500 to-yellow-600 
            hover:from-yellow-600 hover:to-yellow-700 
            transition-all shadow-lg active:scale-95"
          >
            Start Your Journey
          </button>
        </div>
      </div>

      {/* MOBILE CTA BAR (safe + no overlap issues) */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 z-30">
        <div className="bg-black/60 backdrop-blur-md px-4 py-3 flex items-center justify-between">
          <div className="min-w-0">
            <h3 className={`text-white text-base font-medium truncate ${dancing?.className || ""}`}>
              {title}
            </h3>
            <p className="text-white/70 text-xs truncate">{subtitle}</p>
          </div>

          <button
            onClick={() => router.push("/about")}
            className="px-4 py-2 text-xs font-semibold rounded-full bg-yellow-500 text-black active:scale-95 shrink-0"
          >
            Explore
          </button>
        </div>
      </div>

      {/* DOTS (highest priority layer) */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-40">
        {images.map((_, i) => (
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