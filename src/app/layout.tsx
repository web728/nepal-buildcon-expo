
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope, Inter } from "next/font/google";

import "./globals.css";

import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { InitialSiteLoader } from "@/components/ui/InitialSiteLoader";

// ======================================================
// TYPOGRAPHY
// ======================================================

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

// ======================================================
// WEBSITE CONFIGURATION
// ======================================================

const SITE_URL = "https://nepalbuildcon.com.np";

const SITE_NAME = "Nepal Buildcon International Expo";

const SITE_DESCRIPTION =
  "Nepal Buildcon International Expo 2027, " +
  "the 12th edition of Nepal's building and construction " +
  "industry exhibition, takes place 25–28 February 2027 " +
  "at Bhrikuti Mandap, Kathmandu, Nepal.";

const OG_IMAGE =
  "/images/home/nepal-buildcon-hero.jpg";

// ======================================================
// GLOBAL METADATA
// ======================================================

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,

  title: {
    default:
      "Nepal Buildcon International Expo 2027",
    template: `%s | Nepal Buildcon 2027`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "Nepal Buildcon",
    "Nepal Buildcon 2027",
    "Nepal Buildcon International Expo",
    "Nepal Buildcon International Expo 2027",
    "construction expo Nepal",
    "construction exhibition Nepal 2027",
    "building exhibition Kathmandu",
    "building materials expo Nepal",
    "construction machinery expo",
    "infrastructure exhibition Nepal",
    "construction technology Nepal",
    "building construction trade fair Nepal",
    "Bhrikuti Mandap exhibition",
  ],

  category: "Building and Construction Exhibition",

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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 2560,
        height: 1707,
        alt:
          "Nepal Buildcon International Expo 2027 " +
          "at Bhrikuti Mandap, Kathmandu, Nepal",
      },
    ],
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

// ======================================================
// VIEWPORT
// ======================================================

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

// ======================================================
// GLOBAL JSON-LD
// ======================================================

const socialLinks = [
  event.social?.facebook,
  event.social?.instagram,
  event.social?.linkedin,
  event.social?.youtube,
  event.social?.twitter,
].filter(
  (value): value is string =>
    typeof value === "string" &&
    /^https?:\/\//i.test(value)
);

const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: "Nepal Buildcon",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url:
          `${SITE_URL}/logos/nepal-buildcon-logo.png`,
      },
      ...(socialLinks.length > 0
        ? { sameAs: socialLinks }
        : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

function jsonLdStringify(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

// ======================================================
// ROOT LAYOUT
// ======================================================

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className="
          flex min-h-screen flex-col
          bg-white text-brand-dark
          font-sans antialiased
        "
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdStringify(globalSchema),
          }}
        />

        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>

        <InitialSiteLoader />

        {children}

        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
