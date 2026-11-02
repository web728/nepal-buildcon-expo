"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import { marketFacts } from "@/data/marketFacts";

const RED = "#982E21";
const RED_LIGHT = "#E6A7A0";
const DARK = "#0B0C11";
const EASE = [0.22, 1, 0.36, 1] as const;

const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};
const REVEAL: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const WORD: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.8, ease: EASE } },
};
const WORD_GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.065, delayChildren: 0.05 } },
};

const MARKET_DRIVERS = [
  {
    title: "Infrastructure Projects",
    body: "Roads, bridges, hydropower and other infrastructure projects involve a broad range of construction materials, machinery and technical services.",
    icon: "M3 17l6-6 4 4 8-8M15 7h6v6",
  },
  {
    title: "Housing & Urban Development",
    body: "Residential construction and urban development create requirements for building products, architectural solutions and building services.",
    icon: "M3 21V8l9-5 9 5v13M9 21v-8h6v8M3 21h18",
  },
  {
    title: "Commercial & Industrial Buildings",
    body: "Commercial properties, industrial facilities and hospitality projects use specialised systems, equipment and construction technologies.",
    icon: "M4 21V7l8-4v18M12 10h8v11M7 10h2M7 14h2M15 14h2M15 18h2M2 21h20",
  },
  {
    title: "Supplier & Trade Connections",
    body: "Manufacturers and suppliers can engage with contractors, developers, architects, engineers, importers and distributors serving the Nepalese market.",
    icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  },
] as const;

function AnimatedWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.trim().split(/\s+/).map((word, index, all) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={WORD} className="inline-block">{word}</motion.span>
          {index < all.length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

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
      <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${light ? "text-white/65" : "text-[#982E21]"}`}>
        {children}
      </span>
    </div>
  );
}

/** Original Nepal architectural-sector geometry, with a red-led colour treatment. */

/** Original Nepal architectural-sector geometry with red and teal branding. */
function NepalMarketArtwork() {
  const reduced = useReducedMotion() === true;

  const RED = "#982E21";
  const TEAL = "#1C987A";
  const RED_LIGHT = "#E6A7A0";
  const TEAL_LIGHT = "#83D8C4";
  const DARK_RED = "#762219";
  const DARK_TEAL = "#14745D";

  const orbit = {
    transformOrigin: "400px 400px",
    transformBox: "view-box" as const,
  };

  return (
    <svg
      viewBox="0 0 800 800"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
    >
      <defs>
        <radialGradient
          id="why-nepal-market-glow"
          cx="50%"
          cy="50%"
          r="50%"
        >
          <stop offset="0%" stopColor={RED} stopOpacity="0.16" />
          <stop offset="65%" stopColor={TEAL} stopOpacity="0.07" />
          <stop offset="100%" stopColor={RED} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle
        cx="400"
        cy="400"
        r="365"
        fill="url(#why-nepal-market-glow)"
      />

      {/* Outer rotating orbit */}
      <motion.g
        initial={false}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{
          duration: 85,
          repeat: Infinity,
          ease: "linear",
        }}
        style={orbit}
      >
        <circle
          cx="400"
          cy="400"
          r="345"
          stroke="white"
          strokeOpacity="0.22"
          strokeWidth="1"
          strokeDasharray="8 16"
        />

        <circle
          cx="400"
          cy="400"
          r="312"
          stroke={RED_LIGHT}
          strokeOpacity="0.65"
          strokeWidth="1.2"
          strokeDasharray="70 24 15 30"
        />

        <circle cx="400" cy="55" r="6" fill={RED_LIGHT} />
        <circle cx="710" cy="400" r="5" fill={TEAL_LIGHT} />
      </motion.g>

      {/* Reverse rotating orbit */}
      <motion.g
        initial={false}
        animate={reduced ? undefined : { rotate: -360 }}
        transition={{
          duration: 110,
          repeat: Infinity,
          ease: "linear",
        }}
        style={orbit}
      >
        <circle
          cx="400"
          cy="400"
          r="270"
          stroke="white"
          strokeOpacity="0.34"
          strokeWidth="1"
          strokeDasharray="5 13"
        />

        <circle cx="400" cy="130" r="7" fill="white" />
        <circle cx="400" cy="670" r="5" fill={TEAL_LIGHT} />
      </motion.g>

      {/* Original architectural sectors */}
      <motion.g
        initial={false}
        animate={
          reduced ? undefined : { scale: [1, 1.018, 1] }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={orbit}
      >
        {/* Primary red upper sector */}
        <path
          d="M400 400L275 100A340 340 0 0 1 525 100Z"
          fill={RED}
          fillOpacity="0.95"
        />

        {/* Teal right sector */}
        <path
          d="M465 370L655 80L655 470Z"
          fill={TEAL}
          fillOpacity="0.9"
        />

        {/* Teal lower sector */}
        <path
          d="M400 400L95 475A330 330 0 0 0 270 710Z"
          fill={TEAL}
          fillOpacity="0.85"
        />

        {/* Deep teal inner sector */}
        <path
          d="M400 400L210 340A205 205 0 0 0 280 560Z"
          fill={DARK_TEAL}
          fillOpacity="0.95"
        />

        {/* Dark red inner sector */}
        <path
          d="M400 400L510 480A205 205 0 0 1 465 565Z"
          fill={DARK_RED}
          fillOpacity="0.95"
        />
      </motion.g>

      {/* Centre rings */}
      <circle
        cx="400"
        cy="400"
        r="148"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />

      <circle
        cx="400"
        cy="400"
        r="127"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="2.5"
      />

      {/* Red centre pulse */}
      <motion.circle
        cx="400"
        cy="400"
        r="104"
        fill={RED}
        initial={false}
        animate={
          reduced ? undefined : { r: [104, 109, 104] }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <circle
        cx="400"
        cy="400"
        r="78"
        stroke="white"
        strokeOpacity="0.25"
      />

      <circle
        cx="400"
        cy="400"
        r="5"
        fill="white"
      />
    </svg>
  );
}


function MarketDriver({ driver }: { driver: (typeof MARKET_DRIVERS)[number] }) {
  return (
    <motion.article variants={REVEAL} className="group flex min-w-0 items-start gap-4 border-b border-[#E7E5E3] py-5 sm:gap-5 sm:py-6">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#982E21]/[0.065] text-[#982E21] transition-colors duration-300 group-hover:bg-[#982E21] group-hover:text-white">
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d={driver.icon} />
        </svg>
      </div>
      <div className="min-w-0">
        <h3 className="font-heading text-[17px] font-bold leading-[1.35] tracking-[-0.025em] text-[#111111] sm:text-[18px]">{driver.title}</h3>
        <p className="mt-2 max-w-[550px] text-[13px] leading-[1.8] text-[#62646B] sm:text-[14px]">{driver.body}</p>
      </div>
    </motion.article>
  );
}

export function WhyNepalClientView() {
  const reduced = useReducedMotion() === true;
  const initial = reduced ? false : "hidden";

  return (
    <div className="overflow-hidden bg-white text-[#111111]">
      {/* 01 — Market indicators */}
      <section aria-labelledby="nepal-indicators-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={STAGGER} initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="flex flex-col gap-6 border-b border-[#E7E5E3] pb-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[740px]">
              <motion.div variants={REVEAL}><SectionLabel>Market Overview</SectionLabel></motion.div>
              <motion.h2 variants={WORD_GROUP} id="nepal-indicators-heading" aria-label="Nepal's Building and Construction Market" className="mt-5 font-heading text-[clamp(2rem,3.55vw,3.65rem)] font-extrabold leading-[1.12] tracking-[-0.045em]">
                {reduced ? <>Nepal&apos;s <span className="text-[#982E21]">Building &amp; Construction</span> Market.</> : <span aria-hidden="true"><AnimatedWords text="Nepal's" />{" "}<AnimatedWords text="Building & Construction" className="text-[#982E21]" />{" "}<AnimatedWords text="Market." /></span>}
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-5 max-w-[650px] text-[14px] leading-[1.85] text-[#62646B] sm:text-[15px]">
                A snapshot of the infrastructure, construction-sector and exhibition attendance figures presented in the event materials.
              </motion.p>
            </div>
            <motion.div variants={REVEAL}>
              <Link href={event.cta.bookStand} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-[#982E21] px-6 py-2.5 text-[13px] font-bold text-white transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#7B241A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21] motion-reduce:transform-none">
                Book a Stand <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>
          {marketFacts.length > 0 && (
            <motion.div variants={STAGGER} initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.08 }} className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {marketFacts.map((fact) => (
                <motion.div key={fact.id} variants={REVEAL} className="min-w-0"><StatCard fact={fact} /></motion.div>
              ))}
            </motion.div>
          )}
        </Container>
      </section>

      {/* 02 — Market context with original architectural artwork */}
      <section aria-labelledby="nepal-development-heading" className="relative isolate overflow-hidden bg-[#0B0C11] py-14 text-white sm:py-16 lg:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-[430px] w-[430px] rounded-full bg-[#982E21]/[0.10] blur-[100px]" />
        <Container className="relative z-10">
          <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12">
            <motion.div variants={STAGGER} initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div variants={REVEAL}><SectionLabel light>Market Development</SectionLabel></motion.div>
              <motion.h2 variants={WORD_GROUP} id="nepal-development-heading" aria-label="Development Across Nepal" className="mt-5 max-w-[650px] font-heading text-[clamp(2rem,3.4vw,3.6rem)] font-extrabold leading-[1.12] tracking-[-0.045em]">
                {reduced ? <>Development <span className="text-[#E6A7A0]">Across Nepal.</span></> : <span aria-hidden="true"><AnimatedWords text="Development" />{" "}<AnimatedWords text="Across Nepal." className="text-[#E6A7A0]" /></span>}
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-6 max-w-[590px] text-[14px] leading-[1.9] text-white/70 sm:text-[15px]">
                Roads, hydropower facilities, housing and commercial projects are important parts of Nepal&apos;s building and construction landscape. Each involves different needs for materials, equipment and technical expertise.
              </motion.p>
              <motion.p variants={REVEAL} className="mt-4 max-w-[590px] text-[14px] leading-[1.9] text-white/70 sm:text-[15px]">
                {event.name} provides a meeting place for manufacturers, suppliers, contractors, developers and other industry professionals to discover products and discuss project requirements.
              </motion.p>
              <motion.div variants={REVEAL} className="mt-7">
                <Link href={event.routes.exhibitionProfile} className="group inline-flex items-center gap-3 border-b border-[#E6A7A0]/60 pb-1.5 text-[13px] font-bold text-white transition-colors hover:text-[#E6A7A0]">
                  Explore Exhibition Profile <ArrowIcon />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div initial={reduced ? false : { opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.1, ease: EASE }} className="relative mx-auto aspect-square w-full max-w-[410px] sm:max-w-[470px] lg:max-w-[520px]">
              <NepalMarketArtwork />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 03 — Market drivers */}
      <section aria-labelledby="nepal-drivers-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-16">
            <motion.div variants={STAGGER} initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <motion.div variants={REVEAL}><SectionLabel>Market Drivers</SectionLabel></motion.div>
              <motion.h2 variants={REVEAL} id="nepal-drivers-heading" className="mt-5 font-heading text-[clamp(1.9rem,3vw,3.1rem)] font-extrabold leading-[1.15] tracking-[-0.045em]">
                Key Areas of <span className="text-[#982E21]">Construction Activity.</span>
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-4 max-w-[420px] text-[14px] leading-[1.85] text-[#62646B]">
                Infrastructure projects, urban development and commercial construction shape demand for building products and construction services in Nepal.
              </motion.p>
            </motion.div>
            <motion.div variants={STAGGER} initial={initial} whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="border-t border-[#E7E5E3]">
              {MARKET_DRIVERS.map((driver) => <MarketDriver key={driver.title} driver={driver} />)}
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
