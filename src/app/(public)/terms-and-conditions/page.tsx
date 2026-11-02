import type { Metadata } from "next";
import Link from "next/link";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms and Conditions | Nepal Buildcon 2027",
  description: `Terms governing use of the official ${event.name} website, event enquiries, registration and published information.`,
  alternates: { canonical: "/terms-and-conditions" },
};

const SECTIONS = [
  {
    title: "Website Use",
    paragraphs: [
      `This website provides information about ${event.name}, scheduled for ${event.dates.display} at ${event.venue.fullLocation}. You may use it for lawful, personal or business-related enquiries about the exhibition. Do not attempt to interfere with the website, misuse its forms or submit misleading information.`,
    ],
  },
  {
    title: "Enquiries and Exhibitor Participation",
    paragraphs: [
      "Submitting an exhibitor enquiry or stand booking request does not confirm an exhibition stand. Space, pricing, services and participation requirements are subject to availability and written confirmation from the organisers. Any agreed booking is governed by the applicable exhibitor agreement and its terms.",
    ],
  },
  {
    title: "Visitor Registration and Entry",
    paragraphs: [
      "Visitor passes are free. Visitors may register online or on site during exhibition opening hours. Admission remains subject to venue safety, security and reasonable event-entry requirements. Registration details should be accurate and complete.",
    ],
  },
  {
    title: "Event Information and Changes",
    paragraphs: [
      "The organisers aim to keep event information accurate. Exhibition programmes, participants, facilities and other published details may change. Check the official website for the latest event information before making travel or business arrangements.",
    ],
  },
  {
    title: "Website Content and Intellectual Property",
    paragraphs: [
      "Text, photographs, graphics, logos and other materials on this website may be protected by intellectual property rights belonging to the organisers or their respective owners. Do not reproduce or redistribute protected materials without the relevant permission, except as allowed by law.",
    ],
  },
  {
    title: "External Links and Downloads",
    paragraphs: [
      "The website may contain downloadable documents and links to third-party websites. External sites are operated independently and may have their own terms and privacy practices. Downloaded resources are provided for reference and should be checked for updates before use.",
    ],
  },
  {
    title: "Liability",
    paragraphs: [
      "We take reasonable care in preparing website information, but cannot guarantee that every detail will always be complete or current. To the extent permitted by applicable law, the organisers are not responsible for losses resulting solely from reliance on outdated or incorrect website information. Nothing in these terms excludes rights or liabilities that cannot lawfully be excluded.",
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Terms and Conditions"
        intro="Information about using this website, submitting event enquiries and registering for Nepal Buildcon 2027."
      />

      <section className="py-14 sm:py-16 lg:py-20" aria-labelledby="terms-intro">
        <Container>
          <div className="mx-auto max-w-[800px]">
            <div className="border-b border-[#E8E8E8] pb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#982E21]">
                Website Information
              </p>
              <h2
                id="terms-intro"
                className="mt-3 font-heading text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-tight tracking-[-0.035em]"
              >
                Terms of Use
              </h2>
              <p className="mt-4 text-[14px] leading-[1.9] text-[#60636B] sm:text-[15px]">
                These terms apply to the use of the official {event.name} website.
                The exhibition is organised by {event.organisers[0].name} and{" "}
                {event.organisers[1].name}. By using this website or submitting an
                enquiry, you agree to the terms relevant to that activity.
              </p>
            </div>

            <div className="divide-y divide-[#EAEAEA]">
              {SECTIONS.map((section, index) => (
                <section key={section.title} className="py-7 sm:py-9" aria-labelledby={`terms-section-${index}`}>
                  <h3
                    id={`terms-section-${index}`}
                    className="font-heading text-[17px] font-bold tracking-[-0.02em] text-[#111111] sm:text-[19px]"
                  >
                    {section.title}
                  </h3>
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-3 text-[14px] leading-[1.9] text-[#60636B] sm:text-[15px]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            <section className="border-t border-[#EAEAEA] pt-8" aria-labelledby="terms-contact">
              <h3 id="terms-contact" className="font-heading text-[18px] font-bold">
                Questions About These Terms?
              </h3>
              <p className="mt-3 text-[14px] leading-[1.85] text-[#60636B]">
                For clarification about website information or exhibition-related terms,
                please use the{" "}
                <Link href="/contact" className="font-semibold text-[#982E21] underline underline-offset-4 hover:text-[#7B241A]">
                  Contact page
                </Link>
                . You can also review our{" "}
                <Link href="/privacy-policy" className="font-semibold text-[#982E21] underline underline-offset-4 hover:text-[#7B241A]">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </Container>
      </section>
    </main>
  );
}
