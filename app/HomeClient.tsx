"use client";

import dynamic from "next/dynamic";

// ✅ lazy load (allowed here)
const Services = dynamic(() => import("@/app/components/Services"), {
  ssr: false,
  loading: () => <div className="h-40" />,
});

const HeroDestinations = dynamic(
  () => import("@/app/components/HeroDestinations"),
  {
    ssr: false,
    loading: () => <div className="h-40" />,
  }
);

const Features = dynamic(() => import("@/app/components/HeroFeatures"), {
  ssr: false,
  loading: () => <div className="h-40" />,
});

const About = dynamic(() => import("@/app/components/HeroAbout"), {
  ssr: false,
  loading: () => <div className="h-40" />,
});

export default function HomeClient() {
  return (
    <>
      <Services />
      <HeroDestinations />
      <Features />
      <About />
    </>
  );
}