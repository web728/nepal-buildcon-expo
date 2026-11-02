
"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* =========================================
   NEPAL BUILDCON BRAND + MOTION
========================================= */

const RED = "#982E21";
const GREEN = "#1C987A";
const BLACK = "#111111";
const EASE = [0.16, 1, 0.3, 1] as const;

const parentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.07,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: "blur(3px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: EASE,
    },
  },
};

/* =========================================
   SMOOTH ARCHITECTURAL BACKGROUND
   SVG design and animations preserved
========================================= */

function DirectoryBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Subtle blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111111 1px,transparent 1px),linear-gradient(90deg,#111111 1px,transparent 1px)",
          backgroundSize: "82px 82px",
        }}
      />

      <svg
        viewBox="0 0 1440 850"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Top-right technical rings */}
        <motion.g
          style={{
            transformOrigin: "1450px 65px",
          }}
          animate={
            reduceMotion ? undefined : { rotate: 360 }
          }
          transition={{
            duration: 125,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <circle
            cx="1450"
            cy="65"
            r="215"
            stroke={RED}
            strokeWidth="1"
            strokeOpacity="0.16"
            strokeDasharray="8 15"
          />

          <circle
            cx="1450"
            cy="65"
            r="305"
            stroke={BLACK}
            strokeWidth="0.8"
            strokeOpacity="0.09"
          />

          <circle
            cx="1450"
            cy="65"
            r="390"
            stroke={GREEN}
            strokeWidth="0.8"
            strokeOpacity="0.12"
            strokeDasharray="10 18"
          />
        </motion.g>

        {/* Bottom-left linework */}
        <circle
          cx="-50"
          cy="820"
          r="250"
          stroke={RED}
          strokeWidth="0.8"
          strokeOpacity="0.1"
        />

        <circle
          cx="-50"
          cy="820"
          r="340"
          stroke={BLACK}
          strokeWidth="0.8"
          strokeOpacity="0.06"
          strokeDasharray="7 15"
        />

        {/* Continuously moving fine waves */}
        {Array.from({ length: 7 }).map((_, i) => {
          const first =
            `M-120,${465 + i * 19} ` +
            `C270,${345 + i * 11} ` +
            `570,${630 - i * 8} ` +
            `930,${470 + i * 8} ` +
            `C1190,${370 + i * 8} ` +
            `1430,${560 - i * 7} ` +
            `1560,${465 + i * 7}`;

          const second =
            `M-120,${488 + i * 19} ` +
            `C295,${390 + i * 10} ` +
            `600,${590 - i * 7} ` +
            `950,${495 + i * 7} ` +
            `C1210,${410 + i * 8} ` +
            `1430,${530 - i * 6} ` +
            `1560,${490 + i * 6}`;

          return (
            <motion.path
              key={i}
              d={first}
              stroke={
                i % 3 === 0
                  ? RED
                  : i % 3 === 1
                    ? GREEN
                    : BLACK
              }
              strokeWidth="0.85"
              strokeOpacity={
                i % 3 === 0
                  ? 0.11
                  : i % 3 === 1
                    ? 0.07
                    : 0.045
              }
              animate={
                reduceMotion
                  ? undefined
                  : { d: [first, second, first] }
              }
              transition={{
                duration: 20 + i * 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* =========================================
   DIRECTORY STATUS CARD
========================================= */

function DirectoryStatusCard({
  index,
}: {
  index: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      variants={cardVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              transition: {
                duration: 0.32,
                ease: EASE,
              },
            }
      }
      className="group relative flex h-full min-h-[144px] min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-[#111111]/10 bg-white p-5 shadow-[0_8px_28px_rgba(17,17,17,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/35 hover:shadow-[0_18px_42px_rgba(17,17,17,0.085)] sm:p-6"
    >
      

      {/* Status metadata */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#982E21]">
          Directory Status
        </span>

     
      </div>

      {/* Main content */}
      <div className="mt-6">
        <h3 className="break-words text-[17px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111] transition-colors duration-300 group-hover:text-[#982E21] sm:text-[18px]">
          {index === 0
            ? "Manufacturers & Suppliers"
            : index === 1
              ? "Building & Construction"
              : "Technology & Machinery"}
        </h3>

        <p className="mt-2 text-[12px] leading-[1.7] text-[#666666]">
          {index === 0
            ? "Discover manufacturers, exporters and material suppliers."
            : index === 1
              ? "Explore companies serving Nepal's construction industry."
              : "Find solutions for machinery, equipment and construction technology."}
        </p>
      </div>

    
    </motion.li>
  );
}

/* =========================================
   MAIN SECTION
========================================= */

export function ExhibitorDirectoryPreviewSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="directory-heading"
      className="relative isolate overflow-hidden border-b border-[#111111]/10 bg-white py-16 text-[#111111] selection:bg-[#982E21] selection:text-white sm:py-20 lg:py-[88px]"
    >
      <DirectoryBackground />

      <Container className="relative z-10">
        {/* SECTION HEADER */}
        <motion.div
          variants={parentVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-70px",
          }}
          className="flex flex-col justify-between gap-7 border-b border-[#111111]/10 pb-9 lg:flex-row lg:items-end"
        >
          <motion.div
            variants={revealVariants}
            className="max-w-[790px]"
          >
            {/* Section kicker */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="h-[2px] w-8 bg-[#982E21]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#982E21] sm:text-[11px]">
                Official Exhibitor Directory
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-[#111111]/25 sm:block" />

              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.12em] text-[#777777] sm:block">
                Nepal Buildcon 2027
              </span>
            </div>

            {/* Headline */}
            <h2
              id="directory-heading"
              className="text-[clamp(2.1rem,3.8vw,3.75rem)] font-black leading-[1.09] tracking-[-0.045em] text-[#111111]"
            >
              Featured Exhibitors

              <span className="mt-1.5 block text-[#982E21]">
                &amp; Global Suppliers.
              </span>
            </h2>

            {/* Animated title underline */}
            <motion.div
              aria-hidden="true"
              className="mt-6 flex h-[3px] w-32 origin-left overflow-hidden"
              initial={
                reduceMotion
                  ? false
                  : { scaleX: 0 }
              }
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: EASE,
              }}
            >
              <span className="h-full w-[77%] bg-[#982E21]" />
              <span className="h-full flex-1 bg-[#1C987A]" />
            </motion.div>

            <p className="mt-5 max-w-[680px] text-[14px] leading-[1.8] text-[#626262] sm:text-[15px]">
              Discover manufacturers, building material
              suppliers, construction machinery companies
              and technology providers. The official
              exhibitor directory will be updated as
              participating companies are confirmed for
              Nepal Buildcon International Expo 2027.
            </p>
          </motion.div>

          {/* Header actions */}
          <motion.div
            variants={revealVariants}
            className="flex shrink-0 flex-wrap gap-3"
          >
            <Link
              href="/exhibitors"
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md border border-[#111111]/20 bg-white px-5 py-3 text-[11px] font-bold uppercase tracking-[0.07em] text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#111111] sm:text-[12px]"
            >
              Full Directory

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md bg-[#982E21] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7F241A] sm:text-[12px]"
            >
              Book Stand Space

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* DIRECTORY SUBHEADER */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 12 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
          className="mb-6 mt-9 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#982E21]">
              Verified B2B Directory
            </span>

            <h3 className="mt-1.5 text-[19px] font-extrabold tracking-[-0.025em] text-[#111111] sm:text-[21px]">
              The 2027 Exhibitor Directory
            </h3>

            <p className="mt-2 max-w-[650px] text-[13px] leading-[1.75] text-[#666666]">
              Official company listings will appear here
              as exhibitor participation is confirmed.
              No unverified company listings are displayed.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 rounded-md border border-[#1C987A]/20 bg-[#1C987A]/[0.06] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.07em] text-[#14745D]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#1C987A]"
            />
            Directory in preparation
          </span>
        </motion.div>

        {/* DIRECTORY PLACEHOLDERS */}
        <motion.ul
          variants={parentVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          aria-label="Exhibitor directory categories"
          className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[0, 1, 2].map((index) => (
            <DirectoryStatusCard
              key={index}
              index={index}
            />
          ))}
        </motion.ul>

        {/* PREMIUM BOOKING STRIP */}
        <motion.div
          initial={
            reduceMotion
              ? false
              : { opacity: 0, y: 20 }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: EASE,
          }}
          className="relative mt-11 overflow-hidden rounded-xl border border-[#111111]/10 bg-[#111111] px-6 py-7 text-white sm:px-8 lg:px-9"
        >
          {/* Inside technical grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(#FFFFFF 1px,transparent 1px),linear-gradient(90deg,#FFFFFF 1px,transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-[710px]">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#1C987A]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C96B5E]">
                  Exhibitor Opportunities
                </span>
              </div>

              <h3 className="text-[21px] font-extrabold leading-[1.3] tracking-[-0.03em] text-white sm:text-[24px]">
                Get Your Business in the Spotlight.
              </h3>

              <p className="mt-3 text-[13px] leading-[1.75] text-white/65">
                Are you a manufacturer, exporter, supplier
                or distributor serving the building and
                construction industry? Apply to exhibit
                at Nepal Buildcon International Expo 2027
                and connect with potential buyers and
                industry professionals in Kathmandu,
                Nepal, from 25–28 February 2027.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-3 self-start rounded-md bg-[#982E21] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7F241A]"
            >
              Apply for Listing

              <span
                aria-hidden="true"
                className="text-[17px] transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </div>

          {/* Bottom brand accent */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[3px] w-36 bg-[#982E21]"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-36 h-[3px] w-14 bg-[#1C987A]"
          />
        </motion.div>

        {/* Bottom editorial footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#111111]/10 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#888888]">
            Nepal Buildcon / Exhibitor Network
          </span>

          <span className="text-[10px] font-bold tracking-[0.1em] text-[#982E21]">
            2027 / 12
          </span>
        </div>
      </Container>
    </section>
  );
}
