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

export type Region = 'north' | 'south' | 'east' | 'west' | 'central' | 'unknown'

type GetToursResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }

export async function getToursByRegion(region: Region): Promise<GetToursResponse<any[]>> {
  try {
    if (!region) {
      return { success: false, error: 'Region is required' }
    }

    const { data, error } = await supabaseServer
      .from('tours')
      .select('*')
      .eq('region', region)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      return { success: false, error: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, error: 'No tours found' }
    }

    return { success: true, data }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Something went wrong'
    }
  }
}