import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      
      {/* background glow */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-yellow-200/30 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center relative z-10">
        
        {/* IMAGE */}
        <div className="relative group">
          <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/shimla.jpg"
              alt="about"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* floating badge */}
          <div className="absolute -bottom-6 left-6 bg-white/90 backdrop-blur-xl border border-slate-200 px-5 py-3 rounded-2xl shadow-lg">
            <p className="text-sm font-semibold text-slate-900">
              Trusted Travel Experts
            </p>
            <p className="text-xs text-slate-500">
              Since 2024 • India Tours
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-6">
          
          {/* TAG */}
          <div className="flex items-center gap-3">
            <span className="w-10 h-[2px] bg-yellow-500" />
            <p className="text-sm font-semibold tracking-widest text-yellow-600 uppercase">
              About Us
            </p>
          </div>

          {/* HEADING */}
          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 leading-tight">
            Crafting Memorable <br /> Travel Experiences
          </h2>

          {/* DESCRIPTION */}
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            We design premium travel experiences across India with a focus on comfort,
            culture and seamless planning. Every journey is crafted with attention to detail
            so you can enjoy stress-free exploration.
          </p>

          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            From curated itineraries to trusted local support, we ensure every trip feels
            personal, smooth and unforgettable — whether it’s luxury escapes or cultural tours.
          </p>

          {/* CTA */}
          <div className="pt-2">
            <Link href="/about">
              <button className="px-6 py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition shadow-md hover:shadow-xl">
                Explore More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}