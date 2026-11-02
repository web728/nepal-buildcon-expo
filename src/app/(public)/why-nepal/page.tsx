import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhyNepalClientView } from "@/components/about/WhyNepalClientView";

export const metadata: Metadata = {
  title: "Why Nepal | Building & Construction Market",
  description:
    "Explore Nepal's building and construction market, including roads, hydropower, housing, commercial development, materials and construction equipment.",
  alternates: { canonical: "/why-nepal" },
};

export default function WhyNepalPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Why Nepal"
        highlightTitle="Building & Construction Opportunities"
        intro="Explore the infrastructure projects, urban development and construction activities shaping demand for building materials, machinery and related technologies in Nepal."
        image={{
          src: "/images/gallery/nepal-buildcon-floor-02.jpg",
          alt: "Building and construction products on display at Nepal Buildcon in Kathmandu",
        }}
      />
      <WhyNepalClientView />
    </main>
  );
}
