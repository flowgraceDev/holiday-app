// app/admin/modules/services/ServicesPage.tsx

import { getServices } from "../actions";
import ClientWrapper from "../ui/client-wrapper";

type SearchParams = {
  service?: string | string[];
};

type Props = {
  service?: SearchParams;
};

export default async function ServicePage({ service }: Props) {
  console.log("searchParams 2",service)
  const services =
    typeof service?.service === "string"
      ? service.service
      : Array.isArray(service?.service)
        ? service.service[0]
        : "";

  const data = await getServices(services);

  return <ClientWrapper initialData={data ?? []} />;
}