// lib/actions/leads.ts
"use server";

import { revalidatePath } from "next/cache";
import {
  getLeads as fetchLeads,
  getLeadById as fetchLeadById,
  updateLeadStatus as updateStatus,
  updateLeadNotes as updateNotes,
  deleteLead as removeLead,
} from "@/app/lib/supabase/actions/admin/adminCreate";

export const getLeads = async (filters?: {
  status?: string;
  search?: string;
  from?: string;
  to?: string;
}) => {
  return await fetchLeads(filters);
};

export const getLeadById = async (id: string) => {
  return await fetchLeadById(id);
};

export const updateLeadStatus = async (id: string, status: string) => {
  const res = await updateStatus(id, status);
  revalidatePath("/admin/dashboard/leads");
  return res;
};

export const updateLeadNotes = async (id: string, notes: string) => {
  const res = await updateNotes(id, notes);
  revalidatePath("/admin/dashboard/leads");
  return res;
};

export const deleteLead = async (id: string) => {
  const res = await removeLead(id);
  revalidatePath("/admin/dashboard/leads");
  return res;
};