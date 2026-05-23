// app/admin/dashboard/[section]/page.tsx
import HeroList from "@/app/admin/modules/hero/components/hero-list";
import Page from "../../modules/tours/page";
import DestinationList from "../../modules/destinations/components/destiantions-list";
import LeadsPage from "../../modules/Leads/components/leads-list";
import MessageList from "../../modules/messages/components/message-list";
import AboutList from "../../modules/aboutUs/components/about-list";
import ContactList from "../../modules/contactUs/components/contactUsList";
import ServicePage from "../../modules/services/page";

type Props = {
  params: Promise<{ section: string }>;
  searchParams: Promise<{
    status?: string;
    search?: string;
    from?: string;
    to?: string;
    region?: string;
    service?: string;
  }>;
};
export default async function SectionPage({ params, searchParams }: Props) {
  const { section } = await params;
  const searchParam= await searchParams
  console.log("params in sections",section)
  if (section === "hero") return <HeroList />;
  if (section === "tours") return <Page searchParams={searchParam} />;
  if (section === "destinations") return <DestinationList />;
  if (section === "about") return <AboutList />;
  if (section === "contact") return <ContactList />;
  if (section === "leads") return <LeadsPage searchParams={searchParams} />;
  if (section === "messages")
    return <MessageList searchParams={searchParams} />;
  if (section === "services") return <ServicePage searchParams={searchParam} />;
  return <div className="p-6">Not implemented</div>;
}
