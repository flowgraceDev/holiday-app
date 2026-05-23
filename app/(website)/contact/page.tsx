// app/contact/page.tsx

import ContactForm from "@/app/(website)/components/ContactForm";
import HeroSlider from "./HeroSlider";
import { getContact } from "@/app/lib/supabase/actions/admin/adminCreate";

export const metadata = {
  title: "Contact Us - Holidays, Simplified",
  description: "Get in touch with us for your next यात्रा in India",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const contact = await getContact();

  const heroImages =
    Array.isArray(contact?.image_url) && contact.image_url.length > 0
      ? contact.image_url
      : contact?.image_url
        ? [contact.image_url]
        : ["/images/chitkul.jpg"];

  return (
    <div className="bg-white text-slate-900 overflow-hidden">
      <HeroSlider
        images={heroImages}
        title={contact?.title}
        subtitle={contact?.subtitle}
        description={contact?.description}
      />
      <div className="w-full flex justify-center bg-gradient-to-b from-slate-50 to-white py-10">
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-slate-900 text-center">
          <span className="relative inline-block">
            Contact Us
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-slate-900/70 rounded-full" />
          </span>
        </h2>
      </div>
      <section className="relative py-10 md:py-15 ">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16 xl:gap-24 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="uppercase tracking-[0.35em] text-xs text-slate-400 mb-5">
                Travel Better
              </p>

              <h2 className="text-4xl md:text-6xl font-semibold leading-[1.1] text-slate-900">
                {contact?.section_title || "Start Your Journey With Us"}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500 mt-4">
                  {contact?.section_highlight || "Across Incredible India"}
                </span>
              </h2>

              <p className="text-slate-600 text-base leading-8 max-w-xl mt-8">
                {contact?.section_description}
              </p>

              <div className="grid grid-cols-2 gap-5 mt-12">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-3xl font-semibold text-slate-900">
                    24/7
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Dedicated support throughout your journey.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-3xl font-semibold text-slate-900">
                    100%
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">
                    Personalized and flexible travel experiences.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-r from-orange-400/20 via-pink-400/20 to-yellow-400/20 rounded-[2.5rem] blur-2xl" />
              <div className="relative">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-[500px] md:h-[650px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent z-10 pointer-events-none" />

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
