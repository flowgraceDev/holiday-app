// lib/supabase/adminCreate.ts
import { supabaseAdmin } from "@/app/lib/supabase/connection/admin";
import type { Database } from "@/app/lib/supabase/connection/types";

const BUCKET = "website-assets";

const upload = async (
  file: File,
  folder: "hero" | "about" | "destinations" | "contact" | "tours" | "services"
) => {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file);

  if (error) throw error;

  return supabaseAdmin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
};

// HERO CREATE
// app/lib/supabase/actions/admin/adminCreate.ts
export const createHero = async (
  payload: Omit<
    Database["public"]["Tables"]["hero_sections"]["Insert"],
    "image_url"
  >,
  file: File
) => {
  const image_url = await upload(file, "hero");

  const { error } = await supabaseAdmin
    .from("hero_sections")
    .insert({
      ...payload,
      image_url,
      is_active: payload.is_active ?? true,
      sort_order: payload.sort_order ?? 0,
    });

  if (error) throw error;
};

export const getHeroes = async () => {
  const { data, error } = await supabaseAdmin
    .from("hero_sections")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

export const deleteHero = async (id: number) => {
  const { error } = await supabaseAdmin
    .from("hero_sections")
    .delete()
    .eq("id", id);
console.log(error)
  if (error) throw error;
};
export const updateHero = async (
  id: number,
  payload: Partial<
    Omit<
      Database["public"]["Tables"]["hero_sections"]["Update"],
      "id" | "created_at"
    >
  >
) => {
  const { error } = await supabaseAdmin
    .from("hero_sections")
    .update({
      ...payload,
    })
    .eq("id", id);

  if (error) throw error;
};


type TourInsert = Database["public"]["Tables"]["tours"]["Insert"] & {
  region?: string;
  gallery?: File[];
};
export const createTour = async (
  payload: Omit<TourInsert, "featured_image" | "gallery"> & {
    gallery?: File[];
  },
  featuredImage: File
) => {
  const featured_image = await upload(featuredImage, "tours");

  let gallery: string[] = [];

  if (payload.gallery?.length) {
    gallery = await Promise.all(
      payload.gallery.map((file) => upload(file, "tours"))
    );
  }

  const { error } = await supabaseAdmin.from("tours").insert({
    ...payload,
    featured_image,
    gallery,
    featured: payload.featured ?? false,
    is_active: payload.is_active ?? true,
    cta_enabled: payload.cta_enabled ?? true,
  });

  if (error) throw error;
};

export const getTours = async () => {
  const { data, error } = await supabaseAdmin
    .from("tours")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export const deleteTour = async (id: number) => {
  const { error } = await supabaseAdmin
    .from("tours")
    .update({ is_active: false })
    .eq("id", id);

  if (error) throw error;
};

export const updateTourStatusService = async (
  id: number,
  isActive: boolean
) => {
  const { error } = await supabaseAdmin
    .from("tours")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) throw error;
};


type UpdateTourPayload = {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  duration: string;
  location: string;
  starting_city: string;
  // price: number;
  // discount_price: number;
  max_people: number;
  itinerary: unknown;
  inclusions: unknown;
  exclusions: unknown;
  highlights: unknown;
  seo_title: string;
  seo_description: string;
  cta_text: string;
  cta_enabled: boolean;
  featured: boolean;
  is_active: boolean;
  region: string;
};

export const updateTour = async (payload: UpdateTourPayload) => {
  const { id, ...data } = payload;

  const { error } = await supabaseAdmin
    .from("tours")
    .update(data)
    .eq("id", id);

  if (error) throw error;
};

// DESTINATION CREATE
export const createDestination = async (
  payload: Omit<
    Database["public"]["Tables"]["destinations"]["Insert"],
    "image_url"
  >,
  file: File
) => {
  const image_url = await upload(file, "destinations");

  const { error } = await supabaseAdmin
    .from("destinations")
    .insert({ ...payload as any, image_url });

  if (error) throw error;
};

export const getDestinations = async () => {
  const { data, error } = await supabaseAdmin
    .from("destinations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};

export const deleteDestination = async (id: string) => {
  const { error } = await supabaseAdmin
    .from("destinations")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

export const updateDestination = async (
  id: string,
  payload: Partial<
    Omit<
      Database["public"]["Tables"]["destinations"]["Update"],
      "image_url"
    >
  >,
  file?: File
) => {
  let image_url: string | undefined;

  if (file) {
    image_url = await upload(file, "destinations");
  }

  const { error } = await supabaseAdmin
    .from("destinations")
    .update({
      ...payload,
      ...(image_url ? { image_url } : {}),
    })
    .eq("id", id);

  if (error) throw error;
};
//Lead Stuff

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "converted"
  | "closed";

export interface LeadFilters {
  status?: string;
  search?: string;
  from?: string;
  to?: string;
}

export const getLeads = async (filters?: {
  status?: string;
  search?: string;
  from?: string;
  to?: string;
}) => {
  let query = supabaseAdmin
    .from("inquiries")
    .select(`
      *,
      tour:tours(*)
    `)
    .order("created_at", { ascending: false });

  if (filters?.status && filters.status !== "") {
    query = query.eq("status", filters.status);
  }

  if (filters?.from) {
    query = query.gte("created_at", filters.from);
  }

  if (filters?.to) {
    query = query.lte("created_at", filters.to);
  }

  if (filters?.search && filters.search.trim() !== "") {
    const term = filters.search.trim();
    query = query.or(
      `full_name.ilike.%${term}%,email.ilike.%${term}%,phone.ilike.%${term}%`
    );
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
};
export const getLeadById = async (id: string) => {
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const updateLeadStatus = async (id: string, status: string) => {
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateLeadNotes = async (id: string, notes: string) => {
  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .update({ notes })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteLead = async (id: string) => {
  const { error } = await supabaseAdmin
    .from("inquiries")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
};


// messageStuff from contact us

export const getContacts = async (filters?: {
  status?: string;
  search?: string;
  from?: string;
  to?: string;
}) => {
  let query = supabaseAdmin
    .from("contacts_us")
    .select("*")
    .order("created_at", { ascending: false });

  if (filters?.status && filters.status !== "") {
    query = query.eq("status", filters.status);
  }

  if (filters?.from) {
    query = query.gte("created_at", filters.from);
  }

  if (filters?.to) {
    query = query.lte("created_at", filters.to);
  }

  if (filters?.search && filters.search.trim() !== "") {
    const term = filters.search.trim();
    query = query.or(
      `full_name.ilike.%${term}%,email.ilike.%${term}%,phone.ilike.%${term}%,message.ilike.%${term}%`
    );
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
};

export const getContactById = async (id: string) => {
  const { data, error } = await supabaseAdmin
    .from("contacts_us")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const updateContactStatus = async (id: string, status: string) => {
  const { data, error } = await supabaseAdmin
    .from("contacts_us")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
};

// ABOUT CREATE (UPSERT SINGLETON)
export const createAbout = async (
  payload: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    intro: {
      title: string;
      para1: string;
      para2: string;
    };
    services: string[];
    vision: string;
    mission: string;
    footer_text: string;
  },
  heroImages: File[],
  introImage: File
) => {
  const hero_image_urls: string[] = [];

  for (const image of heroImages ?? []) {
    if (!(image instanceof File)) continue;
    if (image.size === 0) continue;

    const uploadedUrl = await upload(image, "about");

    if (uploadedUrl) hero_image_urls.push(uploadedUrl);
  }

  const intro_image_url =
    introImage instanceof File && introImage.size > 0
      ? await upload(introImage, "about")
      : "";

  const { error } = await supabaseAdmin
    .from("about_section")
    .upsert({
      hero: {
        ...payload.hero,
        images: hero_image_urls,
      },

      intro: {
        ...payload.intro,
        image_url: intro_image_url,
      },

      services: payload.services,
      vision: payload.vision,
      mission: payload.mission,
      footer_text: payload.footer_text,
    })
    .select()
    .single();

  if (error) throw error;
};
export const getAbout = async () => {
  const { data, error } = await supabaseAdmin
    .from("about_section")
    .select("*")
    .maybeSingle();

  if (error) throw error;

  return data;
};

export async function deleteAbout(id: string) {
  const { error } = await supabaseAdmin
    .from("about_section")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Failed to delete about");
  }

}

export const updateAbout = async (
  id: string,
  payload: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      images?: string[];
    };
    intro: {
      title: string;
      para1: string;
      para2: string;
    };
    services: string[];
    vision: string;
    mission: string;
    footer_text: string;
  },
  heroImages: File[],
  introImage: File
) => {
  const hero_image_urls: string[] = [];

  for (const image of heroImages ?? []) {
    if (!(image instanceof File)) continue;
    if (image.size === 0) continue;

    const uploadedUrl = await upload(image, "about");
    if (uploadedUrl) hero_image_urls.push(uploadedUrl);
  }

  const intro_image_url =
    introImage instanceof File && introImage.size > 0
      ? await upload(introImage, "about")
      : "";

  const { error } = await supabaseAdmin
    .from("about_section")
    .update({
      hero: {
        ...payload.hero,
        images: hero_image_urls?.length
          ? hero_image_urls
          : payload.hero.images || [],
      },

      intro: {
        ...payload.intro,
        image_url: intro_image_url || undefined,
      },

      services: payload.services,
      vision: payload.vision,
      mission: payload.mission,
      footer_text: payload.footer_text,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
};
// CONTACT CREATE (UPSERT SINGLETON)


export const createContact = async (
  payload: Omit<
    Database["public"]["Tables"]["contact_section"]["Insert"],
    "image_url"
  >,
  files: File[]
) => {
  const image_urls: string[] = [];

  for (const file of files) {
    const url = await upload(file, "contact");
    image_urls.push(url);
  }

  const { error } = await supabaseAdmin
    .from("contact_section")
    .upsert({
      ...(payload as any),
      image_url: image_urls,
    });

  if (error) throw new Error(error.message);
};

export const getContact = async () => {
  const { data, error } = await supabaseAdmin
    .from("contact_section")
    .select("*")
    .limit(1);

  if (error) throw new Error(error.message);

  if (!data || data.length === 0) return null;

  return data[0];
};

export const updateContact = async (
  id: string,
  payload: Partial<
    Database["public"]["Tables"]["contact_section"]["Update"]
  >,
  files?: File[]
) => {
  let image_urls: string[] | undefined;

  if (files?.length) {
    image_urls = [];

    for (const file of files) {
      const url = await upload(file, "contact");
      image_urls.push(url);
    }
  }

  const { error } = await supabaseAdmin
    .from("contact_section")
    .update({
      ...payload,
      ...(image_urls ? { image_url: image_urls } : {}),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
};

export const deleteContact = async (id: string) => {
  const { error } = await supabaseAdmin
    .from("contact_section")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
};

// Services apis

export async function getServices() {
  const { data, error } = await supabaseAdmin
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function toggleServiceStatus(id: string, is_active: boolean) {
  const { data, error } = await supabaseAdmin
    .from("services")
    .update({ is_active })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteService(id: string) {
  const { error } = await supabaseAdmin
    .from("services")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return true;
}

export async function createService(payload: any, file: File) {
  const image_url = await upload(file, "services");

  const { data, error } = await supabaseAdmin
    .from("services")
    .insert({
      ...payload,
      image: image_url,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateService(id: string, payload: any, file?: File) {
  let image = payload.image;

  if (file) {
    image = await upload(file, "services");
  }

  const { data, error } = await supabaseAdmin
    .from("services")
    .update({
      ...payload,
      image,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}



