// components/admin/hero/hero-table.tsx
"use client";

import { useEffect, useState } from "react";
// types/hero.ts
export type Hero = {
  id: string;
  title: string;
  subtitle: string;
  created_at: string;
};

export default function HeroTable() {
  const [data, setData] = useState<Hero[]>([]);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b">
          <th className="py-2">Title</th>
          <th className="py-2">Subtitle</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="border-b">
            <td className="py-2">{item.title}</td>
            <td className="py-2">{item.subtitle}</td>
            <td className="py-2 space-x-2">
              <button className="text-blue-600">Edit</button>
              <button className="text-red-600">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}