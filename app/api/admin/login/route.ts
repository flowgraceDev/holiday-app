// app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/app/lib/auth/admin";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await verifyAdmin(email, password);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}