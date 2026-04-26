import { getTours } from "../lib/supabase/actions/public/tours";
import TourPackagesClient from "./TourPackagesClient";

export default async function TourPackages() {
  const tours = await getTours();
  return <TourPackagesClient tours={tours || []} />;
}