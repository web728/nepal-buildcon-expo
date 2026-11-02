"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;
const GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const REVEAL: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const VISITOR_BENEFITS = [
  {
    title: "Explore Products & Technologies",
    description:
      "Discover building materials, construction equipment, architectural products and technologies presented by participating exhibitors.",
    icon: "M4 7h16v13H4zM8 7V4h8v3M8 12h8m-8 4h5",
  },
  {
    title: "Compare Suppliers",
    description:
      "Review product options, discuss specifications and learn about solutions that may suit different project requirements.",
    icon: "M3 5h7v7H3zM14 5h7v7h-7zM3 16h7v5H3zM14 16h7v5h-7z",
  },
  {
    title: "Discuss Project Needs",
    description:
      "Speak with exhibitors about materials, systems and equipment relevant to construction, renovation and infrastructure work.",
    icon: "M4 20h16M6 20V8l6-4 6 4v12M9 11h.01M15 11h.01M9 15h.01M15 15h.01",
  },
  {
    title: "Build Industry Connections",
    description:
      "Meet manufacturers, suppliers and fellow industry professionals to explore potential sourcing and business relationships.",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m14-18a4 4 0 0 1 0 8m6 10v-2a4 4 0 0 0-3-3.87",
  },
] as const;


// Activitiess listed in the 2027 exhibition brochure; programme details may change.

const EVENT_HIGHLIGHTS = [
  {
    title: "Product Showcases & Demonstrations",
    description:
      "Discover building materials, construction machinery and technologies, with opportunities to learn about product features and applications.",
  },
  {
    title: "Industry Conferences & Seminars",
    description:
      "Explore industry developments, technical topics and practical insights through planned conferences and seminars.",
  },
  {
    title: "Business Networking",
    description:
      "Meet exhibitors, suppliers and industry professionals to discuss sourcing needs, project requirements and potential partnerships.",
  },
  {
    title: "International Pavilions",
    description:
      "Explore products and solutions presented by participating companies from Nepal and international markets.",
  },
] as const;


type VisitorFaq = {
  question: string;
  answer: string;
  links?: ReadonlyArray<{ label: string; href: string }>;
};


