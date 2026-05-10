// app/admin/dashboard/contactus/page.tsx
import { getContacts } from "@/app/admin/modules/messages/actions";
import ContactsTable from "./message-table";
import ContactsFilters from "./message-filters";

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

export default async function MessageList({ searchParams }: PageProps) {
  const params = await searchParams;

  const contacts = await getContacts({
    status: params?.status || "",
    search: params?.search || "",
    from: params?.from || "",
    to: params?.to || "",
  });
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Contact Messages</h1>
      <ContactsFilters />
      <ContactsTable leads={contacts || []} />
    </div>
  );
}