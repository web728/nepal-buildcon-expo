import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope, Inter } from "next/font/google";

import "./globals.css";
import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { InitialSiteLoader } from "@/components/ui/InitialSiteLoader";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Choose ONE canonical hostname for metadata, sitemap and internal absolute URLs.
// Configure a permanent redirect from the non-preferred hostname at your hosting provider.
export const SITE_URL = "https://www.nepalbuildcon.com.np";
const SITE_NAME = "12th Nepal Buildcon International Expo 2027";
const SITE_DESCRIPTION =
  "Explore the 12th Nepal Buildcon International Expo, 25–28 February 2027 at Bhrikuti Mandap, Kathmandu. Find exhibition sectors, visitor information and registration details.";
const OG_IMAGE = "/images/home/nepal-buildcon-hero.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: "%s | Nepal Buildcon 2027",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Nepal Buildcon 2027",
    "Nepal Buildcon International Expo",
    "construction exhibition Nepal",
    "building materials exhibition Kathmandu",
    "construction machinery Nepal",
    "building and construction trade fair Nepal",
    "Bhrikuti Mandap Kathmandu",
  ],
  category: "Building and construction exhibition",
  // Automatically generates <meta name="google-site-verification" ... />.
  verification: {
    google: "Gk-VVshsB09Fq4SXjcRyoi_-YPFXa9T39sAW6jsUEMQ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [{ url: OG_IMAGE, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

const socialLinks = [
  event.social?.facebook,
  event.social?.instagram,
  event.social?.linkedin,
  event.social?.youtube,
  event.social?.twitter,
].filter(
  (value): value is string =>
    typeof value === "string" && /^https?:\/\//i.test(value),
);

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organizers`,
      name: "Nepal Buildcon International Expo",
      url: SITE_URL,
      logo: `${SITE_URL}/logos/12th_Nepal_Buildcon_International_Expo_2027.png`,
      ...(socialLinks.length ? { sameAs: socialLinks } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organizers` },
    },
    {
      "@type": "Event",
      "@id": `${SITE_URL}/#event-2027`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}${OG_IMAGE}`,
      startDate: "2027-02-25",
      endDate: "2027-02-28",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Bhrikuti Mandap",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kathmandu",
          addressCountry: "NP",
        },
      },
      organizer: [
        {
          "@type": "Organization",
          name: "Futurex Trade Fair & Events Pvt. Ltd.",
          url: "https://www.futurextrade.com/",
        },
        {
          "@type": "Organization",
          name: "Media Space Solutions Pvt. Ltd.",
          url: "https://mss.com.np/",
        },
      ],
    },
  ],
};

function stringifyJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-white text-brand-dark font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(globalSchema) }}
        />
        <InitialSiteLoader />
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
