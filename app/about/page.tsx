// app/about/page.tsx
import { getAbout } from "@/app/lib/supabase/actions/admin/adminCreate";
import HeroSlider from "./hero-slider";

export const metadata = {
  title: "About Us - Holidays, Simplified",
  description: "Learn more about our travel services in India",
};

export default async function AboutPage() {
  const about = await getAbout();

  const heroImages =
    about?.hero?.images?.length > 0
      ? about.hero.images
      : about?.hero?.image_url
      ? [about.hero.image_url]
      : [];

  const introImages =
    about?.intro?.images?.length > 0
      ? about.intro.images
      : about?.intro?.image_url
      ? [about.intro.image_url]
      : [];

  return (
    <div className="bg-white text-neutral-900 overflow-hidden">
      <HeroSlider
        images={heroImages}
        subtitle={about?.hero?.subtitle}
        title={about?.hero?.title}
        description={about?.hero?.description}
      />

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-5 space-y-32">
        {/* INTRO TITLE */}
        <div className="text-center max-w-4xl mx-auto space-y-4 animate-[fadeIn_0.8s_ease_forwards]">
          <h2 className="text-4xl md:text-4xl font-bold tracking-tight">
            {about?.intro?.title}
          </h2>
          <div className="h-[2px] w-20 bg-black mx-auto rounded-full" />
        </div>

        {/* INTRO */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* IMAGE STACK */}
          <div className="relative h-[420px] md:h-[520px] w-full rounded-[2rem] overflow-hidden shadow-2xl group animate-[fadeIn_0.9s_ease_forwards]">
            {introImages?.slice(0, 3)?.map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                alt={`intro-${i}`}
                className={`absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105 ${
                  i === 0
                    ? "z-30"
                    : i === 1
                    ? "z-20 scale-[0.93] translate-x-6 translate-y-6 opacity-80"
                    : "z-10 scale-[0.86] translate-x-10 translate-y-10 opacity-60"
                }`}
              />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white text-sm tracking-wide opacity-80">
              Explore • Discover • Travel
            </div>
          </div>

          {/* TEXT */}
          <div className="space-y-6 text-center md:text-left animate-[fadeIn_1s_ease_forwards]">
            <p className="text-neutral-600 leading-relaxed text-lg md:text-xl">
              {about?.intro?.para1}
            </p>

            <p className="text-neutral-600 leading-relaxed text-lg md:text-xl">
              {about?.intro?.para2}
            </p>

            <div className="pt-4 flex justify-center md:justify-start">
              <div className="w-24 h-[2px] bg-neutral-300 rounded-full" />
            </div>
          </div>
        </div>

        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-3 animate-[fadeIn_0.8s_ease_forwards]">
          <h2 className="text-4xl md:text-5xl font-bold">
            What We Offer
          </h2>
          <p className="text-neutral-500 text-lg">
            Crafted journeys designed with precision, comfort, and real experiences in mind.
          </p>
        </div>

        {/* SERVICES */}
        <div className="grid md:grid-cols-3 gap-10">
          {about?.services?.map((item: string, i: number) => (
            <div
              key={i}
              className="relative group rounded-[2rem] p-10 bg-white border border-neutral-200 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden text-center animate-[fadeIn_0.8s_ease_forwards]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-black/5 to-black/10 transition" />


              <h3 className="text-xl font-semibold mb-3">{item}</h3>

              <p className="text-neutral-500 text-sm leading-relaxed">
                Designed to give you seamless, meaningful travel experiences.
              </p>
            </div>
          ))}
        </div>

        {/* VISION / MISSION */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative rounded-[2rem] p-12 bg-neutral-900 text-white overflow-hidden shadow-2xl animate-[fadeIn_0.9s_ease_forwards]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative space-y-4">
              <h3 className="text-3xl font-bold">Our Vision</h3>
              <p className="text-white/80 leading-relaxed">
                {about?.vision}
              </p>
            </div>
          </div>

          <div className="relative rounded-[2rem] p-12 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black overflow-hidden shadow-2xl animate-[fadeIn_1s_ease_forwards]">
            <div className="absolute inset-0 bg-black/5" />
            <div className="relative space-y-4">
              <h3 className="text-3xl font-bold">Our Mission</h3>
              <p className="text-black/80 leading-relaxed">
                {about?.mission}
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center max-w-3xl mx-auto pt-10 animate-[fadeIn_1s_ease_forwards]">
          <p className="text-neutral-600 text-lg leading-relaxed">
            {about?.footer_text}
          </p>
        </div>
      </section>

     
    </div>
  );
}