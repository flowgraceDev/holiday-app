import { supabaseAdmin } from "@/app/lib/supabase/connection/admin";

const BUCKET = "website-assets";

const replace = async (
  file: File,
  folder: string,
  oldUrl?: string
): Promise<string> => {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file);

  if (error) throw error;

  if (oldUrl) {
    const oldPath = oldUrl.split(
      "/storage/v1/object/public/website-assets/"
    )[1];

    if (oldPath) {
      await supabaseAdmin.storage.from(BUCKET).remove([oldPath]);
    }
  }

  return supabaseAdmin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
};

export const updateHero = async (
  id: string,
  payload: any,
  file?: File,
  oldUrl?: string
) => {
  const image_url = file ? await replace(file, "hero", oldUrl) : oldUrl;

  const updateData: any = {
    ...payload,
    image_url: image_url ?? null,
  };

  const { error } = await supabaseAdmin
    .from("hero_sections")
    .update(updateData)
    .eq("id", id);

  if (error) throw error;
};

export const updateDestination = async (
  id: string,
  payload: any,
  file?: File,
  oldUrl?: string
) => {
  const image_url = file
    ? await replace(file, "destinations", oldUrl)
    : oldUrl;

  const updateData: any = {
    ...payload,
    image_url: image_url ?? null,
  };

  const { error } = await supabaseAdmin
    .from("destinations")
    .update(updateData)
    .eq("id", id);

  if (error) throw error;
};