import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { VenueClientView } from "@/components/about/VenueClientView";

export const metadata: Metadata = {
  title: "Venue & Location | Bhrikuti Mandap, Kathmandu",
  description: `${event.venue.fullLocation} hosts Nepal Buildcon International Expo 2027 from ${event.dates.display}. Explore venue access and city connectivity.`,
  alternates: { canonical: "/venue" },
};

export default function VenuePage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
     

  title="Visit the Exhibition"
  highlightTitle="Bhrikuti Mandap, Kathmandu"
  intro={`The 12th Nepal Buildcon International Expo 2027 takes place at ${event.venue.fullLocation}. Find the venue, get directions and plan your visit.`}
   image={{
          src: "/images/gallery/nepal-buildcon-floor-01.jpg",
          alt: `${event.venue.name} Exhibition Facility`,
        }}
      />

      <VenueClientView/>
    </main>
  );
}
