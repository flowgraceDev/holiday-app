// components/admin/DeleteAboutButton.tsx
"use client";

import { useTransition } from "react";
import { deleteAbout } from "./../actions";

export default function DeleteAboutButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await deleteAbout(id);
        })
      }
      disabled={pending}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}