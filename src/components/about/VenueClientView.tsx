"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const RED = "#982E21";
const EASE = [0.22, 1, 0.36, 1] as const;

const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const REVEAL: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const VISIT_NOTES = [
  {
    title: "Find the venue",
    description:
      "Use the map to locate Bhrikuti Mandap in Kathmandu and choose a route from your starting point.",
    icon: "M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0ZM12 10h.01",
  },
  {
    title: "Plan your journey",
    description:
      "Allow time for Kathmandu traffic and check your route before travelling to the exhibition.",
    icon: "M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
  },
  {
    title: "Prepare for your visit",
    description:
      "Review visitor registration details before arriving. Entry arrangements and any updates will be shared through official event channels.",
    icon: "M8 3v4m8-4v4M4 10h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z",
  },
] as const;

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0">
      {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M5 12h14m-6-6 6 6-6 6" />}
    </svg>
  );
}

export function VenueClientView() {
  const reduced = useReducedMotion() === true;
  const mapLink = event.venue.mapLinkUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue.fullLocation)}`;
  const motionInitial = reduced ? false : "hidden";

  return (
    <div className="overflow-hidden bg-white text-[#111111]">
      <section aria-labelledby="venue-location-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={STAGGER} initial={motionInitial} whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="grid items-center gap-9 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
            <div className="min-w-0">
              <motion.div variants={REVEAL} className="mb-5 flex items-center gap-3">
                <span aria-hidden="true" className="h-[2px] w-8 bg-[#982E21]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#982E21]">Exhibition Venue</span>
              </motion.div>

              <motion.h2 id="venue-location-heading" variants={REVEAL} className="font-heading text-[clamp(2.1rem,3.8vw,3.8rem)] font-extrabold leading-[1.12] tracking-[-0.045em]">
                Bhrikuti Mandap
                <span className="mt-1 block text-[#982E21]">Kathmandu, Nepal</span>
              </motion.h2>

              <motion.p variants={REVEAL} className="mt-6 max-w-[560px] text-[14px] leading-[1.9] text-[#59616B] sm:text-[15px]">
                {event.venue.name} is the venue for {event.name}. Located in Kathmandu, it provides the setting for exhibitors and visitors to meet and explore products and solutions across the building and construction industries.
              </motion.p>

              <motion.div variants={REVEAL} className="mt-7 border-y border-[#E6E8EB] py-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#77808A]">Venue address</p>
                    <p className="mt-2 text-[14px] font-semibold leading-[1.6]">{event.venue.fullLocation}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#77808A]">Exhibition dates</p>
                    <p className="mt-2 text-[14px] font-semibold leading-[1.6]">{event.dates.display}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={REVEAL} className="mt-7 flex flex-wrap items-center gap-3">
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-md bg-[#982E21] px-5 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-[#7E261B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]">
                  Get Directions
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ArrowIcon diagonal /></span>
                </a>
                <Link href={event.cta.registerVisit} className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-md border border-[#DDE1E5] bg-white px-5 py-2.5 text-[12px] font-bold text-[#111111] transition-colors hover:border-[#982E21] hover:text-[#982E21]">
                  Register to Visit
                  <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowIcon /></span>
                </Link>
              </motion.div>
            </div>

            <motion.div variants={REVEAL} className="relative min-w-0 overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F4F5F6] p-2 shadow-[0_12px_38px_rgba(17,17,17,0.05)]">
              <div className="relative h-[340px] overflow-hidden rounded-lg bg-[#F0F1F2] sm:h-[430px] lg:h-[475px]">
                <iframe title={`Location map for ${event.venue.fullLocation}`} src={event.venue.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0" allowFullScreen />
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      <section aria-labelledby="venue-planning-heading" className="border-t border-[#E8EAED] bg-[#F8F9FA] py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={STAGGER} initial={motionInitial} whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
            <motion.div variants={REVEAL} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-[2px] w-8 bg-[#982E21]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#982E21]">Visitor Information</span>
            </motion.div>
            <motion.h2 id="venue-planning-heading" variants={REVEAL} className="mt-4 font-heading text-[clamp(1.85rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">Plan Your Visit to the Venue</motion.h2>
            <motion.p variants={REVEAL} className="mt-4 max-w-[680px] text-[14px] leading-[1.85] text-[#59616B]">A few practical details to help you prepare for your visit to Bhrikuti Mandap.</motion.p>
            <motion.div variants={STAGGER} className="mt-8 grid gap-4 md:grid-cols-3">
              {VISIT_NOTES.map((note) => (
                <motion.article key={note.title} variants={REVEAL} className="group rounded-xl border border-[#E4E7EA] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/35 hover:shadow-[0_12px_30px_rgba(17,17,17,0.04)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#982E21]/[0.07] text-[#982E21] transition-colors duration-300 group-hover:bg-[#982E21] group-hover:text-white">
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d={note.icon} /></svg>
                  </div>
                  <h3 className="mt-5 text-[16px] font-bold tracking-[-0.02em]">{note.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.8] text-[#626C76]">{note.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
