import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("nepal_buildcon_intro_shown", "true"));
});

test("homepage remains within the viewport at target breakpoints", async ({ page }) => {
  const widths = [320, 375, 390, 414, 768, 1024, 1280, 1440, 1920];

  for (const width of widths) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Nepal Buildcon/i }).first()).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test("all public routes return successful responses", async ({ page }) => {
  const routes = [
    "/",
    "/about",
    "/why-nepal",
    "/exhibit",
    "/book-a-stand",
    "/exhibition-profile",
    "/exhibitor-services",
    "/exhibitors",
    "/visit",
    "/who-should-visit",
    "/register-to-visit",
    "/plan-your-visit",
    "/venue",
    "/partners",
    "/organisers",
    "/gallery",
    "/downloads",
    "/news",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cookie-policy",
  ];

  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBeLessThan(400);
  }
});
