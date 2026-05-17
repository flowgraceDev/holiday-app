// app/services/[slug]/service-page-client.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { createInquiry } from "./service-actions";
import ComingSoonSection from "./coming-soon-section";

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  content: any;
  slug: string;
  is_active: boolean;
};

export default function ServicePageClient({ service }: { service: Service }) {
  if (service.is_active === false) {
    return (
      <div className="bg-white">
        <ComingSoonSection
          title={service.title}
          description={service.description}
        />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Hero service={service} />
      <Content service={service} />
      <InquiryForm service={service} />
    </div>
  );
}

function Hero({ service }: { service: Service }) {
  return (
    <div className="relative w-full h-[55vh] sm:h-[55vh] md:h-[55vh]">
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex items-end">
        <div className="max-w-5xl mx-auto w-full px-6 pb-12 text-white">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {service.title}
          </h1>

          <p className="mt-4 text-sm md:text-base text-white/85 max-w-2xl leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Content({ service }: { service: Service }) {
  if (!service.content) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="space-y-10">
        {(service.content?.sections || []).map((sec: any, idx: number) => (
          <div key={idx} className="space-y-2">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
              {sec.title}
            </h2>
            <p className="text-slate-600 leading-relaxed">{sec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InquiryForm({ service }: { service: Service }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function getServiceType(slug: string) {
    const text = slug.toLowerCase();

    if (text.includes("car")) return "car";
    if (text.includes("flight")) return "flight";
    if (text.includes("train")) return "train";
    if (text.includes("tour")) return "tour";
    if (text.includes("track") || text.includes("trek")) return "trek";

    return "default";
  }

  const type = getServiceType(service.slug);

  function getDynamicFields(type: string) {
    switch (type) {
      case "flight":
        return [
          {
            label: "From",
            name: "from",
            placeholder: "From (City)",
          },
          {
            label: "To",
            name: "to",
            placeholder: "To (City)",
          },
            {
            label: "Arrival Date",
            name: "arrivalDate",
            placeholder: "Arrival Date",
            type: "date",
          },
          {
            label: "Departure Date",
            name: "departureDate",
            placeholder: "Departure Date",
            type: "date",
          },
        
          {
            label: "Passengers",
            name: "passengers",
            placeholder: "Passengers",
          },
        ];

      case "train":
        return [
          {
            label: "From Station",
            name: "from",
            placeholder: "From Station",
          },
          {
            label: "To Station",
            name: "to",
            placeholder: "To Station",
          },
           {
            label: "Arrival Date",
            name: "arrivalDate",
            placeholder: "Arrival Date",
            type: "date",
          },
          {
            label: "Departure Date",
            name: "departureDate",
            placeholder: "Departure Date",
            type: "date",
          },
         
          {
            label: "Class",
            name: "class",
            placeholder: "Class (Sleeper/3AC etc)",
          },
        ];

      case "car":
        return [
          {
            label: "Pickup Location",
            name: "pickup",
            placeholder: "Pickup Location",
          },
          {
            label: "Drop Location",
            name: "drop",
            placeholder: "Drop Location",
          },
            {
            label: "Arrival Date",
            name: "arrivalDate",
            placeholder: "Arrival Date",
            type: "date",
          },
          {
            label: "Departure Date",
            name: "departureDate",
            placeholder: "Departure Date",
            type: "date",
          },
        
          {
            label: "Car Type",
            name: "carType",
            placeholder: "Car Type (SUV, Sedan)",
          },
        ];

      case "tour":
        return [
          {
            label: "Destination",
            name: "destination",
            placeholder: "Destination",
          },
           {
            label: "Arrival Date",
            name: "arrivalDate",
            placeholder: "Arrival Date",
            type: "date",
          },
          {
            label: "Departure Date",
            name: "departureDate",
            placeholder: "Departure Date",
            type: "date",
          },
         
          {
            label: "No. of Days",
            name: "days",
            placeholder: "No. of Days",
          },
          {
            label: "Number of People",
            name: "people",
            placeholder: "Number of People",
          },
          {
            label: "Budget",
            name: "budget",
            placeholder: "Budget (₹)",
          },
        ];

      case "trek":
        return [
          {
            label: "Trek Name",
            name: "trekName",
            placeholder: "Trek Name",
          },
           {
            label: "Arrival Date",
            name: "arrivalDate",
            placeholder: "Arrival Date",
            type: "date",
          },
          {
            label: "Departure Date",
            name: "departureDate",
            placeholder: "Departure Date",
            type: "date",
          },
         
          {
            label: "Participants",
            name: "people",
            placeholder: "Participants",
          },
          {
            label: "Experience Level",
            name: "experience",
            placeholder: "Experience Level",
          },
        ];

      default:
        return [];
    }
  }

  const dynamicFields = getDynamicFields(type);

  const messagePlaceholderMap: any = {
    flight:
      "E.g. Delhi to Mumbai, 2 passengers, morning flight preferred",
    train: "E.g. Delhi to Varanasi, sleeper class, flexible dates",
    car: "E.g. Pickup from Delhi airport, drop to Manali, SUV needed",
    tour: "E.g. Trip for 4 people, 5 days, mid-range budget",
    trek: "E.g. Kedarkantha trek, beginner, 3 people",
  };

  const [form, setForm] = useState<any>(() => {
    const base: any = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    dynamicFields.forEach((f: any) => {
      base[f.name] = "";
    });

    return base;
  });

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const resetForm = () => {
    const cleared: any = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    dynamicFields.forEach((f: any) => {
      cleared[f.name] = "";
    });

    setForm(cleared);
  };

  const submit = async () => {
    if (loading) return;

    if (!form.name || !form.phone || !form.email) {
      setStatus("error");
      return;
    }

    if (!isValidEmail(form.email)) {
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus("idle");

    try {
      const payload = {
        service_id: service.id,
        service_slug: service.slug,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        departureDate: form.departureDate || "",
        arrivalDate: form.arrivalDate || "",
        extra: dynamicFields.reduce((acc: any, field: any) => {
          acc[field.name] = form[field.name] || "";
          return acc;
        }, {}),
      };

      await createInquiry(payload);

      resetForm();
      setStatus("success");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-14 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Get a Free Consultation
          </h2>

          <p className="text-slate-600 mt-2 text-sm">
            Tell us your requirements and we’ll get back within 24 hours.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              autoComplete="name"
              className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
              placeholder="Full Name *"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="tel"
              autoComplete="tel"
              className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
              placeholder="Phone *"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          {dynamicFields.map((field: any) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                {field.label}
              </label>

              <input
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={form[field.name] || ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field.name]: e.target.value,
                  })
                }
                className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
              />
            </div>
          ))}

          <input
            type="email"
            autoComplete="email"
            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
            placeholder="Email (required)"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <textarea
            className="w-full bg-white border border-slate-300 rounded-xl p-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition min-h-[130px]"
            placeholder={
              messagePlaceholderMap[type] ||
              "Describe your requirement..."
            }
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button
            onClick={submit}
            disabled={loading || !form.name || !form.phone || !form.email}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Inquiry"}
          </button>

          {status === "success" && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-4 rounded-xl">
              🎉 Your request has been received!
              <br />
              Our team will contact you within <strong>24 hours</strong>.
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl">
              ❌ Please fill all required fields correctly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}