// app/admin/modules/about/actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { createAbout as createAboutService } from "@/app/lib/supabase/actions/admin/adminCreate";
import { getAbout as getAboutService } from "@/app/lib/supabase/actions/admin/adminCreate";
import { deleteAbout as deleteAboutService } from "@/app/lib/supabase/actions/admin/adminCreate";

export const createAbout = async (formData: FormData) => {
  try {
    const hero_title = formData.get("hero_title") as string;
    const hero_subtitle = formData.get("hero_subtitle") as string;
    const hero_description = formData.get("hero_description") as string;

    const hero_image = formData.get("hero_image") as File;

    const intro_title = formData.get("intro_title") as string;
    const intro_para1 = formData.get("intro_para1") as string;
    const intro_para2 = formData.get("intro_para2") as string;

    const intro_image = formData.get("intro_image") as File;

    const servicesRaw = formData.get("services") as string;

    const vision = formData.get("vision") as string;
    const mission = formData.get("mission") as string;
    const footer_text = formData.get("footer_text") as string;

    const services =
      servicesRaw?.split(",").map((s) => s.trim()).filter(Boolean) || [];

    await createAboutService(
      {
        hero: {
          title: hero_title,
          subtitle: hero_subtitle,
          description: hero_description,
        },
        intro: {
          title: intro_title,
          para1: intro_para1,
          para2: intro_para2,
        },
        services,
        vision,
        mission,
        footer_text,
      },
      hero_image as File,
      intro_image as File
    );

    revalidatePath("/admin/dashboard/about");

    return { ok: true };
  } catch (err: any) {
    console.error("ABOUT CREATE ERROR:", err);
    throw new Error(err?.message || "Failed to create about section");
  }
};
// GET
export const getAbout = async () => {
  const data = await getAboutService();
  return data;
};

export const deleteAbout = async (id: string) => {
  await deleteAboutService(id);
  revalidatePath("/admin/dashboard/about");
};