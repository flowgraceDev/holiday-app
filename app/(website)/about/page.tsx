// app/about/page.tsx
import { getAbout } from "@/app/lib/supabase/actions/admin/adminCreate";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import HeroSlider from "./hero-slider";

/* ---------- PREMIUM FONTS ---------- */
const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const formatMission = (text: string) => {
  return text
    .replace(/(\d+\.)/g, "\n$1")
    .split("\n")
    .filter(Boolean);
};

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

export const metadata = {
  title: "About Us - Holidays, Simplified",
  description: "Learn more about our travel services in India",
};

const INK_GRADIENT =
  "radial-gradient(120% 140% at 20% 0%, #16233A 0%, #0B1220 55%, #08111F 100%)";

export default async function AboutPage() {
  const about = await getAbout();

  const heroImages = about?.hero?.images?.length
    ? about.hero.images
    : about?.hero?.image_url
      ? [about.hero.image_url]
      : [];

  const introImages = about?.intro?.images?.length
    ? about.intro.images
    : about?.intro?.image_url
      ? [about.intro.image_url]
      : [];

  const services: string[] = about?.services ?? [];

  const fontClasses = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`;

  return (
    <div
      className={`overflow-hidden ${fontClasses}`}
      style={{ fontFamily: "var(--font-body)" }}
    >
      <HeroSlider
        images={heroImages}
        subtitle={about?.hero?.subtitle}
        title={about?.hero?.title}
        description={about?.hero?.description}
      />

      <div className="h-8 md:h-14" />

      {/* INTRO */}
      <section>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-4">
              <span
                className="block text-[80px] md:text-[140px] leading-none font-bold select-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "transparent",
                  WebkitTextStroke: "1.5px #E4DBC2",
                }}
              >
                01
              </span>

              <p className="mt-2 text-[11px] tracking-[0.35em] uppercase text-[#B08D57]">
                Who We Are
              </p>
            </div>

            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-white">
                {about?.intro?.title}
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 mt-8">
                <p className="text-sm md:text-base leading-relaxed text-[#d6a940]">
                  {about?.intro?.para1}
                </p>

                <p className="text-sm md:text-base leading-relaxed text-[#d6a940]">
                  {about?.intro?.para2}
                </p>
              </div>
            </div>
          </div>

          {/* IMAGES */}
          {introImages?.length > 0 && (
            <div className="mt-14 mb-20 md:mb-28 flex justify-center">
              <div className="w-full max-w-6xl grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 md:col-span-7 relative h-[200px] md:h-[260px] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={introImages[0]}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4 md:gap-6 h-[200px] md:h-[260px]">
                  {introImages.slice(1, 3).map((img: string, i: number) => (
                    <div
                      key={i}
                      className="relative rounded-2xl overflow-hidden shadow-md"
                    >
                      <img
                        src={img}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES */}
      <section
        className="relative py-20 md:py-28"
        style={{ background: INK_GRADIENT }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="mb-12">
            <p className="text-[11px] tracking-[0.35em] uppercase text-[#B08D57]">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-5xl font-medium text-white mt-3">
              Journeys crafted with precision
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {services.map((item: string, i: number) => (
              <div
                key={i}
                className="p-6 md:p-8 rounded-xl bg-[#0B1220] border border-white/10"
              >
                <p className="text-xs text-[#B08D57] mb-4">
                  {String(i + 1).padStart(2, "0")}
                </p>

                <h3 className="text-lg md:text-xl text-white font-medium mb-2">
                  {item}
                </h3>

                <p className="text-sm text-slate-400">
                  Seamless, meaningful travel experiences.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION / MISSION (FIXED LAYOUT OVERFLOW) */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
            <div className="rounded-2xl p-8 md:p-10 bg-[#FFFDF8] border border-[#E4DBC2]">
              <p className="text-xl tracking-[0.3em] text-black mb-4">
                About Us
              </p>
              <p className="space-y-4 text-sm md:text-base leading-relaxed text-[#4A4436]">
                {about?.vision}
              </p>
            </div>

            <div className="rounded-2xl p-8 md:p-10 bg-[#FFFDF8] border border-[#E4DBC2]">
              <p className="text-xl tracking-[0.3em] text-black mb-4">
                About Our Drivers
              </p>

              <div className="space-y-4 text-sm md:text-base leading-relaxed text-[#4A4436]">
                {formatMission(about?.mission || "").map((item, index) => (
                  <p key={index}>{item.trim()}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto px-5 md:px-10 text-center">
          <p className="text-xl md:text-3xl text-white leading-snug">
            {about?.footer_text}
          </p>
        </div>
      </section>
    </div>
  );
}
