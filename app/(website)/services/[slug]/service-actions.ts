// app/services/[slug]/service-actions.ts
// import { supabaseServer } from "@/app/lib/supabase/connection/server";

"use server";

import { sendInquiryEmail } from "@/app/lib/email";

export async function createInquiry(data: any) {
  try {
    await sendInquiryEmail(data);
    return { success: true };
  } catch (err) {
    console.error(err);
    throw new Error("Email failed");
  }
}
// export const createInquiry = async (payload: any) => {
//   const supabase = await supabaseServer();

//   const { data, error } = await supabase
//     .from("service_inquiries")
//     .insert(payload)
//     .select()
//     .single();

//   if (error) throw new Error(error.message);

//   return data;
// };