export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string; download?: boolean }[];
};

const POST_SHOW_REPORT_URL = "/downloads/Nepal-Buildcon-Post-Show-Report-2026.pdf";

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About the Expo", href: "/about", description: "Purpose, vision, and key facts." },
      { label: "Why Nepal", href: "/why-nepal", description: "Market growth and infrastructure opportunities." },
      { label: "Venue & Location", href: "/venue", description: "Bhrikuti Mandap, Kathmandu." },
      { label: "Organisers", href: "/organisers", description: "Organized by Futurex & Media Space Solutions." },
    ],
  },
  {
    label: "Exhibit",
    href: "/exhibit",
    children: [
      { label: "Why Exhibit", href: "/exhibit", description: "Key benefits for exhibitors." },
      { label: "Exhibition Profile", href: "/exhibition-profile", description: "Sectors and product directory." },
      { label: "Book a Stand", href: "/book-a-stand", description: "Reserve your expo booth space." },
    ],
  },
  {
    label: "Visit",
    href: "/visit",
    children: [
      { label: "Why Visit", href: "/visit", description: "Source products and meet suppliers." },
      { label: "Visitor Profile", href: "/visitor-profile", description: "Visitor categories and professional audiences." },
      { label: "Register to Visit", href: "/register-to-visit", description: "Get your free visitor pass." },
    ],
  },
  {
    label: "Media & Resources",
    href: "/gallery",
    children: [
      { label: "Gallery", href: "/gallery", description: "Event photos and video highlights." },
      { label: "Downloads", href: "/downloads", description: "Exhibition brochure and published resources." },
      {
        label: "2026 Post-Show Report",
        href: POST_SHOW_REPORT_URL,
        description: "Download the 11th edition post-show report (PDF).",
        download: true,
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  event: [
    { label: "About Expo", href: "/about" },
    { label: "Why Nepal", href: "/why-nepal" },
    { label: "Venue Info", href: "/venue" },
    { label: "Organisers", href: "/organisers" },
  ],
  exhibit: [
    { label: "Why Exhibit", href: "/exhibit" },
    { label: "Exhibition Profile", href: "/exhibition-profile" },
    { label: "Book a Stand", href: "/book-a-stand" },
  ],
  visit: [
    { label: "Why Visit", href: "/visit" },
    { label: "Visitor Profile", href: "/visitor-profile" },
    { label: "Free Registration", href: "/register-to-visit" },
  ],
  information: [
    { label: "Gallery", href: "/gallery" },
    { label: "Downloads", href: "/downloads" },
    { label: "2026 Post-Show Report", href: POST_SHOW_REPORT_URL, download: true },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};
