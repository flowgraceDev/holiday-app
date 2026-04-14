import Image from "next/image";
import ContactForm from "@/app/components/ContactForm";

export const metadata = {
  title: "Contact Us - Shri Radhe Holidays",
  description: "Get in touch with us for your next यात्रा in India",
};

export default function ContactPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="relative h-[70vh] md:h-[75vh] flex items-center justify-center px-6 overflow-hidden">
        <Image
          src="/images/chitkul.jpg"
          alt="contact"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl text-center space-y-5">
          <p className="uppercase tracking-[0.35em] text-white/70 text-xs">
            Contact Us
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
            No Stress. No Surprises.
            <span className="block text-yellow-400 mt-2">
              Just Well-Planned Travel
            </span>
          </h1>

          <p className="text-white/75 text-sm md:text-lg max-w-xl mx-auto leading-relaxed">
            Tell us your vision. We’ll turn it into a journey worth remembering.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-slate-900">
              Start Your Journey With Us
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-500">
                Across Incredible India
              </span>
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl">
              Whether it's a family trip, honeymoon or solo adventure — we
              design smooth, personalized travel experiences.
            </p>
          </div>

          {/* <div className="space-y-8">
            {[
              { label: "Phone", value: "+91 8679343420", icon: "📞" },
              { label: "Email", value: "vinn4200@gmail.com", icon: "✉️" },
              {
                label: "Address",
                value: "The Ridge, Shimla, Himachal Pradesh, India",
                icon: "📍",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border border-slate-200 flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {item.label}
                  </p>
                  <p className="text-slate-900 font-medium">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div> */}
        </div>

        <ContactForm />
      </section>

      <section className="w-full h-[420px]">
        <iframe
          src="https://www.google.com/maps?q=delhi&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </section>
    </div>
  );
}