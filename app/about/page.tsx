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
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src={about?.hero.image_url}
          alt="about"
          fill
          priority
          className="object-cover scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-sm tracking-[0.3em] text-white/70 mb-4 uppercase">
            {about?.hero.subtitle}
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            {about?.hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-white/80 text-lg">
            {about?.hero.description}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 leading-snug mb-6">
              {about?.intro.title}
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl mb-4">
              {about?.intro.para1}
            </p>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
              {about?.intro.para2}
            </p>
          </div>

          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={about?.intro.image_url}
              alt="about"
              fill
              className="object-cover hover:scale-110 transition duration-700"
            />
          </div>
        </div>

        <div className="my-20 border-t border-gray-200" />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-gray-600">
            From luxury experiences to budget-friendly trips, we cover everything
            you need for a perfect journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {about?.services.map((item: string, i: number) => (
            <div
              key={i}
              className="p-6 border border-gray-200 rounded-2xl hover:shadow-xl transition duration-300 hover:-translate-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item}
              </h3>
              <p className="text-gray-600 text-sm">
                Carefully designed experiences tailored to your travel style.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 grid md:grid-cols-2 gap-10">
          <div className="p-8 bg-black text-white rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-white/80">{about?.vision}</p>
          </div>

          <div className="p-8 bg-yellow-400 text-black rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-black/80">{about?.mission}</p>
          </div>
        </div>

        <div className="mt-24 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed">
            {about?.footer_text}
          </p>
        </div>
      </section>
    </div>
  );
}