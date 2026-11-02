import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { PlanYourVisitClientView } from "@/components/visit/PlanYourVisitClientView";

export const metadata: Metadata = {
  title: "Plan Your Visit | Nepal Buildcon 2027",
  description: `Essential travel, venue navigation, and visitor guidance for attending ${event.name} from ${event.dates.display} at ${event.venue.fullLocation}.`,
  alternates: { canonical: "/plan-your-visit" },
};

export default function PlanYourVisitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Plan Your Visit to Kathmandu"
        intro="Practical visitor information, venue access, entry requirements and travel essentials for Nepal Buildcon International Expo 2027."
        image={{
          src: "/images/gallery/nepal-buildcon-floor-01.jpg",
          alt: "Bhrikuti Mandap exhibition venue in Kathmandu",
        }}
      />

      <PlanYourVisitClientView />
    </main>
  );
}
