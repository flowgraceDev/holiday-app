import { supabaseServer } from '@/app/lib/supabase/connection/server'

export const uploadImageToSupabase = async (
  file: File,
  folder: "hero" | "about" | "destinations" | "contact"
) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { data, error } = await supabaseServer.storage
    .from("website-assets")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data: publicUrlData } = supabaseServer.storage
    .from("website-assets")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};