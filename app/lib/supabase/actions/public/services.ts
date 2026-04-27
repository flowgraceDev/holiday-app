"use server";

import { supabaseServer } from "@/app/lib/supabase/connection/server";

export const getServices = async () => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("services")
    .select("*");
  return data;
};
