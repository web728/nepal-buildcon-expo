"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { marketFacts, type MarketFact } from "@/data/marketFacts";

// Nepal Buildcon brand palette — red, teal, white and charcoal.
const BRAND = {
  red: "#982E21",
  redLight: "#E6A7A0",
  teal: "#1C987A",
  deepTeal: "#14745D",
  dark: "#0B0C11",
  white: "#FFFFFF",
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: EASE },
  },
};

function AnimatedCounter({
  value,
  delay = 0,
}: {
  value: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion() === true;
  const [count, setCount] = useState(0);

  const match = value.match(/-?\d[\d,]*(?:\.\d+)?/);
  const number = match?.[0] ?? "";
  const target = Number(number.replace(/,/g, ""));
  const valid = Boolean(match) && Number.isFinite(target);
  const decimals = number.split(".")[1]?.length ?? 0;
  const prefix = match ? value.slice(0, match.index ?? 0) : "";
  const suffix = match ? value.slice((match.index ?? 0) + number.length) : "";

  useEffect(() => {
    if (!inView || !valid) return;
    if (reduced) {
      setCount(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 2.2,
      delay,
      ease: EASE,
      onUpdate: setCount,
      onComplete: () => setCount(target),
    });
    return () => controls.stop();
  }, [inView, valid, reduced, target, delay]);

  const formatted = count.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: number.includes(","),
  });

  return (
    <span ref={ref} className="tabular-nums" aria-label={value}>
      <span aria-hidden="true">
        {valid ? `${prefix}${formatted}${suffix}` : value}
      </span>
    </span>
  );
}

