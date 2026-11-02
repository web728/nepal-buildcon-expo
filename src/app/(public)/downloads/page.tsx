import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { getPublishedDownloads } from "@/lib/data/downloads";
import { BrochureDownloadForm } from "@/components/forms/BrochureDownloadForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Downloads | 12th Nepal Buildcon International Expo 2027",
  description:
    "Request the official 2027 Nepal Buildcon exhibition brochure and access published event reports and resources.",
  alternates: { canonical: "/downloads" },
};

const REPORT_PATH = "/downloads/11th_Nepal_Buildcon_International_Expo_2026_Post_Show_Report.pdf";

export default async function DownloadsPage() {
  const downloads = await getPublishedDownloads();
  // Only advertise the static report as downloadable if its PDF is actually deployed.
  const reportAvailable = existsSync(
    path.join(process.cwd(), "public", REPORT_PATH.slice(1)),
  );
  const otherDownloads = downloads.filter(
    (item) => item.fileUrl !== REPORT_PATH,
  );

  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Exhibition Downloads"
        intro="Access the 2027 exhibition brochure, the previous edition's post-show report and other published event resources."
      />

      <section className="py-14 sm:py-16 lg:py-20" aria-labelledby="brochure-heading">
        <Container>
          <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div className="max-w-[470px]">
              <SectionLabel>2027 Exhibition Brochure</SectionLabel>
              <h2 id="brochure-heading" className="mt-5 font-heading text-[clamp(1.9rem,3vw,3.1rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">
                Explore the <span className="text-[#982E21]">Exhibition Brochure.</span>
              </h2>
              <p className="mt-5 text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
                Find the exhibition overview, product and industry categories,
                visitor profiles and organiser contact information for the
                12th Nepal Buildcon International Expo 2027.
              </p>
              <p className="mt-4 text-[13px] leading-[1.75] text-[#60636B]">
                Complete the form to request the brochure. The PDF will download
                after your enquiry is submitted successfully.
              </p>
              <p className="mt-6 border-l-2 border-[#982E21] pl-4 text-[13px] leading-[1.8] text-[#60636B]">
                <strong className="font-semibold text-[#111111]">Event:</strong> 25–28 February 2027<br />
                <strong className="font-semibold text-[#111111]">Venue:</strong> Bhrikuti Mandap, Kathmandu, Nepal
              </p>
            </div>
            <div className="rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] p-5 sm:p-8">
              <h3 className="font-heading text-xl font-bold tracking-[-0.03em]">Request the Brochure</h3>
              <p className="mt-2 text-[13px] leading-[1.75] text-[#60636B]">
                Provide your contact details to download the official event brochure.
              </p>
              <div className="mt-6"><BrochureDownloadForm /></div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[#E8E8E8] bg-[#F8F9FA] py-14 sm:py-16 lg:py-20" aria-labelledby="report-heading">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-12">
            <div>
              <SectionLabel>Previous Edition</SectionLabel>
              <h2 id="report-heading" className="mt-5 font-heading text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">
                11th Edition <span className="text-[#982E21]">Post-Show Report.</span>
              </h2>
              <p className="mt-4 max-w-[620px] text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
                Review information published about the February 2026 edition,
                including its exhibition highlights and participating sectors.
                No registration form is required to access the report.
              </p>
            </div>
            <div className="rounded-xl border border-[#E2E3E5] bg-white p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#982E21]/[0.07] text-[#982E21]">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2z" /><path d="M14 3v6h5M9 14h6m-6 4h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#111111]">Nepal Buildcon 2026</h3>
                  <p className="mt-1 text-[13px] text-[#60636B]">11th Edition · Post-Show Report · PDF</p>
                </div>
              </div>
              {reportAvailable ? (
                <a
                  href={REPORT_PATH}
                  download="11th_Nepal_Buildcon_International_Expo_2026_Post_Show_Report.pdf"
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#982E21] px-5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#7B241A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]"
                >
                  Download Post-Show Report
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4" />
                  </svg>
                </a>
              ) : (
                <p className="mt-6 border-t border-[#E8E8E8] pt-4 text-[13px] leading-[1.8] text-[#60636B]">
                  The post-show report PDF has not yet been added to this site's public downloads folder.
                  It will be available here once uploaded.
                </p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {otherDownloads.length > 0 && (
        <section className="py-14 sm:py-16" aria-labelledby="other-downloads-heading">
          <Container>
            <SectionLabel>Published Resources</SectionLabel>
            <h2 id="other-downloads-heading" className="mt-4 font-heading text-[clamp(1.7rem,3vw,2.5rem)] font-bold tracking-[-0.04em]">Other Event Downloads</h2>
            <div className="mt-7 divide-y divide-[#E8E8E8] border-y border-[#E8E8E8]">
              {otherDownloads.map((item) => (
                <a key={item._id} href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-5 py-5 hover:bg-[#FAFAFA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#982E21]">
                  <span>
                    <span className="block text-[15px] font-bold">{item.title}</span>
                    {item.description && <span className="mt-1 block text-[13px] leading-[1.7] text-[#60636B]">{item.description}</span>}
                  </span>
                  <span className="shrink-0 text-[13px] font-semibold text-[#982E21]">View PDF ↗</span>
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-[2px] w-8 bg-[#982E21]" />
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#982E21]">{children}</span>
    </div>
  );
}
