import TourList from "@/app/admin/modules/tours/components/tour-list";

export default async function Page(
  searchParams:any,
){
const params= await searchParams
  return <TourList searchParams={params} />;
}