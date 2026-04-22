"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { dancing } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { fetchHero } from "../lib/supabase/actions/public/hero";

const content = [
  {
    title: "Travel India With Confidence",
    subtitle: "Clear Plans. No Surprises.",
    desc: "Well-structured itineraries designed for smooth and predictable travel experiences.",
  },
  {
    title: "Comfort Comes First",
    subtitle: "Travel Without Stress",
    desc: "From bookings to transport, everything is handled with precision and care.",
  },
  {
    title: "Explore At Your Own Pace",
    subtitle: "Flexible Travel Options",
    desc: "Plans that adapt to your schedule without compromising quality.",
  },
  {
    title: "Real Experiences, Not Just Tours",
    subtitle: "See Beyond The Surface",
    desc: "Discover authentic destinations with practical and thoughtful planning.",
  },
  {
    title: "Reliable From Start To Finish",
    subtitle: "Professional Support",
    desc: "A dedicated team ensuring consistency and trust throughout your journey.",
  },
  {
    title: "Smart Travel Planning",
    subtitle: "Optimized Itineraries",
    desc: "Efficient routes and time management for maximum experience with less hassle.",
  },
  {
    title: "Designed For International Travelers",
    subtitle: "Clarity & Transparency",
    desc: "Clear communication, fixed plans, and no hidden confusion at any step.",
  },
  {
    title: "Your Journey, Well Managed",
    subtitle: "Simple. Smooth. Structured.",
    desc: "We focus on making your travel experience effortless and dependable.",
  },
];

export default function Hero() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);

  const [images, setImages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchHero();
      const urls = (data || []).map((h: any) => h.image_url);
      setImages(urls);
    };
    load();
  }, []);

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
      className="relative w-full h-[80vh] md:h-[85vh] overflow-hidden bg-black"
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        <Image
          src={images[index]}
          alt="hero"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/10" />

      <motion.div
        style={{ opacity }}
        className="absolute bottom-5 md:bottom-8 right-4 md:right-8 max-w-xs md:max-w-md z-10 text-right"
      >
        <div className="bg-black/30 backdrop-blur-2xl border border-white/10 rounded-xl p-4 md:p-5 space-y-2.5 shadow-xl">
          <h2
            className={`text-2xl md:text-4xl leading-snug text-yellow-400 ${dancing.className}`}
          >
            {current.title}
          </h2>

          <h3 className="text-sm md:text-lg font-semibold text-white/90">
            {current.subtitle}
          </h3>

          <p className="text-white/70 text-xs md:text-sm leading-relaxed">
            {current.desc}
          </p>

          <button
            onClick={() => router.push("/about")}
            className="mt-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition px-4 py-2 md:px-5 md:py-2.5 rounded-lg font-semibold shadow-md active:scale-95 text-sm"
          >
            Explore More
          </button>
        </div>
      </motion.div>
    </section>
  );
}