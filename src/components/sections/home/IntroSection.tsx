"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const RED = "#982E21";
const TEAL = "#1C987A";
const EASE = [0.16, 1, 0.3, 1] as const;

const sectionVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.78, ease: EASE },
  },
};

function IntroBackground({ reduced }: { reduced: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        <motion.g
          style={{ transformOrigin: "1350px 100px" }}
          animate={reduced ? undefined : { rotate: [0, 5, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="1350" cy="100" r="190" stroke={RED} strokeWidth="1" strokeOpacity="0.1" strokeDasharray="6 12" />
          <circle cx="1350" cy="100" r="300" stroke={TEAL} strokeWidth="0.8" strokeOpacity="0.07" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: "80px 720px" }}
          animate={reduced ? undefined : { rotate: [0, -5, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx="80" cy="720" r="180" stroke={RED} strokeWidth="0.8" strokeOpacity="0.08" strokeDasharray="5 12" />
          <circle cx="80" cy="720" r="290" stroke={TEAL} strokeWidth="0.8" strokeOpacity="0.06" />
        </motion.g>
        {Array.from({ length: 4 }).map((_, i) => {
          const pathA = `M-120,${435 + i * 22} C230,${350 + i * 12} 550,${600 - i * 8} 900,${460 + i * 9} C1180,${370 + i * 8} 1410,${550 - i * 7} 1560,${455 + i * 7}`;
          const pathB = `M-120,${455 + i * 22} C275,${380 + i * 10} 585,${570 - i * 6} 930,${480 + i * 7} C1200,${400 + i * 8} 1380,${520 - i * 6} 1560,${475 + i * 6}`;
          return (
            <motion.path
              key={i}
              d={pathA}
              stroke={i % 2 === 0 ? RED : TEAL}
              strokeWidth="0.85"
              strokeOpacity="0.065"
              animate={reduced ? undefined : { d: [pathA, pathB, pathA] }}
              transition={{ duration: 25 + i * 2, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </svg>
    </div>
  );
}

function NetworkingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  );
}

export function IntroSection() {
  const reduced = useReducedMotion() === true;
  const scrollProps = {
    initial: reduced ? false : "hidden",
    whileInView: "visible" as const,
    viewport: { once: true, margin: "-60px" },
  };

  return (
    <section
      aria-labelledby="intro-heading"
      className="relative isolate overflow-hidden border-b border-[#111111]/[0.08] bg-white py-14 text-[#111111] selection:bg-[#982E21] selection:text-white sm:py-16 lg:py-20"
    >
      <IntroBackground reduced={reduced} />
      <Container className="relative z-10">
        <motion.div
          variants={sectionVariants}
          {...scrollProps}
          className="mb-9 flex items-center border-b border-[#111111]/10 pb-5 sm:mb-10"
        >
          <motion.div variants={revealVariants} className="flex items-center gap-3">
            <span aria-hidden="true" className="h-[2px] w-8 bg-[#982E21]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#982E21] sm:text-[11px]">
              About the Exhibition
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          {...scrollProps}
          className="grid items-start gap-9 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 xl:gap-16"
        >
          <motion.div variants={revealVariants} className="min-w-0">
            <h2
              id="intro-heading"
              className="max-w-[540px] text-[clamp(2rem,3.5vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.045em] text-[#111111]"
            >
              Connecting Nepal&apos;s
              <span className="mt-1.5 block text-[#982E21]">
                Building &amp;
                <br />
                Construction
              </span>
              <span className="mt-1.5 block">Industry</span>
            </h2>

            <motion.div
              aria-hidden="true"
              className="mt-6 flex h-[3px] w-24 origin-left overflow-hidden"
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: EASE }}
            >
              <span className="h-full w-[70%] bg-[#982E21]" />
              <span className="h-full flex-1 bg-[#1C987A]" />
            </motion.div>
          </motion.div>

          <motion.div variants={revealVariants} className="min-w-0 lg:border-l lg:border-[#111111]/10 lg:pl-8 xl:pl-10">
            <p className="text-[13px] leading-[1.9] text-[#555555] sm:text-[14px]">
              <strong className="font-bold text-[#111111]">{event.name}</strong> brings together
              manufacturers, suppliers and professionals from the building, construction and
              allied industries. The exhibition covers building materials, construction
              machinery, equipment, technology and related solutions.
            </p>
            <p className="mt-4 text-[13px] leading-[1.9] text-[#555555] sm:text-[14px]">
              It provides an opportunity to explore products, meet suppliers and connect with
              contractors, developers, architects, engineers, dealers and distributors working
              across Nepal&apos;s building and construction sector.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                href={event.routes.about}
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-[#982E21] !bg-[#982E21] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.045em] !text-white transition-all duration-300 hover:-translate-y-0.5 hover:!bg-[#7F251B] motion-reduce:transform-none"
              >
                About the Exhibition
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </Button>
              <Button
                href={event.cta.bookStand}
                variant="secondary"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-[#111111]/20 !bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.045em] !text-[#111111] transition-all duration-300 hover:border-[#1C987A] hover:!bg-[#1C987A] hover:!text-white motion-reduce:transform-none"
              >
                Book a Stand
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={sectionVariants}
          {...scrollProps}
          className="mt-10 grid overflow-hidden rounded-xl border border-[#111111]/10 bg-white/90 sm:mt-12 md:grid-cols-2"
        >
          <motion.div
            variants={revealVariants}
            whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.3, ease: EASE } }}
            className="group flex gap-4 border-b border-[#111111]/10 p-5 transition-colors duration-300 hover:bg-[#FAFAFA] sm:p-6 md:border-b-0 md:border-r"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#982E21]/15 bg-[#982E21]/[0.05] text-[#982E21] transition-colors duration-300 group-hover:bg-[#982E21] group-hover:text-white">
              <NetworkingIcon />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-bold tracking-[-0.02em] text-[#111111]">Industry Connections</h3>
              <p className="mt-2 text-[12px] leading-[1.75] text-[#666666] sm:text-[13px]">
                Meet manufacturers, suppliers and professionals involved in building and construction projects.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={revealVariants}
            whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.3, ease: EASE } }}
            className="group flex gap-4 p-5 transition-colors duration-300 hover:bg-[#FAFAFA] sm:p-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#1C987A]/15 bg-[#1C987A]/[0.06] text-[#1C987A] transition-colors duration-300 group-hover:bg-[#1C987A] group-hover:text-white">
              <GrowthIcon />
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-bold tracking-[-0.02em] text-[#111111]">Product Discovery</h3>
              <p className="mt-2 text-[12px] leading-[1.75] text-[#666666] sm:text-[13px]">
                Explore building materials, construction equipment and solutions from participating companies.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
