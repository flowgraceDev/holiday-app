// lib/supabase/destinations.ts
import { supabaseServer } from "../server";

export const insertDestination = async (payload: {
  name: string;
  slug: string;
  image_url: string;
  location?: string;
  description?: string;
  price_from?: number;
}) => {
  const { error } = await supabaseServer.from("destinations").insert({
    ...payload as any,
    is_featured: false,
  });

  if (error) throw error;
};

export const fetchDestinations = async () => {
  const { data, error } = await supabaseServer
    .from("destinations")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
};