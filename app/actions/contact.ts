// app/actions/contact.ts
'use server'

import { supabaseServer } from '@/app/lib/supabase/server'
import type { Database } from '@/app/lib/supabase/types'

type ContactInput = {
  full_name: string
  email: string
  phone?: string
  subject?: string
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

export async function createContact(data: ContactInput) {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid payload')
    }

    const full_name = data.full_name?.trim()
    const email = data.email?.trim().toLowerCase()
    const phone = data.phone?.trim() || null
    const subject = data.subject?.trim() || null
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

    if (!message || message.length < 5 || message.length > 2000) {
      throw new Error('Invalid message')
    }

    if (subject && subject.length > 150) {
      throw new Error('Subject too long')
    }

    const payload:any = {
      full_name,
      email,
      phone,
      subject,
      message,
      status: 'new',
    }

    const { error } = await supabaseServer
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