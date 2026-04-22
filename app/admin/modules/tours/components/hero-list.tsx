// app/admin/components/admin/hero/hero-list.tsx
import HeroTable from "./hero-table";

export default function HeroList() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Hero Section</h3>
      </div>
      <HeroTable />
    </div>
  );
}