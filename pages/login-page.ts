import { Page, Locator, expect } from "@playwright/test";
import { MenuComponent } from "../components/menu-component";

export class LoginPage {
  readonly page: Page;
  readonly menuComponent: MenuComponent;

  private readonly usernameInputLocator: Locator;
  private readonly passwordInputLocator: Locator;
  private readonly loginBtnLocator: Locator;
  private readonly userLoginTextLocator: Locator;

  private readonly urlLogin: string;
  private readonly userName: string;
  private readonly passWord: string;

  constructor(page: Page) {
    this.page = page;
    this.menuComponent = new MenuComponent(
      this.page,
      this.page.locator("css=div.element-list.collapse.show")
    );

    this.usernameInputLocator = this.page.locator("id=userName");
    this.passwordInputLocator = this.page.locator(
      `css=input[placeholder="Password"]`
    );
    this.loginBtnLocator = this.page.locator("id=login");
    this.urlLogin = "https://demoqa.com/login";
    this.userName = "Pakphom.p";
    this.passWord = "Pakphom@123456";
    this.userLoginTextLocator = this.page.locator("id=name");
  }

  login = async (isSuccess: boolean) => {
    // await this.goToLogin(this.urlLogin);
    await this.usernameInputLocator.fill(this.userName);
    await this.passwordInputLocator.fill(this.passWord);
    switch (isSuccess) {
      case true:
        await Promise.all([
          this.page.waitForNavigation(),
          await this.loginBtnLocator.click(),
        ]);
        break;
      default:
        await this.loginBtnLocator.click();
        break;
    }
  };

  goToLogin = async (urlLogin: string) => await this.page.goto(urlLogin);

  userNameLogin = () => this.userName;

  passWordLogin = () => this.passWord;

  invalidUserLogin = async () => {
    await expect(this.userLoginTextLocator).toContainText(
      "Invalid username or password!"
    );
    await this.page.waitForSelector("id=name");
  };
}
