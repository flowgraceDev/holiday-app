// app/admin/modules/destinations/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import {
  createDestination,
  getDestinations,
  deleteDestination,
  updateDestination
} from "@/app/lib/supabase/actions/admin/adminCreate";
import { Database } from "@/app/lib/supabase/connection/types";

export const createDestinationAction = async (formData: FormData) => {
  const file = formData.get("image") as File;

  const payload = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
   
  };

  await createDestination(payload as any, file);

  revalidatePath("/admin/dashboard/destinations");
};

export const getDestinationsAction = async () => {
  const data = await getDestinations();

  revalidatePath("/admin/dashboard/destinations");

  return data;
};

export const deleteDestinationAction = async (id: string) => {
  await deleteDestination(id);

  revalidatePath("/admin/dashboard/destinations");
};
export const updateDestinationAction = async (
  id: string,
  payload: Partial<
    Omit<
      Database["public"]["Tables"]["destinations"]["Update"],
      "image_url"
    >
  >,
  file?: File
) => {
  await updateDestination(id, payload, file);

  revalidatePath("/admin/dashboard/destinations");
};