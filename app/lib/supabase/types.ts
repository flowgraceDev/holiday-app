// lib/supabase/types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      tours: {
        Row: {
          id: string;
          title: string;
          slug: string;
          short_description: string | null;
          description: string | null;
          duration: string | null;
          location: string | null;
          starting_city: string | null;
          price: number;
          discount_price: number | null;
          max_people: number | null;
          featured_image: string | null;
          gallery: string[] | null;
          itinerary: Json | null;
          inclusions: Json | null;
          exclusions: Json | null;
          highlights: Json | null;
          featured: boolean | null;
          is_active: boolean | null;
          seo_title: string | null;
          seo_description: string | null;
          cta_text: string | null;
          cta_enabled: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          short_description?: string | null;
          description?: string | null;
          duration?: string | null;
          location?: string | null;
          starting_city?: string | null;
          price: number;
          discount_price?: number | null;
          max_people?: number | null;
          featured_image?: string | null;
          gallery?: string[] | null;
          itinerary?: Json | null;
          inclusions?: Json | null;
          exclusions?: Json | null;
          highlights?: Json | null;
          featured?: boolean | null;
          is_active?: boolean | null;
          seo_title?: string | null;
          seo_description?: string | null;
          cta_text?: string | null;
          cta_enabled?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          title?: string;
          slug?: string;
          short_description?: string | null;
          description?: string | null;
          duration?: string | null;
          location?: string | null;
          starting_city?: string | null;
          price?: number;
          discount_price?: number | null;
          max_people?: number | null;
          featured_image?: string | null;
          gallery?: string[] | null;
          itinerary?: Json | null;
          inclusions?: Json | null;
          exclusions?: Json | null;
          highlights?: Json | null;
          featured?: boolean | null;
          is_active?: boolean | null;
          seo_title?: string | null;
          seo_description?: string | null;
          cta_text?: string | null;
          cta_enabled?: boolean | null;
          updated_at?: string | null;
        };
      };

      inquiries: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          travel_date: string | null;
          number_of_people: number | null;
          message: string | null;
          status: string | null;
          tour_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          travel_date?: string | null;
          number_of_people?: number | null;
          message?: string | null;
          status?: string | null;
          tour_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          full_name?: string;
          email?: string;
          phone?: string;
          travel_date?: string | null;
          number_of_people?: number | null;
          message?: string | null;
          status?: string | null;
          tour_id?: string | null;
        };
      };

      contacts_us: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          status: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          status?: string | null;
          created_at?: string | null;
        };
        Update: {
          full_name?: string;
          email?: string;
          phone?: string | null;
          subject?: string | null;
          message?: string;
          status?: string | null;
        };
      };

      hero_sections: {
        Row: {
          id: string;
          title: string;
          subtitle: string | null;
          image_url: string;
          cta_text: string | null;
          cta_link: string | null;
          is_active: boolean | null;
          sort_order: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          subtitle?: string | null;
          image_url: string;
          cta_text?: string | null;
          cta_link?: string | null;
          is_active?: boolean | null;
          sort_order?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          title?: string;
          subtitle?: string | null;
          image_url?: string;
          cta_text?: string | null;
          cta_link?: string | null;
          is_active?: boolean | null;
          sort_order?: number | null;
          updated_at?: string | null;
        };
      };

      destinations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          image_url: string;
          location: string | null;
          description: string | null;
          price_from: number | null;
          rating: number | null;
          is_featured: boolean | null;
          sort_order: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          image_url: string;
          location?: string | null;
          description?: string | null;
          price_from?: number | null;
          rating?: number | null;
          is_featured?: boolean | null;
          sort_order?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          name?: string;
          slug?: string;
          image_url?: string;
          location?: string | null;
          description?: string | null;
          price_from?: number | null;
          rating?: number | null;
          is_featured?: boolean | null;
          sort_order?: number | null;
          updated_at?: string | null;
        };
      };

      about_section: {
        Row: {
          id: string;
          heading: string;
          description: string | null;
          image_url: string | null;
          mission: string | null;
          vision: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          heading: string;
          description?: string | null;
          image_url?: string | null;
          mission?: string | null;
          vision?: string | null;
          updated_at?: string | null;
        };
        Update: {
          heading?: string;
          description?: string | null;
          image_url?: string | null;
          mission?: string | null;
          vision?: string | null;
          updated_at?: string | null;
        };
      };

      contact_section: {
        Row: {
          id: string;
          heading: string;
          description: string | null;
          image_url: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          map_embed_url: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          heading: string;
          description?: string | null;
          image_url?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          map_embed_url?: string | null;
          updated_at?: string | null;
        };
        Update: {
          heading?: string;
          description?: string | null;
          image_url?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          map_embed_url?: string | null;
          updated_at?: string | null;
        };
      };
    };
  };
}