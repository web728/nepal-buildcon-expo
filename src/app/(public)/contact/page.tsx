import type { Metadata } from "next";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { ContactClientView } from "@/components/sections/ContactClientView";

export const metadata: Metadata = {
  title: "Contact Us | 12th Nepal Buildcon International Expo 2027",
  description: `Contact the ${event.name} organising team for exhibition participation, stand enquiries, visitor information and event assistance.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#982E21] selection:text-white">
      <PageHero
      title="Contact Us"
  intro="Have a question about Nepal Buildcon International Expo 2027? Get in touch with our team for exhibition bookings, visitor information and general enquiries."

        image={{
          src: "/images/gallery/nep                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           al-buildcon-networking-01.jpg",
          alt: "Industry professionals speaking at a Nepal Buildcon exhibition",
        }}
      />
      <ContactClientView />
    </main>
  );
}
