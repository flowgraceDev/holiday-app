// app/admin/dashboard/[section]/page.tsx
import HeroList from "@/app/admin/modules/hero/components/hero-list";
import TourList from "../../modules/tours/components/tour-list";

type Props = {
  params: Promise<{ section: string }>;
};

export default async function SectionPage({ params }: Props) {
  const { section } = await params;
console.log(section)
  if (section === "hero") return <HeroList />;
  if (section === "tours") return <TourList />;


  return <div className="p-6">Not implemented</div>;
}