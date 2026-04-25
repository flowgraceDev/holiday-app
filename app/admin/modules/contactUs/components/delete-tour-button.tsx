// // app/admin/modules/tours/components/delete-tour-button.tsx
// "use client";

// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { deleteTourAction } from "../actions";

// export default function DeleteTourButton({ id }: { id: number }) {
//   const [open, setOpen] = useState(false);
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();

//   const handleDelete = () => {
//     startTransition(async () => {
//       try {
//         await deleteTourAction(id);
//         setOpen(false);
//         router.refresh();
//       } catch {
//         setOpen(false);
//       }
//     });
//   };

//   return (
//     <>
//       <div className="absolute top-4 right-4">
//         <button
//           onClick={() => setOpen(true)}
//           className="opacity-0 group-hover:opacity-100 transition flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-medium hover:bg-red-700 shadow-sm"
//         >
//           Delete Tour
//         </button>
//       </div>

//       {open && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
//           <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-neutral-200">
//             <h3 className="text-base font-semibold text-neutral-800">
//               Delete Tour
//             </h3>
//             <p className="text-sm text-neutral-500 mt-2">
//               Are you sure you want to delete this tour?
//             </p>

//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setOpen(false)}
//                 className="px-4 py-2 rounded-lg border border-neutral-300 text-sm hover:bg-neutral-100 transition"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleDelete}
//                 disabled={isPending}
//                 className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition disabled:opacity-50"
//               >
//                 {isPending ? "Deleting..." : "Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }