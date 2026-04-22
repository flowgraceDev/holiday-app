// lib/supabase/adminCreate.ts
import { supabaseAdmin } from "@/app/lib/supabase/connection/admin";
import type { Database } from "@/app/lib/supabase/connection/types";

const BUCKET = "website-assets";

const upload = async (
  file: File,
  folder: "hero" | "about" | "destinations" | "contact"
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

// ABOUT CREATE (UPSERT SINGLETON)
export const createAbout = async (
  payload: Omit<
    Database["public"]["Tables"]["about_section"]["Insert"],
    "image_url"
  >,
  file: File
) => {
  const image_url = await upload(file, "about");

  const { error } = await supabaseAdmin
    .from("about_section")
    .upsert({ ...payload as any, image_url });

  if (error) throw error;
};

// CONTACT CREATE (UPSERT SINGLETON)
export const createContact = async (
  payload: Omit<
    Database["public"]["Tables"]["contact_section"]["Insert"],
    "image_url"
  >,
  file: File
) => {
  const image_url = await upload(file, "contact");

  const { error } = await supabaseAdmin
    .from("contact_section")
    .upsert({ ...payload as any, image_url });

  if (error) throw error;
};