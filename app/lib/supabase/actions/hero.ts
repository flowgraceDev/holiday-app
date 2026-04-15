import { supabaseServer } from '@/app/lib/supabase/server'


export const insertHero = async (payload: any) => {
  const { error } = await supabaseServer.from("hero_sections").insert(payload);
  if (error) throw error;
};

export const fetchHero = async () => {
  const { data, error } = await supabaseServer
    .from("hero_sections")
    .select("*")
    .order("sort_order");

  if (error) throw error;
  return data;
};