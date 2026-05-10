"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/connection/client";

export default function AdminLoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

// app/admin/login/page.tsx (replace onLogin)
async function onLogin() {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (!data.user) return;

    if (data.user.email !== "vinn4200@gmail.com") {
      await supabase.auth.signOut();
      return;
    }

    router.push("/admin/dashboard");
  } catch (err) {
  }
}

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80 space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onLogin} className="bg-black text-white w-full p-2">
          Login
        </button>
      </div>
    </div>
  );
}