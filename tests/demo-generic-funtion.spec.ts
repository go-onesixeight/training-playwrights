import { test, expect, Page } from "@playwright/test";

const loginURL: string = "https://demoqa.com/login";
const userName: string = "Pakphom.p";
const password: string = "Pakphom@123456x";

test("demo time out", async ({ page }) => {
  await page.goto(loginURL);
  await page.fill("id=userName", userName);
  await page.fill('css=input[placeholder="Password"]', "Pakphom@123456x");
  await page.click("id=login");
  const errMsg = await page.textContent("id=name");

  /* Wait before retry submit login */
  await page.waitForTimeout(5 * 1000);

  /* Resubmit login */
  await page.fill("id=userName", userName);
  await page.fill('css=input[placeholder="Password"]', password);
  await page.click("id=login");
});

test("demo wait for selector err msg", async ({ page }) => {
  await page.goto(loginURL);
  await page.fill("id=userName", userName);
  await page.fill('css=input[placeholder="Password"]', "Pakphom@123456x");
  await page.click("id=login");
  // await expect(page.locator("id=name")).toContainText("Invalid username or password!");
  await page.waitForSelector("id=name");
});
