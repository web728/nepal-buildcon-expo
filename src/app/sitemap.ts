import type { MetadataRoute } from "next";

const SITE_URL = "https://www.nepalbuildcon.com.np";

// Only public, indexable routes. Update as you publish or rename pages.
const routes = [
  "",
  "/about",
  "/why-nepal",
  "/venue",
  "/organisers",
  "/exhibit",
  "/exhibition-profile",
  "/book-a-stand",
  "/visit",
  "/visitor-profile",
  "/register-to-visit",
  "/gallery",
  "/downloads",
  "/contact",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${SITE_URL}${route || "/"}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
