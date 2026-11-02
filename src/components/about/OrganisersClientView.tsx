"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";

const RED = "#982E21";
const EASE = [0.22, 1, 0.36, 1] as const;

const GROUP: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } },
};
const REVEAL: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

type Organiser = (typeof event.organisers)[number];
type Contact = (typeof event.contact.all)[number];

const organiserProfiles = [
  {
    location: "New Delhi, India",
    focus: "International trade exhibitions",
    description: [
      "Established in 2011 and headquartered in New Delhi, Futurex Trade Fair & Events Pvt. Ltd. organises B2B exhibitions and industry events across India, South Asia and East Africa. Its operations also extend to Mumbai, Colombo, Kathmandu and Dhaka.",
      "Its exhibition portfolio covers building and construction, infrastructure, power and energy, woodworking, agriculture, packaging and other industrial sectors. These events connect manufacturers, suppliers and trade professionals with relevant regional markets.",
    ],
    statistics: [
      { value: "220+", label: "Trade exhibitions" },
      { value: "16,516+", label: "Exhibitors" },
      { value: "25,844+", label: "Brands displayed" },
      { value: "956,484+", label: "Visitors" },
    ],
    role: "International participation and exhibition enquiries",
  },
  {
    location: "Kathmandu, Nepal",
    focus: "Nepal trade exhibitions & events",
    description: [
      "Media Space Solutions Pvt. Ltd. began in 2009 as a digital media and event management company. It has since developed a portfolio of trade exhibitions and conferences in Nepal.",
      "Its events cover construction, infrastructure, engineering, woodworking, agriculture, food processing, printing and packaging, among other industries. The company contributes local market knowledge, event coordination and exhibitor outreach to the exhibition.",
    ],
    statistics: [],
    role: "Nepal participation and exhibition enquiries",
  },
] as const;

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function OrganiserCard({ organiser, index }: { organiser: Organiser; index: number }) {
  const profile = organiserProfiles[index];

  return (
    <motion.article
      variants={REVEAL}
      className="group flex h-full min-w-0 flex-col rounded-xl border border-[#E8E8E8] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/30 hover:shadow-[0_14px_36px_rgba(17,17,17,0.055)] sm:p-8"
    >
      <div className="flex min-h-[100px] items-center justify-between gap-4 border-b border-[#EAEAEA] pb-6">
        <div className="relative h-[70px] w-[190px] max-w-[65%] sm:h-[80px] sm:w-[220px]">
          <Image
            src={organiser.logo}
            alt={`${organiser.name} logo`}
            fill
            sizes="(max-width: 640px) 190px, 220px"
            className="object-contain object-left"
          />
        </div>
     
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#982E21]">
          {profile.location} <span className="mx-1 text-[#B8B8B8]">/</span> {profile.focus}
        </p>
        <h3 className="mt-3 font-heading text-xl font-bold leading-snug tracking-[-0.03em] text-[#111111] sm:text-[22px]">
          {organiser.name}
        </h3>

        <div className="mt-4 flex-1 space-y-3">
          {profile.description.map((paragraph) => (
            <p key={paragraph} className="text-[13px] leading-[1.85] text-[#60636B] sm:text-[14px]">
              {paragraph}
            </p>
          ))}
        </div>

        {profile.statistics.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-[#ECECEC] pt-5 sm:grid-cols-4 sm:gap-x-3">
            {profile.statistics.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <p className="font-heading text-[18px] font-extrabold tabular-nums tracking-[-0.04em] text-[#982E21] sm:text-[19px]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] font-medium leading-[1.45] text-[#6C7077]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <a
          href={organiser.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex w-fit items-center gap-2 border-b border-[#982E21]/35 pb-1 text-[13px] font-bold text-[#982E21] transition-colors hover:border-[#982E21] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]"
        >
          Visit Official Website <ArrowIcon />
        </a>
      </div>
    </motion.article>
  );
}

function ContactCard({ contact, index }: { contact: Contact; index: number }) {
  const organisation = event.organisers[index];
  const profile = organiserProfiles[index];
  return (
    <motion.article variants={REVEAL} className="min-w-0 border-b border-[#E7E7E7] py-6 last:border-b-0 sm:py-7 md:border-b-0 md:border-r md:px-7 md:last:border-r-0 md:first:pl-0 md:last:pr-0">
      <h3 className="mt-3 font-heading text-lg font-bold text-[#111111]">{contact.name}</h3>
      {/* <p className="mt-1 text-[13px] leading-6 text-[#6B6F76]">{profile.role}</p> */}
      <div className="mt-5 space-y-2.5">
        <a href={contact.phoneHref} className="block w-fit text-[14px] font-semibold tabular-nums text-[#333333] transition-colors hover:text-[#982E21]">{contact.phone}</a>
        <a href={contact.emailHref} className="block max-w-full break-all text-[14px] font-medium text-[#555A62] transition-colors hover:text-[#982E21]">{contact.email}</a>
      </div>
    </motion.article>
  );
}

export function OrganisersClientView() {
  const reduced = useReducedMotion() === true;
  const motionProps = { initial: reduced ? false : "hidden", whileInView: "visible" as const, viewport: { once: true, amount: 0.14 } };

  return (
    <div className="overflow-hidden bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      <section aria-labelledby="organisers-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...motionProps} className="max-w-[790px]">
            <motion.div variants={REVEAL} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-[2px] w-8" style={{ backgroundColor: RED }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#982E21]">Joint Organisers</span>
            </motion.div>
            <motion.h2 id="organisers-heading" variants={REVEAL} className="mt-5 font-heading text-[clamp(2rem,3.6vw,3.6rem)] font-extrabold leading-[1.14] tracking-[-0.045em]">
              The Organisations <span className="text-[#982E21]">Behind the Exhibition.</span>
            </motion.h2>
            <motion.p variants={REVEAL} className="mt-5 max-w-[700px] text-[14px] leading-[1.9] text-[#60636B] sm:text-[15px]">
              {event.name} is jointly organised by {event.organisers[0].name} and {event.organisers[1].name}. Together, they bring exhibition organisation experience and knowledge of Nepal&apos;s trade event market.
            </motion.p>
          </motion.div>

          <motion.div variants={GROUP} {...motionProps} className="mt-9 grid gap-5 lg:grid-cols-2 lg:gap-6">
            {event.organisers.map((organiser, index) => (
              <OrganiserCard key={organiser.name} organiser={organiser} index={index} />
            ))}
          </motion.div>
        </Container>
      </section>

      <section aria-labelledby="organisers-contacts-heading" className="border-t border-[#E8E8E8] bg-[#F8F8F8] py-14 sm:py-16 lg:py-20">
        <Container>
          <motion.div variants={GROUP} {...motionProps}>
            <motion.div variants={REVEAL} className="flex items-center gap-3">
              <span aria-hidden="true" className="h-[2px] w-8 bg-[#982E21]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#982E21]">Exhibition Enquiries</span>
            </motion.div>
            <motion.h2 id="organisers-contacts-heading" variants={REVEAL} className="mt-4 font-heading text-[clamp(1.85rem,3vw,2.8rem)] font-extrabold leading-[1.16] tracking-[-0.04em]">
              Contact the Organising Team.
            </motion.h2>
            <motion.p variants={REVEAL} className="mt-3 max-w-[650px] text-[14px] leading-[1.8] text-[#60636B]">
              For exhibition participation and stand enquiries, please contact the relevant organising team.
            </motion.p>
          </motion.div>
          <motion.div variants={GROUP} {...motionProps} className="mt-8 grid rounded-xl border border-[#E6E6E6] bg-white px-6 sm:px-8 md:grid-cols-2 md:py-2">
            {event.contact.all.map((contact, index) => (
              <ContactCard key={contact.email} contact={contact} index={index} />
            ))}
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
