import { test, expect } from "@playwright/test";
import { MOCK_BOOK_STORE } from "../data/data-mock-book-store";

const loginURL: string = "https://demoqa.com/login";
const userName: string = "Pakphom.p";
const password: string = "Pakphom@123456";
const requestLoginURL: string = "https://demoqa.com/Account/v1/GenerateToken";
const bookStoreURL: string = "https://demoqa.com/books";

test("demo login toeken url", async ({ page }) => {
  await page.goto(loginURL);
  await page.fill("id=userName", userName);
  await page.fill('css=input[placeholder="Password"]', password);
  const [response] = await Promise.all([
    page.waitForResponse(new RegExp("./*/Account/v1/GenerateToken.*")),
    page.waitForNavigation(),
    page.click("id=login"),
  ]);
  expect(response.ok).toBeTruthy();
  const res = await response.json();
  const expiresDate: number = new Date(res.expires).getTime();
  const newDateTime: number = new Date().getTime();

  expect(expiresDate).toBeGreaterThan(newDateTime);
});

test("demo login toeken", async ({ page }) => {
  await page.goto(loginURL);
  await page.fill("id=userName", userName);
  await page.fill('css=input[placeholder="Password"]', password);
  const [response] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url() === requestLoginURL &&
        new RegExp("./*/Account/v1/GenerateToken.*").test(res.url()) &&
        res.status() === 200
    ),
    page.waitForNavigation(),
    page.click("id=login"),
  ]);
  expect(response.ok).toBeTruthy();
  const res = await response.json();
  const expiresDate: number = new Date(res.expires).getTime();
  const newDateTime: number = new Date().getTime();

  expect(expiresDate).toBeGreaterThan(newDateTime);
});

test("demo mock book store", async ({ page }) => {
  const book = {
    books: [],
  };
  await Promise.all([
    page.route(new RegExp("./*/BookStore/v1/Books.*"), (route) => {
      route.fulfill({
        body: JSON.stringify(book),
      });
    }),
    page.goto(bookStoreURL),
  ]);
  await page.pause();
});

test("demo mock book store 12", async ({ page }) => {
  await Promise.all([
    page.route(new RegExp("./*/BookStore/v1/Books.*"), (route) => {
      route.fulfill({
        body: JSON.stringify(MOCK_BOOK_STORE),
      });
    }),
    page.goto(bookStoreURL),
  ]);
  await page.pause();
});


