// components/admin/hero/hero-form.tsx
"use client";

import { useState } from "react";

export default function HeroForm() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/hero", {
      method: "POST",
      body: JSON.stringify({ title, subtitle }),
    });

    setTitle("");
    setSubtitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full rounded-lg border p-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="w-full rounded-lg border p-2"
        placeholder="Subtitle"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
      />
      <button className="rounded-lg bg-black px-4 py-2 text-white">
        Save
      </button>
    </form>
  );
}