import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { LogoutPage } from "../pages/logout-page";
import { ProfilePage } from "../pages/profile-page";

test("demo login with valid account", async ({ page }) => {
	const loginPage = new LoginPage(page);
	const profilePage = new ProfilePage(page);
	const logoutPage = new LogoutPage(page);
	const isSuccess: boolean = true;
	await loginPage.login(isSuccess);
	await profilePage.profile(loginPage.userNameLogin());
	await logoutPage.logout();
	await page.pause();
});

test("demo login invalid password", async ({ page }) => {
	const loginPage = new LoginPage(page);
	const isFailed = false;
	await loginPage.login(isFailed);
	await page.pause();
});

test("demo login invalid username or password", async ({ page }) => {
	const loginPage = new LoginPage(page);
	const isSuccess: boolean = true;
	await loginPage.login(isSuccess);
	// await loginPage.invalidUserLogin();

	await page.pause();
});