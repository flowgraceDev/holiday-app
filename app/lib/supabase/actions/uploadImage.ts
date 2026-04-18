import { supabaseAdmin } from '@/app/lib/supabase/connection/admin'

export const uploadImageToSupabase = async (
  file: File,
  folder: "hero" | "about" | "destinations" | "contact"
) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

  const { data, error } = await supabaseAdmin.storage
    .from("website-assets")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data: publicUrlData } = supabaseAdmin.storage
    .from("website-assets")
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
};