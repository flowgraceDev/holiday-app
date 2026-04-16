import Hero from "@/app/components/Hero";
import Features from "@/app/components/HeroFeatures";
import About from "@/app/components/HeroAbout";
import Destinations from "@/app/components/HeroDestinations";
import TourPackages from "@/app/components/HeroTourPackages";
// import Testimonials from "@/app/components/Testimonials";
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
