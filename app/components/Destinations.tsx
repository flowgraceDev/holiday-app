import Image from "next/image";

const destinations = [
  { name: "Delhi Tour", img: "/images/humayun-tomb.jpg", featured: true },
  { name: "Agra", img: "/images/agra.jpg" },
  { name: "Jaipur", img: "/images/jaipur-slider.jpg" },
  { name: "Varanasi", img: "/images/varanasi.jpg" },
  { name: "Ranthambore", img: "/images/ranthambore.jpg" },
];

export default function Destinations() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      
      {/* soft background glow */}
      <div className="absolute -left-40 top-20 w-[500px] h-[500px] bg-blue-200/20 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-[2px] bg-yellow-500" />
            <p className="text-sm font-semibold tracking-widest text-yellow-600 uppercase">
              Destinations
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-slate-900 leading-tight">
            Explore Top Indian Destinations
          </h2>

          <p className="mt-4 text-slate-600 text-sm md:text-base leading-relaxed">
            Discover curated travel experiences across India’s most iconic cities,
            heritage sites and cultural landmarks.
          </p>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* FEATURED CARD */}
          <div className="relative lg:col-span-2 h-[420px] rounded-3xl overflow-hidden group shadow-xl">
            <Image
              src={destinations[0].img}
              alt={destinations[0].name}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* badge */}
            <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-xl text-slate-900 text-xs px-3 py-1 rounded-full font-medium">
              Featured Destination
            </div>

            {/* title */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl md:text-3xl font-semibold text-white">
                {destinations[0].name}
              </h3>
              <p className="text-white/70 text-sm mt-1">
                Premium curated tour experience
              </p>
            </div>
          </div>

          {/* SIDE GRID */}
          <div className="grid grid-cols-2 gap-6">
            {destinations.slice(1).map((d, i) => (
              <div
                key={i}
                className="relative h-[200px] rounded-2xl overflow-hidden group shadow-md"
              >
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />

                {/* label */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-medium text-sm">
                    {d.name}
                  </p>
                </div>

                {/* subtle hover border glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-yellow-400/40 transition" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}