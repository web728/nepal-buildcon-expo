import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("nepal_buildcon_intro_shown", "true"));
});

test("homepage exposes complete crawl and sharing metadata", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Nepal Buildcon.*2027/i);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /^https:\/\/nepalbuildcon\.com\.np\/?$/,
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    /^https:\/\/nepalbuildcon\.com\.np\/?$/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  expect(await page.locator('script[type="application/ld+json"]').count()).toBeGreaterThanOrEqual(1);
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("img:not([alt])")).toHaveCount(0);
});

test("robots and sitemap use the production domain", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toContain("https://nepalbuildcon.com.np/sitemap.xml");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBe(true);
  const xml = await sitemap.text();
  expect(xml).toContain("https://nepalbuildcon.com.np/");
  expect(xml).toContain("https://nepalbuildcon.com.np/why-nepal");
});

test("public pages retain one clear primary heading and named controls", async ({ page }) => {
  const routes = [
    "/about",
    "/exhibit",
    "/visit",
    "/partners",
    "/organisers",
    "/venue",
    "/contact",
  ];

  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("main h1"), `${route} primary heading`).toHaveCount(1);
    await expect(page.locator("a[href=''], a:not([href])"), `${route} empty links`).toHaveCount(0);
    await expect(page.locator("img:not([alt])"), `${route} image alternatives`).toHaveCount(0);
  }
});

test("API forms reject empty payloads before persistence", async ({ request }) => {
  for (const endpoint of [
    "/api/exhibitor-enquiry",
    "/api/visitor-registration",
    "/api/partner-enquiry",
    "/api/contact",
    "/api/brochure-download",
  ]) {
    const response = await request.post(endpoint, { data: {} });
    expect(response.status(), endpoint).toBeGreaterThanOrEqual(400);
    expect(response.status(), endpoint).toBeLessThan(500);
  }
});

test("core audience journeys produce no browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));

  for (const route of ["/", "/exhibit", "/visit", "/partners", "/organisers"]) {
    await page.goto(route);
    await page.locator("footer").scrollIntoViewIfNeeded();
  }

  expect(errors).toEqual([]);
});

test("every internal link surfaced on the homepage resolves", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => link.getAttribute("href")).filter(Boolean))] as string[],
  );

  for (const href of hrefs) {
    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});
