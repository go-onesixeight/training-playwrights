import { test } from "@playwright/test";
import { BookStorePage } from "../pages/book-store-page";
import { LoginPage } from "../pages/login-page";
import { ProfilePage } from "../pages/profile-page";

test("demo munu component", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const bookStorePage = new BookStorePage(page);
  const profilePage = new ProfilePage(page);

  await loginPage.login(true);
  await bookStorePage.menuComponent.asccessBookStore();
  await profilePage.menuComponent.asccessProfile();
  await loginPage.menuComponent.asccessLogIn();

  await page.pause();
});
