import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { VisitClientView } from "@/components/visit/VisitClientView";

export const metadata: Metadata = {
  title: "Why Visit | 12th Nepal Buildcon International Expo 2027",
  description:
    "Explore building materials, construction equipment and technologies, meet suppliers and plan your visit to the 12th Nepal Buildcon International Expo 2027 in Kathmandu.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Why Visit Nepal Buildcon?"
        highlightTitle="Explore Building & Construction Solutions"
        intro="Explore building materials, machinery and technologies, meet participating suppliers and discover solutions relevant to your projects and business needs."
        image={{
          src: "/images/gallery/nepal-buildcon-visitors-02.jpg",
          alt: "Trade visitors exploring building and construction products at Nepal Buildcon",
        }}
      />
      <VisitClientView />
    </main>
  );
}
