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
          title: string;
          slug: string;
          short_description?: string | null;
          description?: string | null;
          duration?: string | null;
          location?: string | null;
          starting_city?: string | null;
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
        Update: Partial<Database["public"]["Tables"]["tours"]["Insert"]>;
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
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Insert"]>;
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
          full_name: string;
          email: string;
          message: string;
          phone?: string | null;
          subject?: string | null;
          status?: string | null;
          created_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["contacts_us"]["Insert"]>;
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
          title: string;
          image_url: string;
          subtitle?: string | null;
          cta_text?: string | null;
          cta_link?: string | null;
          is_active?: boolean | null;
          sort_order?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["hero_sections"]["Insert"]>;
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
        Update: Partial<Database["public"]["Tables"]["destinations"]["Insert"]>;
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
          heading: string;
          description?: string | null;
          image_url?: string | null;
          mission?: string | null;
          vision?: string | null;
          updated_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["about_section"]["Insert"]>;
      };

    contact_section: {
        Row: {
          id: string;
          title: string | null;
          subtitle: string | null;
          description: string | null;
          highlight: string | null;
          section_title: string | null;
          section_highlight: string | null;
          section_description: string | null;
          map_url: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
          highlight?: string | null;
          section_title?: string | null;
          section_highlight?: string | null;
          section_description?: string | null;
          map_url?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string | null;
          subtitle?: string | null;
          description?: string | null;
          highlight?: string | null;
          section_title?: string | null;
          section_highlight?: string | null;
          section_description?: string | null;
          map_url?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}