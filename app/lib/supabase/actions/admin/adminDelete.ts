// NEXT PHASE: DELETE + MEDIA + CMS HARDENING

import { supabaseAdmin } from "@/app/lib/supabase/connection/admin";

const BUCKET = "website-assets";

const extractPath = (url: string) =>
  url.split("/storage/v1/object/public/website-assets/")[1];

// HERO DELETE
export const deleteHero = async (id: string, imageUrl?: string) => {
  if (imageUrl) {
    const path = extractPath(imageUrl);
    if (path) {
      await supabaseAdmin.storage.from(BUCKET).remove([path]);
    }
  }

  const { error } = await supabaseAdmin
    .from("hero_sections")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

// DESTINATION DELETE
export const deleteDestination = async (id: string, imageUrl?: string) => {
  if (imageUrl) {
    const path = extractPath(imageUrl);
    if (path) {
      await supabaseAdmin.storage.from(BUCKET).remove([path]);
    }
  }

  const { error } = await supabaseAdmin
    .from("destinations")
    .delete()
    .eq("id", id);

  if (error) throw error;
};

// ABOUT DELETE (optional singleton reset)
export const resetAbout = async () => {
  const { error } = await supabaseAdmin
    .from("about_section")
    .update({
      heading: "",
      description: "",
      image_url: null,
      mission: null,
      vision: null,
    })
    .eq("id", (await supabaseAdmin.from("about_section").select("id").single()).data?.id);

  if (error) throw error;
};

// CONTACT DELETE (reset instead of delete)
export const resetContact = async () => {
  const { error } = await supabaseAdmin
    .from("contact_section")
    .update({
      heading: "",
      description: "",
      image_url: null,
      email: null,
      phone: null,
      address: null,
      map_embed_url: null,
    })
    .eq("id", (await supabaseAdmin.from("contact_section").select("id").single()).data?.id);

  if (error) throw error;
};