import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ExhibitionProfileExplorer } from "@/components/exhibit/ExhibitionProfileExplorer";

export const metadata: Metadata = {
  title: "Exhibition Profile | 12th Nepal Buildcon International Expo 2027",
  description:
    "Explore building materials, construction machinery, architectural systems, electrical products, interiors and construction technologies at the 12th Nepal Buildcon International Expo 2027.",
  alternates: { canonical: "/exhibition-profile" },
};

export default function ExhibitionProfilePage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Exhibition Profile"
        highlightTitle="Building & Construction Sectors"
        intro="Explore the products, equipment, materials and technologies represented across the building, construction and infrastructure industries."
        image={{
          src: "/images/gallery/nepal-buildcon-exhibitor-01.jpg",
          alt: "Building and construction products on display at an exhibition",
        }}
      />
      <section className="py-14 sm:py-16 lg:py-20" aria-label="Exhibition sectors and products">
        <Container>
          <ExhibitionProfileExplorer />
        </Container>
      </section>
    </main>
  );
}
