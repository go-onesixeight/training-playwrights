import { test, expect, Page } from "@playwright/test";

const loginURL: string = "https://demoqa.com/login";
const userName: string = "Pakphom.p";
const password: string = "Pakphom@123456x";

const login = async (page: Page, userName: string, password: string) => {
  await page.fill("id=userName", userName);
  await page.fill('css=input[placeholder="Password"]', password);
  await page.click("id=login");
};

test("demo login with valid account", async ({ page }) => {
  await page.goto(loginURL);
  await login(page, userName, password);
  await expect(page.locator("id=userName-value")).toContainText(userName, {
    timeout: 3 * 1000,
  });
});

test("goToBook", async ({ page }) => {
  await page.goto(loginURL);
  await login(page, userName, password);
  await expect(page.locator("id=userName-value")).toContainText("Pakphom.p");

  await page.click("id=gotoStore");
  await page.locator("text=Git Pocket Guide").click();
  await page.click("id=addNewRecordButton");
  await page.goto("https://demoqa.com/profile");
  await page.pause();
});

test("goToBook-1", async ({ page }) => {
  await page.goto("https://demoqa.com/automation-practice-form");
  await page.fill("id=firstName", "Pakphom.p");
  await page.fill("id=lastName", "Pakphom Promsean");
  await page.fill("id=userEmail", "Pakphom@Promsean.com");
  await page.check('input[name="gender"][value="Male"]', { force: true });
  await page.fill("id=userNumber", "0829134478");
  await page.locator("text=Sports").click();
  await page.pause();
});
