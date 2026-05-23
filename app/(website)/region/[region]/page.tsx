// app/region/[region]/page.tsx
import TourByRegions from "@/app/(website)/components/TourPackagesByRegion";

const REGIONS = [
  "north",
  "south",
  "east",
  "west",
  "central",
  "india-nepal",
] as const;

type Region = (typeof REGIONS)[number];

function isValidRegion(value: string): value is Region {
  return REGIONS.includes(value as Region);
}

export default async function Page({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;

  if (!region || !isValidRegion(region)) {
    return <div className="py-20 text-center">Invalid region</div>;
  }

  return <TourByRegions region={region} />;
}