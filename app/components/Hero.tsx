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

export default function Hero({ initialImages }: { initialImages: string[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % initialImages.length);
    }, 4000);
    return () => clearInterval(id);
  }, [initialImages.length]);

  const current = content[index];

  return (
    <section className="relative w-full h-[65vh] overflow-hidden">
      {initialImages.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          quality={30}
          sizes="100vw"
          className={`object-cover transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute bottom-8 right-6 md:right-10 w-full max-w-sm z-10 text-right">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl">
          <h2 className={`text-2xl md:text-3xl text-yellow-400 ${dancing.className}`}>
            {current.title}
          </h2>

          <h3 className="mt-1 text-sm text-white/90">
            {current.subtitle}
          </h3>

          <p className="mt-1 text-white/70 text-xs">
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
    </section>
  );
} 