function MarketBackground() {
  const reduced = useReducedMotion() === true;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />

      {/* Original architectural SVG geometry and red–teal sectors. */}
      <div className="absolute -right-[260px] top-[2%] h-[510px] w-[510px] opacity-[0.2] sm:-right-[170px] sm:h-[650px] sm:w-[650px] lg:top-[4%] lg:h-[760px] lg:w-[760px] lg:opacity-[0.3]">
        <svg viewBox="0 0 800 800" fill="none" className="h-full w-full">
          <motion.g
            style={{ transformOrigin: "400px 400px", transformBox: "view-box" }}
            animate={reduced ? undefined : { rotate: 360 }}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="400" cy="400" r="345" stroke={BRAND.white} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="8 16" />
            <circle cx="400" cy="400" r="312" stroke={BRAND.red} strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="70 24 15 30" />
            <circle cx="400" cy="55" r="6" fill={BRAND.red} />
            <circle cx="710" cy="400" r="5" fill={BRAND.teal} />
          </motion.g>

          <motion.g
            style={{ transformOrigin: "400px 400px", transformBox: "view-box" }}
            animate={reduced ? undefined : { rotate: -360 }}
            transition={{ duration: 125, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="400" cy="400" r="270" stroke={BRAND.white} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="5 13" />
            <circle cx="400" cy="130" r="7" fill={BRAND.white} />
            <circle cx="400" cy="670" r="5" fill={BRAND.teal} />
          </motion.g>

          <motion.g
            style={{ transformOrigin: "400px 400px", transformBox: "view-box" }}
            animate={reduced ? undefined : { scale: [1, 1.018, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M400 400L275 100A340 340 0 0 1 525 100Z" fill={BRAND.red} fillOpacity="0.85" />
            <path d="M465 370L655 80L655 470Z" fill={BRAND.teal} fillOpacity="0.9" />
            <path d="M400 400L95 475A330 330 0 0 0 270 710Z" fill={BRAND.teal} fillOpacity="0.78" />
            <path d="M400 400L210 340A205 205 0 0 0 280 560Z" fill={BRAND.deepTeal} fillOpacity="0.9" />
            <path d="M400 400L510 480A205 205 0 0 1 465 565Z" fill={BRAND.teal} fillOpacity="0.85" />
          </motion.g>

          <circle cx="400" cy="400" r="148" stroke={BRAND.white} strokeOpacity="0.4" strokeWidth="1.5" />
          <circle cx="400" cy="400" r="127" stroke={BRAND.white} strokeOpacity="0.8" strokeWidth="2.5" />
          <motion.circle
            cx="400"
            cy="400"
            r="104"
            fill={BRAND.red}
            animate={reduced ? undefined : { r: [104, 109, 104] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="400" cy="400" r="78" stroke={BRAND.white} strokeOpacity="0.25" />
          <circle cx="400" cy="400" r="5" fill={BRAND.white} />
        </svg>
      </div>

      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {Array.from({ length: 7 }).map((_, index) => {
          const pathA = `M-100,${610 + index * 18} C250,${500 + index * 12} 560,${750 - index * 7} 900,${590 + index * 8} C1180,${480 + index * 9} 1400,${680 - index * 7} 1550,${590 + index * 7}`;
          const pathB = `M-100,${630 + index * 18} C280,${540 + index * 10} 580,${710 - index * 6} 930,${615 + index * 7} C1200,${520 + index * 7} 1410,${650 - index * 6} 1550,${610 + index * 6}`;
          return (
            <motion.path
              key={index}
              d={pathA}
              stroke={index % 3 === 0 ? BRAND.red : index % 3 === 1 ? BRAND.teal : BRAND.white}
              strokeWidth="0.8"
              strokeOpacity={index % 3 === 2 ? 0.05 : 0.1}
              animate={reduced ? undefined : { d: [pathA, pathB, pathA] }}
              transition={{ duration: 19 + index * 1.7, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C11]/95 via-[#0B0C11]/75 to-[#0B0C11]/35 lg:from-[#0B0C11]/90 lg:via-[#0B0C11]/55 lg:to-transparent" />
    </div>
  );
}

function MarketFactCard({ fact, index }: { fact: MarketFact; index: number }) {
  const reduced = useReducedMotion() === true;

  return (
    <motion.article
      variants={reveal}
      whileHover={
        reduced
          ? undefined
          : { y: -3, transition: { duration: 0.3, ease: EASE } }
      }
      className="group relative min-w-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-5 transition-[background-color,border-color] duration-300 hover:border-[#982E21]/45 hover:bg-white/[0.055] sm:p-6"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#982E21] transition-transform duration-500 group-hover:scale-x-100"
      />
      <p className="font-heading text-[clamp(2rem,3vw,3rem)] font-extrabold leading-none tracking-[-0.045em] text-white">
        <AnimatedCounter value={fact.value} delay={index * 0.12} />
      </p>
      <h3 className="mt-3 text-[14px] font-bold leading-[1.5] text-white sm:text-[15px]">
        {fact.label}
      </h3>
      {fact.detail && (
        <p className="mt-2 text-[12px] leading-[1.75] text-white/65 sm:text-[13px]">
          {fact.detail}
        </p>
      )}
  
    </motion.article>
  );
}

export function WhyNepalSection() {
  const reduced = useReducedMotion() === true;

  return (
    <section
      aria-labelledby="why-nepal-heading"
      className="relative isolate overflow-hidden border-b border-white/10 bg-[#0B0C11] py-14 text-white sm:py-16 lg:py-20"
    >
      <MarketBackground />
      <Container className="relative z-10">
        <motion.div
          variants={stagger}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6 border-b border-white/15 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-[720px]">
            <motion.div variants={reveal} className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#982E21]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#fffdfc]">
                Why Nepal
              </span>
            </motion.div>

            <motion.h2
              variants={reveal}
              id="why-nepal-heading"
              className="font-heading text-[clamp(2.1rem,3.7vw,3.6rem)] font-extrabold leading-[1.12] tracking-[-0.045em]"
            >
              Opportunities in Nepal&apos;s
              <span className="block text-[#E6A7A0]">
                Building &amp; Construction Market
              </span>
            </motion.h2>

            <motion.p
              variants={reveal}
              className="mt-5 max-w-[660px] text-[14px] leading-[1.85] text-white/70 sm:text-[15px]"
            >
              Development in housing, commercial buildings, roads and
              hydropower creates opportunities for building materials,
              construction machinery, equipment and related technologies
              in Nepal.
            </motion.p>
          </div>

          <motion.div variants={reveal} className="shrink-0">
            <Button
              href="/why-nepal"
              className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg border border-white/20 !bg-white px-5 py-2.5 text-[12px] font-bold !text-[#111111] transition-[background-color,color] duration-300 hover:!bg-[#982E21] hover:!text-white"
            >
              Explore Why Nepal
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {marketFacts.length > 0 && (
          <motion.div
            variants={stagger}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {marketFacts.map((fact, index) => (
              <MarketFactCard key={fact.id} fact={fact} index={index} />
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
}
