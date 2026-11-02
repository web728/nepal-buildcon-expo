import type { Metadata } from "next";
import Link from "next/link";
import { event } from "@/config/event";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { VisitorRegistrationForm } from "@/components/forms/VisitorRegistrationForm";

export const metadata: Metadata = {
  title: "Free Visitor Registration | Nepal Buildcon 2027",
  description: `Register for a free visitor pass to ${event.name}, ${event.dates.display} at ${event.venue.fullLocation}. Online and on-site registration are available.`,
  alternates: { canonical: "/register-to-visit" },
};

export default function RegisterToVisitPage() {
  return (
    <main className="min-h-screen bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      <PageHero
        title="Visitor Registration"
        intro="Register for your free visitor pass to the 12th Nepal Buildcon International Expo 2027. Online registration is available before the event, and on-site registration is available during exhibition opening hours."
      />

      <section aria-labelledby="registration-heading" className="bg-[#F8F9FA] py-12 sm:py-16 lg:py-20">
        <Container className="max-w-4xl">
          <div className="mb-7 border-l-[3px] border-[#982E21] pl-4 sm:mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#982E21]">Free visitor admission</p>
            <h2 id="registration-heading" className="mt-2 font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
              Register to Visit
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#60636B]">
              Complete the form below with your contact details and interests. Your registration request will be submitted to the organising team.
            </p>
         
          </div>

          <div className="rounded-xl border border-[#E6E7E9] bg-white px-5 py-7 sm:px-9 sm:py-10">
            <VisitorRegistrationForm />
          </div>

       
        </Container>
      </section>
    </main>
  );
}
