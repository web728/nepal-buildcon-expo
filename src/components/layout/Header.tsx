"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { mainNav } from "@/config/navigation";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { MobileMenu } from "./MobileMenu";
import { clsx } from "@/lib/utils/clsx";

const RED = "#982E21";
const TEAL = "#1C987A";

function ArrowUpRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className={clsx("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}>
      <path d="m5 7 5 5 5-5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 10h18" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-5 w-6">
      <span className={clsx("absolute left-0 top-[3px] h-[2px] w-6 rounded-full bg-current transition-all duration-300", open && "top-[9px] rotate-45")} />
      <span className={clsx("absolute left-0 top-[9px] h-[2px] w-6 rounded-full bg-current transition-all duration-200", open && "scale-x-0 opacity-0")} />
      <span className={clsx("absolute left-0 top-[15px] h-[2px] w-6 rounded-full bg-current transition-all duration-300", open && "top-[9px] -rotate-45")} />
    </span>
  );
}

function isPdfLink(href: string): boolean {
  return /\.pdf(?:[?#]|$)/i.test(href);
}

function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname || isPdfLink(href)) return false;
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const previousPathname = useRef(pathname);

  // Fixed-height header; only shadow / blur changes after scrolling.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 16);
        frame = 0;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Close menus when the route changes.
  useEffect(() => {
    if (pathname !== previousPathname.current) {
      previousPathname.current = pathname;
      setMobileOpen(false);
      setOpenDropdown(null);
    }
  }, [pathname]);

  // Keep the page stationary while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = oldOverflow; };
  }, [mobileOpen]);

  const closeMenus = useCallback(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenus();
    };
    const onOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", onEscape);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.removeEventListener("mousedown", onOutside);
    };
  }, [closeMenus]);

  return (
    <header className={clsx(
      "fixed inset-x-0 top-0 z-[100] w-full bg-white transition-shadow duration-300",
      isScrolled ? "shadow-[0_10px_35px_rgba(30,25,30,0.10)]" : "shadow-none"
    )}>
      {/* Event information strip */}
      <div className="flex h-[30px] items-center border-b border-white/15 bg-[#982E21] text-white">
        <Container className="flex w-full items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3 text-[10px] font-medium sm:gap-4 sm:text-[11px]">
            <span className="inline-flex shrink-0 items-center gap-2">
              <CalendarIcon />
              <span>{event.dates.display}</span>
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/40 sm:block" />
            <span className="hidden min-w-0 items-center gap-2 sm:inline-flex">
              <LocationIcon />
              <span className="truncate">{event.venue.fullLocation}</span>
            </span>
          </div>
          <span className="hidden shrink-0 items-center gap-2 lg:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#83D8C4]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.13em]">
              {event.editionLabel}
            </span>
          </span>
        </Container>
      </div>

      {/* Main white navigation */}
      <div className={clsx(
        "relative h-16 border-b transition-[background-color,border-color] duration-300 sm:h-[82px]",
        isScrolled ? "border-[#E9E3E2] bg-white/95 backdrop-blur-xl" : "border-[#EEE8E7] bg-white"
      )}>
        <Container className="relative flex h-full w-full items-center justify-between gap-3">
          <Link href="/" aria-label={`${event.name} homepage`}
            className="relative z-10 flex shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]">
            <Image
              src="/logos/nepal-buildcon-logo.png"
              alt={event.name}
              width={580}
              height={220}
              priority
              sizes="(min-width:1280px) 185px, (min-width:640px) 160px, 135px"
              className="h-auto w-[135px] object-contain object-left transition-transform duration-300 hover:scale-[1.025] motion-reduce:transform-none sm:w-[160px] lg:w-[145px] xl:w-[185px]"
            />
          </Link>

          <nav ref={navRef} aria-label="Primary navigation" className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <ul className="flex min-w-0 items-center justify-center gap-0 xl:gap-1">
              {mainNav.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isActive = isActivePath(pathname, item.href) || Boolean(
                  item.children?.some((child) => isActivePath(pathname, child.href))
                );
                const isOpen = openDropdown === item.label;
                const menuId = `nav-${item.href.replace(/[^a-z0-9]/gi, "-")}`;
                return (
                  <li key={item.href} className="group relative shrink-0"
                    onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                    onMouseLeave={() => hasChildren && setOpenDropdown(null)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenDropdown(null);
                    }}>
                    <div className="flex items-center">
                      <Link href={item.href} onClick={() => setOpenDropdown(null)}
                        aria-current={isActive ? "page" : undefined}
                        className={clsx(
                          "relative inline-flex h-11 items-center whitespace-nowrap px-1.5 py-2 text-[11px] font-semibold tracking-[0.005em] transition-colors duration-300 xl:px-2.5 xl:text-[12px]",
                          "focus-visible:outline-2 focus-visible:outline-[#982E21]",
                          isActive ? "text-[#982E21]" : "text-[#24242A] hover:text-[#982E21]"
                        )}>
                        {item.label}
                        <span aria-hidden="true" className={clsx(
                          "absolute bottom-[4px] left-1.5 right-1.5 h-[2px] origin-center rounded-full bg-[#982E21] transition-transform duration-300 xl:left-2.5 xl:right-2.5",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        )} />
                      </Link>
                      {hasChildren && (
                        <button type="button" aria-label={`Toggle ${item.label} submenu`}
                          aria-expanded={isOpen} aria-controls={menuId} aria-haspopup="true"
                          onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                          className="mr-0.5 flex h-9 w-4 items-center justify-center text-[#6B6770] transition-colors hover:text-[#982E21] focus-visible:outline-2 focus-visible:outline-[#982E21]">
                          <ChevronIcon open={isOpen} />
                        </button>
                      )}
                    </div>
                    {hasChildren && (
                      <div id={menuId} aria-hidden={!isOpen}
                        className={clsx(
                          "absolute left-1/2 top-full z-50 w-[290px] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300",
                          isOpen ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-2 opacity-0"
                        )}>
                        <div className="overflow-hidden rounded-xl border border-[#EAE4E3] bg-white p-2 shadow-[0_22px_60px_rgba(42,26,28,0.14)]">
                          <div className="px-3 pb-3 pt-2">
                            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1C987A]">Explore</p>
                            <p className="mt-1 font-heading text-sm font-semibold text-[#201F27]">{item.label}</p>
                          </div>
                          <div className="mx-3 h-px bg-[#EFE8E7]" />
                          <div className="py-1">
                            {item.children?.map((child) => {
                              const childActive = isActivePath(pathname, child.href);
                              const externalPdf = isPdfLink(child.href);
                              return (
                                <Link key={child.href} href={child.href}
                                  target={externalPdf ? "_blank" : undefined}
                                  rel={externalPdf ? "noopener noreferrer" : undefined}
                                  tabIndex={isOpen ? 0 : -1}
                                  aria-current={childActive ? "page" : undefined}
                                  onClick={() => setOpenDropdown(null)}
                                  className={clsx(
                                    "group/child flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#982E21]",
                                    childActive ? "bg-[#FCF1EF] text-[#982E21]" : "text-[#24242A] hover:bg-[#FCF7F6] hover:text-[#982E21]"
                                  )}>
                                  <span className="min-w-0 flex-1">
                                    <span className="block text-[12px] font-semibold leading-5">{child.label}</span>
                                    {child.description && (
                                      <span className="mt-0.5 block text-[11px] leading-[1.55] text-[#74717A]">{child.description}</span>
                                    )}
                                  </span>
                                  <span className={clsx(
                                    "shrink-0 text-[#1C987A] transition-[opacity,transform] duration-200 group-hover/child:translate-x-0.5",
                                    childActive ? "opacity-100" : "opacity-0 group-hover/child:opacity-100"
                                  )}>
                                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link href={event.cta.bookStand}
              className="group inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#982E21] px-3 py-2.5 text-[10px] font-bold text-white shadow-[0_5px_16px_rgba(152,46,33,0.16)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#7D261C] hover:shadow-[0_12px_26px_rgba(152,46,33,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#982E21] motion-reduce:transform-none xl:px-4 xl:text-[11px]">
              Book a Stand
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"><ArrowUpRightIcon /></span>
            </Link>
            <Link href={event.cta.registerVisit}
              className="group inline-flex min-h-10 items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-[#E6DDDC] bg-white px-3 py-2.5 text-[10px] font-bold text-[#201F27] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-[#1C987A] hover:text-[#1C987A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#982E21] motion-reduce:transform-none xl:px-4 xl:text-[11px]">
              Register to Visit
              <span className="transition-transform duration-300 group-hover:translate-x-0.5"><ArrowRightIcon /></span>
            </Link>
          </div>

          <button type="button" aria-expanded={mobileOpen} aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E6DDDC] bg-white text-[#201F27] transition-colors duration-300 hover:border-[#982E21]/40 hover:bg-[#FCF7F6] hover:text-[#982E21] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#982E21] lg:hidden">
            <MenuIcon open={mobileOpen} />
          </button>
        </Container>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
