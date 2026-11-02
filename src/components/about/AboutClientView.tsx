"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const REVEAL: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const WORD_GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.05 } },
};

const WORD: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.85, ease: EASE },
  },
};

const OBJECTIVES = [
  {
    title: "Industry Connections",
    description:
      "Meet manufacturers, suppliers, contractors, architects, engineers and other building and construction professionals.",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m14-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm6 14v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
  {
    title: "Product Discovery",
    description:
      "Explore building materials, construction machinery, equipment, architectural products and related technologies.",
    icon: "M3 7h18M5 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2M5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7M9 12h6m-6 4h6",
  },
  {
    title: "Knowledge Exchange",
    description:
      "Learn about materials, equipment, building systems and developments relevant to construction projects.",
    icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Zm3 6H16m-6 4h6",
  },
  {
    title: "Business Opportunities",
    description:
      "Discuss sourcing needs, identify potential distributors and explore new supplier and business relationships.",
    icon: "M3 17l6-6 4 4 8-8m-6 0h6v6",
  },
] as const;

function AnimatedWords({ text, reduced }: { text: string; reduced: boolean }) {
  if (reduced) return <>{text}</>;
  return (
    <>
      {text.trim().split(/\s+/).map((word, index, words) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={WORD} className="inline-block">
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-[2px] w-8 shrink-0 bg-[#982E21]" />
      <span className={`text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px] ${light ? "text-white/70" : "text-[#982E21]"}`}>
        {children}
      </span>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ObjectiveCard({ item, reduced }: { item: (typeof OBJECTIVES)[number]; reduced: boolean }) {
  return (
    <motion.article
      variants={REVEAL}
      whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.25, ease: EASE } }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#E7E7E9] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/35 hover:shadow-[0_12px_32px_rgba(11,12,17,0.06)] sm:p-6"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#982E21]/15 bg-[#982E21]/[0.06] text-[#982E21] transition-colors duration-300 group-hover:border-[#982E21] group-hover:bg-[#982E21] group-hover:text-white">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d={item.icon} />
        </svg>
      </div>
      <h3 className="mt-5 font-heading text-[16px] font-bold leading-[1.4] tracking-[-0.02em] text-[#111111] sm:text-[17px]">
        {item.title}
      </h3>
      <p className="mt-2 text-[13px] leading-[1.8] text-[#62666C]">
        {item.description}
      </p>
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#982E21] transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none" />
    </motion.article>
  );
}

export function AboutClientView() {
  const reduced = useReducedMotion() === true;
  const scroll = {
    initial: reduced ? false : "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, amount: 0.12 },
  };

  return (
    <main className="overflow-hidden bg-white text-[#111111]">
      {/* Exhibition introduction */}
      <section aria-labelledby="about-introduction-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-12 xl:gap-16">
            <motion.div variants={GROUP} {...scroll} className="min-w-0">
              <motion.div variants={REVEAL}>
                <SectionLabel>Exhibition Overview</SectionLabel>
              </motion.div>
              <motion.h2
                variants={WORD_GROUP}
                id="about-introduction-heading"
                aria-label="Connecting Nepal's Building and Construction Industry"
                className="mt-5 max-w-[710px] font-heading text-[clamp(2.05rem,3.6vw,3.65rem)] font-extrabold leading-[1.12] tracking-[-0.045em]"
              >
                <span aria-hidden="true">
                  <AnimatedWords text="Connecting Nepal's" reduced={reduced} />{" "}
                  <span className="text-[#982E21]">
                    <AnimatedWords text="Building & Construction" reduced={reduced} />
                  </span>{" "}
                  <AnimatedWords text="Industry." reduced={reduced} />
                </span>
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-6 max-w-[650px] text-[14px] leading-[1.85] text-[#5D636B] sm:text-[15px]">
                <strong className="font-semibold text-[#111111]">{event.name}</strong> brings together manufacturers, suppliers and service providers with contractors, architects, engineers, developers, distributors and other industry professionals.
              </motion.p>
              <motion.p variants={REVEAL} className="mt-4 max-w-[650px] text-[14px] leading-[1.85] text-[#5D636B] sm:text-[15px]">
                The exhibition covers building materials, construction machinery, equipment, architectural products, building systems and related technologies. It provides a setting to explore products, meet suppliers and discuss business opportunities in Nepal.
              </motion.p>
              <motion.div variants={REVEAL} className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link href="/exhibition-profile" className="group inline-flex items-center gap-2 text-[13px] font-bold text-[#982E21] transition-colors hover:text-[#7A231B]">
                  Explore Exhibition Profile
                  <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
                </Link>
                <Link href="/why-exhibit" className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#34383D] transition-colors hover:text-[#982E21]">
                  Why Exhibit
                  <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Dark information panel */}
            <motion.aside
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative isolate overflow-hidden rounded-xl bg-[#0B0C11] p-7 text-white sm:p-9 lg:p-10"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#982E21]/20 blur-3xl" />
              <div className="relative z-10">
                <SectionLabel light>Business Connections</SectionLabel>
                <h3 className="mt-6 max-w-[400px] font-heading text-[clamp(1.65rem,2.5vw,2.35rem)] font-bold leading-[1.2] tracking-[-0.04em]">
                  Meet Suppliers &amp; <span className="text-[#E6A7A0]">Industry Professionals.</span>
                </h3>
                <p className="mt-5 max-w-[400px] text-[13px] leading-[1.85] text-white/70 sm:text-[14px]">
                  Connect with businesses involved in building projects and construction work. Compare products, discuss project requirements and explore potential supplier and distribution relationships.
                </p>
                <div className="mt-7 border-t border-white/15 pt-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/50">Industry Focus</p>
                  <p className="mt-2 font-heading text-[16px] font-semibold leading-[1.5] text-white">
                    Building Materials, Construction Equipment &amp; Related Technologies
                  </p>
                </div>
                <Link href="/why-nepal" className="group mt-7 inline-flex items-center gap-3 border-b border-white/25 pb-1.5 text-[12px] font-bold text-white transition-colors hover:border-[#E6A7A0] hover:text-[#E6A7A0]">
                  Explore Why Nepal
                  <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
                </Link>
              </div>
              <motion.div aria-hidden="true" className="absolute bottom-0 left-0 h-[3px] w-28 origin-left bg-[#982E21]" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.95, delay: 0.2, ease: EASE }} />
            </motion.aside>
          </div>
        </Container>
      </section>

      {/* Exhibition objectives */}
      <section aria-labelledby="about-objectives-heading" className="border-y border-[#E9EAEC] bg-[#F8F9FA] py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...scroll} className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-[630px]">
              <motion.div variants={REVEAL}><SectionLabel>Exhibition Objectives</SectionLabel></motion.div>
              <motion.h2 variants={REVEAL} id="about-objectives-heading" className="mt-4 font-heading text-[clamp(1.85rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.045em] text-[#111111]">
                Connecting Products, <span className="text-[#982E21]">People &amp; Business.</span>
              </motion.h2>
            </div>
         
          </motion.div>
          <motion.div variants={GROUP} {...scroll} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OBJECTIVES.map((item) => <ObjectiveCard key={item.title} item={item} reduced={reduced} />)}
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
