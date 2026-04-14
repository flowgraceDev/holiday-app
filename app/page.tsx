import Hero from "@/app/components/Hero";
import InquiryForm from "@/app/components/InquiryForm";
import Features from "@/app/components/Features";
import About from "@/app/components/About";
import Destinations from "@/app/components/Destinations";
import TourPackages from "@/app/components/TourPackages";
import Testimonials from "@/app/components/Testimonials";
export default function Home() {
  return (
     <div className="flex flex-col gap-0">
      <section className="relative">
        <Hero />
      </section>

      <Features />
      <About />
      <Destinations />
      <TourPackages />
    </div>
  );
}
