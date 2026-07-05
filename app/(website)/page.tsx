// app/page.tsx
import Hero from "@/app/(website)/components/Hero";
import TourPackages from "@/app/(website)/components/HeroTourPackages";
import HomeClient from "./HomeClient";
import { getHomePageData } from "@/app/lib/supabase/actions/public/home";

export const revalidate = 120;

export default async function page() {
  const { heroItems, tours } = await getHomePageData();

  const items = heroItems.map((h: { image_url: string; title: string }) => ({
    image: h.image_url,
    title: h.title,
  }));

  return (
    <div className="flex flex-col">
      <Hero items={items} />

      <section className="mt-6 bg-gradient-to-b from-transparent via-transparent to-transparent">
        <TourPackages tours={tours} />
      </section>

      <HomeClient />
    </div>
  );
}
