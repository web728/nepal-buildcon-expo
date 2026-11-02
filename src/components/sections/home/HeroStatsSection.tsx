

"use client";



import { useEffect, useRef } from "react";



import {

  motion,

  useInView,

  useReducedMotion,

  type Variants,

} from "framer-motion";



import { Container } from "@/components/ui/Container";



// ======================================================

// STATS DATA

// ======================================================



type StatData = {

  numericValue: number;

  suffix?: string;

  label: string;

};



const stats: StatData[] = [
  {
    numericValue: 25000,
    suffix: "+",
    label: "Visitors",
  },
  {
    numericValue: 300,
    suffix: "+",
    label: "Participating Companies",
  },
  {
    numericValue: 100000,
    suffix: "+",
    label: "Sq Ft Gross Area",
  },
  {
    numericValue: 1000,
    suffix: "+",
    label: "Products & Services on Display",
  },
];



// ======================================================

// BRAND SETTINGS

// ======================================================



const RED = "#982E21";

const TEAL = "#1C987A";



const EASE = [0.16, 1, 0.3, 1] as const;



// ======================================================

// SMOOTH ANIMATED COUNTER

// ======================================================



function AnimatedCounter({

  numericValue,

  suffix = "",

  delay = 0,

  start,

}: {

  numericValue: number;

  suffix?: string;

  delay?: number;

  start: boolean;

}) {

  const numberRef = useRef<HTMLSpanElement>(null);

  const reduceMotion = useReducedMotion();



  useEffect(() => {

    const element = numberRef.current;



    if (!element) return;



    if (!start) {

      element.textContent = "0";

      return;

    }



    const target = Number(numericValue);



    if (!Number.isFinite(target)) return;



    // Respect reduced-motion preferences.

    if (reduceMotion) {

      element.textContent = target.toLocaleString("en-US");

      return;

    }



    let frameId = 0;

    let delayId: ReturnType<typeof setTimeout> | undefined;

    let startTime: number | null = null;



    const duration = 2400;



    // Start from zero when the animation begins.

    element.textContent = "0";



    const updateCounter = (timestamp: number) => {

      if (startTime === null) {

        startTime = timestamp;

      }



      const elapsed = timestamp - startTime;



      const progress = Math.min(elapsed / duration, 1);



      // Smooth ease-out counting.

      const easedProgress = 1 - Math.pow(1 - progress, 3);



      const currentValue = Math.floor(

        easedProgress * target

      );



      element.textContent = currentValue.toLocaleString("en-US");



      if (progress < 1) {

        frameId = requestAnimationFrame(updateCounter);

      } else {

        element.textContent = target.toLocaleString("en-US");

      }

    };



    delayId = setTimeout(() => {

      frameId = requestAnimationFrame(updateCounter);

    }, delay * 1000);



    return () => {

      if (delayId !== undefined) {

        clearTimeout(delayId);

      }



      cancelAnimationFrame(frameId);

    };

  }, [start, numericValue, delay, reduceMotion]);



  return (

    <span

      className="inline-flex items-baseline tabular-nums"

      aria-label={`${numericValue.toLocaleString("en-US")}${suffix}`}

    >

      <span ref={numberRef} aria-hidden="true">

        {start && reduceMotion

          ? numericValue.toLocaleString("en-US")

          : "0"}

      </span>



      {suffix && (

        <span aria-hidden="true">{suffix}</span>

      )}

    </span>

  );

}



// ======================================================

// ANIMATED BACKGROUND

// ======================================================



function StatsBackground() {

  const reduceMotion = useReducedMotion();



  return (

    <div

      aria-hidden="true"

      className="pointer-events-none absolute inset-0 overflow-hidden"

    >

      {/* Subtle architectural grid */}



      <div

        className="absolute inset-0 opacity-[0.025]"

        style={{

          backgroundImage:

            "linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)",

          backgroundSize: "92px 92px",

        }}

      />



      {/* Animated SVG wave lines */}



      <svg

        viewBox="0 0 1440 300"

        preserveAspectRatio="xMidYMid slice"

        fill="none"

        className="absolute inset-0 h-full w-full"

      >

        {Array.from({ length: 4 }).map((_, index) => {

          const pathA = `M-100,${140 + index * 18} C270,${

            90 + index * 8

          } 580,${235 - index * 7} 900,${

            145 + index * 7

          } C1180,${95 + index * 8} 1410,${

            200 - index * 6

          } 1550,${145 + index * 6}`;



          const pathB = `M-100,${155 + index * 18} C290,${

            120 + index * 8

          } 610,${215 - index * 6} 930,${

            160 + index * 7

          } C1190,${120 + index * 8} 1410,${

            190 - index * 6

          } 1550,${160 + index * 6}`;



          return (

            <motion.path

              key={index}

              d={pathA}

              stroke={index % 2 === 0 ? RED : TEAL}

              strokeWidth="0.8"

              strokeOpacity="0.1"

              animate={

                reduceMotion

                  ? undefined

                  : {

                      d: [pathA, pathB, pathA],

                    }

              }

              transition={{

                duration: 18 + index * 2,

                repeat: Infinity,

                ease: "easeInOut",

              }}

            />

          );

        })}

      </svg>



      {/* Top-right decorative image */}



      <div

        className="absolute right-0 top-0 h-[85px] w-[85px] bg-contain bg-right-top bg-no-repeat opacity-80 sm:h-[115px] sm:w-[115px] lg:h-[155px] lg:w-[155px]"

        style={{

          backgroundImage: 'url("/images/element/kb-rem.png")',

        }}

      />



      {/* Bottom-left decorative image */}



      <div

        className="absolute bottom-0 left-0 h-[85px] w-[85px] bg-contain bg-left-bottom bg-no-repeat opacity-80 sm:h-[115px] sm:w-[115px] lg:h-[155px] lg:w-[155px]"

        style={{

          backgroundImage: 'url("/images/element/bottom-left.png")',

        }}

      />

    </div>

  );

}