const VISITOR_FAQS: VisitorFaq[] = [
  {
    question: "When is Nepal Buildcon 2027?",
    answer:
      "The 12th Nepal Buildcon International Expo 2027 will take place from 25–28 February 2027 at Bhrikuti Mandap, Kathmandu, Nepal.",
    links: [
      { label: "Venue & Directions", href: event.routes.venue },
    ],
  },
  {
    question: "Where is the exhibition held?",
    answer:
      "The exhibition will be held at Bhrikuti Mandap, Kathmandu, Nepal. Visit the Venue page for location details and directions.",
    links: [
      { label: "View Venue & Directions", href: event.routes.venue },
    ],
  },
  {
    question: "Who should visit the exhibition?",
    answer:
      "Nepal Buildcon welcomes architects, engineers, contractors, builders, developers, distributors, importers, industry professionals and visitors interested in building and construction.",
    links: [
      { label: "Explore Visitor Profile", href: "/visitor-profile" },
    ],
  },
  {
    question: "What products can I explore?",
    answer:
      "Visitors can explore building materials, construction machinery, architectural products, electrical and plumbing systems, HVAC, interior products and other construction-related solutions presented by exhibitors.",
    links: [
      {
        label: "View Exhibition Profile",
        href: event.routes.exhibitionProfile,
      },
    ],
  },
  {
    question: "How can I register to visit?",
    answer:
      "You can complete the visitor registration form online before the exhibition or register directly at the venue during opening hours.",
    links: [
      {
        label: "Register for Free",
        href: event.cta.registerVisit,
      },
    ],
  },
  {
    question: "Is visitor entry free?",
    answer:
      "Yes. Entry to Nepal Buildcon 2027 is free for visitors. You can register online or at the venue during exhibition opening hours.",
    links: [
      {
        label: "Get Your Free Visitor Pass",
        href: event.cta.registerVisit,
      },
    ],
  },
  {
    question: "Can I register at the exhibition venue?",
    answer:
      "Yes. On-site registration will be available at Bhrikuti Mandap during exhibition opening hours. You can also register online in advance.",
    links: [
      {
        label: "Register Online",
        href: event.cta.registerVisit,
      },
      {
        label: "Find the Venue",
        href: event.routes.venue,
      },
    ],
  },
  {
    question: "What are the exhibition opening hours?",
    answer:
      "The exhibition will be held from 25–28 February 2027. Daily opening hours will be announced through the official event information.",
    links: [
      {
        label: "Contact Us",
        href: event.routes.contact,
      },
    ],
  },
  {
    question: "Can I meet manufacturers and suppliers?",
    answer:
      "Yes. Visitors can interact with participating exhibitors to learn about products, discuss specifications and explore potential sourcing opportunities.",
    links: [
      {
        label: "Explore Exhibition Sectors",
        href: event.routes.exhibitionProfile,
      },
    ],
  },
  {
    question: "Will there be product demonstrations and seminars?",
    answer:
      "Product showcases, demonstrations, industry conferences and technical seminars are among the planned exhibition activities. Programme details will be shared closer to the event.",
    links: [
      {
        label: "Contact Us for More Information",
        href: event.routes.contact,
      },
    ],
  },
  {
    question: "Will business networking opportunities be available?",
    answer:
      "The exhibition provides opportunities to connect with exhibitors and other industry professionals. Buyer–seller meeting arrangements, where available, will be communicated by the organising team.",
    links: [
      {
        label: "Contact the Organisers",
        href: event.routes.contact,
      },
    ],
  },
  {
    question: "How can I reach the exhibition venue?",
    answer:
      "Bhrikuti Mandap is located in Kathmandu. You can use the map and directions on our Venue page to plan your journey.",
    links: [
      {
        label: "Get Directions",
        href: event.routes.venue,
      },
    ],
  },
  {
    question: "How can I contact the exhibition team?",
    answer:
      "For visitor registration, exhibition information or general enquiries, please visit our Contact page.",
    links: [
      {
        label: "Contact Us",
        href: event.routes.contact,
      },
    ],
  },
];

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
      <span className="h-[2px] w-8 shrink-0 bg-[#982E21]" aria-hidden="true" />
      <span className={`text-[11px] font-bold uppercase tracking-[0.14em] ${light ? "text-white/70" : "text-[#982E21]"}`}>
        {children}
      </span>
    </div>
  );
}

