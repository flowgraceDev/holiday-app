// app/page.tsx
import Hero from "@/app/components/Hero";
import TourPackages from "@/app/components/HeroTourPackages";
import Services from "@/app/components/Services";
import HeroDestinations from "@/app/components/HeroDestinations";
import HomeClient from "./HomeClient";
import { fetchHero } from "@/app/lib/supabase/actions/public/hero";

export const revalidate = 120;

export default async function Home() {
  const data = await fetchHero();
  const images = (data || []).map((h: { image_url: string }) => h.image_url);

  return (
    <div className="flex flex-col">
      <section className="relative">
        <Hero initialImages={images} />
        <TourPackages />
      </section>
      <Services />
      <HeroDestinations />
      <HomeClient />
    </div>
  );
}