// ======================================================

// MOTION VARIANTS

// ======================================================



const gridVariants: Variants = {

  hidden: {},



  visible: {

    transition: {

      staggerChildren: 0.1,

    },

  },

};



const statVariants: Variants = {

  hidden: {

    opacity: 0,

    y: 12,

  },



  visible: {

    opacity: 1,

    y: 0,



    transition: {

      duration: 0.6,

      ease: EASE,

    },

  },

};



// ======================================================

// SINGLE STAT ITEM

// ======================================================



function StatItem({

  stat,

  index,

  start,

}: {

  stat: StatData;

  index: number;

  start: boolean;

}) {

  return (

    <motion.div

      variants={statVariants}

      className="relative flex min-w-0 flex-col items-center justify-center px-3 py-5 text-center sm:px-5 sm:py-6"

    >

      {/* Vertical divider */}



      {index > 0 && (

        <span

          aria-hidden="true"

          className="absolute left-0 top-1/2 hidden h-14 w-px -translate-y-1/2 bg-white/15 lg:block"

        />

      )}



      {/* Animated number */}



      <div className="text-[clamp(2.1rem,3.2vw,3.2rem)] font-black leading-none tracking-[-0.045em] text-white">

        <AnimatedCounter

          numericValue={stat.numericValue}

          suffix={stat.suffix}

          delay={index * 0.18}

          start={start}

        />

      </div>



      {/* Brand underline */}



      <span className="mt-3 h-[2px] w-7 bg-[#982E21]" />



      {/* Stat label */}



      <p className="mt-3 max-w-[200px] text-[10px] font-semibold uppercase leading-[1.6] tracking-[0.1em] text-white/65 sm:text-[11px]">

        {stat.label}

      </p>

    </motion.div>

  );

}



// ======================================================

// MAIN EXHIBITION STATS SECTION

// ======================================================



export function HeroStatsSection() {

  const sectionRef = useRef<HTMLElement>(null);



  // Start animations when the section enters the viewport.



  const isInView = useInView(sectionRef, {

    once: true,

    amount: 0.15,

  });



  const reduceMotion = useReducedMotion();



  return (

    <section

      ref={sectionRef}

      aria-label="12th Nepal Buildcon International Expo 2027 at a glance"

      className="relative isolate overflow-hidden border-y border-white/10 bg-[#0B0C11] text-white"

    >

      {/* Background */}



      <StatsBackground />



       



      <Container className="relative z-10">

        {/* Section heading */}



        <motion.div

          initial={

            reduceMotion

              ? false

              : {

                  opacity: 0,

                  y: 10,

                }

          }

          whileInView={{

            opacity: 1,

            y: 0,

          }}

          viewport={{

            once: true,

            amount: 0.4,

          }}

          transition={{

            duration: 0.6,

            ease: EASE,

          }}

          className="flex flex-col items-center gap-1.5 pt-6 text-center sm:pt-7"

        >

          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E6A7A0]">

            Exhibition Overview

          </span>


 

        </motion.div>



        {/* Stats grid */}



        <motion.div

          variants={gridVariants}

          initial={reduceMotion ? false : "hidden"}

          animate={

            reduceMotion

              ? "visible"

              : isInView

                ? "visible"

                : "hidden"

          }

          className="mt-2 grid grid-cols-2 lg:grid-cols-4"

        >

          {stats.map((stat, index) => (

            <StatItem

              key={stat.label}

              stat={stat}

              index={index}

              start={isInView}

            />

          ))}

        </motion.div>

      </Container>



      {/* Bottom brand line */}



      <div

        aria-hidden="true"

        className="absolute inset-x-0 bottom-0 z-10 flex h-[2px]"

      >

        <span className="w-[80%] bg-[#982E21]" />

        <span className="w-[15%] bg-[#1C987A]" />

        <span className="flex-1 bg-white" />

      </div>

    </section>

  );

}
