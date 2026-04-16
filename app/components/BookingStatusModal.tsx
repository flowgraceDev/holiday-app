// components/InquiryStatusModal.tsx
"use client";

import { dancing } from "@/app/fonts";

export default function InquiryStatusModal({
  status,
  onClose,
}: {
  status: "success" | "error" | null;
  onClose: () => void;
}) {
  if (!status) return null;

  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl px-10 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.25)] text-center space-y-6 animate-in fade-in zoom-in-95">
         <p
          className={`${dancing.className} text-3xl md:text-4xl ${
            isSuccess
              ? "text-amber-500 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]"
              : "text-fuchsia-500 drop-shadow-[0_0_20px_rgba(217,70,239,0.6)]"
          } tracking-tight`}
        >
          {isSuccess ? "Inquiry Sent Successfully" : "Booking Failed"}
        </p>

        <button
          onClick={onClose}
          className="px-6 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white text-sm backdrop-blur-md transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
