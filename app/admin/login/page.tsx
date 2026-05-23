// app/admin/login/page.tsx
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/connection/client";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  async function onLogin() {
    startTransition(async () => {
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
          alert("Unauthorized access");
          return;
        }

        router.push("/admin/dashboard");
      } catch {
        alert("Something went wrong");
      }
    });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[620px] w-[620px] rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 grid min-h-screen lg:grid-cols-[1.15fr_0.85fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 bg-[#0B1020]/80 p-16 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-xl">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-[0_15px_50px_rgba(99,102,241,0.45)]">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                  Secure Access
                </p>

                <h2 className="mt-1 text-xl font-semibold tracking-tight">
                  Admin Portal
                </h2>
              </div>
            </div>

            <div className="mt-28 max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">
                Enterprise Dashboard
              </p>

              <h1 className="mt-8 text-7xl font-semibold leading-[1.05] tracking-[-0.04em]">
                Manage your travel operations with elegance.
              </h1>

              <p className="mt-10 max-w-xl text-lg leading-9 text-white/55">
                Premium infrastructure for tours, bookings, services, inquiries,
                leads, destinations, and India–Nepal travel management.
              </p>
            </div>
          </div>
        </section>

        <section className="relative flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-20">
          <div className="w-full max-w-xl rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-10">
            <div className="lg:hidden">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 shadow-[0_15px_50px_rgba(99,102,241,0.45)]">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>

              <h1 className="mt-8 text-center text-4xl font-semibold tracking-tight">
                Admin Login
              </h1>

              <p className="mt-4 text-center text-base leading-8 text-white/50">
                Secure access to your premium dashboard.
              </p>
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">
                Welcome Back
              </p>

              <h2 className="mt-5 text-5xl font-semibold tracking-[-0.03em]">
                Sign in to continue
              </h2>

              <p className="mt-5 text-lg leading-9 text-white/50">
                Access your admin dashboard with enterprise-grade
                authentication.
              </p>
            </div>

            <div className="mt-12 space-y-6">
              <div>
                <label className="mb-3 block text-sm font-medium text-white/70">
                  Email Address
                </label>

                <div className="group relative flex h-16 items-center overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A]/80 px-5 backdrop-blur-xl transition-all duration-200 focus-within:border-indigo-500/60 focus-within:bg-[#111827]">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />

                  <Mail className="relative z-10 h-5 w-5 text-white/35" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="relative z-10 h-full w-full bg-transparent px-4 text-base text-white caret-white outline-none placeholder:text-white/25 [-webkit-text-fill-color:white] autofill:shadow-[inset_0_0_0px_1000px_#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-white/70">
                  Password
                </label>

                <div className="group relative flex h-16 items-center overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A]/80 px-5 backdrop-blur-xl transition-all duration-200 focus-within:border-indigo-500/60 focus-within:bg-[#111827]">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />

                  <LockKeyhole className="relative z-10 h-5 w-5 text-white/35" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="relative z-10 h-full w-full bg-transparent px-4 text-base text-white caret-white outline-none placeholder:text-white/25 [-webkit-text-fill-color:white] autofill:shadow-[inset_0_0_0px_1000px_#0F172A]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="relative z-10 text-white/40 transition hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                onClick={onLogin}
                disabled={isPending}
                className="flex h-16 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 text-base font-semibold tracking-wide text-white shadow-[0_15px_50px_rgba(99,102,241,0.45)] transition-all duration-200 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Login to Dashboard"
                )}
              </button>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.25em] text-white/30">
              <div className="h-px w-16 bg-white/10" />
              Protected Environment
              <div className="h-px w-16 bg-white/10" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
