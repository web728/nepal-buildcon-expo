
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

/* ==========================================
   NEPAL BUILDCON BRAND SYSTEM
========================================== */

const BRAND = {
  red: "#982E21",
  black: "#111111",
  green: "#1C987A",
  darkGreen: "#14745D",
  coral: "#C96B5E",
  white: "#FFFFFF",
};

const EASE = [0.16, 1, 0.3, 1] as const;

/* ==========================================
   MOTION VARIANTS
========================================== */

const sectionVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
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

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.075,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: EASE,
    },
  },
};

/* ==========================================
   SECTOR ICON PATHS
========================================== */

const ICON = {
  building:
    "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",

  machine:
    "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",

  steel:
    "M4 6h16M4 10h16M4 14h16M4 18h16",

  prefab:
    "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",

  window:
    "M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 12h16M12 4v16",

  tiles:
    "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",

  brush:
    "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",

  can:
    "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",

  bath:
    "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",

  hvac:
    "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",

  bolt:
    "M13 10V3L4 14h7v7l9-11h-7z",

  sun:
    "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",

  shield:
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016",

  chip:
    "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9",

  tools:
    "M14.7 6.3a4 4 0 00-5.6 5.6l-5.8 5.8a2 2 0 002.8 2.8l5.8-5.8a4 4 0 005.6-5.6L14 12l-2-2 2.7-3.7z",
} as const;

/* ==========================================
   EXHIBITION SECTOR DATA
========================================== */

type Sector = {
  title: string;
  items: string;
  icon: string;
  color: "red" | "green";
};

type SectorTab = {
  id: string;
  label: string;
  sectors: Sector[];
};

const sectorTabs: SectorTab[] = [
  {
    id: "structural",
    label: "Structural & Heavy",
    sectors: [
      {
        title: "Building Materials",
        items:
          "Cement, Concrete Blocks, Gypsum Boards, Roofing & Cladding",
        icon: ICON.building,
        color: "red",
      },
      {
        title: "Construction Machinery",
        items:
          "Earthmoving, Excavators, Concrete Batching, Cranes & Scaffolding",
        icon: ICON.machine,
        color: "green",
      },
      {
        title: "Steel & Structural Metal",
        items:
          "Reinforcement Steel, Pipes, Tubes, Profiles & Fabricated Units",
        icon: ICON.steel,
        color: "red",
      },
      {
        title: "Prefab & Precast",
        items:
          "Modular Buildings, Precast Concrete, Structural Prefab Systems",
        icon: ICON.prefab,
        color: "green",
      },
    ],
  },
  {
    id: "architectural",
    label: "Doors, Glass & Surfaces",
    sectors: [
      {
        title: "Doors, Windows & Glass",
        items:
          "Aluminium Profiles, uPVC Systems, Architectural Facades & Hardware",
        icon: ICON.window,
        color: "red",
      },
      {
        title: "Tiles, Marble & Stone",
        items:
          "Ceramic & Porcelain, Granite, Natural Stone & Surface Finishes",
        icon: ICON.tiles,
        color: "green",
      },
      {
        title: "Interiors & Finishing",
        items:
          "Ceilings, Wall Panels, Decorative Laminates & Wood Products",
        icon: ICON.brush,
        color: "red",
      },
      {
        title: "Paints & Chemicals",
        items:
          "Decorative Paints, Waterproofing, Sealants & Concrete Admixtures",
        icon: ICON.can,
        color: "green",
      },
    ],
  },
  {
    id: "mep",
    label: "MEP, Plumbing & Bath",
    sectors: [
      {
        title: "Water & Plumbing Pumps",
        items:
          "Pipes & Fittings, Water Pumps, Storage Tanks & Treatment Systems",
        icon: ICON.sun,
        color: "red",
      },
      {
        title: "Sanitaryware & Bath",
        items:
          "Faucets, Showers, Bathroom Fixtures & Sanitary Ceramics",
        icon: ICON.bath,
        color: "green",
      },
      {
        title: "HVAC & Mechanical",
        items:
          "Air Conditioning, Ventilation, Refrigeration & Building Services",
        icon: ICON.hvac,
        color: "red",
      },
      {
        title: "Hardware & Tools",
        items:
          "Power Tools, Fasteners, Drilling Equipment & Workshop Gear",
        icon: ICON.tools,
        color: "green",
      },
    ],
  },
  {
    id: "energy",
    label: "Electrical & Energy",
    sectors: [
      {
        title: "Electrical & Lighting",
        items:
          "Cables, Transformers, Switchgear, Industrial LED & Panels",
        icon: ICON.bolt,
        color: "red",
      },
      {
        title: "Solar & Energy Solutions",
        items:
          "Solar PV Panels, Inverters, Backup Power & Clean Energy",
        icon: ICON.sun,
        color: "green",
      },
      {
        title: "Fire, Safety & Security",
        items:
          "Fire Protection, Site Safety, Access Control & Surveillance",
        icon: ICON.shield,
        color: "red",
      },
    ],
  },
];

