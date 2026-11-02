import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WhoShouldVisitClientView } from "@/components/visit/WhoShouldVisitClientView";

export const metadata: Metadata = {
  title: "Who Should Visit | 12th Nepal Buildcon International Expo 2027",
  description:
    "Explore the visitor profile for the 12th Nepal Buildcon International Expo 2027, including architects, engineers, contractors, developers, distributors and other building and construction audiences.",
  alternates: { canonical: "/who-should-visit" },
};

export default function WhoShouldVisitPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Who Should Visit"
        highlightTitle="Building & Construction Professionals"
        intro="Explore the range of professionals, businesses and institutions for whom the 12th Nepal Buildcon International Expo 2027 is relevant."
        image={{
          src: "/images/gallery/nepal-buildcon-visitors-01.jpg",
          alt: "Trade visitors at the Nepal Buildcon exhibition",
        }}
      />
      <WhoShouldVisitClientView />
    </main>
  );
}
