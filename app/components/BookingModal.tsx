"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import { createInquiry } from "@/app/lib/supabase/actions/inquiry";
import { dancing } from "@/app/fonts";
import InquiryStatusModal from '@/app/components/BookingStatusModal'
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
    return Array.from(new Set(base)); // remove duplicates
  }, [trip.gallery, trip.featured_image]);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    travel_date: "",
    number_of_people: "",
    message: "",
  });

  const [activeImage, setActiveImage] = useState(images[0]);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  useEffect(() => {
    if (open) setActiveImage(images[0]);
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
      travel_date: form.travel_date || undefined,
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
          message: "",
          travel_date: "",
          number_of_people: "",
        });
      } catch {
        setStatus("error");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] p-4 sm:p-6 md:p-30 bg-black/60 backdrop-blur-md flex items-center justify-center">
      <div className="w-full max-w-4x max-h-[95vh] overflow-hidden bg-white rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.25)] grid md:grid-cols-2">
        <div className="relative hidden md:block">
          <Image
            src={activeImage}
            alt={trip.title}
            fill
            className="object-cover"
          />
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
                className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/30"
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6 bg-slate-50">
          {/* HEADER */}
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <p className="text-[11px] tracking-widest uppercase text-slate-400">
                Booking Inquiry
              </p>

              <h3 className="leading-tight">
                <span
                  className={`${dancing.className} text-3xl md:text-4xl text-emerald-700 drop-shadow-sm`}
                >
                  {trip.title}
                </span>
              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  📍 {trip.location}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span>🚗 {trip.starting_city}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-95 transition flex items-center justify-center text-slate-600"
            >
              ✕
            </button>
          </div>

          {/* PRICE STRIP */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-3">
              <p className="text-[10px] uppercase tracking-wider text-emerald-600">
                Discount Price
              </p>
              <p className="text-lg font-semibold text-slate-900">
                ₹{trip.discount_price}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                Original Price
              </p>
              <p className="text-lg font-semibold text-slate-400 line-through">
                ₹{trip.price}
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-2 px-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                placeholder="Full Name"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition"
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
              />

              <input
                placeholder="Email"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                placeholder="Phone Number"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                type="date"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition"
                value={form.travel_date}
                onChange={(e) =>
                  setForm({ ...form, travel_date: e.target.value })
                }
              />
            </div>

            <input
              type="number"
              placeholder="Number Of People"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition"
              value={form.number_of_people}
              onChange={(e) =>
                setForm({ ...form, number_of_people: e.target.value })
              }
            />

            <textarea
              placeholder="Tell us your preferences (optional)"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition h-20 resize-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={pending || !isFormValid}
            className="w-full rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 py-3 text-white font-medium shadow-md hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Sending Request..." : "Send Inquiry"}
          </button>

          {/* FOOTNOTE */}
          <p className="text-[11px] text-slate-400 text-center leading-relaxed">
            Our travel expert will contact you within 24 hours to customize your
            journey
          </p>
        </div>
         <InquiryStatusModal status={status} onClose={() => setStatus(null)} />
      </div>
    </div>
  );
}
