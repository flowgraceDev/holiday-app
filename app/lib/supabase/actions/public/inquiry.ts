// app/actions/inquiry.ts
'use client'

import { createClient } from '@/app/lib/supabase/connection/client'

type CreateInquiryInput = {
  full_name: string
  email: string
  phone: string
  tour_id?: string | null
  message?: string
  travel_date?: string | null
  number_of_people?: number | null
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string) {
  return /^[0-9]{7,15}$/.test(phone)
}

export async function createInquiry(data: CreateInquiryInput) {
  const supabase = await createClient()
  const full_name = data.full_name?.trim()
  const email = data.email?.trim().toLowerCase()
  const phone = data.phone?.trim()
  const message = data.message?.trim() || null
  const tour_id = data.tour_id || null
  const travel_date = data.travel_date || null
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

  if (travel_date) {
    const date = new Date(travel_date)
    if (isNaN(date.getTime())) {
      throw new Error('Invalid travel date')
    }
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

  const { error } = await supabase.from('inquiries').insert([
    {
      full_name,
      email,
      phone,
      tour_id,
      message,
      travel_date,
      number_of_people,
      status: 'new',
    },
  ] as any)

  if (error) {
    throw new Error(error.message || 'Failed to create inquiry')
  }

  return { success: true }
}