import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitClientView } from "@/components/exhibit/ExhibitClientView";
import { event } from "@/config/event";

export const metadata: Metadata = {
  title: "Why Exhibit | 12th Nepal Buildcon International Expo 2027",
  description:
    "Explore opportunities to showcase building materials, construction equipment and related technologies at the 12th Nepal Buildcon International Expo 2027.",
  alternates: { canonical: "/exhibit" },
};

export default function ExhibitPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#982E21] selection:text-white">
      <PageHero
       title="Why Exhibit"
  highlightTitle="Grow Your Business at Nepal Buildcon"
  intro="Showcase your products, connect with construction industry professionals, explore new markets and build valuable business relationships in Nepal."

        image={{
          src: "/images/gallery/nepal-buildcon-exhibitor-01.jpg",
          alt: "Exhibition display of building and construction products at Nepal Buildcon",
        }}
      />
      <ExhibitClientView />
    </main>
  );
}
