import { test, expect, Page } from "@playwright/test";

const urlPlayWright: string = "https://playwright.dev/";

test("demo mouse hover over", async ({ page }) => {
  await page.goto(urlPlayWright);
  // Mouse hover
  await page.hover("css=div.dropdown--hoverable >> text=Node.js");
  // Click python menu
  await page.click("css=div.dropdown--hoverable >> text=Python");
  // Page have select python
  await page.waitForSelector("text=Playwright for Python");
});

test("Demo page navigate", async ({ page }) => {
  await page.goto("https://demoqa.com/");
  await Promise.all([page.waitForNavigation(), page.click("text=Elements")]);
});

test("Demo new page", async ({ page, context }) => {
  await page.goto("https://demoqa.com/browser-windows");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.click("id=tabButton"),
  ]);
  await newPage.waitForSelector("id=sampleHeading");

  await page.click("id=tabButton");
  await page.pause();
});

test("Demo download file", async ({ page }) => {
  await page.goto("https://qahive-demo.w3spaces.com/index.html");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click("css=a"),
  ]);
  await download.saveAs("./test.txt");
});

test("Demo upload file", async ({ page }) => {
  await page.goto("https://qahive-demo.w3spaces.com/index.html");
  const [filechooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.click("id=myfile"),
  ]);
  await filechooser.setFiles("./test-data/test.txt");
  await page.pause();
  await page.click('css=input[type="submit"]');
});

test("Demo iframe", async ({ page }) => {
  await page.goto("https://demoqa.com/frames");

  const frame1 = page.frameLocator("id=frame1");
  const msg = await frame1.locator("id=sampleHeading").innerText();

  const frames = page.frames();
  const msg2 = await frames[5].innerText("id=sampleHeading");

  console.log(msg);
});

test("Demo Modal", async ({ page }) => {
  await page.goto("https://demoqa.com/modal-dialogs");
  await page.click("id=showSmallModal");
  await page.click("id=closeSmallModal");
  await page.waitForSelector("id=closeSmallModal", { state: "hidden" });
});

test('Demo Alert', async({ page }) => {
  await page.goto('https://demoqa.com/alerts');
  page.on('dialog', dialog => dialog.accept());
  await page.click('id=confirmButton');
  await page.pause();
});
