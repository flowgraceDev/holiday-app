"use client";

import {
  FaMoneyBillWave,
  FaUmbrellaBeach,
  FaUser,
  FaHeadphones,
} from "react-icons/fa";

const features = [
  {
    icon: FaMoneyBillWave,
    title: "Easy Booking",
    desc: "Fast, smooth and hassle-free holiday booking experience.",
  },
  {
    icon: FaUmbrellaBeach,
    title: "Best Destinations",
    desc: "Handpicked destinations designed for unforgettable journeys.",
  },
  {
    icon: FaUser,
    title: "Expert Guidance",
    desc: "Professional tour guidance with deep local insights.",
  },
  {
    icon: FaHeadphones,
    title: "24/7 Support",
    desc: "Round-the-clock assistance whenever you need help.",
  },
];

export default function Features() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
            Why Travel With Us
          </h2>
          <p className="mt-3 text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Premium travel experiences crafted with trust, comfort and excellence.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <div
                key={i}
                className="group relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* ICON */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 text-white mb-5 group-hover:bg-yellow-500 transition">
                  <Icon className="text-xl" />
                </div>

                {/* TEXT */}
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {f.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>

                {/* subtle glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-b from-yellow-50/40 to-transparent pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}