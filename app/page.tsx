// app/page.tsx
import Hero from "@/app/components/Hero";
import TourPackages from "@/app/components/HeroTourPackages";
import HomeClient from "./HomeClient";
import { getHomePageData } from "@/app/lib/supabase/actions/public/home";
export const revalidate = 120;

export default async function Home() {
  const { heroImages, tours } = await getHomePageData();
  const images = heroImages.map(
    (h: { image_url: string }) => h.image_url
  );

  return (
    <div className="flex flex-col">

      <Hero initialImages={images} />

      <section className="mt-6 bg-gradient-to-b from-black via-white to-white">
        {/* send ALL data once */}
        <TourPackages tours={tours} />
      </section>

      <HomeClient />

    </div>
  );
}