// app/components/Services.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaSuitcaseRolling,
  FaCar,
  FaPlane,
  FaTrain,
  FaRoute,
} from "react-icons/fa";

type Service = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  href: string;
  image: string;
};

const services: Service[] = [
  {
    icon: FaSuitcaseRolling,
    title: "Tour Packages",
    desc: "Complete India & Nepal travel planning.",
    href: "/services/tour-packages",
    image: "/images/services/tour.jpg",
  },
  {
    icon: FaCar,
    title: "Car Rental",
    desc: "Comfortable rides for all journeys.",
    href: "/services/car-rental",
    image: "/images/services/car.jpg",
  },
  {
    icon: FaPlane,
    title: "Flight Tickets",
    desc: "Optimized routes & best pricing.",
    href: "/services/flight-tickets",
    image: "/images/services/flight.jpg",
  },
  {
    icon: FaTrain,
    title: "Train Tickets",
    desc: "Confirmed bookings with ease.",
    href: "/services/train-tickets",
    image: "/images/services/train.jpg",
  },
  {
    icon: FaRoute,
    title: "Tracking Tours India & Nepal",
    desc: "Scenic India & Nepal adventures.",
    href: "/services/tracking-tours",
    image: "/images/services/trek.jpg",
  },
];

export default function Services() {
  return (
    <section className="pt-4 pb-16 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
         <p className="text-yellow-600 font-semibold tracking-widest uppercase text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-[2px] bg-yellow-500" />
            Our Services
            <span className="w-8 h-[2px] bg-yellow-500" />
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Travel Solutions
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {services.map((s) => {
            const Icon = s.icon;

            return (
              <Link
                key={s.title}
                href={s.href}
                className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-md transition"
              >
                <div className="relative h-24 w-full">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width:768px) 50vw, 20vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <Icon className="text-lg mb-1" />
                    <span className="text-xs font-semibold text-center px-1 leading-tight">
                      {s.title}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}