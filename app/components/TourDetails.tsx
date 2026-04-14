'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import InquiryModal from './InquiryModal'

type ItineraryItem = {
  day: number
  title: string
  desc: string
}

type Trip = {
  id: string
  title: string
  slug: string
  short_description: string
  description: string
  duration: string
  location: string
  starting_city: string
  price: number
  discount_price: number
  max_people: number
  featured_image: string
  gallery: string[]
  cta_enabled: boolean
  cta_text?: string | null
  itinerary?: ItineraryItem[] | string | null
  inclusions?: string[] | string | null
  exclusions?: string[] | string | null
  highlights?: string[] | string | null
  travel_date: string | null
}

type Props = {
  trip: Trip
}

const normalizeList = (data: string[] | string | null | undefined) => {
  if (!data) return []
  if (Array.isArray(data)) return data
  return data.split('\n').map((i) => i.trim()).filter(Boolean)
}

const normalizeItinerary = (data: Trip['itinerary']): ItineraryItem[] => {
  if (!data) return []
  if (Array.isArray(data)) return data
  return []
}

export default function TripDetails({ trip }: Props) {
  const images = useMemo(
    () => (trip.gallery?.length ? trip.gallery : [trip.featured_image]),
    [trip.gallery, trip.featured_image]
  )

  const [activeImage, setActiveImage] = useState(images[0])
  const [open, setOpen] = useState(false)

  const inclusions = useMemo(() => normalizeList(trip.inclusions), [trip.inclusions])
  const exclusions = useMemo(() => normalizeList(trip.exclusions), [trip.exclusions])
  const highlights = useMemo(() => normalizeList(trip.highlights), [trip.highlights])
  const itinerary = useMemo(() => normalizeItinerary(trip.itinerary), [trip.itinerary])

  const essentials = [
    { label: 'Location', value: trip.location },
    { label: 'Starting City', value: trip.starting_city },
    { label: 'Duration', value: trip.duration },
    { label: 'Group Size', value: `${trip.max_people} people` }
  ]

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 grid lg:grid-cols-[1.25fr_0.75fr] gap-10">
        
        <div className="space-y-6">

          <div className="relative w-full h-[340px] md:h-[480px] rounded-[28px] overflow-hidden bg-slate-200 shadow-sm ring-1 ring-slate-200">
            <Image
              src={activeImage}
              alt={trip.title}
              fill
              priority
              className="object-cover scale-[1.02] hover:scale-105 transition duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img) => (
              <button
                key={img}
                onClick={() => setActiveImage(img)}
                className={`relative min-w-[78px] h-16 rounded-xl overflow-hidden transition-all duration-300
                  ${
                    activeImage === img
                      ? 'ring-2 ring-emerald-500 shadow-md scale-[1.05]'
                      : 'ring-1 ring-slate-200 opacity-70 hover:opacity-100'
                  }`}
              >
                <Image src={img} alt={trip.title} fill className="object-cover" />
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
              {trip.title}
            </h1>

            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {trip.short_description}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {essentials.map((e) => (
              <div
                key={e.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition"
              >
                <p className="text-[11px] uppercase tracking-wider text-slate-400">
                  {e.label}
                </p>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  {e.value}
                </p>
              </div>
            ))}
          </div>

          {highlights.length > 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-slate-700">Highlights</p>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span className="text-emerald-500 mt-[2px]">▹</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-700 mb-3">Overview</p>
            <p className="text-slate-600 leading-relaxed">
              {trip.description}
            </p>
          </div>

          {itinerary.length > 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm font-medium text-slate-700">Journey Plan</p>
                <span className="text-xs text-slate-400">Day-wise flow</span>
              </div>

              <div className="relative border-l border-slate-200 pl-6 space-y-5">
                {itinerary.map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-emerald-500 shadow" />

                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 group-hover:bg-white group-hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-semibold tracking-widest text-slate-400">
                          DAY {item.day}
                        </span>
                      </div>

                      <p className="font-semibold text-slate-800 text-sm">
                        {item.title}
                      </p>

                      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {inclusions.length > 0 && (
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/40 p-6">
              <p className="text-sm font-medium text-emerald-700 mb-3">
                Included Benefits
              </p>

              <div className="grid md:grid-cols-2 gap-2">
                {inclusions.map((i, idx) => (
                  <div key={idx} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-emerald-600">✔</span>
                    <span>{i}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exclusions.length > 0 && (
            <div className="rounded-3xl border border-red-100 bg-red-50/30 p-6">
              <p className="text-sm font-medium text-red-600 mb-3">
                Not Included
              </p>

              <div className="grid md:grid-cols-2 gap-2">
                {exclusions.map((e, idx) => (
                  <div key={idx} className="flex gap-2 text-sm text-slate-700">
                    <span className="text-red-500">✕</span>
                    <span>{e}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-6 h-fit space-y-5">

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <p className="text-xs text-slate-400 uppercase tracking-widest">
              Starting From
            </p>

            <div className="flex items-end gap-3 mt-2">
              <span className="text-4xl font-bold text-slate-900">
                ₹{trip.discount_price}
              </span>

              <span className="text-sm text-slate-400 line-through">
                ₹{trip.price}
              </span>

              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                Save ₹{trip.price - trip.discount_price}
              </span>
            </div>

            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p>✔ Instant confirmation</p>
              <p>✔ Secure booking system</p>
              <p>✔ Dedicated trip assistance</p>
            </div>

            {trip.cta_enabled && (
              <button
                onClick={() => setOpen(true)}
                className="mt-6 w-full py-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium shadow-md hover:shadow-xl hover:scale-[1.01] transition"
              >
                {trip.cta_text || 'Book Your Journey'}
              </button>
            )}
          </div>

        </div>

        <InquiryModal open={open} onClose={() => setOpen(false)} trip={trip} />
      </div>
    </div>
  )
}