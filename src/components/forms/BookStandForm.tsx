"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import {
  exhibitorEnquirySchema,
  type ExhibitorEnquiryInput,
  companyTypeOptions,
  participationOptions,
  areaOptions,
  yesNoOptions,
  yesNoMaybeOptions,
} from "@/lib/validation/exhibitorEnquiry";
import { FieldWrapper, inputClasses } from "./fields";
import { SuccessPanel } from "./SuccessPanel";
import { useLeadSubmit, getUtmFromLocation } from "@/hooks/useLeadSubmit";
import { countries } from "@/data/countries";
import { exhibitionSectors } from "@/data/exhibitionProfile";

const RED = "#982E21";
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

function FormSection({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5" aria-label={title}>
      <div className="flex items-center gap-3 border-b border-[#EAEAEA] pb-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#982E21]/[0.08] text-xs font-bold text-[#982E21]">{number}</span>
        <h3 className="font-heading text-base font-bold text-[#111111]">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function BookStandForm() {
  const [startedAt] = useState(() => Date.now());
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const { submit, status, referenceId, errorMessage } = useLeadSubmit("/api/exhibitor-enquiry");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ExhibitorEnquiryInput>({
    resolver: zodResolver(exhibitorEnquirySchema),
    defaultValues: {
      preferredParticipation: participationOptions[0],
      requiredArea: areaOptions[0],
    },
  });

  const selectedParticipation = useWatch({ control, name: "preferredParticipation" });
  const selectedArea = useWatch({ control, name: "requiredArea" });

  const onSubmit = (data: ExhibitorEnquiryInput) => {
    if (!SITE_KEY || !recaptchaToken) {
      setCaptchaError(SITE_KEY ? "Please complete the reCAPTCHA verification." : "The enquiry form is temporarily unavailable. Please contact the organising team.");
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
        title="Stand Enquiry Received"
        message="Thank you for your interest in exhibiting at Nepal Buildcon 2027. Your enquiry has been submitted for review. Our team will contact you about available participation options."
        referenceId={referenceId}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="stand-website-hp">Website</label>
        <input id="stand-website-hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
      </div>

      <FormSection number="01" title="Company Details">
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="Company Name" htmlFor="stand-company" required error={errors.companyName}>
            <input id="stand-company" autoComplete="organization" className={inputClasses(!!errors.companyName)} {...register("companyName")} />
          </FieldWrapper>
          <FieldWrapper label="Country" htmlFor="stand-country" required error={errors.country}>
            <select id="stand-country" defaultValue="" className={inputClasses(!!errors.country)} {...register("country")}>
              <option value="" disabled>Select country</option>
              {countries.map(country => <option key={country} value={country}>{country}</option>)}
            </select>
          </FieldWrapper>
          <FieldWrapper label="City" htmlFor="stand-city" error={errors.city}>
            <input id="stand-city" autoComplete="address-level2" className={inputClasses(!!errors.city)} {...register("city")} />
          </FieldWrapper>
          <FieldWrapper label="Company Website" htmlFor="stand-website" error={errors.website}>
            <input id="stand-website" type="url" placeholder="https://example.com" className={inputClasses(!!errors.website)} {...register("website")} />
          </FieldWrapper>
          <FieldWrapper label="Company Type" htmlFor="stand-company-type" required error={errors.companyType} className="sm:col-span-2">
            <select id="stand-company-type" defaultValue="" className={inputClasses(!!errors.companyType)} {...register("companyType")}>
              <option value="" disabled>Select company type</option>
              {companyTypeOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
          </FieldWrapper>
        </div>
      </FormSection>

      <FormSection number="02" title="Contact Details">
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldWrapper label="First Name" htmlFor="stand-first" required error={errors.firstName}>
            <input id="stand-first" autoComplete="given-name" className={inputClasses(!!errors.firstName)} {...register("firstName")} />
          </FieldWrapper>
          <FieldWrapper label="Last Name" htmlFor="stand-last" required error={errors.lastName}>
            <input id="stand-last" autoComplete="family-name" className={inputClasses(!!errors.lastName)} {...register("lastName")} />
          </FieldWrapper>
          <FieldWrapper label="Job Title" htmlFor="stand-designation" required error={errors.designation}>
            <input id="stand-designation" autoComplete="organization-title" className={inputClasses(!!errors.designation)} {...register("designation")} />
          </FieldWrapper>
          <FieldWrapper label="Business Email" htmlFor="stand-email" required error={errors.email}>
            <input id="stand-email" type="email" autoComplete="email" className={inputClasses(!!errors.email)} {...register("email")} />
          </FieldWrapper>
          <FieldWrapper label="Mobile / WhatsApp" htmlFor="stand-mobile" required error={errors.mobile} className="sm:col-span-2">
            <input id="stand-mobile" type="tel" autoComplete="tel" className={inputClasses(!!errors.mobile)} {...register("mobile")} />
          </FieldWrapper>
        </div>
      </FormSection>

      <FormSection number="03" title="Exhibition Requirements">
        <div className="space-y-6">
          <FieldWrapper label="Product Category / Sector" htmlFor="stand-sector" required error={errors.productCategory}>
            <select id="stand-sector" defaultValue="" className={inputClasses(!!errors.productCategory)} {...register("productCategory")}>
              <option value="" disabled>Select a sector</option>
              {exhibitionSectors.map(sector => <option key={sector.slug} value={sector.name}>{sector.name}</option>)}
            </select>
          </FieldWrapper>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#303039]">Preferred Participation Type <span className="text-[#982E21]">*</span></p>
            <div className="grid gap-3 sm:grid-cols-2">
              {participationOptions.map(option => (
                <button
                  type="button"
                  key={option}
                  aria-pressed={selectedParticipation === option}
                  onClick={() => setValue("preferredParticipation", option, { shouldValidate: true, shouldDirty: true })}
                  className={`min-h-14 rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#982E21] ${selectedParticipation === option ? "border-[#982E21] bg-[#982E21]/[0.05] text-[#982E21]" : "border-[#DEDEDE] bg-white text-[#303039] hover:border-[#982E21]/50"}`}
                >{option}</button>
              ))}
            </div>
            {errors.preferredParticipation && <p role="alert" className="mt-2 text-xs text-red-700">{errors.preferredParticipation.message}</p>}
            <p className="mt-2 text-xs leading-5 text-[#62646B]">Stand specifications and inclusions will be confirmed by the organising team.</p>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#303039]">Preferred Space Requirement <span className="text-[#982E21]">*</span></p>
            <div className="flex flex-wrap gap-2">
              {areaOptions.map(area => (
                <button
                  type="button"
                  key={area}
                  aria-pressed={selectedArea === area}
                  onClick={() => setValue("requiredArea", area, { shouldValidate: true, shouldDirty: true })}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#982E21] ${selectedArea === area ? "border-[#982E21] bg-[#982E21] text-white" : "border-[#DEDEDE] bg-white text-[#303039] hover:border-[#982E21]/50"}`}
                >{area}</button>
              ))}
            </div>
            {errors.requiredArea && <p role="alert" className="mt-2 text-xs text-red-700">{errors.requiredArea.message}</p>}
          </div>

          <FieldWrapper label="Products / Services to Display" htmlFor="stand-products" required error={errors.productsServices}>
            <textarea id="stand-products" rows={3} placeholder="Briefly describe your products, machinery or solutions." className={inputClasses(!!errors.productsServices)} {...register("productsServices")} />
          </FieldWrapper>

          <div className="grid gap-5 sm:grid-cols-2">
            <FieldWrapper label="Do you currently do business in Nepal?" htmlFor="stand-nepal-business" error={errors.existingBusinessInNepal}>
              <select id="stand-nepal-business" defaultValue="" className={inputClasses(!!errors.existingBusinessInNepal)} {...register("existingBusinessInNepal")}>
                <option value="">Select an option</option>
                {yesNoOptions.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </FieldWrapper>
            <FieldWrapper label="Are you looking for distributors in Nepal?" htmlFor="stand-distributor" error={errors.lookingForDistributor}>
              <select id="stand-distributor" defaultValue="" className={inputClasses(!!errors.lookingForDistributor)} {...register("lookingForDistributor")}>
                <option value="">Select an option</option>
                {yesNoMaybeOptions.map(option => <option key={option} value={option}>{option}</option>)}
              </select>
            </FieldWrapper>
          </div>

          <FieldWrapper label="Additional Requirements (Optional)" htmlFor="stand-message" error={errors.message}>
            <textarea id="stand-message" rows={3} placeholder="Share any questions or stand preferences." className={inputClasses(!!errors.message)} {...register("message")} />
          </FieldWrapper>
        </div>
      </FormSection>

      <div className="space-y-5 border-t border-[#EAEAEA] pt-7">
        <div>
          <label className="flex items-start gap-3 text-sm leading-6 text-[#555861]">
            <input type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[#982E21]" {...register("consent")} />
            <span>I agree that the exhibition organisers may contact me regarding this enquiry, in accordance with the <Link href="/privacy-policy" className="font-semibold text-[#982E21] underline underline-offset-2">Privacy Policy</Link>.</span>
          </label>
          {errors.consent && <p role="alert" className="mt-2 text-xs text-red-700">{errors.consent.message}</p>}
        </div>

        {SITE_KEY ? (
          <div className="max-w-full overflow-x-auto py-1">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={SITE_KEY}
              onChange={token => { setRecaptchaToken(token); setCaptchaError(""); }}
              onExpired={() => setRecaptchaToken(null)}
              onErrored={() => { setRecaptchaToken(null); setCaptchaError("reCAPTCHA could not be verified. Please try again."); }}
            />
          </div>
        ) : (
          <p role="alert" className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
            The enquiry form is temporarily unavailable. Please <Link href="/contact" className="font-semibold underline">contact the organising team</Link>.
          </p>
        )}

        {captchaError && <p role="alert" className="text-sm text-red-700">{captchaError}</p>}
        {status === "error" && errorMessage && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>}

        <button
          type="submit"
          disabled={!SITE_KEY || status === "submitting"}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#982E21] px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-[#752319] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#982E21] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {status === "submitting" ? "Submitting Enquiry…" : "Submit Stand Enquiry"}
        </button>
        <p className="text-xs leading-5 text-[#73757C]">Submitting this form does not confirm stand availability or allocation.</p>
      </div>
    </form>
  );
}
