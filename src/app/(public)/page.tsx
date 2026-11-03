
import type { Metadata } from "next";

import { event } from "@/config/event";

// ======================================================
// HOMEPAGE SECTIONS
// ======================================================

import { HeroSection } from "@/components/sections/home/HeroSection";
import { HeroStatsSection } from "@/components/sections/home/HeroStatsSection";
import { IntroSection } from "@/components/sections/home/IntroSection";
import { WhyNepalSection } from "@/components/sections/home/WhyNepalSection";
import { ExhibitionProfileSection } from "@/components/sections/home/ExhibitionProfileSection";
import { WhyExhibitSection } from "@/components/sections/home/WhyExhibitSection";
import { WhoWillYouMeetSection } from "@/components/sections/home/WhoWillYouMeetSection";
import { ExhibitorDirectoryPreviewSection } from "@/components/sections/home/ExhibitorDirectoryPreviewSection";
import { VenueSection } from "@/components/sections/home/VenueSection";
import { PartnersSection } from "@/components/sections/home/PartnersSection";
import { NewsSection } from "@/components/sections/home/NewsSection";
import { FinalCtaSection } from "@/components/sections/home/FinalCtaSection";

// ======================================================
// VERIFIED EVENT DETAILS
// ======================================================

const SITE_URL = "https://nepalbuildcon.com.np";

const EVENT_NAME = "Nepal Buildcon International Expo";

const EVENT_EDITION = "12th";

const EVENT_DATES = "25–28 February 2027";

const EVENT_START = "2027-02-25T10:00:00+05:45";

const EVENT_END = "2027-02-28T18:00:00+05:45";

const EVENT_VENUE = "Bhrikuti Mandap Exhibition Hall";

const EVENT_CITY = "Kathmandu";

const EVENT_COUNTRY = "Nepal";

const HERO_IMAGE =
  "/images/home/nepal-buildcon-hero.jpg";

// ======================================================
// HOMEPAGE SEO CONTENT
// ======================================================

const PAGE_TITLE =
  "Nepal Buildcon Expo 2027 | Construction Exhibition Nepal";

const PAGE_DESCRIPTION =
  "Join the 12th Nepal Buildcon International Expo, " +
  "25–28 February 2027 at Bhrikuti Mandap, Kathmandu. " +
  "Explore building materials, machinery and construction technology.";

// ======================================================
// HOMEPAGE METADATA
// ======================================================

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },

  description: PAGE_DESCRIPTION,

  keywords: [
    "Nepal Buildcon Expo 2027",
    "Nepal Buildcon International Expo 2027",
    "12th Nepal Buildcon International Expo",
    "construction exhibition Nepal 2027",
    "construction expo Kathmandu",
    "Nepal building and construction expo",
    "building materials exhibition Nepal",
    "construction machinery exhibition Nepal",
    "infrastructure exhibition Kathmandu",
    "Nepal construction trade show",
    "Bhrikuti Mandap Expo 2027",
    "building technology exhibition Nepal",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: EVENT_NAME,
    locale: "en_US",

    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,

    images: [
      {
        url: HERO_IMAGE,
        width: 2560,
        height: 1707,
        alt:
          "Nepal Buildcon International Expo 2027 — " +
          "25 to 28 February at Bhrikuti Mandap, " +
          "Kathmandu, Nepal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [HERO_IMAGE],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ======================================================
// ORGANIZER SCHEMA
// ======================================================

const organizers = event.organisers
  .filter((organizer) => Boolean(organizer.name))
  .map((organizer) => ({
    "@type": "Organization",
    name: organizer.name,
    ...(organizer.url
      ? { url: organizer.url }
      : {}),
  }));

// ======================================================
// STRUCTURED DATA
// ======================================================

const homepageSchema = {
  "@context": "https://schema.org",

  "@graph": [
    // --------------------------------------------------
    // EXHIBITION EVENT
    // --------------------------------------------------
    {
      "@type": "ExhibitionEvent",

      "@id": `${SITE_URL}/#event`,

      name: `${EVENT_EDITION} ${EVENT_NAME} 2027`,

      alternateName: [
        "Nepal Buildcon 2027",
        "Nepal Buildcon Expo 2027",
      ],

      description:
        "The 12th Nepal Buildcon International Expo " +
        "brings together manufacturers, suppliers, " +
        "contractors and building industry professionals " +
        "at Bhrikuti Mandap, Kathmandu, Nepal, " +
        "from 25 to 28 February 2027.",

      url: SITE_URL,

      image: [
        `${SITE_URL}${HERO_IMAGE}`,
      ],

      startDate: EVENT_START,

      endDate: EVENT_END,

      eventStatus:
        "https://schema.org/EventScheduled",

      eventAttendanceMode:
        "https://schema.org/OfflineEventAttendanceMode",

      location: {
        "@type": "Place",

        name: EVENT_VENUE,

        address: {
          "@type": "PostalAddress",

          streetAddress: "Bhrikuti Mandap",

          addressLocality: EVENT_CITY,

          addressCountry: "NP",
        },
      },

      ...(organizers.length > 0
        ? { organizer: organizers }
        : {}),

      mainEntityOfPage: {
        "@id": `${SITE_URL}/#webpage`,
      },
    },

    // --------------------------------------------------
    // HOMEPAGE SCHEMA
    // --------------------------------------------------
    {
      "@type": "WebPage",

      "@id": `${SITE_URL}/#webpage`,

      url: SITE_URL,

      name: PAGE_TITLE,

      description: PAGE_DESCRIPTION,

      inLanguage: "en",

      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },

      about: {
        "@id": `${SITE_URL}/#event`,
      },

      primaryImageOfPage: {
        "@type": "ImageObject",

        url: `${SITE_URL}${HERO_IMAGE}`,

        width: 2560,
        height: 1707,
      },

      breadcrumb: {
        "@id": `${SITE_URL}/#breadcrumb`,
      },
    },

    // --------------------------------------------------
    // BREADCRUMB SCHEMA
    // --------------------------------------------------
    {
      "@type": "BreadcrumbList",

      "@id": `${SITE_URL}/#breadcrumb`,

      itemListElement: [
        {
          "@type": "ListItem",

          position: 1,

          name: "Home",

          item: SITE_URL,
        },
      ],
    },
  ],
};

// ======================================================
// JSON-LD SERIALIZATION
// ======================================================

function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// ======================================================
// HOMEPAGE COMPONENT
// ======================================================

export default function HomePage() {
  return (
    <>
      {/* SEO: Homepage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(homepageSchema),
        }}
      />

      {/* Website Homepage */}
      <div className="relative flex w-full flex-col overflow-x-clip bg-white">
        {/* 01 — Premium Hero */}
        <HeroSection />

        {/* 02 — Event Statistics */}
        <HeroStatsSection />

        {/* 03 — About Buildcon */}
        <IntroSection />

               {/* 10 — Partners */}
        <PartnersSection />

        {/* 04 — Why Nepal */}
        <WhyNepalSection />

        {/* 05 — Exhibition Sectors */}
        {/* <ExhibitionProfileSection /> */}

        {/* 06 — Why Exhibit */}
        {/* <WhyExhibitSection /> */}

        {/* 07 — Visitor Audience */}
        {/* <WhoWillYouMeetSection /> */}

        {/* 08 — Exhibitor Directory */}
        {/* <ExhibitorDirectoryPreviewSection /> */}

        {/* 09 — Official Venue */}
        {/* <VenueSection /> */}

 

      

        {/* 12 — Final Conversion CTA */}
        {/* <FinalCtaSection /> */}
      </div>
    </>
  );
}
