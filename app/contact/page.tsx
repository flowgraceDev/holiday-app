// app/contact/page.tsx
import Image from "next/image";
import ContactForm from "@/app/components/ContactForm";
import { getContact } from "@/app/lib/supabase/actions/admin/adminCreate";

export const metadata = {
  title: "Contact Us - Holidays, Simplified",
  description: "Get in touch with us for your next यात्रा in India",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <div className="bg-white text-gray-900">
      <section className="relative h-[65vh] flex items-center justify-center px-6 overflow-hidden">
        <Image
          src={contact?.image_url || "/images/chitkul.jpg"}
          alt="contact"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />

        <div className="relative z-10 max-w-3xl text-center space-y-6">
          <p className="uppercase tracking-[0.35em] text-white/60 text-xs">
            {contact?.subtitle || "Contact Us"}
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
            {contact?.title || "No Stress. No Surprises."}
            <span className="block text-yellow-400 mt-3">
              {contact?.highlight || "Just Well-Planned Travel"}
            </span>
          </h1>

          <p className="text-white/75 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            {contact?.description ||
              "Tell us your vision. We’ll turn it into a journey worth remembering."}
          </p>
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
            {contact?.section_title || "Start Your Journey With Us"}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500">
              {contact?.section_highlight || "Across Incredible India"}
            </span>
          </h2>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
            {contact?.section_description ||
              "Whether it's a family trip, honeymoon or solo adventure — we design smooth, personalized travel experiences."}
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 rounded-3xl blur opacity-20" />
          <div className="relative bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="w-full h-[420px] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none z-10" />
        <iframe
          src={
            contact?.map_url ||
            "https://www.google.com/maps?q=delhi&output=embed"
          }
          className="w-full h-full border-0"
          loading="lazy"
        />
      </section>
    </div>
  );
}