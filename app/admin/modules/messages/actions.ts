// lib/actions/contacts.ts
"use server";

import { revalidatePath } from "next/cache";
import {
  getContacts as fetchContacts,
  getContactById as fetchContactById,
  updateContactStatus as updateStatus,
} from "@/app/lib/supabase/actions/admin/adminCreate";

export const getContacts = async (filters?: {
  status?: string;
  search?: string;
  from?: string;
  to?: string;
}) => {
  return await fetchContacts(filters);
};

export const getContactById = async (id: string) => {
  return await fetchContactById(id);
};

export const updateContactStatus = async (id: string, status: string) => {
  const res = await updateStatus(id, status);
  revalidatePath("/admin/dashboard/messages");
  return res;
};

