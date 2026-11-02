

"use client";

import Image from "next/image";

import { useEffect, useId, useState, type ReactNode } from "react";

import {

  motion,

  useReducedMotion,

  type Variants,

} from "framer-motion";

import { Container } from "@/components/ui/Container";

import { event } from "@/config/event";

interface PageHeroProps {

  title: string;

  highlightTitle?: string;

  intro?: string;

  badgeText?: string;

  image?: {

    src: string;

    alt: string;

  };

  children?: ReactNode;

}

const COLORS = {

  background: "#0B0C11",

  red: "#982E21",

  redLight: "#E6A7A0",

} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

const CONTENT: Variants = {

  hidden: {},

  visible: {

    transition: {

      staggerChildren: 0.12,

      delayChildren: 0.08,

    },

  },

};

const REVEAL: Variants = {

  hidden: {

    opacity: 0,

    y: 20,

    filter: "blur(5px)",

  },

  visible: {

    opacity: 1,

    y: 0,

    filter: "blur(0px)",

    transition: {

      duration: 0.8,

      ease: EASE,

    },

  },

};

const TITLE: Variants = {

  hidden: {},

  visible: {

    transition: {

      staggerChildren: 0.065,

      delayChildren: 0.08,

    },

  },

};

const WORD: Variants = {

  hidden: {

    opacity: 0,

    y: "110%",

  },

  visible: {

    opacity: 1,

    y: "0%",

    transition: {

      duration: 0.85,

      ease: EASE,

    },

  },

};

function AnimatedWords({

  text,

  reduced,

}: {

  text: string;

  reduced: boolean;

}) {

  if (reduced) return <>{text}</>;

  const words = text.trim().split(/\s+/).filter(Boolean);

  return (

    <>

      {words.map((word, index) => (

        <span

          key={`${word}-${index}`}

          className="inline-block overflow-hidden align-bottom"

        >

          <motion.span

            variants={WORD}

            className="inline-block"

          >

            {word}

          </motion.span>

          {index < words.length - 1 ? "\u00A0" : null}

        </span>

      ))}

    </>

  );

}

/* ==========================================

   BACKGROUND IMAGE

\========================================== */

