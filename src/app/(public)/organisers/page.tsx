import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { OrganisersClientView } from "@/components/about/OrganisersClientView";

export const metadata: Metadata = {
  title: "Organisers | 12th Nepal Buildcon International Expo 2027",
  description:
    "Meet the joint organisers of the 12th Nepal Buildcon International Expo 2027: Futurex Trade Fair & Events and Media Space Solutions. Find official exhibition contacts.",
  alternates: { canonical: "/organisers" },
};

export default function OrganisersPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Meet the Joint"
        highlightTitle="Organisers"
        intro="Two exhibition organisers bringing together international participation and local event experience for Nepal's building and construction industry."
        image={{
          src: "/images/gallery/nepal-buildcon-networking-01.jpg",
          alt: "Industry networking at Nepal Buildcon in Kathmandu",
        }}
      />
      <OrganisersClientView />
    </main>
  );
}
