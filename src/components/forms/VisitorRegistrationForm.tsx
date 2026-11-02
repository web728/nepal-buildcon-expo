"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import {
  visitorRegistrationSchema,
  type VisitorRegistrationInput,
  purchasingResponsibilityOptions,
  purposeOfVisitOptions,
  natureOfBusinessOptions,
} from "@/lib/validation/visitorRegistration";
import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";
import { exhibitionSectors } from "@/data/exhibitionProfile";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

function FormSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5" aria-label={title}>
      <div className="flex items-center gap-3 border-b border-[#EAEAEA] pb-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#982E21]/[0.07] text-xs font-bold text-[#982E21]">{number}</span>
        <h3 className="font-heading text-base font-bold tracking-tight text-[#111111]">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function VisitorRegistrationForm() {
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/visitor-registration");

  const { register, handleSubmit, control, formState: { errors } } = useForm<VisitorRegistrationInput>({
    resolver: zodResolver(visitorRegistrationSchema),
    defaultValues: { productsInterested: [] },
  });

  const onSubmit = (data: VisitorRegistrationInput) => {
    if (!RECAPTCHA_SITE_KEY) {
      setCaptchaError("Visitor registration is temporarily unavailable. Please contact the organising team.");
      return;
    }
    if (!recaptchaToken) {
      setCaptchaError("Please complete the security verification before submitting.");
      return;
    }
    setCaptchaError("");
    submit({
      ...data,
      recaptchaToken,
      startedAt,
      utm: getUtmFromLocation(),
      landingPage: window.location.pathname,
    });
  };

  if (status === "success" && referenceId) {
    return (
      <SuccessPanel
        title="Visitor Registration Received"
        message="Thank you for registering for Nepal Buildcon 2027. Please retain your registration reference for your records."
        referenceId={referenceId}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-9">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="visitor-website-hp">Website</label>
        <input id="visitor-website-hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <FormSection number="01" title="Contact & Professional Details">
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="First Name" htmlFor="visitor-firstName" required error={errors.firstName}>
            <input id="visitor-firstName" autoComplete="given-name" className={inputClasses(!!errors.firstName)} {...register("firstName")} />
          </FieldWrapper>
          <FieldWrapper label="Last Name" htmlFor="visitor-lastName" required error={errors.lastName}>
            <input id="visitor-lastName" autoComplete="family-name" className={inputClasses(!!errors.lastName)} {...register("lastName")} />
          </FieldWrapper>
          <FieldWrapper label="Job Title / Designation" htmlFor="visitor-designation" required error={errors.designation}>
            <input id="visitor-designation" autoComplete="organization-title" className={inputClasses(!!errors.designation)} {...register("designation")} />
          </FieldWrapper>
          <FieldWrapper label="Company / Organisation" htmlFor="visitor-company" required error={errors.company}>
            <input id="visitor-company" autoComplete="organization" className={inputClasses(!!errors.company)} {...register("company")} />
          </FieldWrapper>
          <FieldWrapper label="Country" htmlFor="visitor-country" required error={errors.country}>
            <select id="visitor-country" className={inputClasses(!!errors.country)} defaultValue="" {...register("country")}>
              <option value="" disabled>Select country</option>
              {countries.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
          </FieldWrapper>
          <FieldWrapper label="City" htmlFor="visitor-city" required error={errors.city}>
            <input id="visitor-city" autoComplete="address-level2" className={inputClasses(!!errors.city)} {...register("city")} />
          </FieldWrapper>
          <FieldWrapper label="Email Address" htmlFor="visitor-email" required error={errors.email}>
            <input id="visitor-email" type="email" autoComplete="email" className={inputClasses(!!errors.email)} {...register("email")} />
          </FieldWrapper>
          <FieldWrapper label="Mobile / WhatsApp" htmlFor="visitor-mobile" required error={errors.mobile}>
            <input id="visitor-mobile" type="tel" autoComplete="tel" className={inputClasses(!!errors.mobile)} {...register("mobile")} />
          </FieldWrapper>
          <FieldWrapper label="Nature of Business" htmlFor="visitor-natureOfBusiness" required error={errors.natureOfBusiness} className="sm:col-span-2">
            <select id="visitor-natureOfBusiness" defaultValue="" className={inputClasses(!!errors.natureOfBusiness)} {...register("natureOfBusiness")}>
              <option value="" disabled>Select your business category</option>
              {natureOfBusinessOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </FieldWrapper>
        </div>
      </FormSection>

      <FormSection number="02" title="Products & Sectors of Interest">
        <p className="text-sm leading-6 text-[#60636B]">Select the sectors you would like to explore at the exhibition.</p>
        <Controller
          name="productsInterested"
          control={control}
          render={({ field }) => (
            <div className="grid gap-3 sm:grid-cols-2">
              {exhibitionSectors.map((sector) => {
                const checked = (field.value ?? []).includes(sector.name);
                return (
                  <label key={sector.slug} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 text-sm transition-colors ${checked ? "border-[#982E21] bg-[#982E21]/[0.04] text-[#111111]" : "border-[#E5E7EB] bg-white text-[#41444A] hover:border-[#C7C9CE]"}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onBlur={field.onBlur}
                      onChange={(e) => {
                        const current = field.value ?? [];
                        field.onChange(e.target.checked ? [...current, sector.name] : current.filter((name) => name !== sector.name));
                      }}
                      className="size-4 shrink-0 accent-[#982E21]"
                    />
                    <span>{sector.name}</span>
                  </label>
                );
              })}
            </div>
          )}
        />
        {errors.productsInterested && <p role="alert" className="text-xs font-medium text-red-700">{errors.productsInterested.message}</p>}
      </FormSection>

      <FormSection number="03" title="Purpose of Your Visit">
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="Purchasing Responsibility" htmlFor="visitor-purchasingResponsibility" required error={errors.purchasingResponsibility}>
            <select id="visitor-purchasingResponsibility" defaultValue="" className={inputClasses(!!errors.purchasingResponsibility)} {...register("purchasingResponsibility")}>
              <option value="" disabled>Select an option</option>
              {purchasingResponsibilityOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </FieldWrapper>
          <FieldWrapper label="Primary Purpose of Visit" htmlFor="visitor-purposeOfVisit" required error={errors.purposeOfVisit}>
            <select id="visitor-purposeOfVisit" defaultValue="" className={inputClasses(!!errors.purposeOfVisit)} {...register("purposeOfVisit")}>
              <option value="" disabled>Select your reason for visiting</option>
              {purposeOfVisitOptions.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </FieldWrapper>
        </div>
      </FormSection>

      <div className="space-y-5 border-t border-[#EAEAEA] pt-7">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#60636B]">
          <input type="checkbox" className="mt-1 size-4 shrink-0 accent-[#982E21]" {...register("consent")} />
          <span>
            I agree that Nepal Buildcon International Expo may contact me about my visitor registration in accordance with the{" "}
            <Link href="/privacy-policy" className="font-semibold text-[#982E21] underline underline-offset-4">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent && <p role="alert" className="text-xs font-medium text-red-700">{errors.consent.message}</p>}

        {RECAPTCHA_SITE_KEY ? (
          <div className="max-w-full overflow-x-auto py-1">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => { setRecaptchaToken(token); setCaptchaError(""); }}
              onExpired={() => setRecaptchaToken(null)}
              onErrored={() => { setRecaptchaToken(null); setCaptchaError("Security verification could not load. Please try again."); }}
            />
          </div>
        ) : (
          <p role="alert" className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Online registration is temporarily unavailable. Please contact the organising team or register at the venue during exhibition opening hours.
          </p>
        )}
        {captchaError && <p role="alert" className="text-sm font-medium text-red-700">{captchaError}</p>}
        {status === "error" && errorMessage && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{errorMessage}</p>}

        <button
          type="submit"
          disabled={status === "submitting" || !RECAPTCHA_SITE_KEY}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#982E21] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#7B241A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {status === "submitting" ? "Submitting Registration…" : "Register for Free"}
        </button>
      </div>
    </form>
  );
}
