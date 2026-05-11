"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  images: string[];
  title?: string;
  subtitle?: string;
  description?: string;
  dancing?: { className: string };
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

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images?.length) return null;

  const currentImage = images[index];

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      {images.map((img, i) => (
        <div key={img} className="absolute inset-0">
          <Image
            src={img}
            alt="hero"
            fill
            priority={i === 0}
            className={`object-cover transition-all duration-700 ease-out ${
              i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute bottom-8 right-6 md:right-10 w-full max-w-sm z-10 text-right">
        <div className="bg-white/20 border border-white/30 rounded-2xl p-5 shadow-2xl">
          <h2
            className={`text-2xl md:text-3xl text-yellow-400 ${
              dancing?.className || ""
            }`}
          >
            {title}
          </h2>

          <h3 className="mt-1 text-sm text-white">{subtitle}</h3>

          <p className="mt-1 text-white/80 text-xs">{description}</p>

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

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
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