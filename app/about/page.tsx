// app/(public)/about/page.tsx
import Image from "next/image";
import { getAbout } from "@/app/lib/supabase/actions/admin/adminCreate";

export const metadata = {
  title: "About Us - Holidays, Simplified",
  description: "Learn more about our travel services in India",
};

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="bg-white">
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src={about?.hero.image_url}
          alt="about"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-xs tracking-[0.4em] text-white/60 mb-4 uppercase">
            {about?.hero.subtitle}
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-xl">
            {about?.hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-white/80 text-lg">
            {about?.hero.description}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 space-y-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">
              {about?.intro.title}
            </h2>

            <p className="text-neutral-600 leading-relaxed">
              {about?.intro.para1}
            </p>

            <p className="text-neutral-600 leading-relaxed">
              {about?.intro.para2}
            </p>
          </div>

          <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src={about?.intro.image_url}
              alt="about"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-4xl font-bold text-neutral-900">
            What We Offer
          </h2>
          <p className="text-neutral-500">
            From luxury experiences to budget-friendly trips, we cover everything
            you need for a perfect journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {about?.services.map((item: string, i: number) => (
            <div
              key={i}
              className="group relative p-8 rounded-3xl border border-neutral-200 bg-white hover:shadow-2xl transition duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-neutral-900/5 to-neutral-900/10 transition" />

              <h3 className="text-lg font-semibold text-neutral-900 mb-2 relative">
                {item}
              </h3>
              <p className="text-neutral-500 text-sm relative">
                Carefully designed experiences tailored to your travel style.
              </p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="relative p-10 rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <h3 className="text-2xl font-bold mb-4 relative">Our Vision</h3>
            <p className="text-white/80 relative">{about?.vision}</p>
          </div>

          <div className="relative p-10 rounded-3xl overflow-hidden bg-yellow-400 text-black shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent" />
            <h3 className="text-2xl font-bold mb-4 relative">Our Mission</h3>
            <p className="text-black/80 relative">{about?.mission}</p>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-neutral-600 text-lg leading-relaxed">
            {about?.footer_text}
          </p>
        </div>
      </section>
    </div>
  );
}