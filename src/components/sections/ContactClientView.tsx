"use client";

import { motion, type Variants } from "framer-motion";
import { event } from "@/config/event";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAGGER: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const REVEAL: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const contacts = [
  {
    label: "India & Overseas Enquiries",
    organisation: "Futurex Trade Fair & Events Pvt. Ltd.",
    person: event.contact.namit,
  },
  {
    label: "Nepal Enquiries",
    organisation: "Media Space Solutions Pvt. Ltd.",
    person: event.contact.srijal,
  },
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="h-[2px] w-8 bg-[#982E21]" />
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#982E21]">{children}</span>
    </div>
  );
}

export function ContactClientView() {
  return (
    <div className="overflow-hidden bg-white text-[#111111] selection:bg-[#982E21] selection:text-white">
      <section aria-labelledby="contact-enquiry-heading" className="py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.83fr)_minmax(0,1.17fr)] lg:gap-16">
            <motion.div
              variants={STAGGER}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="lg:pt-4"
            >
              <motion.div variants={REVEAL}><SectionLabel>Contact the Organisers</SectionLabel></motion.div>
              <motion.h2
                id="contact-enquiry-heading"
                variants={REVEAL}
                className="mt-5 max-w-[530px] font-heading text-[clamp(2rem,3.4vw,3.4rem)] font-extrabold leading-[1.14] tracking-[-0.045em]"
              >
                How Can We <span className="text-[#982E21]">Help You?</span>
              </motion.h2>
              <motion.p variants={REVEAL} className="mt-5 max-w-[500px] text-[14px] leading-[1.85] text-[#60636B] sm:text-[15px]">
                Contact the organising team for exhibition participation, stand enquiries, visitor information and other event-related questions.
              </motion.p>
              <motion.div variants={REVEAL} className="mt-8 border-t border-[#E8E8E8] pt-6">
                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#982E21]">Event Information</p>
                <p className="mt-3 text-[14px] font-semibold text-[#111111]">{event.dates.display}</p>
                <p className="mt-1 text-[14px] text-[#60636B]">{event.venue.fullLocation}</p>
              </motion.div>
            </motion.div>

            <div className="min-w-0 rounded-xl border border-[#E6E6E6] bg-[#FAFAFA] p-5 sm:p-7 lg:p-8">
              <h3 className="font-heading text-xl font-bold tracking-[-0.025em]">Send an Enquiry</h3>
              <p className="mt-2 text-[13px] leading-[1.75] text-[#60636B]">
                Complete the form and the organising team can review your enquiry.
              </p>
              <div className="mt-6"><ContactForm /></div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="contact-direct-heading" className="border-t border-[#EAEAEA] bg-[#F8F9FA] py-14 sm:py-16 lg:py-20">
        <Container>
          <SectionLabel>Direct Contacts</SectionLabel>
          <h2 id="contact-direct-heading" className="mt-4 font-heading text-[clamp(1.9rem,3vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.04em]">
            Speak with the <span className="text-[#982E21]">Organising Team.</span>
          </h2>
          <p className="mt-4 max-w-[660px] text-[14px] leading-[1.8] text-[#60636B] sm:text-[15px]">
            For direct assistance, contact the representative handling your region.
          </p>
          <motion.div
            variants={STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="mt-8 grid gap-5 md:grid-cols-2"
          >
            {contacts.map((contact) => (
              <motion.article
                variants={REVEAL}
                key={contact.person.email}
                className="min-w-0 rounded-xl border border-[#E6E6E6] bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-[#982E21]/35 hover:shadow-[0_12px_32px_rgba(17,17,17,0.045)] sm:p-8"
              >
                {/* <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#982E21]">{contact.label}</p> */}
                <h3 className="mt-4 font-heading text-[21px] font-bold tracking-[-0.025em]">{contact.person.name}</h3>
                {/* <p className="mt-1 text-[13px] leading-[1.65] text-[#60636B]">{contact.organisation}</p> */}
                <div className="mt-6 flex flex-col gap-3 border-t border-[#ECECEC] pt-5 text-[14px]">
                  <a href={contact.person.phoneHref} className="w-fit font-medium text-[#282828] transition-colors hover:text-[#982E21] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]">
                    {contact.person.phone}
                  </a>
                  <a href={contact.person.emailHref} className="w-fit max-w-full break-all font-medium text-[#982E21] underline decoration-[#982E21]/30 underline-offset-4 hover:decoration-[#982E21] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21]">
                    {contact.person.email}
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
