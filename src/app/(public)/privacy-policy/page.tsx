import type { Metadata } from "next";
import Link from "next/link";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Nepal Buildcon 2027",
  description:
    "Learn how Nepal Buildcon International Expo collects, uses and handles personal information submitted through its website.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const linkClass =
  "font-medium text-[#982E21] underline decoration-[#982E21]/40 underline-offset-4 transition-colors hover:text-[#742117] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#982E21]";

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-[#E8E8E8] pt-7 sm:pt-8">
      <h2 className="font-heading text-lg font-bold tracking-[-0.02em] text-[#111111] sm:text-xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[14px] leading-[1.85] text-[#595D65] sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const organiserNames = event.organisers.map((organiser) => organiser.name).join(" and ");

  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Privacy Policy"
        intro="Information about the personal details collected through this website and how they are used for exhibition enquiries and registrations."
      />

      <section className="py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="mx-auto max-w-[820px]">
            <p className="text-[14px] leading-[1.9] text-[#595D65] sm:text-[15px]">
              This Privacy Policy describes how {organiserNames} (the organisers of {event.name})
              handle personal information collected through the exhibition website. It applies
              to information provided through our online forms and related website interactions.
            </p>

            <div className="mt-9 space-y-8">
              <PolicySection title="Information We Collect">
                <p>
                  When you submit an enquiry, request an exhibition brochure or register for the
                  event, we may collect your name, company, designation, country, email address,
                  phone or WhatsApp number, area of interest and the details you provide in your
                  message or registration form.
                </p>
                <p>
                  We may also collect limited technical and referral information, such as IP
                  address, browser details, referring page and campaign parameters, to operate
                  the website, help prevent spam and understand how visitors reach our forms.
                </p>
              </PolicySection>

              <PolicySection title="How We Use Your Information">
                <ul className="list-disc space-y-2 pl-5 marker:text-[#982E21]">
                  <li>Respond to enquiries and brochure requests.</li>
                  <li>Process visitor registrations and exhibitor participation enquiries.</li>
                  <li>Send relevant confirmations, updates and practical event information.</li>
                  <li>Maintain records needed to manage exhibition enquiries and registrations.</li>
                  <li>Monitor website performance and reduce fraudulent or automated submissions.</li>
                </ul>
                <p>
                  Any additional marketing communication should follow the preferences and
                  consent collected through the relevant form, where applicable.
                </p>
              </PolicySection>

              <PolicySection title="Storage and Sharing">
                <p>
                  Submitted information may be stored in the systems used to manage the event,
                  including our website database and internal operational records. Information
                  may be accessed by authorised organising-team members and service providers
                  who help operate the website or manage submissions, where necessary for those
                  purposes.
                </p>
                <p>
                  We do not sell personal information. We may disclose information if required
                  by applicable law or a valid legal process.
                </p>
              </PolicySection>

              <PolicySection title="Cookies and Website Services">
                <p>
                  The website may use cookies or similar technologies for essential functionality,
                  security and, where enabled, analytics or marketing measurement. Forms may use
                  Google reCAPTCHA to help detect automated submissions.
                </p>
                <p>
                  For more information, please read our{" "}
                  <Link href="/cookie-policy" className={linkClass}>
                    Cookie Policy
                  </Link>
                  .
                </p>
              </PolicySection>

              <PolicySection title="Data Retention">
                <p>
                  We retain personal information for as long as reasonably needed to handle the
                  relevant enquiry, registration, event administration or applicable record-keeping
                  obligations. Retention periods may vary depending on the purpose and legal
                  requirements.
                </p>
              </PolicySection>

              <PolicySection title="Your Privacy Requests">
                <p>
                  You may contact the organisers to request access to, correction of or deletion
                  of personal information you have provided, subject to applicable legal and
                  operational requirements. You can also ask questions about event-related
                  communications or your submitted details.
                </p>
                <p>
                  Please use our{" "}
                  <Link href="/contact" className={linkClass}>
                    Contact page
                  </Link>{" "}
                  for privacy-related enquiries.
                </p>
              </PolicySection>

              <PolicySection title="Updates to This Policy">
                <p>
                  We may revise this policy to reflect changes in website functionality,
                  information-handling practices or applicable requirements. The updated version
                  will be published on this page.
                </p>
              </PolicySection>
            </div>

            <p className="mt-10 border-t border-[#E8E8E8] pt-6 text-[13px] leading-[1.75] text-[#747881]">
              For questions about this policy, visit the{" "}
              <Link href="/contact" className={linkClass}>
                Contact page
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
