// lib/supabase/about.ts
import { supabaseServer } from "../../connection/server";
import type { Database } from "../../connection/types";
type AboutRow =
  Database["public"]["Tables"]["about_section"]["Row"];

export const getAbout = async (): Promise<AboutRow | null> => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("about_section")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
};
