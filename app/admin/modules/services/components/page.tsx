// app/admin/module/services/page.tsx
import { getServices } from "../actions";
import ServicesList from "../components/ServicesList";
import CreateServiceModal from "../components/CreateServiceModal";
import DeleteModal from "../components/DeleteModal";
import ClientWrapper from "../ui/client-wrapper";

export default async function ServicesPage() {
  const data = await getServices();

  return (
    <ClientWrapper initialData={data || []} />
  );
}