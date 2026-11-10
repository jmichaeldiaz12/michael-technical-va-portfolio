import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import ServiceHighlights from "@/components/sections/ServiceHighlights";
import SupportProcess from "@/components/sections/SupportProcess";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WhyWorkWithMe from "@/components/sections/WhyWorkWithMe";
import ContactCTA from "@/components/sections/ContactCTA";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: {
    absolute: "John Michael Diaz | Technical Virtual Assistant & Remote IT Support Specialist",
  },
  description:
    "Philippines-based Technical Virtual Assistant offering part-time remote IT support, Windows troubleshooting, network troubleshooting, website support, and workflow automation on an evening shift (6 PM–12 AM PHT).",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <Intro />
      <ServiceHighlights />
      <SupportProcess />
      <FeaturedProjects />
      <WhyWorkWithMe />
      <ContactCTA />
    </>
  );
}
