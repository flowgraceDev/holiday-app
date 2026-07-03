"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import InquiryModal from "./BookingModal";

/* ---------- PREMIUM FONTS ----------
   Playfair Display -> elegant display serif for headings/titles
   Inter             -> clean, refined body sans
   JetBrains Mono    -> crisp mono for ticket/label details
   These replace the old ui-sans-serif / serif / monospace fallbacks. */
const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

type ItineraryItem = {
  day: number;
  title: string;
  description: string;
};

type Trip = {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  duration: string;
  location: string;
  starting_city: string;
  price: number;
  discount_price: number;
  max_people: number;
  featured_image: string;
  gallery: string[];
  cta_enabled: boolean;
  cta_text?: string | null;
  itinerary?: ItineraryItem[] | string | null;
  inclusions?: string[] | string | null;
  exclusions?: string[] | string | null;
  highlights?: string[] | string | null;
  travel_date: string | null;
};

type Props = {
  trip: Trip;
};

const normalizeList = (data: string[] | string | null | undefined) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean);
};

const normalizeItinerary = (data: Trip["itinerary"]): ItineraryItem[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return [];
};

export default function TripDetails({ trip }: Props) {
  const images = useMemo(
    () => (trip.gallery?.length ? trip.gallery : [trip.featured_image]),
    [trip.gallery, trip.featured_image],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];
  const [open, setOpen] = useState(false);

  /* ---------- AUTO IMAGE SLIDER ---------- */
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (images.length <= 1) return;
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const handleManualSelect = (idx: number) => {
    setActiveIndex(idx);
    startAutoplay();
  };

  const inclusions = useMemo(
    () => normalizeList(trip.inclusions),
    [trip.inclusions],
  );
  const exclusions = useMemo(
    () => normalizeList(trip.exclusions),
    [trip.exclusions],
  );
  const highlights = useMemo(
    () => normalizeList(trip.highlights),
    [trip.highlights],
  );
  const itinerary = useMemo(
    () => normalizeItinerary(trip.itinerary),
    [trip.itinerary],
  );

  const essentials = [
    { label: "Location", value: trip.location },
    { label: "Starting City", value: trip.starting_city },
    { label: "Duration", value: trip.duration },
    { label: "Group Size", value: `${trip.max_people} people` },
  ];

  return (
    <div
      className={`w-full min-h-screen ${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
      style={{
        backgroundColor: "#F7F3E8",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ---------- INK HERO ---------- */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 140% at 20% 0%, #16233A 0%, #0B1220 55%, #08111F 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-14 pb-10">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-3"
            style={{
              color: "#B08D57",
              fontFamily: "var(--font-mono)",
            }}
          >
            Journey Itinerary
          </p>
          <h1
            className="text-4xl md:text-6xl font-medium tracking-tight text-white max-w-3xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {trip.title}
          </h1>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base max-w-xl mt-4">
            {trip.short_description}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
          <div
            className="relative w-full h-[340px] md:h-[520px] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
            onMouseEnter={() => {
              if (autoplayRef.current) clearInterval(autoplayRef.current);
            }}
            onMouseLeave={startAutoplay}
          >
            {images.map((img, idx) => (
              <div
                key={img + idx}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: idx === activeIndex ? 1 : 0 }}
              >
                <Image
                  src={img}
                  alt={trip.title}
                  fill
                  priority={idx === 0}
                  className="object-cover"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/70 via-transparent to-transparent" />

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={img + "-dot-" + idx}
                    onClick={() => handleManualSelect(idx)}
                    aria-label={`Show image ${idx + 1}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: idx === activeIndex ? "22px" : "6px",
                      backgroundColor:
                        idx === activeIndex
                          ? "#B08D57"
                          : "rgba(255,255,255,0.4)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto mt-4 pb-1">
            {images.map((img, idx) => (
              <button
                key={img}
                onClick={() => handleManualSelect(idx)}
                className={`relative min-w-[86px] h-[58px] rounded-lg overflow-hidden transition-all duration-300 shrink-0
              ${
                activeIndex === idx
                  ? "ring-2 ring-[#B08D57] opacity-100"
                  : "ring-1 ring-white/10 opacity-50 hover:opacity-90"
              }`}
              >
                <Image
                  src={img}
                  alt={trip.title}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- TICKET STRIP (essentials) ---------- */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <div
          className="rounded-2xl shadow-[0_20px_50px_rgba(11,18,32,0.15)] ring-1 ring-[#E4DBC2] overflow-hidden"
          style={{ backgroundColor: "#FFFDF8" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-dashed divide-[#E4DBC2]">
            {essentials.map((e, i) => (
              <div
                key={e.label}
                className={`p-5 ${i >= 2 ? "border-t md:border-t-0 border-dashed border-[#E4DBC2]" : ""}`}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.2em] mb-1"
                  style={{
                    color: "#9C8F6E",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {e.label}
                </p>
                <p
                  className="text-base font-semibold"
                  style={{ color: "#1B2432" }}
                >
                  {e.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- BODY ---------- */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid lg:grid-cols-[1.25fr_0.75fr] gap-10 items-start">
        <div className="space-y-8">
          {highlights.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[11px] uppercase tracking-[0.25em]"
                  style={{
                    color: "#8C6D3F",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Highlights
                </span>
                <span
                  className="flex-1 h-px"
                  style={{ backgroundColor: "#E4DBC2" }}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm rounded-xl p-4 transition-colors"
                    style={{
                      backgroundColor: "#FFFDF8",
                      border: "1px solid #E4DBC2",
                      color: "#3A3327",
                    }}
                  >
                    <span
                      className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                      style={{ backgroundColor: "#EFE3C8", color: "#8C6D3F" }}
                    >
                      ✦
                    </span>
                    <span className="leading-relaxed">{h}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[11px] uppercase tracking-[0.25em]"
                style={{
                  color: "#8C6D3F",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Overview
              </span>
              <span
                className="flex-1 h-px"
                style={{ backgroundColor: "#E4DBC2" }}
              />
            </div>
            <p
              className="leading-relaxed text-[15px]"
              style={{ color: "#4A4436" }}
            >
              {trip.description}
            </p>
          </section>

          {itinerary.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-[11px] uppercase tracking-[0.25em]"
                  style={{
                    color: "#8C6D3F",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Route
                </span>
                <span
                  className="flex-1 h-px"
                  style={{ backgroundColor: "#E4DBC2" }}
                />
              </div>

              <div className="relative pl-9">
                <div
                  className="absolute left-[13px] top-2 bottom-2 w-px"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, #C9BB98 0, #C9BB98 4px, transparent 4px, transparent 9px)",
                  }}
                />
                <div className="space-y-6">
                  {itinerary.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className="absolute -left-9 top-0 w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-semibold"
                        style={{
                          backgroundColor: "#1B2432",
                          color: "#EFE3C8",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {item.day}
                      </div>
                      <div
                        className="rounded-xl p-4 transition-shadow hover:shadow-md"
                        style={{
                          backgroundColor: "#FFFDF8",
                          border: "1px solid #E4DBC2",
                        }}
                      >
                        <p
                          className="text-[10px] uppercase tracking-[0.2em] mb-1"
                          style={{
                            color: "#9C8F6E",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          Day {item.day}
                        </p>
                        <p
                          className="font-semibold text-sm"
                          style={{ color: "#1B2432" }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-sm mt-1 leading-relaxed"
                          style={{ color: "#5C5645" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {(inclusions.length > 0 || exclusions.length > 0) && (
            <div className="grid md:grid-cols-2 gap-6">
              {inclusions.length > 0 && (
                <section
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "#EEF3EC",
                    border: "1px solid #D6E2D2",
                  }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: "#2F4B3E", color: "#EEF3EC" }}
                    >
                      ✓
                    </span>
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: "#1F3329" }}
                    >
                      Included
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {inclusions.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-sm"
                        style={{ color: "#33473B" }}
                      >
                        <span
                          className="mt-1 w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: "#2F4B3E" }}
                        />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {exclusions.length > 0 && (
                <section
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "#F5EBE7",
                    border: "1px solid #E2CFC7",
                  }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: "#8B4A3B", color: "#F5EBE7" }}
                    >
                      ✕
                    </span>
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: "#5C2E22" }}
                    >
                      Not Included
                    </h3>
                  </div>
                  <div className="space-y-2.5">
                    {exclusions.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-sm"
                        style={{ color: "#6B3A2C" }}
                      >
                        <span
                          className="mt-1 w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: "#8B4A3B" }}
                        />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>

        {/* ---------- SIGNATURE: BOARDING PASS BOOKING CARD ---------- */}
        <div className="lg:sticky lg:top-6 h-fit">
          <div
            className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(11,18,32,0.25)]"
            style={{ backgroundColor: "#1B2432" }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <p
                  className="text-[10px] uppercase tracking-[0.25em]"
                  style={{
                    color: "#B08D57",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  E-Ticket
                </p>
                <p
                  className="text-[10px] uppercase tracking-[0.25em]"
                  style={{
                    color: "#6B7280",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Confirmed
                </p>
              </div>
              <p
                className="text-white font-medium text-lg mt-3 leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {trip.title}
              </p>
            </div>

            {/* perforation */}
            <div className="relative h-0">
              <div
                className="absolute -left-3 -top-3 w-6 h-6 rounded-full"
                style={{ backgroundColor: "#F7F3E8" }}
              />
              <div
                className="absolute -right-3 -top-3 w-6 h-6 rounded-full"
                style={{ backgroundColor: "#F7F3E8" }}
              />
              <div
                className="w-full"
                style={{
                  borderTop: "1px dashed #3A4658",
                }}
              />
            </div>

            <div className="p-6 pt-5 space-y-3" style={{ color: "#C9CFDB" }}>
              <div className="flex items-center gap-2.5 text-sm">
                <span style={{ color: "#B08D57" }}>✓</span> Instant confirmation
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <span style={{ color: "#B08D57" }}>✓</span> Secure booking
                system
              </div>
              <div className="flex items-center gap-2.5 text-sm">
                <span style={{ color: "#B08D57" }}>✓</span> Dedicated trip
                assistance
              </div>

              {trip.cta_enabled && (
                <button
                  onClick={() => setOpen(true)}
                  className="mt-5 w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "#B08D57",
                    color: "#1B2432",
                    boxShadow: "0 12px 30px rgba(176,141,87,0.35)",
                  }}
                >
                  {trip.cta_text || "Book Your Journey"}
                </button>
              )}

              {/* barcode flourish */}
              <div
                className="mt-5 h-8 rounded-sm opacity-60"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #C9CFDB 0px, #C9CFDB 2px, transparent 2px, transparent 5px, #C9CFDB 5px, #C9CFDB 6px, transparent 6px, transparent 10px)",
                }}
              />
            </div>
          </div>
        </div>

        <InquiryModal open={open} onClose={() => setOpen(false)} trip={trip} />
      </div>
    </div>
  );
}