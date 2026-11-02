import type { Metadata } from "next";
import Link from "next/link";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { BookStandForm } from "@/components/forms/BookStandForm";

export const metadata: Metadata = {
  title: "Book a Stand | 12th Nepal Buildcon International Expo 2027",
  description: `Enquire about exhibiting at ${event.name}, taking place ${event.dates.display} at ${event.venue.fullLocation}. Submit your stand requirements to the organising team.`,
  alternates: { canonical: "/book-a-stand" },
};

export default function BookAStandPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Book a Stand"
        intro="Interested in exhibiting at Nepal Buildcon International Expo 2027? Share your company details and stand requirements with the organising team."
      />

      <section className="py-14 sm:py-16 lg:py-20" aria-labelledby="stand-enquiry-heading">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 border-b border-[#E9E9E9] pb-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#982E21]">Exhibitor Enquiry</p>
              <h2 id="stand-enquiry-heading" className="mt-3 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
                Request Exhibition Space
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#62646B]">
                Complete the form with your preferred participation type, approximate space requirement and the products you plan to display. The team will review your enquiry and share available options.
              </p>
        
            </div>

            <div className="rounded-2xl border border-[#E8E8E8] bg-white p-5 sm:p-8 lg:p-10">
              <BookStandForm />
            </div>

          
          </div>
        </Container>
      </section>
    </main>
  );
}
