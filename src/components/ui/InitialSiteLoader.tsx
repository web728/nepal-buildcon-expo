"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { event } from "@/config/event";

const SESSION_KEY = "nepal_buildcon_intro_shown";
const INTRO_DURATION_MS = 1400;

/** A short, once-per-tab brand introduction. This is not a loading-progress indicator. */
export function InitialSiteLoader() {
  // Same markup on the server and the client's first render.
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let previouslySeen = false;
    try {
      previouslySeen = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      // The intro still works when storage is unavailable.
    }

    if (previouslySeen) {
      setVisible(false);
      return;
    }

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduceMotion) {
      setVisible(false);
      try { sessionStorage.setItem(SESSION_KEY, "true"); } catch { /* storage disabled */ }
      return;
    }

    setAnimate(true);
    const timer = window.setTimeout(() => {
      try { sessionStorage.setItem(SESSION_KEY, "true"); } catch { /* storage disabled */ }
      setVisible(false);
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="nepal-buildcon-intro"
          aria-hidden="true"
          initial={false}
          exit={{ opacity: 0, y: "-6%", transition: { duration: 0.48, ease: [0.4, 0, 0.2, 1] } }}
          className="pointer-events-none fixed inset-0 z-[99999] isolate flex items-center justify-center overflow-hidden bg-[#0B0C11] text-white"
        >
          {/* Refined architectural grid and subtle brand glow. */}
          <div className="absolute inset-0 opacity-[0.055]" style={{
            backgroundImage: "linear-gradient(to right, white 1px, transparent 1px),linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "54px 54px",
          }} />
          <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#982E21]/20 blur-[110px] sm:h-[480px] sm:w-[480px]" />
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[#982E21]" />

          <div className="relative mx-auto flex w-full max-w-[540px] flex-col items-center px-6 text-center">
            <div className="mb-7 flex h-[76px] w-[76px] items-center justify-center rounded-2xl border border-white/15 bg-white/[0.055] shadow-[0_16px_50px_rgba(0,0,0,0.2)]">
              <span className="font-heading text-[21px] font-extrabold tracking-[-0.07em] text-[#E6A7A0]">NB<span className="text-white">.</span></span>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-7 bg-[#982E21]" />
              <span className="font-heading text-[10px] font-bold uppercase tracking-[0.26em] text-[#E6A7A0]">12th Edition</span>
              <span className="h-px w-7 bg-[#982E21]" />
            </div>

            <p className="font-heading text-[clamp(1.75rem,5vw,2.8rem)] font-extrabold leading-[1.12] tracking-[-0.055em]">
              Nepal <span className="text-[#E6A7A0]">Buildcon</span>
            </p>
            <p className="mt-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-[13px]">
              International Expo 2027
            </p>
            <p className="mt-5 text-[12px] leading-relaxed text-white/55 sm:text-[13px]">
              {event.dates.display} <span className="mx-2 text-[#E6A7A0]">·</span> Bhrikuti Mandap, Kathmandu
            </p>

            <div className="mt-9 h-[2px] w-44 overflow-hidden rounded-full bg-white/10 sm:w-52">
              <motion.div
                className="h-full origin-left bg-[#E6A7A0]"
                initial={false}
                animate={{ scaleX: animate ? 1 : 0 }}
                transition={{ duration: INTRO_DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
                style={{ scaleX: 0 }}
              />
            </div>
          </div>

          <div className="absolute bottom-7 left-0 right-0 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
            Building · Construction · Infrastructure
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InitialSiteLoader;
