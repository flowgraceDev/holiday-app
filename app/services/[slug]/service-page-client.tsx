// app/services/[slug]/service-page-client.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { createInquiry } from "./service-actions";

type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  content: any;
  slug: string;
};

export default function ServicePageClient({ service }: { service: Service }) {
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
    <div className="relative w-full h-[340px] md:h-[460px]">
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
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const submit = async () => {
    if (!form.name || !form.phone) return;

    setLoading(true);
    try {
      await createInquiry({
        service_id: service.id,
        service_slug: service.slug,
        ...form,
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      alert("Inquiry submitted successfully");
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
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-black/20 focus:ring-2 focus:ring-black/5 transition"
              placeholder="Full Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-black/20 focus:ring-2 focus:ring-black/5 transition"
              placeholder="Phone *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <input
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-black/20 focus:ring-2 focus:ring-black/5 transition"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <textarea
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-black/20 focus:ring-2 focus:ring-black/5 transition min-h-[130px]"
            placeholder="Describe your requirement..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-black/90 transition"
          >
            {loading ? "Submitting..." : "Submit Inquiry"}
          </button>
        </div>
      </div>
    </div>
  );
}
