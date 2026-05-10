// app/actions/contact.ts
'use client'
import { createClient } from '@/app/lib/supabase/connection/client'
import type { Database } from '@/app/lib/supabase/connection/types'

type ContactInput = {
  full_name: string
  email: string
  phone?: string
  subject?: string
  arrival_date?: string
  departure_date?: string
  message: string
}

type ContactInsert =
  Database['public']['Tables']['contacts_us']['Insert']

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string) {
  return /^[0-9]{7,15}$/.test(phone)
}

function isValidDate(date: string) {
  return !Number.isNaN(new Date(date).getTime())
}

export async function createContact(data: ContactInput) {
  const supabase = await createClient()

  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid payload')
    }

    const full_name = data.full_name?.trim()
    const email = data.email?.trim().toLowerCase()
    const phone = data.phone?.trim() || null
    const subject = data.subject?.trim() || null
    const arrival_date = data.arrival_date?.trim() || null
    const departure_date = data.departure_date?.trim() || null
    const message = data.message?.trim()

    if (!full_name || full_name.length < 2 || full_name.length > 100) {
      throw new Error('Invalid full name')
    }

    if (!email || !isValidEmail(email)) {
      throw new Error('Invalid email')
    }

    if (phone && !isValidPhone(phone)) {
      throw new Error('Invalid phone number')
    }

    if (subject && subject.length > 150) {
      throw new Error('Subject too long')
    }

    if (!arrival_date || !isValidDate(arrival_date)) {
      throw new Error('Invalid arrival date')
    }

    if (!departure_date || !isValidDate(departure_date)) {
      throw new Error('Invalid departure date')
    }

    if (new Date(departure_date) < new Date(arrival_date)) {
      throw new Error('Departure date must be after arrival date')
    }

    if (!message || message.length < 5 || message.length > 2000) {
      throw new Error('Invalid message')
    }

    const payload: any = {
      full_name,
      email,
      phone,
      subject,
      arrival_date,
      departure_date,
      message,
      status: 'new',
    }

    const { error } = await supabase
      .from('contacts_us')
      .insert(payload)

    if (error) {
      if (error.code === '23505') {
        throw new Error('Duplicate entry')
      }

      throw new Error(error.message || 'Database error')
    }

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error ? err.message : 'Unexpected error',
    }
  }
}