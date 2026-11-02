import Image from "next/image";
import Link from "next/link";

import { event } from "@/config/event";
import { footerNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";

const NAV_GROUPS = [
  { title: "Event", links: footerNav.event },
  { title: "Exhibit", links: footerNav.exhibit },
  { title: "Visit", links: footerNav.visit },
  { title: "Information", links: footerNav.information },
  { title: "Legal", links: footerNav.legal },
] as const;

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: event.social.linkedin,
    path: "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-9 14H7v-7h3v7ZM8.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18 17h-3v-3.7c0-1.4-1.7-1.5-1.7 0-.1.5 0 3.7 0 3.7h-3v-7h3v1c1.1-1.8 4.7-1.9 4.7 1.8V17Z",
  },
  {
    label: "Facebook",
    href: event.social.facebook,
    path: "M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7A10 10 0 0 0 22 12.06c0-5.53-4.5-10.02-10-10.02Z",
  },
  {
    label: "Instagram",
    href: event.social.instagram,
    path: "M12 2.16c3.2 0 3.58.02 4.85.07 3.25.15 4.77 1.7 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.22-1.67 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.22 1.66-4.77 4.92-4.92 1.27-.05 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07 2.69.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.36-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-11.84a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  },
  {
    label: "X",
    href: event.social.twitter,
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117Z",
  },
].filter((item) => Boolean(item.href));

const CONTACTS = [
  {
    company: "Futurex Trade Fair & Events Pvt. Ltd.",
    name: event.contact.futurex.name,
    phone: event.contact.futurex.phone,
    email: event.contact.futurex.email,
  },
  {
    company: "Media Space Solutions",
    name: event.contact.mediaSpace.name,
    phone: event.contact.mediaSpace.phone,
    email: event.contact.mediaSpace.email,
  },
];

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function isPdf(href: string) {
  return /\.pdf(?:\?.*)?$/i.test(href);
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#0B0C11] text-white selection:bg-[#982E21] selection:text-white">
      {/* Minimal, subtle Nepal-brand ambient lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-52 -top-56 h-[480px] w-[480px] rounded-full bg-[#982E21]/[0.08] blur-[110px]" />
        <div className="absolute -bottom-64 left-[10%] h-[420px] w-[420px] rounded-full bg-[#1C987A]/[0.06] blur-[115px]" />
      </div>
      <div aria-hidden="true" className="h-[2px] bg-gradient-to-r from-[#982E21] via-[#1C987A] to-transparent" />

      <Container className="relative z-10">
        {/* Brand and primary action */}
        <div className="grid gap-7 border-b border-white/10 py-9 md:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] md:items-center lg:py-11">
          <div className="min-w-0">
            <Link href="/" aria-label={`${event.name} homepage`} className="inline-flex rounded-md bg-white px-3 py-2 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none">
              <Image src="/logos/nepal-buildcon-logo.png" alt={event.name} width={580} height={220} sizes="(min-width: 768px) 220px, 195px" className="h-auto w-[195px] object-contain md:w-[220px]" />
            </Link>
            <p className="mt-4 max-w-[500px] text-[13px] leading-[1.8] text-white/65 sm:text-[14px]">
              {event.descriptor}
            </p>
            <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] leading-5 text-white/75">
              <span>{event.dates.display}</span>
              <span aria-hidden="true" className="text-white/25">/</span>
              <span>{event.venue.name}, {event.venue.city}</span>
            </p>
          </div>

          <div className="min-w-0 md:justify-self-end md:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#83D8C4]">
              Contact Our Representatives
            </p>
         
    
<div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 md:gap-x-10">
  {CONTACTS.map((contact) => (
    <div
      key={contact.company}
      className="min-w-0 md:text-left"
    >
      {contact.phone && (
        <a
          href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
          className="block whitespace-nowrap text-[13px] font-medium tabular-nums text-white/75 transition-colors hover:text-[#83D8C4]"
        >
          {contact.phone}
        </a>
      )}

      {contact.email && (
        <a
          href={`mailto:${contact.email}`}
          className="mt-1 block break-all text-[12px] leading-[1.6] text-white/55 transition-colors hover:text-[#83D8C4]"
        >
          {contact.email}
        </a>
      )}
    </div>
  ))}
</div>

        
          </div>
        </div>

        {/* Navigation — compatible with existing footerNav */}
        <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-white/10 py-9 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-7 lg:py-10">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="min-w-0">
              <h3 className="font-heading text-[13px] font-bold text-white">{group.title}</h3>
              <div aria-hidden="true" className="mt-3 h-[2px] w-7 bg-[#1C987A]" />
              <ul className="mt-4 space-y-2.5">
                {group.links?.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={isPdf(item.href) ? "_blank" : undefined}
                      rel={isPdf(item.href) ? "noopener noreferrer" : undefined}
                      className="inline-block text-[12px] leading-[1.65] text-white/60 transition-colors duration-200 hover:text-[#83D8C4] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#83D8C4] sm:text-[13px]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Joint organisers — minimal Uganda-style strip */}
        <div className="flex flex-col gap-5 border-b border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#83D8C4]">
              Joint Event Organisers
            </p>
            <h3 className="mt-2 font-heading text-[12px] font-semibold leading-[1.7] text-white sm:text-[13px]">
              Futurex Trade Fair &amp; Events Pvt. Ltd.
              <span className="mx-2 text-white/30">/</span>
              Media Space Solutions
            </h3>
          </div>
       
<div className="flex items-center gap-3">
  {/* Futurex Logo */}
  <a
    href="https://www.futurextrade.com/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Futurex official website"
    className="flex h-[52px] w-[130px] shrink-0 items-center justify-center rounded-md bg-white p-2.5 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
  >
    <span className="relative h-full w-full">
      <Image
        src="/logos/futurex-logo.png"
        alt="Futurex Trade Fair & Events"
        fill
        sizes="130px"
        className="object-contain object-center"
      />
    </span>
  </a>

  {/* Media Space Solutions Logo */}
  <a
    href="https://mss.com.np/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Media Space Solutions official website"
    className="flex h-[52px] w-[130px] shrink-0 items-center justify-center rounded-md bg-white p-2.5 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
  >
    <span className="relative h-full w-full">
      <Image
        src="/logos/media-space-logo.svg"
        alt="Media Space Solutions"
        fill
        sizes="130px"
        className="object-contain object-center"
      />
    </span>
  </a>
</div>

        </div>

        {/* Footer bottom: copyright left, social links right */}
        <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] leading-5 text-white/50">
              &copy; {new Date().getFullYear()} {event.name}. All rights reserved.
            </p>
            <p className="text-[11px] leading-5 text-white/35">{event.websiteDisplay}</p>
          </div>
          {SOCIAL_LINKS.length > 0 && (
            <div className="flex w-full items-center justify-end gap-2 sm:ml-auto sm:w-auto">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/65 transition-[border-color,background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#1C987A] hover:bg-[#1C987A]/15 hover:text-white motion-reduce:transform-none"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}
