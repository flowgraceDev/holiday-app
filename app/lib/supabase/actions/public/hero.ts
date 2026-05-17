"use server"
import { supabaseServer } from '@/app/lib/supabase/connection/server'


// export const insertHero = async (payload: any) => {
//   const { error } = await supabaseAdmin.from("hero_sections").insert(payload);
//   if (error) throw error;
// };

export const fetchHero = async () => {
  const supabase = await supabaseServer()
  const { data, error } = await supabase
    .from("hero_sections")
    .select("*")
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error;
  return data;
};