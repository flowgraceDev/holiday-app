// app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import { supabaseServer } from "@/app/lib/supabase/connection/server";
import ServicePageClient from "./service-page-client";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) return notFound();

  return <ServicePageClient service={data} />;
}