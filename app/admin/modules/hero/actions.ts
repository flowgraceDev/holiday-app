// app/admin/modules/hero/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { createHero as createHeroService } from "@/app/lib/supabase/actions/admin/adminCreate";
import { deleteHero as deleteHeroService } from "@/app/lib/supabase/actions/admin/adminCreate";


export const createHeroAction = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const subtitle = formData.get("subtitle") as string;
  const file = formData.get("image") as File;

  const is_active = formData.get("is_active") === "on";
  const sort_order = Number(formData.get("sort_order") || 0);

  await createHeroService(
    { title, subtitle, is_active, sort_order },
    file
  );

  revalidatePath("/admin/dashboard/hero");
};

export const deleteHeroAction = async (id: number) => {
  await deleteHeroService(id);
  revalidatePath("/admin/dashboard/hero");
};