// app/admin/modules/tours/components/tour-status-toggle.tsx
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateTourAction } from "../actions";

type Props = {
  id: number;
  isActive: boolean;
};

export default function TourStatusToggle({ id, isActive }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      await updateTourAction(id, !isActive);
      router.refresh();
    });
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm ${
          isActive
            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
            : "bg-green-600 hover:bg-green-700 text-white"
        } disabled:opacity-50`}
      >
        {isPending
          ? "Updating..."
          : isActive
          ? "Disable"
          : "Enable"}
      </button>
    </div>
  );
}