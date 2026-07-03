"use client";

import dynamic from "next/dynamic";

// ✅ lazy load (allowed here)
const Services = dynamic(() => import("@/app/(website)/components/Services"), {
  ssr: false,
  loading: () => <div className="h-40" />,
});

const HeroDestinations = dynamic(
  () => import("@/app/(website)/components/HeroDestinations"),
  {
    ssr: false,
    loading: () => <div className="h-40" />,
  }
);

const Features = dynamic(() => import("@/app/(website)/components/HeroFeatures"), {
  ssr: false,
  loading: () => <div className="h-40" />,
});

const About = dynamic(() => import("@/app/(website)/components/HeroAbout"), {
  ssr: false,
  loading: () => <div className="h-40" />,
});

export default function HomeClient() {
  return (
    <>
      <Services />
      <HeroDestinations />
      <Features />
    </>
  );
}