"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import {
  brochureDownloadSchema,
  type BrochureDownloadInput,
} from "@/lib/validation/brochureDownload";
import { FieldWrapper, inputClasses } from "./fields";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";

const BROCHURE_FILE_URL = "/downloads/Nepal-Buildcon-Expo-Brochure-2027.pdf";
const BROCHURE_FILE_NAME = "Nepal-Buildcon-Expo-Brochure-2027.pdf";

export function BrochureDownloadForm() {
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const downloadTriggered = useRef(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const { submit, status, referenceId, errorMessage } = useLeadSubmit(
    "/api/brochure-download",
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrochureDownloadInput>({
    resolver: zodResolver(brochureDownloadSchema),
  });

  useEffect(() => {
    if (status === "success" && referenceId && !downloadTriggered.current) {
      downloadTriggered.current = true;
      downloadLinkRef.current?.click();
    }
  }, [status, referenceId]);

  const onSubmit = (data: BrochureDownloadInput) => {
    if (!recaptchaToken) {
      setCaptchaError("Please complete the reCAPTCHA verification.");
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
      <div role="status" className="rounded-lg border border-[#E8E8E8] bg-white p-6 sm:p-8">
        <h3 className="font-heading text-xl font-bold text-[#111111]">Your brochure is ready.</h3>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#60636B]">
          Thank you for submitting your details. The download should begin automatically.
          If it does not, use the link below.
        </p>
        <a href={BROCHURE_FILE_URL} download={BROCHURE_FILE_NAME} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#982E21] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#7B241A]">
          Download Brochure
        </a>
        <a ref={downloadLinkRef} href={BROCHURE_FILE_URL} download={BROCHURE_FILE_NAME} className="hidden" tabIndex={-1} aria-hidden="true">Download</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="brochure-website-hp">Website</label>
        <input id="brochure-website-hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Full Name" htmlFor="brochure-name" required error={errors.name}>
          <input id="brochure-name" autoComplete="name" className={inputClasses(!!errors.name)} {...register("name")} />
        </FieldWrapper>
        <FieldWrapper label="Company / Organisation" htmlFor="brochure-company" required error={errors.company}>
          <input id="brochure-company" autoComplete="organization" className={inputClasses(!!errors.company)} {...register("company")} />
        </FieldWrapper>
        <FieldWrapper label="Country" htmlFor="brochure-country" required error={errors.country}>
          <select id="brochure-country" defaultValue="" className={inputClasses(!!errors.country)} {...register("country")}>
            <option value="" disabled>Select your country</option>
            {countries.map((country) => <option key={country} value={country}>{country}</option>)}
          </select>
        </FieldWrapper>
        <FieldWrapper label="Email Address" htmlFor="brochure-email" required error={errors.email}>
          <input id="brochure-email" type="email" autoComplete="email" className={inputClasses(!!errors.email)} {...register("email")} />
        </FieldWrapper>
        <FieldWrapper label="Mobile / WhatsApp" htmlFor="brochure-mobile" required error={errors.mobile} className="sm:col-span-2">
          <input id="brochure-mobile" type="tel" autoComplete="tel" className={inputClasses(!!errors.mobile)} {...register("mobile")} />
        </FieldWrapper>
      </div>

      <div>
        <label className="flex items-start gap-3 text-[13px] leading-[1.75] text-[#60636B]">
          <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#982E21]" {...register("consent")} />
          <span>I agree to be contacted regarding my brochure enquiry in accordance with the <Link href="/privacy-policy" className="font-semibold text-[#982E21] underline underline-offset-2">Privacy Policy</Link>.</span>
        </label>
        {errors.consent && <p role="alert" className="mt-2 text-[12px] text-red-700">{errors.consent.message}</p>}
      </div>

      {siteKey ? (
        <div className="max-w-full overflow-x-auto py-1">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={(token) => { setRecaptchaToken(token); setCaptchaError(""); }}
            onExpired={() => setRecaptchaToken(null)}
            onErrored={() => { setRecaptchaToken(null); setCaptchaError("reCAPTCHA could not be loaded. Please refresh and try again."); }}
          />
        </div>
      ) : (
        <p role="alert" className="text-[13px] text-red-700">Registration verification is unavailable. Please configure the reCAPTCHA site key.</p>
      )}
      {captchaError && <p role="alert" className="text-[12px] text-red-700">{captchaError}</p>}
      {status === "error" && errorMessage && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-[13px] text-red-700">{errorMessage}</p>
      )}

      <button type="submit" disabled={status === "submitting" || !siteKey} className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#982E21] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#7B241A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {status === "submitting" ? "Submitting…" : "Submit & Download Brochure"}
      </button>
      <p className="text-[12px] leading-[1.7] text-[#70737A]">Your brochure download begins after the form is submitted successfully.</p>
    </form>
  );
}
