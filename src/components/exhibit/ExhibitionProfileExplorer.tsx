"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { exhibitionSectors } from "@/data/exhibitionProfile";
import { event } from "@/config/event";
import { sectorIconMap } from "@/components/icons/SectorIcons";

export function ExhibitionProfileExplorer() {
  const [query, setQuery] = useState("");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const reduced = useReducedMotion() === true;

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    return exhibitionSectors
      .filter((sector) => !activeSlug || sector.slug === activeSlug)
      .map((sector) => {
        if (!term || sector.name.toLowerCase().includes(term)) return sector;
        const matching = sector.subcategories.filter((item) =>
          item.toLowerCase().includes(term)
        );
        return matching.length ? { ...sector, subcategories: matching } : null;
      })
      .filter((sector): sector is (typeof exhibitionSectors)[number] => sector !== null);
  }, [query, activeSlug]);

  const hasFilter = Boolean(query.trim() || activeSlug);

  return (
    <div className="text-[#111111]">
      <div className="flex flex-col gap-5 border-b border-[#E6E6E6] pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[750px]">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#982E21]" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#982E21]">
              Exhibition Profile
            </span>
          </div>
          <h2 className="mt-4 font-heading text-[clamp(1.9rem,3.3vw,3.3rem)] font-extrabold leading-[1.14] tracking-[-0.045em]">
            Explore <span className="text-[#982E21]">Exhibitor Sectors.</span>
          </h2>
          <p className="mt-4 max-w-[670px] text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
            Browse building materials, machinery, systems and technologies covered by
            the exhibition. Categories are grouped for easier navigation.
          </p>
        </div>
        <Link
          href={event.cta.bookStand}
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-[#982E21] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#7B241A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]"
        >
          Enquire About a Stand <span className="ml-2" aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mt-7 rounded-xl border border-[#E6E6E6] bg-[#FAFAFA] p-4 sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label htmlFor="exhibition-sector-search" className="sr-only">
            Search exhibition sectors and products
          </label>
          <div className="relative flex-1">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#858585]">
              <circle cx="11" cy="11" r="7"/><path d="m16 16 5 5" />
            </svg>
            <input
              id="exhibition-sector-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, materials or machinery"
              className="min-h-11 w-full rounded-lg border border-[#DDDDDD] bg-white py-3 pl-11 pr-4 text-[13px] text-[#111111] outline-none placeholder:text-[#858585] focus:border-[#982E21] focus:ring-2 focus:ring-[#982E21]/10"
            />
          </div>
          <div className="flex items-center justify-between gap-4 md:justify-end">
           
            {hasFilter && (
              <button type="button" onClick={() => {setQuery(""); setActiveSlug(null);}} className="text-[12px] font-bold text-[#982E21] underline underline-offset-4">
                Clear filters
              </button>
            )}
          </div>
        </div>
        <div aria-label="Filter by sector" className="mt-4 flex gap-2 overflow-x-auto border-t border-[#E6E6E6] pt-4 pb-1">
          <button type="button" aria-pressed={activeSlug === null} onClick={() => setActiveSlug(null)} className={`shrink-0 rounded-md px-3.5 py-2 text-[12px] font-semibold transition-colors ${activeSlug === null ? "bg-[#111111] text-white" : "border border-[#E0E0E0] bg-white text-[#505050] hover:border-[#982E21]"}`}>
            All sectors
          </button>
          {exhibitionSectors.map((sector) => (
            <button key={sector.slug} type="button" aria-pressed={activeSlug === sector.slug} onClick={() => setActiveSlug(activeSlug === sector.slug ? null : sector.slug)} className={`shrink-0 rounded-md px-3.5 py-2 text-[12px] font-medium transition-colors ${activeSlug === sector.slug ? "bg-[#982E21] text-white" : "border border-[#E0E0E0] bg-white text-[#505050] hover:border-[#982E21] hover:text-[#982E21]"}`}>
              {sector.name}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-7 rounded-xl border border-dashed border-[#DADADA] px-6 py-14 text-center">
          <h3 className="font-heading text-lg font-bold">No matching sectors found</h3>
          <p className="mt-2 text-[13px] text-[#60636B]">Try another product name or clear your filters.</p>
          <button type="button" onClick={() => {setQuery(""); setActiveSlug(null);}} className="mt-5 text-[13px] font-bold text-[#982E21] underline underline-offset-4">Show all sectors</button>
        </div>
      ) : (
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((sector, index) => {
            const Icon = sectorIconMap[sector.slug];
            return (
              <motion.article
                key={sector.slug}
                id={sector.slug}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.035 }}
                className="group min-w-0 rounded-xl border border-[#E8E8E8] bg-white p-5 transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/35 hover:shadow-[0_12px_28px_rgba(17,17,17,0.05)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-4 border-b border-[#ECECEC] pb-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#982E21]/[0.07] text-[#982E21] transition-colors group-hover:bg-[#982E21] group-hover:text-white">
                    {Icon ? <Icon className="h-5 w-5" /> : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden="true"><path d="M3 21h18M5 21V6l7-3 7 3v15M9 9v3m6-3v3M9 15v3m6-3v3" /></svg>
                    )}
                  </span>
                  
                </div>
                <h3 className="mt-4 font-heading text-[17px] font-bold leading-[1.4] tracking-[-0.02em]">
                  {sector.name}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {sector.subcategories.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.65] text-[#60636B]">
                      <span aria-hidden="true" className="mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#982E21]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      )}
  
    </div>
  );
}
