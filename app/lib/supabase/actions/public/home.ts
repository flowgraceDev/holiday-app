import { fetchHero } from "@/app/lib/supabase/actions/public/hero";
import { getTours } from "@/app/lib/supabase/actions/public/tours";

export async function getHomePageData() {
  const [hero, tours] = await Promise.all([
    fetchHero(),
    getTours(), // 🔥 ONE CALL ONLY (ALL TOURS)
  ]);

  return {
    heroItems: hero ?? [],
    tours: tours ?? [],
  };
}