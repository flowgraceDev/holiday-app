// app/actions/tours.ts
'use server'

import { supabaseServer } from '@/app/lib/supabase/server'

export async function getTours() {
  const { data, error } = await supabaseServer
    .from('tours')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return data
}

export async function getTourBySlug(slug: string) {
  console.log("calll ayi hai ",slug)
  const { data, error } = await supabaseServer
    .from('tours')
    .select('*')
    .eq('slug', slug)
    .single()
console.log("tripData",data)
  if (error) throw new Error(error.message)

  return data
}