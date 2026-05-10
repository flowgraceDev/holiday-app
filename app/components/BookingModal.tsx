"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { createInquiry } from "@/app/lib/supabase/actions/public/inquiry";
import { dancing } from "@/app/fonts";
import InquiryStatusModal from "@/app/components/BookingStatusModal";

type Trip = {
  id: string;
  title: string;
  short_description: string;
  location: string;
  starting_city: string;
  duration: string;
  price: number;
  discount_price: number;
  featured_image: string;
  gallery: string[];
};

export default function InquiryModal({
  open,
  onClose,
  trip,
}: {
  open: boolean;
  onClose: () => void;
  trip: Trip;
}) {
  const [pending, startTransition] = useTransition();

  const images = useMemo(() => {
    const base = trip.gallery?.length ? trip.gallery : [trip.featured_image];
    return Array.from(new Set(base));
  }, [trip.gallery, trip.featured_image]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    arrival_date: "",
    departure_date: "",
    number_of_people: "",
    message: "",
  });

  const [activeImage, setActiveImage] = useState(images[0]);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    if (open) setActiveImage(images[0]);
  }, [open, images]);

  useEffect(() => {
    if (!open || images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => {
        const currentIndex = images.indexOf(prev);
        const nextIndex = (currentIndex + 1) % images.length;

        return images[nextIndex];
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [open, images]);

  if (!open) return null;

  const isFormValid =
    form.full_name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    /^[0-9]{7,15}$/.test(form.phone);

  const handleSubmit = () => {
    if (!isFormValid || pending) return;
    const payload = {
      full_name: form.full_name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      message: form.message?.trim() || undefined,
      arrival_date: form.arrival_date || undefined,
      departure_date: form.departure_date || undefined,
      number_of_people: form.number_of_people
        ? Number(form.number_of_people)
        : undefined,
      tour_id: trip.id || undefined,
    };
    startTransition(async () => {
      try {
        await createInquiry(payload);

        setStatus("success");

        setForm({
          full_name: "",
          email: "",
          phone: "",
          arrival_date: "",
          departure_date: "",
          number_of_people: "",
          message: "",
        });
      } catch {
        setStatus("error");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md sm:p-6 md:p-30">
      <div className="grid max-h-[95vh] w-full max-w-4x overflow-hidden rounded-3xl bg-white shadow-[0_25px_70px_rgba(0,0,0,0.25)] md:grid-cols-2">
        <div className="relative hidden md:block overflow-hidden">
          {images.map((img) => (
            <Image
              key={img}
              src={img}
              alt={trip.title}
              fill
              priority
              className={`absolute inset-0 object-cover transition-opacity duration-1000 ${
                activeImage === img ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 space-y-2 text-white">
            <p className="text-sm opacity-80">{trip.location}</p>

            <h2 className="text-xl font-semibold">{trip.title}</h2>

            <p className="text-sm opacity-90">{trip.short_description}</p>
          </div>

          <div className="absolute top-3 left-3 flex gap-2">
            {images.slice(0, 3).map((img, idx) => (
              <button
                key={`${img}-${idx}`}
                onClick={() => setActiveImage(img)}
                className="relative h-12 w-12 overflow-hidden rounded-lg border border-white/30"
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 bg-slate-50 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-widest text-slate-400">
                Booking Inquiry
              </p>

              <h3 className="leading-tight">
                <span
                  className={`${dancing.className} text-3xl text-emerald-700 drop-shadow-sm md:text-4xl`}
                >
                  {trip.title}
                </span>
              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  📍 {trip.location}
                </span>

                <span className="h-1 w-1 rounded-full bg-slate-300" />

                <span>Starting City 🚗 {trip.starting_city}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-95"
            >
              ✕
            </button>
          </div>

          {/* <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-emerald-600">
                Starting City
              </p>

              <p className="text-lg font-semibold text-slate-900">
                {trip.starting_city}
              </p>
            </div>
          </div> */}

          <div className="space-y-4 px-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
                  value={form.full_name}
                  onChange={(e) =>
                    setForm({ ...form, full_name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Number Of People
                </label>

                <input
                  type="number"
                  min={1}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
                  value={form.number_of_people}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      number_of_people: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Arrival Date
                </label>

                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
                  value={form.arrival_date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      arrival_date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">
                  Departure Date
                </label>

                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
                  value={form.departure_date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      departure_date: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">
                Message
              </label>

              <textarea
                className="h-24 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={pending || !isFormValid}
            className="w-full rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 py-3 font-medium text-white shadow-md transition hover:scale-[1.01] hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Sending Request..." : "Send Inquiry"}
          </button>

          <p className="text-center text-[11px] leading-relaxed text-slate-400">
            Our travel expert will contact you within 24 hours to customize your
            journey
          </p>
        </div>

        <InquiryStatusModal status={status} onClose={() => setStatus(null)} />
      </div>
    </div>
  );
}
