import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { AboutClientView } from "@/components/about/AboutClientView";

export const metadata: Metadata = {
  title: "About the Expo | Nepal Buildcon 2027",
  description: `The 12th Nepal Buildcon International Expo connects manufacturers, suppliers and innovators with Nepal's building and construction professionals from ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
    
title="About the Exhibition"
highlightTitle="Building & Construction in Nepal"
intro="The 12th Nepal Buildcon International Expo 2027 brings together manufacturers, suppliers and industry professionals to explore building materials, construction equipment, technologies and related solutions."
    image={{
          src: "/images/gallery/nepal-buildcon-floor-01.jpg",
          alt: "Busy exhibition aisle at Nepal Buildcon International Expo in Kathmandu",
        }}
      />

      <AboutClientView />
    </main>
  );
}
