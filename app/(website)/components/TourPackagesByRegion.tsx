// app/components/TourPackages.tsx
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { getToursByRegion, Region } from "../../lib/supabase/actions/public/tours";

/* ---------- PREMIUM FONTS ----------
   Same trio used across the site for a consistent, elevated feel. */
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

type Props = {
  region: Region;
};

export default async function TourByRegions({ region }: Props) {
  console.log("request comes", region);
  const res = await getToursByRegion(region);
  console.log("res", res);

  const fontClasses = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`;

  /* ---------- EMPTY STATE ---------- */
  if (!res.success || !res.data || res.data.length === 0) {
    return (
      <section
        className={`py-24 ${fontClasses}`}
        style={{ backgroundColor: "#F7F3E8", fontFamily: "var(--font-body)" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 max-w-2xl">
            <p
              className="text-[11px] tracking-[0.3em] uppercase mb-3 flex items-center gap-2"
              style={{ color: "#B08D57", fontFamily: "var(--font-mono)" }}
            >
              <span
                className="w-8 h-px inline-block"
                style={{ backgroundColor: "#B08D57" }}
              />
              {region} India
            </p>

            <h2
              className="text-3xl md:text-4xl font-medium mt-3 capitalize"
              style={{ color: "#1B2432", fontFamily: "var(--font-display)" }}
            >
              {region} Tour Packages
            </h2>

            <p className="mt-3 text-sm md:text-base" style={{ color: "#5C5645" }}>
              Explore best tours in {region} India.
            </p>
          </div>

          <div
            className="rounded-2xl p-12 text-center"
            style={{
              backgroundColor: "#FFFDF8",
              border: "1px dashed #C9BB98",
            }}
          >
            <div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl"
              style={{ backgroundColor: "#EFE3C8" }}
            >
              ✈️
            </div>

            <h3
              className="mt-6 text-2xl font-medium capitalize"
              style={{ color: "#1B2432", fontFamily: "var(--font-display)" }}
            >
              Tours for {region} India are coming soon
            </h3>

            <p
              className="mt-3 max-w-2xl mx-auto leading-relaxed text-sm md:text-base"
              style={{ color: "#5C5645" }}
            >
              We are currently curating premium travel experiences for this
              region. Exciting itineraries and new travel experiences will be
              available shortly.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {["Curated Experiences", "New Tours Coming Soon", "Best Price Packages"].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.15em]"
                    style={{
                      backgroundColor: "#F7F3E8",
                      color: "#8C6D3F",
                      fontFamily: "var(--font-mono)",
                      border: "1px solid #E4DBC2",
                    }}
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const tours = res.data;

  /* ---------- TOUR GRID ---------- */
  return (
    <section
      className={`relative overflow-hidden py-24 ${fontClasses}`}
      style={{
        background:
          "radial-gradient(120% 140% at 20% 0%, #16233A 0%, #0B1220 55%, #08111F 100%)",
        fontFamily: "var(--font-body)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-14 max-w-2xl">
          <p
            className="text-[11px] tracking-[0.3em] uppercase mb-3 flex items-center gap-2"
            style={{ color: "#B08D57", fontFamily: "var(--font-mono)" }}
          >
            <span
              className="w-8 h-px inline-block"
              style={{ backgroundColor: "#B08D57" }}
            />
            {region} India
          </p>

          <h2
            className="text-3xl md:text-4xl font-medium mt-3 capitalize text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {region} Tour Packages
          </h2>

          <p className="mt-3 text-sm md:text-base text-slate-400">
            Explore best tours in {region} India.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {tours.map((tour: any, index: number) => (
            <Link key={tour.id} href={`/tours/${tour.slug}`} prefetch={false}>
              <div
                className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "#FFFDF8",
                  border: "1px solid #E4DBC2",
                  boxShadow: "0 20px 50px rgba(11,18,32,0.35)",
                }}
              >
                <div className="relative h-60 overflow-hidden" style={{ backgroundColor: "#EFE3C8" }}>
                  <Image
                    src={tour.featured_image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading={index < 3 ? "eager" : "lazy"}
                    priority={index === 0}
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220]/60 via-transparent to-transparent" />

                  <div
                    className="absolute top-3 left-3 backdrop-blur-xl text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                    style={{
                      backgroundColor: "rgba(255,253,248,0.92)",
                      color: "#1B2432",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {tour.duration}
                  </div>
                </div>

                {/* perforation strip between image and details */}
                <div className="relative h-0">
                  <div
                    className="absolute -left-3 -top-3 w-6 h-6 rounded-full"
                    style={{
                      background:
                        "radial-gradient(120% 140% at 20% 0%, #16233A 0%, #0B1220 55%, #08111F 100%)",
                    }}
                  />
                  <div
                    className="absolute -right-3 -top-3 w-6 h-6 rounded-full"
                    style={{
                      background:
                        "radial-gradient(120% 140% at 20% 0%, #16233A 0%, #0B1220 55%, #08111F 100%)",
                    }}
                  />
                  <div className="w-full" style={{ borderTop: "1px dashed #D8CBA8" }} />
                </div>

                <div className="p-5 space-y-4">
                  <h3
                    className="font-semibold text-lg line-clamp-2"
                    style={{ color: "#1B2432" }}
                  >
                    {tour.title}
                  </h3>

                  <div className="flex items-center justify-between pt-1">
                    <span
                      className="text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: "#9C8F6E", fontFamily: "var(--font-mono)" }}
                    >
                      View Itinerary →
                    </span>

                    <button
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group-hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "#B08D57",
                        color: "#1B2432",
                        boxShadow: "0 10px 24px rgba(176,141,87,0.35)",
                      }}
                    >
                      Book Here
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}