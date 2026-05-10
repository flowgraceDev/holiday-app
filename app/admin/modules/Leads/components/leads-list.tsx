// app/admin/dashboard/leads/page.tsx
import { getLeads } from "@/app/admin/modules/Leads/actions";
import LeadsTable from "./leads-table";
import LeadsFilters from "./leads-filters";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  searchParams: Promise<{
    status?: string;
    search?: string;
    from?: string;
    to?: string;
  }>;
};

export default async function LeadsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const leads = await getLeads({
    status: params?.status || "",
    search: params?.search || "",
    from: params?.from || "",
    to: params?.to || "",
  });
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Inquiries</h1>
      <LeadsFilters />
      <LeadsTable leads={leads || []} />
    </div>
  );
}