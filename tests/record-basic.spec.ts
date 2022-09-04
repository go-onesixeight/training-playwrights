import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demoqa.com/login");
  await page.locator('[placeholder="UserName"]').fill("Pakphom.p");
  await page.locator('[placeholder="UserName"]').press("Tab");
  await page.locator('[placeholder="Password"]').fill("Pakphom@123456");
  await page.locator('button:has-text("Login")').click();
  await expect(page).toHaveURL("https://demoqa.com/profile");
});
