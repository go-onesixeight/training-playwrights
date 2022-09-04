import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { LogoutPage } from "../pages/logout-page";
import { ProfilePage } from "../pages/profile-page";

const test = base.extend<{
  loginPage: LoginPage;
  profilePage: ProfilePage;
  logoutPage: LogoutPage;
}>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },
  logoutPage: async ({ page }, use) => {
    const logoutPage = new LogoutPage(page);
    await use(logoutPage);
  },
});

test.beforeEach(async ({ page }) => {
  await page.goto("https://demoqa.com/login");
});

test("demo login with valid account", async ({
  page,
  loginPage,
  profilePage,
  logoutPage,
}) => {
  const isSuccess: boolean = true;
  await loginPage.login(isSuccess);
  await profilePage.profile(loginPage.userNameLogin());
  await logoutPage.logout();
  await page.pause();
});
