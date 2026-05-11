// app/admin/modules/contactUs/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import {
  createContact as createContactService,
  getContact as getContactService,
  updateContact as updateContactService,
  deleteContact as deleteContactService,
} from "@/app/lib/supabase/actions/admin/adminCreate";

const extractFiles = (formData: FormData, key: string) => {
  const files = formData.getAll(key);
  return files.filter((f): f is File => f instanceof File && f.size > 0);
};

export const createContactAction = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const highlight = formData.get("highlight") as string;

  const section_title = formData.get("section_title") as string;
  const section_highlight = formData.get("section_highlight") as string;
  const section_description = formData.get("section_description") as string;

  const map_url = formData.get("map_url") as string;

  const images = extractFiles(formData, "images");

  await createContactService(
    {
      title,
      subtitle,
      description,
      highlight,
      section_title,
      section_highlight,
      section_description,
      map_url,
    },
    images
  );

  revalidatePath("/admin/dashboard/contact");
};

export const updateContactAction = async (id: string, formData: FormData) => {
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const description = formData.get("description") as string;
  const highlight = formData.get("highlight") as string;

  const section_title = formData.get("section_title") as string;
  const section_highlight = formData.get("section_highlight") as string;
  const section_description = formData.get(
    "section_description"
  ) as string;

  const map_url = formData.get("map_url") as string;

  const images = extractFiles(formData, "images");

  const existing_images_raw = formData.get(
    "existing_images"
  ) as string;

  const existing_images: string[] = existing_images_raw
    ? JSON.parse(existing_images_raw)
    : [];

  await updateContactService(
    id,
    {
      title,
      subtitle,
      description,
      highlight,
      section_title,
      section_highlight,
      section_description,
      map_url,
      existing_images,
    },
    images
  );

  revalidatePath("/admin/dashboard/contact");
};
export const getContactAction = async () => {
  return await getContactService();
};

export const deleteContactAction = async (id: string) => {
  await deleteContactService(id);
  revalidatePath("/admin/dashboard/contact");
};