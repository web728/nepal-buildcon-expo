"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { PublicGalleryImage } from "@/lib/data/gallery";

type Props = { items: PublicGalleryImage[] };
const PAGE_SIZE = 12;

function dateKey(timestamp: number): string {
  // UTC produces consistent date groups on server and client.
  return new Date(timestamp).toISOString().slice(0, 10);
}

function readableDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function GalleryGrid({ items }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const shown = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
  const groups = useMemo(() => {
    const result: { date: string; photos: PublicGalleryImage[] }[] = [];
    for (const photo of shown) {
      const date = dateKey(photo.date);
      const last = result[result.length - 1];
      if (last?.date === date) last.photos.push(photo);
      else result.push({ date, photos: [photo] });
    }
    return result;
  }, [shown]);

  const active = activeIndex === null ? null : items[activeIndex] ?? null;

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") setActiveIndex(i => i === null ? null : (i + 1) % items.length);
      if (event.key === "ArrowLeft") setActiveIndex(i => i === null ? null : (i - 1 + items.length) % items.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, items.length]);

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-[#111111]/10 bg-[#FAFAFA] px-6 py-16 text-center text-sm text-[#666666]">
        No gallery photos found in public/images/gallery.
      </div>
    );
  }

  return (
    <>
      <div className="space-y-10 sm:space-y-12">
        {groups.map(group => (
          <section key={group.date} aria-label={`Photos from ${readableDate(group.date)}`}>
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="h-5 w-[3px] rounded-full bg-[#982E21]" />
              <h2 className="text-base font-bold tracking-[-0.02em] text-[#171717] sm:text-lg">
                {readableDate(group.date)}
              </h2>
              <div className="h-px flex-1 bg-[#111111]/10" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {group.photos.map(photo => {
                const index = items.indexOf(photo);
                return (
                  <button
                    key={photo._id}
                    type="button"
                    aria-label={`Open ${photo.title}`}
                    onClick={() => setActiveIndex(index)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-[#F2F2F2] text-left outline-none ring-offset-2 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(17,17,17,0.12)] focus-visible:ring-2 focus-visible:ring-[#982E21]"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      loading={index < 4 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                      quality={70}
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-3 pb-3 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {visibleCount < items.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount(count => Math.min(count + PAGE_SIZE, items.length))}
            className="rounded-lg border border-[#982E21] bg-[#982E21] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#792419] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]"
          >
            Load More Photos  
          </button>
        </div>
      )}

      {active && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery photo: ${active.title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-3 py-16 sm:px-12"
          onClick={() => setActiveIndex(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close gallery"
            onClick={() => setActiveIndex(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-xl text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={event => { event.stopPropagation(); setActiveIndex((activeIndex - 1 + items.length) % items.length); }}
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25 sm:left-5"
          >
            ‹
          </button>
          <div
            className="relative h-full w-full max-w-6xl"
            onClick={event => event.stopPropagation()}
          >
            <Image
              key={active._id}
              src={active.imageUrl}
              alt={active.title}
              fill
              sizes="100vw"
              quality={85}
              className="object-contain"
            />
            
          </div>
          <button
            type="button"
            aria-label="Next photo"
            onClick={event => { event.stopPropagation(); setActiveIndex((activeIndex + 1) % items.length); }}
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25 sm:right-5"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
