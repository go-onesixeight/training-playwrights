import { Locator, Page } from "@playwright/test";
import { MenuComponent } from "../components/menu-component";

export class BookStorePage {
  private readonly page: Page;
  readonly menuComponent: MenuComponent;

  constructor(page: Page) {
    this.page = page;
    this.menuComponent = new MenuComponent(
      this.page,
      this.page.locator("css=div.element-list.collapse.show")
    );
  }

}
