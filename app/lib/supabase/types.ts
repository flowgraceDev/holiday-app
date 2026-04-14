// lib/supabase/types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

type Table<T> = {
  Row: T
  Insert: Omit<T, 'id' | 'created_at' | 'updated_at'> & {
    id?: string
    created_at?: string | null
    updated_at?: string | null
  }
  Update: Partial<T>
}

export interface Database {
  public: {
    Tables: {
      tours: Table<{
        id: string
        title: string
        slug: string
        short_description: string | null
        description: string | null
        duration: string | null
        location: string | null
        starting_city: string | null
        price: number
        discount_price: number | null
        max_people: number | null
        featured_image: string | null
        gallery: string[] | null
        itinerary: Json | null
        inclusions: Json | null
        exclusions: Json | null
        highlights: Json | null
        featured: boolean | null
        is_active: boolean | null
        seo_title: string | null
        seo_description: string | null
        cta_text: string | null
        cta_enabled: boolean | null
        created_at: string | null
        updated_at: string | null
      }>
      inquiries: Table<{
        id: string
        full_name: string
        email: string
        phone: string
        travel_date: string | null
        number_of_people: number | null
        message: string | null
        status: string | null
        tour_id: string | null
        created_at: string | null
      }>
      contacts_us: Table<{
        id: string
        full_name: string
        email: string
        phone: string | null
        subject: string | null
        message: string
        status: string | null
        created_at: string | null
      }>
    }
  }
}