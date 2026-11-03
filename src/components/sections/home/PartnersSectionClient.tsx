
"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Container } from "@/components/ui/Container";

const RED = "#982E21";
const TEAL = "#1C987A";
const EASE = [0.16, 1, 0.3, 1] as const;

/* =========================
   SMOOTH ANIMATIONS
========================= */

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.15,
    },
  },
};

const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: EASE,
    },
  },
};

/* =========================
   ANIMATED SVG BACKGROUND
========================= */

function PartnersBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(#111111 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#982E21]/[0.035] blur-[85px]" />

      <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#1C987A]/[0.035] blur-[90px]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 620"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.circle
          cx="1420"
          cy="35"
          r="220"
          stroke={RED}
          strokeWidth="0.9"
          strokeOpacity="0.10"
          strokeDasharray="7 15"
          style={{
            transformOrigin: "1420px 35px",
          }}
          animate={
            reduceMotion
              ? undefined
              : { rotate: [0, 14, 0] }
          }
          transition={{
            duration: 32,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        <circle
          cx="1420"
          cy="35"
          r="305"
          stroke={TEAL}
          strokeWidth="0.8"
          strokeOpacity="0.075"
        />

        <motion.circle
          cx="-40"
          cy="590"
          r="245"
          stroke={RED}
          strokeOpacity="0.085"
          strokeDasharray="5 13"
          animate={
            reduceMotion
              ? undefined
              : {
                  strokeDashoffset: [0, -180],
                }
          }
          transition={{
            duration: 32,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {Array.from({ length: 3 }, (_, i) => {
          const start =
            `M-100 ${350 + i * 28} ` +
            `C330 ${250 + i * 12}, ` +
            `640 ${450 - i * 10}, ` +
            `980 ${340 + i * 15} ` +
            `S1400 ${420 - i * 10}, ` +
            `1550 ${335 + i * 14}`;

          const end =
            `M-100 ${370 + i * 28} ` +
            `C340 ${290 + i * 12}, ` +
            `630 ${420 - i * 10}, ` +
            `970 ${365 + i * 15} ` +
            `S1400 ${390 - i * 10}, ` +
            `1550 ${355 + i * 14}`;

          return (
            <motion.path
              key={i}
              d={start}
              stroke={i % 2 ? TEAL : RED}
              strokeWidth="0.8"
              strokeOpacity="0.055"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      d: [start, end, start],
                    }
              }
              transition={{
                duration: 23 + i * 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* =========================
   PROPS
========================= */

type Props = {
  organiserLogos: ReactNode;
  partnerLogos?: ReactNode[];
};

/* =========================
   PREMIUM PARTNERS SECTION
========================= */

export function PartnersSectionClient({
  organiserLogos,
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="partners-heading"
      className="relative isolate overflow-hidden border-b border-[#111111]/[0.08] bg-white py-16 text-[#111111] selection:bg-[#982E21] selection:text-white sm:py-20 lg:py-24"
    >
      <PartnersBackground />

      <Container className="relative z-10">
        <motion.div
          variants={stagger}
          initial={
            reduceMotion ? false : "hidden"
          }
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
            margin: "0px 0px -45px 0px",
          }}
          className="mx-auto flex w-full max-w-[920px] flex-col items-center text-center"
        >
          {/* ORGANISERS HEADING */}

          <motion.h2
            id="partners-heading"
            variants={reveal}
            className="text-[clamp(1.65rem,3vw,2.5rem)] font-extrabold leading-[1.15] tracking-[-0.035em] text-[#171717]"
          >
            Our{" "}
            <span className="text-[#982E21]">
              Organisers
            </span>
          </motion.h2>

          {/* HEADING ACCENT */}

          <motion.div
            variants={reveal}
            aria-hidden="true"
            className="mt-4 flex h-[3px] w-20 overflow-hidden rounded-full"
          >
            <span className="w-[72%] bg-[#982E21]" />
            <span className="flex-1 bg-[#1C987A]" />
          </motion.div>

          {/* EXISTING ORGANISER LOGOS */}

          <motion.div
            variants={reveal}
            whileHover={
              reduceMotion
                ? undefined
                : { y: -4 }
            }
            transition={{
              duration: 0.35,
              ease: EASE,
            }}
            className="group mt-7 flex w-full max-w-[820px] items-center justify-center rounded-2xl border border-[#111111]/[0.07] bg-white/85 px-4 py-7 shadow-[0_8px_28px_rgba(17,17,17,0.035)] transition-[border-color,box-shadow,background-color] duration-300 hover:border-[#982E21]/20 hover:bg-white hover:shadow-[0_18px_44px_rgba(17,17,17,0.075)] sm:mt-9 sm:px-9 sm:py-9"
          >
            <div className="flex min-h-[80px] w-full max-w-[760px] items-center justify-center">
              {organiserLogos}
            </div>
          </motion.div>

          {/* MINIMAL DIVIDER */}

          <motion.div
            variants={reveal}
            aria-hidden="true"
            className="my-11 h-px w-full max-w-[480px] bg-gradient-to-r from-transparent via-[#111111]/15 to-transparent sm:my-14"
          />

          {/* SUPPORTED BY HEADING */}

          <motion.h3
            variants={reveal}
            className="text-[clamp(1.45rem,2.5vw,2rem)] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#171717]"
          >
            Supported{" "}
            <span className="text-[#982E21]">
              By
            </span>
          </motion.h3>

          {/* SUPPORTER ACCENT */}

          <motion.div
            variants={reveal}
            aria-hidden="true"
            className="mt-3 flex h-[3px] w-16 overflow-hidden rounded-full"
          >
            <span className="w-[72%] bg-[#982E21]" />
            <span className="flex-1 bg-[#1C987A]" />
          </motion.div>

          {/* LAMINAR LOGO WITH LINK */}

          <motion.a
            variants={reveal}
            href="https://laminartiles.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Laminar Tiles website (opens in a new tab)"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -5,
                    scale: 1.025,
                  }
            }
            whileTap={
              reduceMotion
                ? undefined
                : { scale: 0.985 }
            }
            transition={{
              duration: 0.32,
              ease: EASE,
            }}
            className="group relative mt-6 flex min-h-[126px] w-full max-w-[340px] items-center justify-center rounded-2xl border border-[#111111]/[0.07] bg-white/90 px-6 py-5 shadow-[0_8px_28px_rgba(17,17,17,0.035)] outline-none transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/25 hover:shadow-[0_20px_44px_rgba(17,17,17,0.09)] focus-visible:ring-2 focus-visible:ring-[#982E21] focus-visible:ring-offset-4 sm:min-h-[148px] sm:max-w-[390px]"
          >
            <div className="relative h-[86px] w-full max-w-[280px] sm:h-[102px] sm:max-w-[310px]">
              <Image
                src="/logos/laminar.png"
                alt="Laminar Tiles"
                fill
                sizes="(max-width: 540px) 210px, 280px"
                className="object-contain"
              />
            </div>

            {/* HOVER ARROW */}

            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 text-[#982E21]/45 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              ↗
            </span>
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}
