import type { Metadata } from "next";
import Link from "next/link";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Cookie Policy | Nepal Buildcon 2027",
  description: `Learn how cookies and similar technologies may be used on the ${event.name} website.`,
  alternates: { canonical: "/cookie-policy" },
};

const COOKIE_CATEGORIES = [
  {
    title: "Essential Cookies",
    description:
      "These help the website and its basic features operate, including functions needed to use forms and maintain website security. Some essential cookies may be set by services that support these functions.",
  },
  {
    title: "Analytics Cookies",
    description:
      "If analytics services are enabled, they may use cookies or similar technologies to help us understand website usage, such as which pages are visited and how visitors find the site. Their use depends on the services configured and applicable consent requirements.",
  },
  {
    title: "Marketing Cookies",
    description:
      "If advertising or campaign measurement services are enabled, they may use cookies to measure campaign performance. Any optional marketing cookies should be managed according to the website's consent settings and applicable requirements.",
  },
] as const;

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-[#E8E8E8] pt-8 sm:pt-9">
      <h2 id={id} className="font-heading text-xl font-bold tracking-[-0.025em] text-[#111111] sm:text-2xl">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
        {children}
      </div>
    </section>
  );
}

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Cookie Policy"
        intro="Information about cookies and similar technologies used in connection with this website."
      />

      <div className="py-14 sm:py-16 lg:py-20">
        <Container className="max-w-4xl">
          <div className="max-w-3xl space-y-9 sm:space-y-10">
            <div>
              <p className="text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
                This policy explains how cookies and similar technologies may be used on the
                website for {event.name}. It should be read alongside our{" "}
                <Link href="/privacy-policy" className="font-semibold text-[#982E21] underline underline-offset-4 hover:text-[#7B241A]">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <PolicySection id="what-are-cookies" title="What Are Cookies?">
              <p>
                Cookies are small files stored on your device when you visit a website. They
                may help websites function, remember settings or provide information about
                how a site is used. Other technologies may serve similar purposes.
              </p>
            </PolicySection>

            <PolicySection id="cookie-types" title="Types of Cookies">
              <p>The following categories describe the purposes for which cookies may be used:</p>
              <div className="mt-5 divide-y divide-[#E8E8E8] border-y border-[#E8E8E8]">
                {COOKIE_CATEGORIES.map((category) => (
                  <div key={category.title} className="py-5">
                    <h3 className="text-[16px] font-bold text-[#111111]">{category.title}</h3>
                    <p className="mt-2">{category.description}</p>
                  </div>
                ))}
              </div>
            </PolicySection>

            <PolicySection id="third-party-services" title="Third-Party Services">
              <p>
                Some website features, such as Google reCAPTCHA used to protect enquiry
                forms, are provided by third parties. These services may process technical
                information or use cookies under their own policies. Additional services,
                where enabled, may also set cookies.
              </p>
            </PolicySection>

            <PolicySection id="cookie-controls" title="Managing Cookies">
              <p>
                You can review, block or delete cookies through your browser settings.
                Restricting some cookies may affect website features, including forms.
                Where the website provides a cookie consent control, you can use it to
                manage optional cookies.
              </p>
            </PolicySection>

            <PolicySection id="policy-changes" title="Changes to This Policy">
              <p>
                We may update this policy when website features, third-party services or
                applicable requirements change. The current version will be published
                on this page.
              </p>
            </PolicySection>

            <PolicySection id="cookie-contact" title="Questions About Cookies?">
              <p>
                For questions about this policy or how your information is handled,
                please use our{" "}
                <Link href="/contact" className="font-semibold text-[#982E21] underline underline-offset-4 hover:text-[#7B241A]">
                  Contact page
                </Link>.
              </p>
            </PolicySection>
          </div>
        </Container>
      </div>
    </main>
  );
}
