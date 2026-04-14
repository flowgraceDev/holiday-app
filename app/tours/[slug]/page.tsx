// app/tours/[slug]/page.tsx
import { notFound } from "next/navigation"
import TripDetails from "@/app/components/TourDetails"
import { getTourBySlug } from "@/app/actions/tours"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  console.log("PARAM SLUG:", slug)

  const trip = await getTourBySlug(slug).catch(() => null)

  if (!trip) return notFound()

  return <TripDetails trip={trip} />
}