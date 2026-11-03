"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const RED = "#982E21";
const TEAL = "#1C987A";
const HERO_IMAGE = "/hero/Nepal_Buildcon_International_Expo.png";
const EASE = [0.16, 1, 0.3, 1] as const;

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.16, staggerChildren: 0.115 },
  },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.82, ease: EASE },
  },
};

function AnimatedArchitecturalBackground({ reducedMotion }: { reducedMotion: boolean | null }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#111 1px,transparent 1px),linear-gradient(90deg,#111 1px,transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice" fill="none">
        <motion.circle
          cx="40" cy="640" r="210" stroke={RED} strokeWidth="1.1"
          strokeOpacity="0.15" strokeDasharray="6 12"
          animate={reducedMotion ? undefined : { strokeDashoffset: [0, -216] }}
          transition={{ duration: 36, ease: "linear", repeat: Infinity }}
        />
        <motion.circle
          cx="40" cy="640" r="315" stroke={TEAL} strokeWidth="1"
          strokeOpacity="0.12" style={{ transformOrigin: "40px 640px" }}
          animate={reducedMotion ? undefined : { scale: [1, 1.035, 1] }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.circle
          cx="1390" cy="60" r="260" stroke={RED} strokeWidth="1"
          strokeOpacity="0.12" style={{ transformOrigin: "1390px 60px" }}
          animate={reducedMotion ? undefined : { scale: [1, 0.975, 1] }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
        />
        {Array.from({ length: 5 }, (_, i) => {
          const pathA = `M-100,${420 + i * 24} C250,${310 + i * 12} 600,${560 - i * 9} 940,${430 + i * 8} C1200,${320 + i * 10} 1420,${490 - i * 8} 1550,${420 + i * 8}`;
          const pathB = `M-100,${440 + i * 24} C270,${370 + i * 12} 580,${510 - i * 8} 950,${460 + i * 7} C1200,${380 + i * 9} 1420,${460 - i * 7} 1550,${450 + i * 8}`;
          return (
            <motion.path
              key={i} d={pathA} stroke={i % 2 === 0 ? RED : TEAL}
              strokeWidth="0.9" strokeOpacity="0.11"
              animate={reducedMotion ? undefined : { d: [pathA, pathB, pathA] }}
              transition={{ duration: 22 + i * 3, ease: "easeInOut", repeat: Infinity }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[780px] w-full items-start overflow-hidden bg-white text-[#111111] selection:bg-[#982E21] selection:text-white sm:min-h-[750px] lg:min-h-[min(760px,100svh)] lg:items-center"
    >
      {/* One full-section image. On mobile it stays visible below the content. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-[58%_center] sm:object-[60%_center] lg:object-center"
        />
      </div>

      {/* Mobile: vertical fade leaves the lower photo visible.
          Desktop: horizontal fade keeps original dark text readable. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.98)_32%,rgba(255,255,255,0.85)_52%,rgba(255,255,255,0.16)_77%,rgba(255,255,255,0.02)_100%)] sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.94)_42%,rgba(255,255,255,0.32)_80%,rgba(255,255,255,0.06)_100%)] lg:bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.95)_28%,rgba(255,255,255,0.76)_47%,rgba(255,255,255,0.22)_72%,rgba(255,255,255,0.03)_100%)]"
      />

      <AnimatedArchitecturalBackground reducedMotion={reducedMotion} />

      <Container className="relative z-10 w-full pb-48 pt-[calc(138px+env(safe-area-inset-top))] sm:pb-16 sm:pt-[calc(152px+env(safe-area-inset-top))] lg:pb-24 lg:pt-40">
        <motion.div
          variants={contentVariants}
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          className="flex w-full max-w-[620px] flex-col items-start"
        >
          <motion.div variants={riseVariants} className="mb-4 flex items-center gap-2.5">
            <span aria-hidden="true" className="h-[2px] w-7 bg-[#982E21]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#982E21] sm:text-xs">
              {event.editionLabel}
            </span>
          </motion.div>

          <h1 id="hero-title" className="flex w-full flex-col items-start text-left">
            <motion.span
              variants={riseVariants}
              className="block max-w-full text-[clamp(2.55rem,5vw,4.35rem)] font-black leading-[1.035] tracking-[-0.055em] text-[#111111] [text-wrap:balance]"
            >
              {event.shortName}
            </motion.span>
            <motion.span
              variants={riseVariants}
              className="mt-2 block text-[clamp(1.55rem,2.6vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.035em] text-[#303030]"
            >
              International <span className="italic text-[#982E21]">Expo</span>
            </motion.span>
          </h1>

          <motion.div variants={riseVariants} className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5 sm:gap-x-5">
            <span className="text-[clamp(1.2rem,2vw,1.65rem)] font-extrabold leading-[1.25] tracking-[-0.035em] text-[#982E21]">
              25–28 February 2027
            </span>
            <span className="flex items-center gap-2.5">
              <span aria-hidden="true" className="h-7 w-[2px] shrink-0 bg-[#1C987A]" />
              <span className="text-[11px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#505050] sm:text-xs">
                Building &amp; Construction
              </span>
            </span>
          </motion.div>

          <motion.div variants={riseVariants} aria-hidden="true" className="mt-5 flex h-[3px] w-28 overflow-hidden">
            <span className="w-[74%] bg-[#982E21]" />
            <span className="w-[18%] bg-[#1C987A]" />
            <span className="flex-1 bg-[#111111]" />
          </motion.div>

          <motion.p
            variants={riseVariants}
            className="mt-5 max-w-[520px] text-[15px] font-medium leading-[1.75] tracking-[-0.012em] text-[#474747] sm:text-[16px] lg:text-[17px]"
          >
            Explore building materials, construction machinery and products for
            building projects at <strong className="font-bold text-[#222222]">{event.name}</strong>.
            Meet manufacturers, suppliers and professionals across Nepal&apos;s
            building and construction industry.
          </motion.p>

          <motion.div variants={riseVariants} className="mt-7 flex w-full flex-wrap items-center gap-3">
            <Button
              href={event.cta.bookStand}
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md border border-[#982E21] !bg-[#982E21] px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.075em] !text-white shadow-[0_7px_18px_rgba(152,46,33,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:!bg-[#7C241A] hover:shadow-[0_11px_25px_rgba(152,46,33,0.22)]"
            >
              Book a Stand
              <span aria-hidden="true" className="text-base transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </Button>
            <Button
              href={event.cta.registerVisit}
              variant="secondary"
              className="group inline-flex min-h-[46px] items-center justify-center gap-3 rounded-md border border-[#111111]/20 !bg-white px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.075em] !text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#111111] hover:!bg-[#111111] hover:!text-white"
            >
              Register to Visit
              <span aria-hidden="true" className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 flex h-[3px]">
        <span className="w-[82%]" style={{ backgroundColor: RED }} />
        <span className="w-[13%]" style={{ backgroundColor: TEAL }} />
        <span className="flex-1 bg-[#111111]" />
      </div>
    </section>
  );
}
