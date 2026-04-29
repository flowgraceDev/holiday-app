"use client";

import { createClient } from "@/app/lib/supabase/connection/client";

export const getServices = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .select("*");
  return data;
};
export const getDestinations = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
};
