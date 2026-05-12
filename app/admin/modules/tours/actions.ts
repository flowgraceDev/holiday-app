// app/admin/modules/tours/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import {
  createTour as createTourService,
  deleteTour as deleteTourService,
  updateTourStatusService,
  updateTour as updateTourService,
} from "@/app/lib/supabase/actions/admin/adminCreate";

const safeJSON = <T>(value: FormDataEntryValue | null, fallback: T): T => {
  if (!value || typeof value !== "string" || value.trim() === "") return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const createTourAction = async (formData: FormData) => {
  const payload = {
    title: (formData.get("title") as string) || "",
    slug: (formData.get("slug") as string) || "",
    short_description: (formData.get("short_description") as string) || "",
    description: (formData.get("description") as string) || "",
    duration: (formData.get("duration") as string) || "",
    location: (formData.get("location") as string) || "",
    starting_city: (formData.get("starting_city") as string) || "",
    max_people: Number(formData.get("max_people") || 0),
    itinerary: safeJSON(formData.get("itinerary"), []),
    inclusions: safeJSON(formData.get("inclusions"), []),
    exclusions: safeJSON(formData.get("exclusions"), []),
    highlights: safeJSON(formData.get("highlights"), []),
    seo_title: (formData.get("seo_title") as string) || "",
    seo_description: (formData.get("seo_description") as string) || "",
    cta_text: (formData.get("cta_text") as string) || "",
    cta_enabled: formData.get("cta_enabled") === "on",
    featured: formData.get("featured") === "on",
    is_active: formData.get("is_active") === "on",
    region: (formData.get("region") as string) || "",
    gallery: (formData.getAll("gallery") as File[]) || [],
  };

  const featuredImage = formData.get("featured_image") as File ;

  await createTourService(payload, featuredImage);
  revalidatePath("/admin/dashboard/tours");
};

export const deleteTourAction = async (id: number) => {
  await deleteTourService(id);
  revalidatePath("/admin/dashboard/destinations");
};

export const updateTourAction = async (id: number, isActive: boolean) => {
  await updateTourStatusService(id, isActive);
  revalidatePath("/admin/dashboard/destinations");
};

export const updateTourFullAction = async (
  id: number,
  formData: FormData
) => {
  const payload = {
    id,

    title: (formData.get("title") as string) || "",

    slug: (formData.get("slug") as string) || "",

    short_description:
      (formData.get(
        "short_description"
      ) as string) || "",

    description:
      (formData.get("description") as string) ||
      "",

    duration:
      (formData.get("duration") as string) || "",

    location:
      (formData.get("location") as string) || "",

    starting_city:
      (formData.get(
        "starting_city"
      ) as string) || "",

    max_people: Number(
      formData.get("max_people") || 0
    ),

    itinerary: safeJSON(
      formData.get("itinerary"),
      []
    ),

    inclusions: safeJSON(
      formData.get("inclusions"),
      []
    ),

    exclusions: safeJSON(
      formData.get("exclusions"),
      []
    ),

    highlights: safeJSON(
      formData.get("highlights"),
      []
    ),

    seo_title:
      (formData.get("seo_title") as string) ||
      "",

    seo_description:
      (formData.get(
        "seo_description"
      ) as string) || "",

    cta_text:
      (formData.get("cta_text") as string) ||
      "",

    cta_enabled:
      formData.get("cta_enabled") === "on",

    featured:
      formData.get("featured") === "on",

    is_active:
      formData.get("is_active") === "on",

    region:
      (formData.get("region") as string) || "",

    existing_featured_image:
      (formData.get(
        "existing_featured_image"
      ) as string) || "",

    existing_gallery: safeJSON(
      formData.get("existing_gallery"),
      []
    ),

   featured_image_file:
  formData.get("featured_image") instanceof File
    ? (formData.get("featured_image") as File)
    : null,

gallery_files: (
  formData.getAll("gallery") as File[]
).filter(
  (file) =>
    file instanceof File &&
    file.size > 0
),
  };

  await updateTourService(payload);

  revalidatePath("/admin/dashboard/tours");
};