import { expect, Locator, Page } from "@playwright/test";

export class LogoutPage {
  private readonly page: Page;
  private readonly logoutBtnLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutBtnLocator = this.page.locator("text=Log out");
  }

  logout = async () => {
    await Promise.all([
      this.page.waitForNavigation(),
      await this.logoutBtnLocator.click(),
    ]);
  };
}
