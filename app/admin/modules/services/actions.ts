// lib/actions/services/index.ts
"use server";

import { revalidatePath } from "next/cache";

import {
  getServices as fetchServices,
  createService as create,
  updateService as update,
  deleteService as remove,
  toggleServiceStatus as toggle,
} from "@/app/lib/supabase/actions/admin/adminCreate"

export const getServices = async () => {
  return await fetchServices();
};

export const createService = async (payload: any, file: File) => {
  const res = await create(payload, file);
  revalidatePath("/admin/module/services");
  return res;
};

export const updateService = async (
  id: string,
  payload: any,
  file?: File
) => {
  const res = await update(id, payload, file);
  revalidatePath("/admin/module/services");
  return res;
};

export const deleteService = async (id: string) => {
  const res = await remove(id);
  revalidatePath("/admin/module/services");
  return res;
};

export const toggleServiceStatus = async (
  id: string,
  status: boolean
) => {
  const res = await toggle(id, status);
  revalidatePath("/admin/module/services");
  return res;
};