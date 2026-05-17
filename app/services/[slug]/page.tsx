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
  console.log(slug)
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();
  console.log(data)
  if (error || !data) return notFound();

  return <ServicePageClient service={data} />;
}