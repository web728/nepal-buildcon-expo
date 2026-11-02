"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { visitorGroups } from "@/data/visitorProfile";

const RED = "#982E21";
const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
};
const REVEAL: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const VISIT_REASONS = [
  {
    title: "Explore Products & Technologies",
    description:
      "See building materials, construction equipment, systems and technologies represented by participating exhibitors.",
  },
  {
    title: "Meet Suppliers & Industry Professionals",
    description:
      "Connect with companies and professionals working across building, construction, infrastructure and related fields.",
  },
  {
    title: "Discuss Project Requirements",
    description:
      "Ask about product applications, technical features and potential sourcing or distribution arrangements.",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-[2px] w-8 shrink-0 bg-[#982E21]" />
      <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${light ? "text-white/70" : "text-[#982E21]"}`}>
        {children}
      </span>
    </div>
  );
}

export function WhoShouldVisitClientView() {
  const reduced = useReducedMotion() === true;
  const view = {
    initial: reduced ? false : "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.12 },
  };

  return (
    <div className="overflow-hidden bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      <section aria-labelledby="visitor-profile-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...view} className="flex flex-col gap-6 border-b border-[#E8E8E8] pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[760px]">
              <motion.div variants={REVEAL}><SectionLabel>Visitor Profile</SectionLabel></motion.div>
              <motion.h2 id="visitor-profile-heading" variants={REVEAL} className="mt-5 font-heading text-[clamp(2rem,3.45vw,3.55rem)] font-extrabold leading-[1.12] tracking-[-0.045em]">
                Who Should <span className="text-[#982E21]">Visit?</span>
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-5 max-w-[680px] text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
                {event.name} is relevant to professionals, businesses and institutions involved in planning, building, supplying, operating and investing in the built environment. Explore the visitor audiences outlined in the exhibition brochure.
              </motion.p>
            </div>
            <motion.div variants={REVEAL} className="shrink-0">
              <Link href={event.cta.registerVisit} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#982E21] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#7B241A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]">
                Register to Visit <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={GROUP} {...view} className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visitorGroups.map((group, index) => (
              <motion.article key={group.slug} variants={REVEAL} className="group flex h-full flex-col rounded-xl border border-[#E8E8E8] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/30 hover:shadow-[0_12px_30px_rgba(17,17,17,0.045)] sm:p-7">
                <div className="flex items-start justify-between gap-4 border-b border-[#EAEAEA] pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#982E21]/[0.07] text-[12px] font-bold tabular-nums text-[#982E21]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <h3 className="mt-5 font-heading text-[18px] font-bold leading-[1.35] tracking-[-0.025em] sm:text-[19px]">{group.name}</h3>
                <p className="mt-2 text-[13px] leading-[1.75] text-[#60636B]">{group.description}</p>
                <ul className="mt-5 space-y-3 border-t border-[#EEEEEE] pt-5">
                  {group.roles.map((role) => (
                    <li key={role} className="flex items-start gap-3 text-[13px] leading-[1.6] text-[#383B41]">
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#982E21]" />
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section aria-labelledby="why-visit-heading" className="border-y border-[#EAEAEA] bg-[#F8F9FA] py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...view}>
            <motion.div variants={REVEAL}><SectionLabel>Visiting the Exhibition</SectionLabel></motion.div>
            <motion.h2 id="why-visit-heading" variants={REVEAL} className="mt-4 max-w-[800px] font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.14] tracking-[-0.04em]">
              Discover Products. <span className="text-[#982E21]">Exchange Ideas.</span>
            </motion.h2>
            <motion.p variants={REVEAL} className="mt-4 max-w-[690px] text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
              The exhibition offers an opportunity to explore industry solutions and have face-to-face conversations about products, applications and project needs.
            </motion.p>
          </motion.div>
          <motion.div variants={GROUP} {...view} className="mt-8 grid gap-4 md:grid-cols-3">
            {VISIT_REASONS.map((reason, index) => (
              <motion.article key={reason.title} variants={REVEAL} className="border-t-2 border-[#982E21] bg-white px-6 pb-7 pt-6">
                <span className="text-[12px] font-semibold tabular-nums text-[#982E21]">0{index + 1}</span>
                <h3 className="mt-4 font-heading text-[17px] font-bold leading-[1.4]">{reason.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#60636B]">{reason.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section aria-labelledby="visit-register-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...view} className="grid items-center gap-7 rounded-xl bg-[#0B0C11] p-7 text-white sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:p-12">
            <div>
              <motion.div variants={REVEAL}><SectionLabel light>Plan Your Visit</SectionLabel></motion.div>
              <motion.h2 id="visit-register-heading" variants={REVEAL} className="mt-5 font-heading text-[clamp(1.8rem,2.8vw,2.8rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">
                Visit Nepal Buildcon in Kathmandu.
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-4 max-w-[670px] text-[14px] leading-[1.85] text-white/70 sm:text-[15px]">
                {event.dates.display} · {event.venue.fullLocation}. Register your interest in visiting and explore the exhibition in person.
              </motion.p>
            </div>
            <motion.div variants={REVEAL} className="lg:justify-self-end">
              <Link href={event.cta.registerVisit} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#982E21] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#B33A2C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Register to Visit <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