export function VisitClientView() {
  const reduced = useReducedMotion() === true;
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reveal = {
    initial: reduced ? false : "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.14 },
  };

  return (
    <div className="overflow-hidden bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      {/* Reasons to visit: distinct from the audience directory on Who Should Visit. */}
      <section aria-labelledby="visit-benefits-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...reveal} className="flex flex-col gap-6 border-b border-[#E8E8E8] pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[750px]">
              <motion.div variants={REVEAL}><SectionLabel>Why Visit</SectionLabel></motion.div>
              <motion.h2 id="visit-benefits-heading" variants={REVEAL} className="mt-5 font-heading text-[clamp(2rem,3.5vw,3.5rem)] font-extrabold leading-[1.12] tracking-[-0.045em]">
                Explore Products, <span className="text-[#982E21]">People & Possibilities.</span>
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-5 max-w-[660px] text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
                {event.name} brings together exhibitors from the building, construction and infrastructure industries. Visitors can explore products, speak with suppliers and learn about solutions relevant to their work.
              </motion.p>
            </div>
            <motion.div variants={REVEAL} className="shrink-0">
              <Link href={event.cta.registerVisit} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#982E21] px-6 py-3 text-[13px] font-bold text-white transition-colors duration-300 hover:bg-[#7B241A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]">
                Register for Free <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={GROUP} {...reveal} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VISITOR_BENEFITS.map((benefit) => (
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

      {/* Brochure-listed programme themes; not a confirmed timetable. */}
      <section aria-labelledby="visit-highlights-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...reveal}>
            <motion.div variants={REVEAL}><SectionLabel>At the Exhibition</SectionLabel></motion.div>
            <motion.h2 id="visit-highlights-heading" variants={REVEAL} className="mt-4 max-w-[760px] font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">
              More Ways to <span className="text-[#982E21]">Explore & Connect.</span>
            </motion.h2>
        
<motion.p
  variants={REVEAL}
  className="mt-4 max-w-[710px] text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]"
>
  Explore building and construction products, discover new
  technologies, attend industry discussions and connect with
  professionals across the sector. The exhibition brings
  product showcases and business networking opportunities
  together in one place.
</motion.p>

          </motion.div>
          <motion.div variants={GROUP} {...reveal} className="mt-8 grid gap-x-12 sm:grid-cols-2">
            {EVENT_HIGHLIGHTS.map((item, index) => (
              <motion.article key={item.title} variants={REVEAL} className="flex gap-4 border-t border-[#E4E4E4] py-6">
           
                <div>
                  <h3 className="font-heading text-[17px] font-bold tracking-[-0.02em] text-[#111111]">{item.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.8] text-[#60636B]">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Practical visitor questions; no invented admission prices or schedules. */}
      <section aria-labelledby="visit-faq-heading" className="border-y border-[#E9E9E9] bg-[#FAFAFA] py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <motion.div variants={GROUP} {...reveal}>
              <motion.div variants={REVEAL}><SectionLabel>Visitor FAQs</SectionLabel></motion.div>
              <motion.h2 id="visit-faq-heading" variants={REVEAL} className="mt-4 font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">
                Frequently Asked <span className="text-[#982E21]">Questions.</span>
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-4 max-w-[420px] text-[14px] leading-[1.85] text-[#60636B]">
                Find answers about free admission, online and on-site registration, products, exhibition activities and the venue. Programme timings remain subject to confirmation.
              </motion.p>
              <motion.div variants={REVEAL}>
                <Link href={event.routes.venue} className="group mt-6 inline-flex items-center gap-2 border-b border-[#982E21]/40 pb-1.5 text-[13px] font-bold text-[#982E21] transition-colors hover:border-[#982E21]">
                  View Venue Information <ArrowIcon />
                </Link>
              </motion.div>
            </motion.div>
            <div className="border-t border-[#E2E2E2]">
              {VISITOR_FAQS.map((faq, index) => {
                const opened = openFaq === index;
                return (
                  <div key={faq.question} className="border-b border-[#E2E2E2]">
                    <h3>
                      <button type="button" id={`visit-faq-question-${index}`} aria-expanded={opened} aria-controls={`visit-faq-answer-${index}`} onClick={() => setOpenFaq(opened ? null : index)} className="group flex w-full items-start justify-between gap-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#982E21]">
                        <span className="text-[14px] font-semibold leading-[1.6] text-[#161616] transition-colors group-hover:text-[#982E21] sm:text-[15px]">{faq.question}</span>
                        <span aria-hidden="true" className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition-all duration-200 ${opened ? "border-[#982E21] bg-[#982E21] text-white" : "border-[#DADADA] text-[#982E21]"}`}>{opened ? "−" : "+"}</span>
                      </button>
                    </h3>
                    <div id={`visit-faq-answer-${index}`} role="region" aria-labelledby={`visit-faq-question-${index}`} hidden={!opened} className="pb-5 pr-10 text-[13px] leading-[1.9] text-[#60636B] sm:text-[14px]">
                      <p>{faq.answer}</p>
                      {faq.links && faq.links.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                          {faq.links.map((link) => (
                            <Link
                              key={`${faq.question}-${link.href}`}
                              href={link.href}
                              className="inline-flex items-center gap-1.5 font-semibold text-[#982E21] underline decoration-[#982E21]/40 underline-offset-4 transition-colors hover:decoration-[#982E21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#982E21]"
                            >
                              {link.label} <ArrowIcon />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="visit-plan-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...reveal} className="grid items-center gap-8 rounded-xl bg-[#0B0C11] p-7 text-white sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12 lg:p-12">
            <div>
              <motion.div variants={REVEAL}><SectionLabel light>Plan Your Visit</SectionLabel></motion.div>
              <motion.h2 id="visit-plan-heading" variants={REVEAL} className="mt-5 max-w-[640px] font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">
                Visit Nepal Buildcon International Expo 2027 in Kathmandu.
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-4 max-w-[650px] text-[14px] leading-[1.85] text-white/70 sm:text-[15px]">
                {event.dates.display} at {event.venue.fullLocation}. Visitor entry is free. Register online before the event or register at the venue during exhibition opening hours.
              </motion.p>
            </div>
            <motion.div variants={REVEAL} className="lg:justify-self-end">
              <Link href={event.cta.registerVisit} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#982E21] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#B33A2C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Register for Free <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
