// app/admin/modules/tours/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createTour as createTourService } from "@/app/lib/supabase/actions/admin/adminCreate";
import { deleteTour as deleteTourService } from "@/app/lib/supabase/actions/admin/adminCreate";
export const createTourAction = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const short_description = formData.get("short_description") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const location = formData.get("location") as string;
  const starting_city = formData.get("starting_city") as string;

  const price = Number(formData.get("price"));
  const discount_price = Number(formData.get("discount_price") || 0);
  const max_people = Number(formData.get("max_people") || 0);

  const itinerary = JSON.parse(formData.get("itinerary") as string);
  const inclusions = JSON.parse(formData.get("inclusions") as string);
  const exclusions = JSON.parse(formData.get("exclusions") as string);
  const highlights = JSON.parse(formData.get("highlights") as string);

  const seo_title = formData.get("seo_title") as string;
  const seo_description = formData.get("seo_description") as string;

  const cta_text = formData.get("cta_text") as string;
  const cta_enabled = formData.get("cta_enabled") === "on";

  const featured = formData.get("featured") === "on";
  const is_active = formData.get("is_active") === "on";

  const region = formData.get("region") as string;

  const featuredImage = formData.get("featured_image") as File;
  const galleryFiles = formData.getAll("gallery") as File[];

  await createTourService(
    {
      title,
      slug,
      short_description,
      description,
      duration,
      location,
      starting_city,
      price,
      discount_price,
      max_people,
      itinerary,
      inclusions,
      exclusions,
      highlights,
      seo_title,
      seo_description,
      cta_text,
      cta_enabled,
      featured,
      is_active,
      region,
      gallery: galleryFiles,
    },
    featuredImage
  );

  revalidatePath("/admin/dashboard/tours");
};

export const deleteTourAction = async (id: number) => {
  await deleteTourService(id);
  revalidatePath("/admin/dashboard/destinations");
};