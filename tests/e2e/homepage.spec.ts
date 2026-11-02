import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("nepal_buildcon_intro_shown", "true"));
});

test("homepage loads with hero content and event facts", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Nepal Buildcon/i }).first()).toBeVisible();
  await expect(page.getByText(/25–28 February 2027/i).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Book a Stand" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Register to Visit" }).first()).toBeVisible();
});

test("desktop nav dropdown reveals submenu items", async ({ page, isMobile }) => {
  // The primary nav is `hidden lg:block` — there is nothing to hover on
  // narrow/mobile viewports, where the hamburger menu takes over instead.
  test.skip(isMobile, "Desktop-only: primary nav is hidden below the lg breakpoint");
  await page.goto("/");
  const primaryNav = page.getByRole("navigation", { name: "Primary" });
  await primaryNav.getByRole("link", { name: "About", exact: true }).hover();
  await expect(primaryNav.getByRole("link", { name: "Why Nepal" })).toBeVisible();
});

test("homepage shows organiser section", async ({ page }) => {
  await page.goto("/");
  const heading = page.getByText("Organised By & Supporting Alliances", { exact: true });
  await heading.scrollIntoViewIfNeeded();
  await expect(heading).toBeVisible();
});
