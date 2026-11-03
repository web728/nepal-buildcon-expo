/**
 * 12th Nepal Buildcon International Expo 2027
 * Shared source of truth for event identity, dates, venue,
 * organisers, contacts, metadata and navigation destinations.
 */

const SITE_URL = "https://nepalbuildcon.com.np";
const EVENT_TIMEZONE = "Asia/Kathmandu";
const EVENT_START_DATE = "2027-02-25";
const EVENT_END_DATE = "2027-02-28";

// Timings are retained from the supplied configuration. Confirm with organisers
// before publishing these as official visitor opening hours.
const EVENT_START_ISO = "2027-02-25T10:00:00+05:45";
const EVENT_END_ISO = "2027-02-28T18:00:00+05:45";

const VENUE_NAME = "Bhrikuti Mandap";
const VENUE_CITY = "Kathmandu";
const VENUE_COUNTRY = "Nepal";
const VENUE_LOCATION = `${VENUE_NAME}, ${VENUE_CITY}, ${VENUE_COUNTRY}`;
const MAP_QUERY = encodeURIComponent(VENUE_LOCATION);

const namitContact = {
  name: "Mr. Namit Gupta",
  phone: "(+91) 9810855697",
  phoneRaw: "+919810855697",
  phoneHref: "tel:+919810855697",
  email: "namit@futurextrade.com",
  emailHref: "mailto:namit@futurextrade.com",
} as const;

const srijalContact = {
  name: "Mr. Srijal Bhattarai",
  phone: "(+977) 9801171141",
  phoneRaw: "+9779801171141",
  phoneHref: "tel:+9779801171141",
  email: "srijal.bhattarai@mss.com.np",
  emailHref: "mailto:srijal.bhattarai@mss.com.np",
} as const;

// Published event-booking contacts listed in the 2027 brochure.
const eventContacts = [namitContact, srijalContact] as const;

export const event = {
  name: "12th Nepal Buildcon International Expo 2027",
  shortName: "Nepal Buildcon",
  brandWord: "Building & Construction",
  descriptor:
    "An international exhibition for building, construction, infrastructure and allied industries.",
  edition: "2027",
  editionLabel: "12th Edition",
  editionNumber: 12,
  eventType: "ExhibitionEvent",

  dates: {
    start: EVENT_START_DATE,
    end: EVENT_END_DATE,
    startIso: EVENT_START_ISO,
    endIso: EVENT_END_ISO,
    display: "25–28 February 2027",
    displayShort: "25–28 FEB 2027",
    displayLong: "25–28 February 2027",
    year: 2027,
    month: "February",
    startDay: 25,
    endDay: 28,
    durationDays: 4,
    // Existing timing values preserved; verify before marking them confirmed.
    openingTimeConfirmed: false,
    openingTime: "10:00",
    closingTime: "18:00",
    openingTimeDisplay: "10:00 AM",
    closingTimeDisplay: "6:00 PM",
    showTimingsDisplay: "10:00 AM – 6:00 PM",
    countdownTargetIso: EVENT_START_ISO,
    timezone: EVENT_TIMEZONE,
    timezoneLabel: "Nepal Standard Time",
    utcOffset: "+05:45",
  },

  venue: {
    name: VENUE_NAME,
    displayName: VENUE_NAME,
    city: VENUE_CITY,
    country: VENUE_COUNTRY,
    countryCode: "NP",
    fullLocation: VENUE_LOCATION,
    address: VENUE_LOCATION,
    mapEmbedUrl: `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`,
    mapLinkUrl: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
    timezone: EVENT_TIMEZONE,
  },

  format: "Building and Construction Trade Exhibition",
  industry: "Building & Construction",
  categories: [
    "Building Materials",
    "Construction Machinery & Equipment",
    "Infrastructure Solutions",
    "Construction Technology",
    "Architecture & Design",
    "Doors & Windows",
    "Flooring & Wall Coverings",
    "Tiles & Sanitary Ware",
    "Electrical, Plumbing & HVAC",
    "Formwork & Scaffolding",
    "Roofing & Façade",
    "Building Services",
  ],

  website: SITE_URL,
  websiteDisplay: "www.nepalbuildcon.com.np",

  seo: {
    siteUrl: SITE_URL,
    title: "12th Nepal Buildcon International Expo 2027 | Building & Construction",
    description:
      "Explore building materials, construction equipment and industry solutions at the 12th Nepal Buildcon International Expo 2027, 25–28 February at Bhrikuti Mandap, Kathmandu.",
    ogImage: "/images/home/nepal-buildcon-hero.jpg",
    logo: "/logos/12th_Nepal_Buildcon_International_Expo_2027.png",
    locale: "en_US",
    language: "en",
    keywords: [
      "12th Nepal Buildcon International Expo 2027",
      "building exhibition Nepal",
      "construction exhibition Nepal 2027",
      "building and construction expo Kathmandu",
      "building materials exhibition Nepal",
      "construction machinery Nepal",
      "infrastructure exhibition Nepal",
      "construction technology Nepal",
      "Bhrikuti Mandap exhibition",
    ],
    robots: { index: true, follow: true },
  },

  brandLines: {
    main: "Explore Building and Construction Opportunities in Nepal.",
    supporting: "Building and Construction Products, Equipment and Solutions.",
    exhibitor: "Present Your Products to Nepal's Building and Construction Market.",
    visitor: "Explore Products, Meet Suppliers and Compare Solutions.",
  },

  organisers: [
    {
      name: "Futurex Trade Fair & Events Pvt. Ltd.",
      shortName: "Futurex Group",
      logo: "/logos/futurex-logo.png",
      url: "https://www.futurextrade.com/",
    },
    {
      name: "Media Space Solutions Pvt. Ltd.",
      shortName: "Media Space Solutions",
      logo: "/logos/media-space-logo.png",
      url: "https://mss.com.np/",
    },
  ],

  contact: {
    namit: namitContact,
    srijal: srijalContact,
    all: eventContacts,
    // Compatibility aliases for existing Footer and Contact components.
    futurex: namitContact,
    mediaSpace: srijalContact,
    exhibitorEnquiries: namitContact,
    internationalParticipation: namitContact,
    general: srijalContact,
  },

  social: {
    linkedin:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ||
      "https://www.linkedin.com/company/nepal-buildcon-international-expo/",
    facebook:
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ||
      "https://www.facebook.com/nepalbuildconexpo/",
    instagram:
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ||
      "https://www.instagram.com/nepalbuildconexpo/",
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || "",
  },

  cta: {
    bookStand: "/book-a-stand",
    registerVisit: "/register-to-visit",
  },

  routes: {
    home: "/",
    about: "/about",
    exhibitionProfile: "/exhibition-profile",
    whoShouldExhibit: "/who-should-exhibit",
    whyExhibit: "/why-exhibit",
    whoShouldVisit: "/who-should-visit",
    bookStand: "/book-a-stand",
    registerVisit: "/register-to-visit",
    venue: "/venue",
    contact: "/contact",
  },

  exhibitorDirectoryMinimum: 6,
} as const;

export type EventConfig = typeof event;
export type EventDates = EventConfig["dates"];
export type EventVenue = EventConfig["venue"];
export type EventContact = (typeof event.contact.all)[number];
export type EventSocial = EventConfig["social"];
export type EventSEO = EventConfig["seo"];
