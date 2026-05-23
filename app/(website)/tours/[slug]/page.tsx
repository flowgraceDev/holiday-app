// app/tours/[slug]/page.tsx
import { notFound } from "next/navigation"
import TripDetails from "@/app/(website)/components/TourDetails"
import { getTourBySlug } from "@/app/lib/supabase/actions/public/tours"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const trip = await getTourBySlug(slug).catch(() => null)
  if (!trip) return notFound()
  return <TripDetails trip={trip} />
}