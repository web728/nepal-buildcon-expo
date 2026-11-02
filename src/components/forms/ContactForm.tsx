"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import {
  contactEnquirySchema,
  type ContactEnquiryInput,
  contactInterestOptions,
} from "@/lib/validation/contactEnquiry";
import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

export function ContactForm({
  defaultInterest,
}: {
  defaultInterest?: (typeof contactInterestOptions)[number];
}) {
  // Timestamp is not displayed in SSR HTML; capture once per mounted form.
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [captchaMessage, setCaptchaMessage] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/contact");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactEnquiryInput>({
    resolver: zodResolver(contactEnquirySchema),
    defaultValues: defaultInterest ? { interest: defaultInterest } : undefined,
  });

  const onSubmit = (data: ContactEnquiryInput) => {
    if (!SITE_KEY) {
      setCaptchaMessage("The enquiry form is temporarily unavailable. Please contact the organising team using the details below.");
      return;
    }
    if (!recaptchaToken) {
      setCaptchaMessage("Please complete the security verification before submitting.");
      return;
    }
    setCaptchaMessage("");
    submit({
      ...data,
      recaptchaToken,
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: window.location.pathname,
    });
  };

  // Keep hooks above the conditional return to preserve hook order.
  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Enquiry Received"
        message="Thank you. Your enquiry has been submitted to the Nepal Buildcon organising team."
        referenceId={referenceId}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-hp">Website</label>
        <input id="contact-hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldWrapper label="Full Name" htmlFor="contact-name" required error={errors.name}>
          <input id="contact-name" autoComplete="name" className={inputClasses(!!errors.name)} {...register("name")} />
        </FieldWrapper>
        <FieldWrapper label="Company" htmlFor="contact-company" required error={errors.company}>
          <input id="contact-company" autoComplete="organization" className={inputClasses(!!errors.company)} {...register("company")} />
        </FieldWrapper>
        <FieldWrapper label="Country" htmlFor="contact-country" required error={errors.country}>
          <select id="contact-country" defaultValue="" className={inputClasses(!!errors.country)} {...register("country")}>
            <option value="" disabled>Select country</option>
            {countries.map((country) => <option key={country} value={country}>{country}</option>)}
          </select>
        </FieldWrapper>
        <FieldWrapper label="Email" htmlFor="contact-email" required error={errors.email}>
          <input id="contact-email" type="email" autoComplete="email" className={inputClasses(!!errors.email)} {...register("email")} />
        </FieldWrapper>
        <FieldWrapper label="Mobile / WhatsApp" htmlFor="contact-mobile" required error={errors.mobile}>
          <input id="contact-mobile" type="tel" autoComplete="tel" className={inputClasses(!!errors.mobile)} {...register("mobile")} />
        </FieldWrapper>
        <FieldWrapper label="Enquiry Type" htmlFor="contact-interest" required error={errors.interest}>
          <select id="contact-interest" defaultValue={defaultInterest ?? ""} className={inputClasses(!!errors.interest)} {...register("interest")}>
            <option value="" disabled>Select enquiry type</option>
            {contactInterestOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </FieldWrapper>
        <FieldWrapper label="Message" htmlFor="contact-message" required error={errors.message} className="sm:col-span-2">
          <textarea id="contact-message" rows={4} placeholder="Tell us how we can help." className={inputClasses(!!errors.message)} {...register("message")} />
        </FieldWrapper>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-[1.75] text-[#60636B]">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#982E21]" {...register("consent")} />
          <span>
            I agree to be contacted about my enquiry in accordance with the{" "}
            <Link href="/privacy-policy" className="font-semibold text-[#982E21] underline underline-offset-2 hover:text-[#7B241A]">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent && <p role="alert" className="mt-2 text-[12px] text-red-700">{errors.consent.message}</p>}
      </div>

      {SITE_KEY ? (
        <div className="max-w-full overflow-x-auto py-1">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={SITE_KEY}
            onChange={(token) => {
              setRecaptchaToken(token);
              if (token) setCaptchaMessage("");
            }}
            onExpired={() => setRecaptchaToken(null)}
            onErrored={() => {
              setRecaptchaToken(null);
              setCaptchaMessage("Security verification could not be loaded. Please try again.");
            }}
          />
        </div>
      ) : (
        <p role="status" className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-[1.7] text-amber-900">
          The enquiry form is not configured yet. Please use the official contact details below until security verification is available.
        </p>
      )}

      {captchaMessage && <p role="alert" className="text-[13px] text-red-700">{captchaMessage}</p>}
      {status === "error" && errorMessage && (
        <p role="alert" className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-[13px] text-red-700">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || !SITE_KEY}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#982E21] px-6 py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#7B241A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21] disabled:cursor-not-allowed disabled:opacity-50 sm:w-fit"
      >
        {status === "submitting" ? "Submitting…" : "Send Enquiry"}
      </button>
    </form>
  );
}
