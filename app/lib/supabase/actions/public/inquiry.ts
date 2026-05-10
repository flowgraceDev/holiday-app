// app/actions/inquiry.ts
'use server'

import { supabaseServer } from '@/app/lib/supabase/connection/server'
import { Database } from '@/app/lib/supabase/connection/types'
import { sendTripInquiryEmail } from '@/app/lib/send-trip-inquiry-email'

type InquiryInsert =
  Database['public']['Tables']['inquiries']['Insert']

type CreateInquiryInput = {
  full_name: string
  email: string
  phone: string
  tour_id?: string | null
  message?: string
  arrival_date?: string | null
  departure_date?: string | null
  number_of_people?: number | null
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string) {
  return /^[0-9]{7,15}$/.test(phone)
}

function isValidDate(date: string) {
  return !isNaN(new Date(date).getTime())
}

export async function createInquiry(data: any) {
  const supabase = await supabaseServer()

  const full_name = data.full_name?.trim()
  const email = data.email?.trim().toLowerCase()
  const phone = data.phone?.trim()
  const message = data.message?.trim() || null
  const tour_id = data.tour_id || null
  const arrival_date = data.arrival_date || null
  const departure_date = data.departure_date || null
  const number_of_people = data.number_of_people ?? null

  if (!full_name || full_name.length < 2 || full_name.length > 100) {
    throw new Error('Invalid full name')
  }

  if (!email || !isValidEmail(email)) {
    throw new Error('Invalid email address')
  }

  if (!phone || !isValidPhone(phone)) {
    throw new Error('Invalid phone number')
  }

  if (message && message.length > 1000) {
    throw new Error('Message too long')
  }

  if (arrival_date && !isValidDate(arrival_date)) {
    throw new Error('Invalid arrival date')
  }

  if (departure_date && !isValidDate(departure_date)) {
    throw new Error('Invalid departure date')
  }

  if (
    arrival_date &&
    departure_date &&
    new Date(departure_date) < new Date(arrival_date)
  ) {
    throw new Error('Departure date cannot be before arrival date')
  }

  if (number_of_people !== null) {
    if (
      !Number.isInteger(number_of_people) ||
      number_of_people <= 0 ||
      number_of_people > 100
    ) {
      throw new Error('Invalid number of people')
    }
  }

  if (tour_id && tour_id.length > 100) {
    throw new Error('Invalid tour id')
  }

  const inquiryPayload = {
  full_name,
  email,
  phone,
  tour_id,
  message,
  arrival_date,
  departure_date,
  number_of_people,
  status: 'new',
}

const { error } = await supabase
  .from('inquiries')
  .insert(inquiryPayload as any)

  if (error) {
    throw new Error(error.message || 'Failed to create inquiry')
  }

  if (tour_id) {
    const { data: trip } = await supabase
      .from('tours')
      .select(`
        id,
        title,
        location,
        starting_city,
        duration
      `)
      .eq('id', tour_id)
      .single()

    if (trip) {
      await sendTripInquiryEmail({
        full_name,
        email,
        phone,
        message,
        arrival_date,
        departure_date,
        number_of_people,
        trip,
      })
    }
  }

  return {
    success: true,
  }
}