function HeroBackground({

  image,

  reduced,

}: {

  image?: PageHeroProps["image"];

  reduced: boolean;

}) {

  const src =

    image?.src ?? "/images/home/nepal-buildcon-hero.jpg";

  const alt =

    image?.alt ?? "12th Nepal Buildcon International Expo 2027";

  return (

    <div

      aria-hidden="true"

      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"

    >

      {/* Consistent black foundation */}

      <div className="absolute inset-0 bg-[#0B0C11]" />

      {/* Right-side photo — no card */}

      <div className="absolute inset-y-0 right-0 w-full sm:w-[85%] lg:w-[68%] xl:w-[65%]">

        <motion.div

          initial={

            reduced

              ? false

              : {

                  opacity: 0,

                  scale: 1.065,

                }

          }

          animate={{

            opacity: 1,

            scale: 1,

          }}

          transition={{

            duration: 1.5,

            ease: EASE,

          }}

          className="absolute inset-0"

        >

          <Image

            src={src}

            alt={alt}

            fill

            priority

            sizes="(max-width: 640px) 100vw, (max-width: 1023px) 85vw, 68vw"

            className="object-cover object-center opacity-75 blur-[1.5px]"

          />

        </motion.div>

        {/* Frosted photo wash */}

        <div className="absolute inset-0 bg-[#0B0C11]/25 backdrop-blur-[2px]" />

        {/* Subtle red ambient fog */}

        <motion.div

          className="absolute -right-24 top-[5%] h-[340px] w-[420px] rounded-full bg-[#982E21]/20 blur-[110px]"

          animate={

            reduced

              ? undefined

              : {

                  x: [0, -35, 0],

                  y: [0, 22, 0],

                }

          }

          transition={{

            duration: 18,

            repeat: Infinity,

            ease: "easeInOut",

          }}

        />

        <motion.div

          className="absolute bottom-[-120px] left-[15%] h-[330px] w-[430px] rounded-full bg-[#982E21]/[0.09] blur-[120px]"

          animate={

            reduced

              ? undefined

              : {

                  x: [0, 35, 0],

                  y: [0, -20, 0],

                }

          }

          transition={{

            duration: 21,

            repeat: Infinity,

            ease: "easeInOut",

          }}

        />

      </div>

      {/* Seamless transition from black to photo */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C11] via-[#0B0C11]/90 to-[#0B0C11]/20 sm:via-[#0B0C11]/75 lg:via-[#0B0C11]/60" />

      {/* Top / bottom cinematic shading */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C11]/45 via-transparent to-[#0B0C11]/85" />

      {/* Extra protection for mobile text */}

      <div className="absolute inset-0 bg-[#0B0C11]/25 lg:hidden" />

    </div>

  );

}

/* ==========================================

   SUBTLE TECHNICAL DETAILS

\========================================== */

function TechnicalDetails({

  reduced,

}: {

  reduced: boolean;

}) {

  const id = useId().replace(/:/g, "");

  const gradientId = `nepal-page-wave-${id}`;

  return (

    <div

      aria-hidden="true"

      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"

    >

      <svg

        viewBox="0 0 1440 600"

        fill="none"

        preserveAspectRatio="xMidYMid slice"

        className="absolute inset-0 h-full w-full opacity-30"

      >

        <defs>

          <linearGradient

            id={gradientId}

            x1="0"

            y1="0"

            x2="1440"

            y2="0"

            gradientUnits="userSpaceOnUse"

          >

            <stop

              offset="0%"

              stopColor={COLORS.red}

              stopOpacity="0"

            />

            <stop

              offset="48%"

              stopColor={COLORS.redLight}

              stopOpacity=".5"

            />

            <stop

              offset="80%"

              stopColor={COLORS.red}

              stopOpacity=".45"

            />

            <stop

              offset="100%"

              stopColor={COLORS.red}

              stopOpacity="0"

            />

          </linearGradient>

        </defs>

        {/* Soft architectural curves */}

        {Array.from({ length: 6 }).map((_, i) => (

          <motion.path

            key={i}

            d={`M-100 ${390 + i * 20}

                C240 ${300 + i * 12},

                 480 ${510 + i * 10},

                 780 ${380 + i * 12}

                S1200 ${280 + i * 16},

                 1540 ${410 + i * 16}`}

            stroke={`url(#${gradientId})`}

            strokeWidth={i === 0 ? 1.35 : 0.8}

            strokeOpacity={0.22 + i * 0.05}

            initial={

              reduced

                ? false

                : {

                    opacity: 0,

                    pathLength: 0,

                  }

            }

            animate={{

              opacity: 1,

              pathLength: 1,

            }}

            transition={{

              duration: 1.6,

              delay: i * 0.08,

              ease: EASE,

            }}

          />

        ))}

        {/* Faint radar rings */}

        <g opacity=".2">

          <circle

            cx="1380"

            cy="360"

            r="145"

            stroke={COLORS.redLight}

            strokeDasharray="5 10"

          />

          <circle

            cx="1380"

            cy="360"

            r="240"

            stroke="#FFFFFF"

            strokeOpacity=".35"

          />

          <circle

            cx="1380"

            cy="360"

            r="330"

            stroke={COLORS.redLight}

            strokeDasharray="8 12"

          />

        </g>

      </svg>

    </div>

  );

}

/* ==========================================

   PAGE HERO

\========================================== */

export function PageHero({

  title,

  highlightTitle,

  intro,

  badgeText = event.name,

  image,

  children,

}: PageHeroProps) {

  // Keep the server render and first client render identical.
  // Match the user’s motion preference only after hydration.
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reduced = mounted && prefersReducedMotion === true;

  const fullTitle = highlightTitle

    ? `${title} ${highlightTitle}`

    : title;

  return (

    <section

      aria-label={fullTitle}

      className="relative isolate flex min-h-[360px] w-full items-center overflow-hidden bg-[#0B0C11] pb-14 pt-28 text-white selection:bg-[#982E21] selection:text-white sm:min-h-[400px] sm:pb-16 sm:pt-32 lg:min-h-[440px] lg:pb-20 lg:pt-36"

    >

      {/* BACKGROUND */}

      <HeroBackground

        image={image}

        reduced={reduced}

      />

      <TechnicalDetails reduced={reduced} />

      {/* MAIN CONTENT */}

      <Container className="relative z-10 w-full">

        <motion.div

          variants={CONTENT}

          initial={reduced ? false : "hidden"}

          animate="visible"

          className="max-w-[720px] text-left lg:max-w-[63%]"

        >

          {/* EVENT LABEL */}

          {badgeText && (

            <motion.div

              variants={REVEAL}

              className="mb-5 flex items-center gap-3"

            >

              <span

                aria-hidden="true"

                className="h-[2px] w-8 bg-[#982E21]"

              />

              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.14em] text-[#E6A7A0] sm:text-[11px]">

                {badgeText}

              </span>

            </motion.div>

          )}

          {/* HEADING */}

          <motion.h1

            variants={TITLE}

            aria-label={fullTitle}

            className="font-heading text-[clamp(2rem,4vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.045em] [text-wrap:balance]"

          >

            <span

              aria-hidden="true"

              className="block text-white"

            >

              <AnimatedWords

                text={title}

                reduced={reduced}

              />

            </span>

            {highlightTitle && (

              <span

                aria-hidden="true"

                className="mt-1 block text-[#E6A7A0]"

              >

                <AnimatedWords

                  text={highlightTitle}

                  reduced={reduced}

                />

              </span>

            )}

          </motion.h1>

          {/* SHORT ACCENT */}

          <motion.div

            variants={REVEAL}

            aria-hidden="true"

            className="mt-6 flex h-[2px] w-16 overflow-hidden"

          >

            <span className="h-full w-[75%] bg-[#982E21]" />

            <span className="h-full w-[25%] bg-[#E6A7A0]" />

          </motion.div>

          {/* INTRO */}

          {intro && (

            <motion.p

              variants={REVEAL}

              className="mt-5 max-w-[580px] text-[13px] leading-[1.85] text-[#D1D3D8] sm:text-[14px] lg:text-[15px]"

            >

              {intro}

            </motion.p>

          )}

          {/* OPTIONAL CTAs */}

          {children && (

            <motion.div

              variants={REVEAL}

              className="mt-7 flex flex-wrap items-center gap-3"

            >

              {children}

            </motion.div>

          )}

        </motion.div>

      </Container>

    </section>

  );

}
