// app/admin/modules/services/page.tsx
import ServicesList from "./components/page";
type SearchParams = {
  service?: string | string[];
};
type Props = {
  searchParams?: SearchParams;
};
export default function ServicePage({ searchParams }: Props) {
  const service =
    typeof searchParams?.service === "string"
      ? searchParams.service
      : Array.isArray(searchParams?.service)
        ? searchParams.service[0]
        : undefined;

  console.log(service);
  return <ServicesList service={service ? { service } : undefined} />;
}