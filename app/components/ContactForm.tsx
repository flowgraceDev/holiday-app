"use client";

import { useMemo, useState, useTransition, useEffect } from "react";
import { createContact } from "@/app/lib/supabase/actions/public/contact";
import StatusModal from "@/app/components/StatusModal";

type Errors = {
  full_name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  arrival_date?: string;
  departure_date?: string;
  message?: string;
};

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [isPending, startTransition] = useTransition();

  const initialState = {
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    arrival_date: "",
    departure_date: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initialState);

  function validate(values: typeof formValues) {
    const e: Errors = {};

    if (!values.full_name || values.full_name.trim().length < 2) {
      e.full_name = "Minimum 2 characters required";
    }

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.email = "Invalid email";
    }

    if (values.phone && !/^[0-9]{7,15}$/.test(values.phone)) {
      e.phone = "Invalid phone";
    }

    if (values.subject && values.subject.length > 150) {
      e.subject = "Too long";
    }

    if (!values.arrival_date) {
      e.arrival_date = "Arrival date is required";
    }

    if (!values.departure_date) {
      e.departure_date = "Departure date is required";
    }

    if (
      values.arrival_date &&
      values.departure_date &&
      new Date(values.departure_date) < new Date(values.arrival_date)
    ) {
      e.departure_date = "Departure must be after arrival";
    }

    if (!values.message || values.message.trim().length < 5) {
      e.message = "Minimum 5 characters required";
    }

    return e;
  }

  const currentErrors = useMemo(() => validate(formValues), [formValues]);
  const isFormValid = Object.keys(currentErrors).length === 0;

  function resetForm() {
    setFormValues(initialState);
    setErrors({});
  }

  function handleSubmit(formData: FormData) {
    const values = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      arrival_date: formData.get("arrival_date") as string,
      departure_date: formData.get("departure_date") as string,
      message: formData.get("message") as string,
    };

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    startTransition(async () => {
      const res = await createContact(values);
      setStatus(res.success ? "success" : "error");

      if (res.success) {
        resetForm();
      }
    });
  }

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 shadow-[0_10px_50px_rgba(0,0,0,0.04)]">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-3">
            Plan Your Trip
          </p>

          <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight">
            Send a Message
          </h3>

          <p className="text-slate-500 text-sm md:text-base mt-3 leading-relaxed">
            Share your travel plans and our team will get back to you with the
            best itinerary options.
          </p>
        </div>

        <form action={handleSubmit} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name (required)
              </label>

              <input
                name="full_name"
                placeholder="Enter your full name"
                value={formValues.full_name}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    full_name: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-black"
              />

              {errors.full_name && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.full_name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address (required)
              </label>

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-black"
              />

              {errors.email && (
                <p className="text-xs text-red-500 mt-2">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number (required)
              </label>

              <input
                name="phone"
                placeholder="Enter your phone number"
                value={formValues.phone}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-black"
              />

              {errors.phone && (
                <p className="text-xs text-red-500 mt-2">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject (required)
              </label>

              <input
                name="subject"
                placeholder="Trip, honeymoon, family tour..."
                value={formValues.subject}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    subject: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-black"
              />

              {errors.subject && (
                <p className="text-xs text-red-500 mt-2">{errors.subject}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Arrival Date (required)
              </label>

              <input
                type="date"
                name="arrival_date"
                value={formValues.arrival_date}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    arrival_date: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-black"
              />

              {errors.arrival_date && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.arrival_date}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Departure Date (required)
              </label>

              <input
                type="date"
                name="departure_date"
                value={formValues.departure_date}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    departure_date: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-black"
              />

              {errors.departure_date && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.departure_date}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Your Message (required)
            </label>

            <textarea
              name="message"
              rows={5}
              placeholder="Tell us about your travel plans..."
              value={formValues.message}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  message: e.target.value,
                })
              }
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition resize-none focus:border-black"
            />

            {errors.message && (
              <p className="text-xs text-red-500 mt-2">{errors.message}</p>
            )}
          </div>

          <button
            disabled={isPending || !isFormValid}
            className="w-full rounded-2xl bg-black text-white py-4 text-sm font-semibold transition hover:bg-slate-900 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <StatusModal status={status} onClose={() => setStatus(null)} />
    </>
  );
}