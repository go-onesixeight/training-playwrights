import { test, chromium } from "@playwright/test";

test("demo context", async ({ }) => {
   const chromiumBrowser = await chromium.launch({headless: false});
   const chromiumContext = await chromiumBrowser.newContext();
   const chromiumPage1 = await chromiumContext.newPage();
   await chromiumPage1.goto("https://www.google.co.th/?hl=th");

   await chromiumPage1.pause();
});