import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ExhibitorServicesClientView } from "@/components/exhibit/ExhibitorServicesClientView";

export const metadata: Metadata = {
  title: "Exhibitor Services & Operational Guide | Nepal Buildcon 2027",
  description:
    "Essential guidance for international and domestic exhibitors — entry requirements, invitation letters, stand fabrication, freight logistics and on-site support at Bhrikuti Mandap, Kathmandu.",
  alternates: { canonical: "/exhibitor-services" },
};

export default function ExhibitorServicesPage() {
  return (
    <main className="min-h-screen bg-[#fafbfd] selection:bg-brand-blue selection:text-white">
      <PageHero
        title="Exhibitor Services & Logistics"
        intro="Operational guidance, technical specifications and logistics support for a seamless exhibition experience at Bhrikuti Mandap, Kathmandu."
        image={{
          src: "/images/gallery/nepal-buildcon-exhibitor-02.jpg",
          alt: "Engineer reviewing technical exhibition specifications",
        }}
      />

      <ExhibitorServicesClientView />
    </main>
  );
}
