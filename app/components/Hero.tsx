// app/components/Hero.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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

export default function Hero({ initialImages }: { initialImages: string[] }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);

  const [images] = useState<string[]>(initialImages);
  const [index, setIndex] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!images.length) return;

    intervalRef.current = setInterval(() => {
      setIndex((p) => (p + 1) % images.length);
    }, 3800);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images]);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0]);

  const current = content[index % content.length];

  if (!images.length) return null;

  return (
    <section
      ref={ref}
      className="relative w-full h-[80vh] md:h-[40vh] overflow-hidden bg-black rounded"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={images[index]}
          alt="hero"
          fill
          priority
          sizes="100vw"
          quality={30}
          placeholder="blur"
          blurDataURL={`${images[index]}?w=20&q=10`}
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 right-6 max-w-xs z-10 text-right"
      >
        <div className="bg-black/30 backdrop-blur-2xl border border-white/10 rounded-xl p-4 space-y-2 shadow-xl">
          <h2
            className={`text-2xl md:text-3xl leading-snug text-yellow-400 ${dancing.className}`}
          >
            {current.title}
          </h2>

          <h3 className="text-sm font-semibold text-white/90">
            {current.subtitle}
          </h3>

          <p className="text-white/70 text-xs leading-snug">
            {current.desc}
          </p>

          <button
            onClick={() => router.push("/about")}
            className="mt-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition px-4 py-2 rounded-lg font-semibold shadow-md active:scale-95 text-xs"
          >
            Explore
          </button>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-6 z-10 flex gap-2">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`relative w-14 h-10 md:w-16 md:h-11 rounded overflow-hidden border ${
              index === i ? "border-yellow-500" : "border-white/20"
            }`}
          >
            <Image
              src={img}
              alt="thumb"
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
}