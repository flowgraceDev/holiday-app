// components/shared/coming-soon-section.tsx

type ComingSoonSectionProps = {
  title: string;
  description?: string;
};

export default function ComingSoonSection({
  title,
  description,
}: ComingSoonSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 border-t">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 max-w-2xl">
          <p className="text-yellow-600 font-semibold tracking-widest uppercase text-sm flex items-center gap-2">
            <span className="w-8 h-[2px] bg-yellow-500" />
            Coming Soon
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mt-3 capitalize">
            {title}
          </h2>

          <p className="text-slate-600 mt-3 text-sm md:text-base">
            {description ||
              "We are preparing premium experiences for this service."}
          </p>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-3xl">
            ✈️
          </div>

          <h3 className="mt-6 text-2xl font-semibold text-slate-900 capitalize">
            {title} is coming soon
          </h3>

          <p className="mt-3 max-w-2xl mx-auto text-slate-600 leading-relaxed">
            We are currently curating premium travel experiences for this
            service. Exciting itineraries and new travel experiences will be
            available shortly.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              Curated Experiences
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              {title} Coming Soon
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              Best Price Packages
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}