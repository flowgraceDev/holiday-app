// app/admin/dashboard/[section]/page.tsx
import HeroList from "@/app/admin/modules/hero/components/hero-list";

type Props = {
  params: Promise<{ section: string }>;
};

export default async function SectionPage({ params }: Props) {
  const { section } = await params;

  if (section === "hero") return <HeroList />;

  return <div className="p-6">Not implemented</div>;
}