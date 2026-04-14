import Image from "next/image";

export const metadata = {
  title: "About Us - Shri Radhe Holidays",
  description: "Learn more about our travel services in India",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src="/images/banaras.jpg"
          alt="about"
          fill
          priority
          className="object-cover scale-105"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="text-sm tracking-[0.3em] text-white/70 mb-4 uppercase">
            India Tour
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Crafting <span className="text-yellow-400">Unforgettable</span>{" "}
            Journeys
          </h1>

          <p className="mt-6 max-w-2xl text-white/80 text-lg">
            Experience India like never before with curated travel experiences,
            local expertise, and seamless luxury.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 leading-snug mb-6">
              Your Trusted Travel Partner in India
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
              Delivering well-organized India tours designed for comfort, clarity, and a hassle-free travel experience.
            </p>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
              From cultural landmarks to scenic destinations, every journey is
              designed to be smooth, comfortable, and thoughtfully organized
              from start to finish.
            </p>
          </div>

          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/jaipur.jpg"
              alt="tour"
              fill
              className="object-cover hover:scale-110 transition duration-700"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="my-20 border-t border-gray-200" />

        {/* Services Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What We Offer
          </h2>
          <p className="text-gray-600">
            From luxury experiences to budget-friendly trips, we cover
            everything you need for a perfect journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Luxury & Heritage Tours",
            "Corporate & Group Travel",
            "Car Rentals with Drivers",
            "Adventure & Trekking",
            "Custom Itineraries",
            "All India Tour Packages",
          ].map((item, i) => (
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

        {/* Vision & Mission */}
        <div className="mt-24 grid md:grid-cols-2 gap-10">
          <div className="p-8 bg-black text-white rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-white/80">
              To become India’s most trusted travel brand by delivering
              transparency, premium experiences, and unmatched service.
            </p>
          </div>

          <div className="p-8 bg-yellow-400 text-black rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-black/80">
              To craft meaningful journeys that go beyond travel—creating
              memories that last a lifetime.
            </p>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed">
            We don’t just plan trips—we create experiences. Every journey with
            us is designed to be smooth, memorable, and worth sharing.
          </p>
        </div>
      </section>
    </div>
  );
}
