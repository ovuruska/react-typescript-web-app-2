import puppeteer, { ElementHandle,Page, Browser } from 'puppeteer';

jest.setTimeout(20000);

describe('Not found page', () => {
  let browser: Browser;
  let page: Page;
  const appUrl = 'http://localhost:5173/non-existing-page';

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
  });

  it('should show not found page. If clicked to Go Home button it should redirect to / and then /login.', async () => {
    await page.goto(appUrl);
    const title = await page.title();
    expect(title).toBe('Not Found');
    const goHomeButton = await page.$('a[href="/"]') as ElementHandle<HTMLAnchorElement>;
    await goHomeButton.click();

    await page.waitForFunction('window.location.href.includes("/login")');
    expect(page.url()).toBe('http://localhost:5173/login')
  });

});
