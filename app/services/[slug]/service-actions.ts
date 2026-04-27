// app/services/[slug]/service-actions.ts
"use server";

import { supabaseServer } from "@/app/lib/supabase/connection/server";

export const createInquiry = async (payload: any) => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("service_inquiries")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};