import TourPackagesClient from "./TourPackagesClient";

// ✅ define type (or import if already defined elsewhere)
type Tour = {
  id: string;
  slug: string;
  title: string;
  featured_image: string;
  duration: string;
  price: number;
};

export default function TourPackages({ tours }: { tours?: Tour[] }) {
  return <TourPackagesClient tours={tours ?? []} />;
}