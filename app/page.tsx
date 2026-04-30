// app/page.tsx
import Hero from "@/app/components/Hero"
import TourPackages from "@/app/components/HeroTourPackages"
import HomeClient from "./HomeClient"
import { getHomePageData } from "@/app/lib/supabase/actions/public/home"

export const revalidate = 120

export default async function Home() {
  const { heroItems, tours } = await getHomePageData()

  const items = heroItems.map(
    (h: { image_url: string; title: string }) => ({
      image: h.image_url,
      title: h.title,
    })
  )

  return (
    <div className="flex flex-col">
      <Hero items={items} />

      <section className="mt-6 bg-gradient-to-b from-black via-white to-white">
        <TourPackages tours={tours} />
      </section>

      <HomeClient />
    </div>
  )
}