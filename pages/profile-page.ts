import { expect, Locator, Page } from "@playwright/test";
import { MenuComponent } from "../components/menu-component";

export class ProfilePage {
  private readonly page: Page;
  readonly menuComponent: MenuComponent;

  private readonly usernameInputLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInputLocator = this.page.locator("id=userName-value");
    this.menuComponent = new MenuComponent(
      this.page,
      this.page.locator("css=div.element-list.collapse.show")
    );
  }

  profile = async (userName: string) => {
    await expect(this.usernameInputLocator).toContainText(userName);
  };
}