/* ==========================================
   CONTINUOUS ARCHITECTURAL BACKGROUND
   Original SVG structure and animation retained
========================================== */

function ExhibitionBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Original blueprint dot texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <svg
        viewBox="0 0 1440 850"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Upper-right technical rings */}
        <motion.g
          style={{ transformOrigin: "1360px 110px" }}
          animate={
            reduceMotion ? undefined : { rotate: [0, 8, 0] }
          }
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle
            cx="1360"
            cy="110"
            r="180"
            stroke={BRAND.red}
            strokeWidth="1"
            strokeOpacity="0.14"
            strokeDasharray="6 12"
          />

          <circle
            cx="1360"
            cy="110"
            r="265"
            stroke={BRAND.black}
            strokeWidth="0.8"
            strokeOpacity="0.08"
          />

          <circle
            cx="1360"
            cy="110"
            r="350"
            stroke={BRAND.green}
            strokeWidth="0.8"
            strokeOpacity="0.11"
            strokeDasharray="9 16"
          />
        </motion.g>

        {/* Lower-left structural rings */}
        <circle
          cx="50"
          cy="800"
          r="230"
          stroke={BRAND.red}
          strokeWidth="0.8"
          strokeOpacity="0.1"
        />

        <circle
          cx="50"
          cy="800"
          r="315"
          stroke={BRAND.black}
          strokeWidth="0.8"
          strokeOpacity="0.07"
          strokeDasharray="8 14"
        />

        {/* Original animated flowing construction lines */}
        {Array.from({ length: 8 }).map((_, i) => {
          const pathA = `M-120,${480 + i * 18} C250,${
            355 + i * 13
          } 590,${640 - i * 8} 930,${475 + i * 9} C1200,${
            380 + i * 10
          } 1400,${570 - i * 7} 1560,${470 + i * 8}`;

          const pathB = `M-120,${505 + i * 18} C280,${
            405 + i * 11
          } 610,${610 - i * 7} 960,${505 + i * 8} C1180,${
            415 + i * 8
          } 1410,${535 - i * 6} 1560,${495 + i * 7}`;

          return (
            <motion.path
              key={i}
              d={pathA}
              stroke={
                i % 3 === 0
                  ? BRAND.red
                  : i % 3 === 1
                    ? BRAND.green
                    : BRAND.black
              }
              strokeWidth="0.8"
              strokeOpacity={
                i % 3 === 0
                  ? 0.1
                  : i % 3 === 1
                    ? 0.07
                    : 0.045
              }
              animate={
                reduceMotion
                  ? undefined
                  : { d: [pathA, pathB, pathA] }
              }
              transition={{
                duration: 20 + i * 1.6,
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

/* ==========================================
   PREMIUM SECTOR CARD
========================================== */

function SectorCard({
  sector,
}: {
  sector: Sector;
}) {
  const reduceMotion = useReducedMotion();
  const isRed = sector.color === "red";

  return (
    <motion.article
      variants={cardVariants}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -5,
              transition: {
                duration: 0.35,
                ease: EASE,
              },
            }
      }
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[#111111]/10 bg-white p-5 shadow-[0_8px_30px_rgba(17,17,17,0.035)] transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/30 hover:shadow-[0_18px_42px_rgba(17,17,17,0.09)] sm:p-6"
    >
      {/* Animated top line */}
      <span
        className="absolute left-0 top-0 h-[2px] w-0 bg-[#982E21] transition-all duration-500 group-hover:w-full"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between border-b border-[#111111]/[0.08] pb-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-300 ${
            isRed
              ? "border-[#982E21]/15 bg-[#982E21]/[0.06] text-[#982E21] group-hover:border-[#982E21] group-hover:bg-[#982E21] group-hover:text-white"
              : "border-[#1C987A]/15 bg-[#1C987A]/[0.07] text-[#14745D] group-hover:border-[#14745D] group-hover:bg-[#14745D] group-hover:text-white"
          }`}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.7}
              d={sector.icon}
            />
          </svg>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="mt-5 text-[16px] font-extrabold leading-[1.35] tracking-[-0.025em] text-[#111111] sm:text-[17px]">
          {sector.title}
        </h3>

        <p className="mt-3 text-[12px] font-normal leading-[1.75] tracking-[-0.005em] text-[#666666] sm:text-[13px]">
          {sector.items}
        </p>
      </div>

      {/* Card footer */}
      <Link
        href={event.routes.exhibitionProfile}
        className="mt-6 flex items-center justify-between gap-3 border-t border-[#111111]/[0.08] pt-4 text-[11px] font-bold uppercase tracking-[0.06em] text-[#982E21] transition-colors hover:text-[#111111]"
      >
        <span>Official Exhibit</span>

        <span
          aria-hidden="true"
          className="text-[17px] font-normal transition-transform duration-300 group-hover:translate-x-1"
        >
          ↗
        </span>
      </Link>
    </motion.article>
  );
}

/* ==========================================
   EXHIBITION PROFILE SECTION
========================================== */

export function ExhibitionProfileSection() {
  const [activeTab, setActiveTab] = useState<string>(
    sectorTabs[0].id
  );

  const reduceMotion = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);

  const sectionVisible = useInView(sectionRef, {
    once: true,
    margin: "-60px",
  });

  const currentGroup =
    sectorTabs.find((tab) => tab.id === activeTab) ??
    sectorTabs[0];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="exhibition-profile-heading"
      className="relative isolate overflow-hidden border-b border-[#111111]/10 bg-white py-16 text-[#111111] selection:bg-[#982E21] selection:text-white sm:py-20 lg:py-24"
    >
      <ExhibitionBackground />

      <Container className="relative z-10 w-full">
        {/* ==================================
            SECTION INTRO
        ================================== */}

        <motion.div
          variants={sectionVariants}
          initial={reduceMotion ? false : "hidden"}
          animate={sectionVisible ? "visible" : "hidden"}
          className="flex flex-col gap-6 border-b border-[#111111]/10 pb-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <motion.div
            variants={revealVariants}
            className="max-w-[850px]"
          >
            {/* Editorial section label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#982E21]" />

              <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#982E21] sm:text-[11px]">
                What&apos;s On Display
              </span>
            </div>

            {/* Main heading */}
            <h2
              id="exhibition-profile-heading"
              className="text-[clamp(2rem,3.7vw,3.8rem)] font-black leading-[1.1] tracking-[-0.045em] text-[#111111]"
            >
              Products, Machinery
              <span className="mt-1 block">
                &amp;{" "}
                <span className="text-[#982E21]">
                  Materials on Display.
                </span>
              </span>
            </h2>

            {/* Animated heading underline */}
            <motion.div
              aria-hidden="true"
              className="mt-6 flex h-[3px] w-28 origin-left overflow-hidden"
              initial={
                reduceMotion ? false : { scaleX: 0 }
              }
              animate={
                sectionVisible
                  ? { scaleX: 1 }
                  : { scaleX: 0 }
              }
              transition={{
                duration: 1,
                delay: 0.25,
                ease: EASE,
              }}
            >
              <span className="h-full w-[75%] bg-[#982E21]" />
              <span className="h-full flex-1 bg-[#1C987A]" />
            </motion.div>

            <p className="mt-5 max-w-[690px] text-[14px] font-normal leading-[1.75] tracking-[-0.005em] text-[#666666] sm:text-[15px]">
              Explore products, machinery and solutions across
              Nepal&apos;s building and construction industry —
              from essential building materials and heavy
              equipment to architectural finishes, MEP systems
              and energy technologies.
            </p>
          </motion.div>

          {/* Top action */}
          <motion.div
            variants={revealVariants}
            className="shrink-0"
          >
            <Link
              href={event.routes.exhibitionProfile}
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md border border-[#111111]/20 bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#982E21] hover:bg-[#982E21] hover:text-white"
            >
              Explore All Sectors

              <span
                aria-hidden="true"
                className="text-[17px] font-normal transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* ==================================
            INTERACTIVE INDUSTRY TABS
        ================================== */}

        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 16 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
          className="mt-8"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#777777]">
              Explore by Industry
            </span>
          </div>

          {/* Scrollable tabs on mobile */}
          <div
            role="tablist"
            aria-label="Exhibition sector groups"
            className="flex w-full gap-2 overflow-x-auto border-b border-[#111111]/10 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-3"
          >
            {sectorTabs.map((tab, index) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  id={`sector-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="exhibition-sector-panel"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex min-h-[45px] shrink-0 cursor-pointer items-center gap-2.5 rounded-md border px-4 py-2.5 text-[11px] font-bold tracking-[0.015em] transition-colors duration-300 sm:px-5 sm:text-[12px] ${
                    isActive
                      ? "border-[#111111] bg-[#111111] text-white"
                      : "border-[#111111]/10 bg-white text-[#555555] hover:border-[#982E21]/40 hover:text-[#982E21]"
                  }`}
                >
              

                  <span>{tab.label}</span>

                  {isActive && (
                    <motion.span
                      layoutId="activeSectorIndicator"
                      className="absolute inset-x-3 -bottom-[4px] h-[3px] rounded-full bg-[#982E21]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ==================================
            ACTIVE CATEGORY HEADER
        ================================== */}

        <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#982E21]">
              Selected Category
            </span>

            <h3 className="mt-1 text-[18px] font-extrabold leading-[1.3] tracking-[-0.025em] text-[#111111] sm:text-[20px]">
              {currentGroup.label}
            </h3>
          </div>

          
        </div>

        {/* ==================================
            ANIMATED SECTOR GRID
        ================================== */}

        <div
          id="exhibition-sector-panel"
          role="tabpanel"
          aria-labelledby={`sector-tab-${activeTab}`}
          className="mt-5"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              variants={gridVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              exit={{
                opacity: 0,
                y: -10,
                transition: {
                  duration: 0.2,
                },
              }}
              className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {currentGroup.sectors.map((sector) => (
                <SectorCard
                  key={`${activeTab}-${sector.title}`}
                  sector={sector}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ==================================
            PREMIUM BOOKING CTA
        ================================== */}

        <motion.div
          initial={
            reduceMotion ? false : { opacity: 0, y: 18 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.85,
            ease: EASE,
          }}
          className="relative mt-11 overflow-hidden rounded-xl border border-[#111111]/10 bg-[#111111] px-6 py-7 text-white sm:px-8 lg:px-10"
        >
          {/* Original fine background structure */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />

          <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-[720px]">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#1C987A]/50"
                    animate={
                      reduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.8, 1],
                            opacity: [0.8, 0, 0.8],
                          }
                    }
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                    }}
                  />

                  <span className="relative h-2 w-2 rounded-full bg-[#1C987A]" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#C96B5E]">
                  Exhibitor Opportunities
                </span>
              </div>

              <h3 className="text-[20px] font-extrabold leading-[1.25] tracking-[-0.03em] text-white sm:text-[23px]">
                Showcase Your Business at Nepal Buildcon 2027
              </h3>

              <p className="mt-2 text-[13px] leading-[1.7] text-white/65">
                Connect with builders, contractors, architects,
                developers and industry professionals at the
                12th Nepal Buildcon International Expo, taking
                place from 25–28 February 2027 in Kathmandu.
              </p>
            </div>

            <Link
              href={event.cta.bookStand}
              className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-4 rounded-md border border-[#982E21] bg-[#982E21] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#7F241A]"
            >
              Reserve Your Space

              <span
                aria-hidden="true"
                className="text-[17px] font-normal transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </div>

          {/* Original bottom edge accent */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[3px] w-36 bg-[#982E21]"
          />

          <div
            aria-hidden="true"
            className="absolute bottom-0 left-36 h-[3px] w-12 bg-[#1C987A]"
          />
        </motion.div>
      </Container>
    </section>
  );
}
