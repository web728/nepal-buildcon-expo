import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldExhibitClientView } from "@/components/exhibit/WhoShouldExhibitClientView";

export const metadata: Metadata = {
  title: "Who Should Exhibit | Nepal Buildcon 2027",
  description:
    "Explore target exhibitor profiles — from international manufacturers and machinery suppliers to Nepal-based producers and technology providers.",
  alternates: { canonical: "/who-should-exhibit" },
};

export default function WhoShouldExhibitPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Who Should Exhibit at Nepal Buildcon"
        intro="Connecting the full commercial value chain — international manufacturers, equipment suppliers and Nepal-based producers meeting key buyers across the country."
        image={{
          src: "/images/gallery/nepal-buildcon-exhibitor-02.jpg",
          alt: "Industrial machinery and construction equipment display",
        }}
      />

      <WhoShouldExhibitClientView />
    </main>
  );
}
