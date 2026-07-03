// app/contact/page.tsx

import ContactForm from "@/app/(website)/components/ContactForm";
import HeroSlider from "./HeroSlider";
import { getContact } from "@/app/lib/supabase/actions/admin/adminCreate";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";

/* ---------- PREMIUM FONTS ---------- */
const fontDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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

export const metadata = {
  title: "Contact Us - Holidays, Simplified",
  description: "Get in touch with us for your next यात्रा in India",
};

export const dynamic = "force-dynamic";

const INK_GRADIENT =
  "radial-gradient(120% 140% at 20% 0%, #16233A 0%, #0B1220 55%, #08111F 100%)";

export default async function ContactPage() {
  const contact = await getContact();

  const heroImages =
    Array.isArray(contact?.image_url) && contact.image_url.length > 0
      ? contact.image_url
      : contact?.image_url
        ? [contact.image_url]
        : ["/images/chitkul.jpg"];

  const fontClasses = `${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`;

  return (
    <div
      className={`overflow-hidden ${fontClasses}`}
      style={{ backgroundColor: "transparent", fontFamily: "var(--font-body)" }}
    >
      <HeroSlider
        images={heroImages}
        title={contact?.title}
        subtitle={contact?.subtitle}
        description={contact?.description}
      />

      {/* ---------- SECTION LABEL ---------- */}
      <div className="w-full flex flex-col items-center py-16">
        <p
          className="text-[11px] tracking-[0.35em] uppercase mb-4"
          style={{ color: "#B08D57", fontFamily: "var(--font-mono)" }}
        >
          Get In Touch
        </p>
        <h2
          className="text-3xl md:text-5xl font-medium tracking-tight text-center"
          style={{ color: "#ffffff", fontFamily: "var(--font-display)" }}
        >
          Contact Us
        </h2>
        <span className="mt-5 h-px w-16" style={{ backgroundColor: "#E4DBC2" }} />
      </div>

      {/* ---------- MAIN: EDITORIAL SPLIT ---------- */}
      <section className="relative pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 xl:gap-24 items-start">
            <div className="lg:sticky lg:top-28">
              <span
                className="block text-[110px] md:text-[140px] leading-none font-bold select-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "transparent",
                  WebkitTextStroke: "1.5px #E4DBC2",
                }}
              >
                02
              </span>
              <p
                className="text-[11px] tracking-[0.35em] uppercase mb-5"
                style={{ color: "#B08D57", fontFamily: "var(--font-mono)" }}
              >
                Travel Better
              </p>

              <h2
                className="text-4xl md:text-6xl font-semibold leading-[1.1]"
                style={{ color: "#ffffff", fontFamily: "var(--font-display)" }}
              >
                {contact?.section_title || "Start Your Journey With Us"}
                <span
                  className="block mt-4"
                  style={{ color: "#B08D57", fontFamily: "var(--font-display)" }}
                >
                  {contact?.section_highlight || "Across Incredible India"}
                </span>
              </h2>

              <p
                className="text-base leading-8 max-w-xl mt-8"
                style={{ color: "#4A4436" }}
              >
                {contact?.section_description}
              </p>

              <div className="grid grid-cols-2 gap-5 mt-12">
                <div
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: "#FFFDF8", border: "1px solid #E4DBC2" }}
                >
                  <h3
                    className="text-3xl font-semibold"
                    style={{ color: "#0B1220", fontFamily: "var(--font-display)" }}
                  >
                    24/7
                  </h3>
                  <p className="text-sm mt-2" style={{ color: "#5C5645" }}>
                    Dedicated support throughout your journey.
                  </p>
                </div>

                <div
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: "#FFFDF8", border: "1px solid #E4DBC2" }}
                >
                  <h3
                    className="text-3xl font-semibold"
                    style={{ color: "#0B1220", fontFamily: "var(--font-display)" }}
                  >
                    100%
                  </h3>
                  <p className="text-sm mt-2" style={{ color: "#5C5645" }}>
                    Personalized and flexible travel experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2.5rem] blur-2xl opacity-40"
                style={{ background: INK_GRADIENT }}
              />
              <div
                className="relative rounded-[2rem] p-1"
                style={{ background: INK_GRADIENT }}
              >
                <div className="rounded-[1.85rem] bg-white p-6 md:p-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MAP ---------- */}
      <section className="relative">
        <div
          className="max-w-7xl mx-auto px-6 md:px-10 pb-16 flex items-center gap-4"
        >
          <p
            className="text-[11px] tracking-[0.35em] uppercase"
            style={{ color: "#B08D57", fontFamily: "var(--font-mono)" }}
          >
            Find Us
          </p>
          <span className="flex-1 h-px" style={{ backgroundColor: "#E4DBC2" }} />
        </div>

        <div className="relative h-[500px] md:h-[650px] overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.05) 12%, transparent 24%)",
            }}
          />
          <iframe
            src={
              contact?.map_url ||
              "https://www.google.com/maps?q=delhi&output=embed"
            }
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}