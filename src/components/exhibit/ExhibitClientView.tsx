"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;
const GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const REVEAL: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const BENEFITS = [
  {
    title: "Meet Industry Buyers",
    description:
      "Engage with contractors, developers, distributors and purchasing professionals involved in building and construction projects.",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m14-18a4 4 0 0 1 0 8m6 10v-2a4 4 0 0 0-3-3.87",
  },
  {
    title: "Present Products & Solutions",
    description:
      "Introduce building materials, construction machinery, equipment and technologies to industry professionals.",
    icon: "M3 7h18v13H3zM7 7V4h10v3M8 12h8m-8 4h5",
  },
  {
    title: "Explore Distribution Opportunities",
    description:
      "Connect with importers, dealers and distributors to discuss potential supply and distribution relationships.",
    icon: "M3 7h7v7H3zM14 7h7v7h-7zM3 17h7v4H3zM14 17h7v4h-7z",
  },
  {
    title: "Engage with Project Professionals",
    description:
      "Discuss products and technical requirements with architects, engineers and professionals involved in project planning.",
    icon: "M4 20h16M6 20V8l6-4 6 4v12M9 11h.01M15 11h.01M9 15h.01M15 15h.01",
  },
] as const;

const EXHIBITOR_SUPPORT = [
  {
    title: "Visa & Travel Information",
    description:
      "International participants should check Nepal's current visa and entry requirements for their passport and purpose of travel before making arrangements.",
    link: "https://immigration.gov.np/visa-information",
    linkText: "Nepal Immigration Information",
    external: true,
    icon: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-9 9h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18",
  },
  {
    title: "Invitation Letter Enquiries",
    description:
      "Exhibitors who need supporting documentation for a visa application may contact the organising team to ask about invitation letter requirements and availability.",
    link: event.routes.contact,
    linkText: "Contact the Organisers",
    external: false,
    icon: "M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8l-5-5H8Zm7 0v6h6M7 13h10M7 17h7",
  },
  {
    title: "Stand Space & Display Requirements",
    description:
      "Discuss available stand arrangements, custom display plans, equipment dimensions and installation needs with the organisers before confirming your participation.",
    link: event.cta.bookStand,
    linkText: "Enquire About Stand Space",
    external: false,
    icon: "M3 20h18M5 20V7l7-4 7 4v13M9 11h.01M15 11h.01M9 15h.01M15 15h.01",
  },
  {
    title: "Freight & On-Site Logistics",
    description:
      "For shipments, customs, move-in arrangements, power and other technical requirements, request the latest exhibitor instructions from the organising team. Details are subject to confirmation.",
    link: event.routes.contact,
    linkText: "Ask About Exhibitor Logistics",
    external: false,
    icon: "M3 7h12v11H3zM15 11h4l3 4v3h-7M7 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-[2px] w-8 shrink-0 bg-[#982E21]" />
      <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${light ? "text-white/70" : "text-[#982E21]"}`}>{children}</span>
    </div>
  );
}

export function ExhibitClientView() {
  const reduced = useReducedMotion() === true;
  const view = {
    initial: reduced ? false : "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.15 },
  };

  return (
    <div className="overflow-hidden bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      {/* Why participate: business benefits only. */}
      <section aria-labelledby="exhibit-benefits-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...view} className="flex flex-col gap-6 border-b border-[#E8E8E8] pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[740px]">
              <motion.div variants={REVEAL}><SectionLabel>Why Exhibit</SectionLabel></motion.div>
              <motion.h2 id="exhibit-benefits-heading" variants={REVEAL} className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.5rem)] font-extrabold leading-[1.12] tracking-[-0.045em]">
                Connect with Nepal&apos;s <span className="text-[#982E21]">Building &amp; Construction Industry.</span>
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-5 max-w-[660px] text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
                The exhibition brings manufacturers, suppliers and service providers together with professionals working across building, construction and infrastructure. Present your products, exchange information and explore potential business relationships.
              </motion.p>
            </div>
            <motion.div variants={REVEAL} className="shrink-0">
              <Link href={event.cta.bookStand} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#982E21] px-6 py-3 text-[13px] font-bold text-white transition-colors duration-300 hover:bg-[#7B241A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]">
                Enquire About a Stand <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={GROUP} {...view} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <motion.article key={benefit.title} variants={REVEAL} className="group flex h-full flex-col rounded-xl border border-[#E8E8E8] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/35 hover:shadow-[0_12px_30px_rgba(17,17,17,0.05)] sm:p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#982E21]/[0.065] text-[#982E21] transition-colors duration-300 group-hover:bg-[#982E21] group-hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5"><path d={benefit.icon} /></svg>
                </div>
                <h3 className="mt-6 font-heading text-[17px] font-bold leading-[1.4] tracking-[-0.02em]">{benefit.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#60636B]">{benefit.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

    

      {/* Essential exhibitor information, with no unconfirmed service promises. */}
      <section aria-labelledby="exhibitor-support-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...view}>
            <motion.div variants={REVEAL}><SectionLabel>Exhibitor Information</SectionLabel></motion.div>
            <motion.h2 variants={REVEAL} id="exhibitor-support-heading" className="mt-4 font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">Plan Your Participation.</motion.h2>
            <motion.p variants={REVEAL} className="mt-4 max-w-[720px] text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
              Key information for international and Nepal-based exhibitors planning travel, stand arrangements and on-site preparations at {event.venue.name}.
            </motion.p>
          </motion.div>

          <motion.div variants={GROUP} {...view} className="mt-8 grid gap-4 md:grid-cols-2">
            {EXHIBITOR_SUPPORT.map((item) => (
              <motion.article key={item.title} variants={REVEAL} className="group flex h-full gap-4 rounded-xl border border-[#E8E8E8] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/30 hover:shadow-[0_10px_26px_rgba(17,17,17,0.04)] sm:gap-5 sm:p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#982E21]/[0.065] text-[#982E21]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5"><path d={item.icon} /></svg>
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="font-heading text-[17px] font-bold leading-[1.35] tracking-[-0.025em]">{item.title}</h3>
                  <p className="mt-2 flex-1 text-[13px] leading-[1.8] text-[#60636B]">{item.description}</p>
                  
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>
 
    </div>
  );
}
