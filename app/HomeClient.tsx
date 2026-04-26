// app/HomeClient.tsx
"use client";

import dynamic from "next/dynamic";

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
      <Features />
      <About />
    </>
  );
}