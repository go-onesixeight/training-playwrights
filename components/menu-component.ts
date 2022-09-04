import { Locator, Page } from "@playwright/test";

export class MenuComponent {
  readonly page: Page;
  readonly componentLocator: Locator;

  readonly loginLinkLocator: Locator;
  readonly bookStoreLinkLocator: Locator;
  readonly profileLinkLocator: Locator;

  constructor(page: Page, componentLocator: Locator) {
    this.page = page;
    this.componentLocator = componentLocator;
    this.loginLinkLocator = this.componentLocator.locator("id=item-0");
    this.bookStoreLinkLocator = this.componentLocator.locator("id=item-2");
    this.profileLinkLocator = this.componentLocator.locator("id=item-3");
  }

  asccessBookStore = async () => {
    await Promise.all([
      this.page.waitForNavigation(),
      await this.bookStoreLinkLocator.click(),
    ]);
  };

  asccessLogIn = async () => {
    await Promise.all([
      this.page.waitForNavigation(),
      await this.loginLinkLocator.click(),
    ]);
  };

	asccessProfile = async () => {
    await Promise.all([
      this.page.waitForNavigation(),
      await this.profileLinkLocator.click(),
    ]);
  };
}
