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
    .order("sort_order");

  if (error) throw error;
  return data;
};