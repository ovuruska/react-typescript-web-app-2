import puppeteer, { ElementHandle,Page, Browser } from 'puppeteer';

describe('User Login', () => {
  let browser: Browser;
  let page: Page;
  const appUrl = 'http://localhost:5173/';
  const email = 'b@b.com';
  const password = 'b';

  beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  afterEach(async () => {
    await browser.close();
  });

  it('logs in and redirects to the home page', async () => {

    await page.setRequestInterception(true);
    await page.on('request', (request) => {
      if (request.method() === 'OPTIONS') {
        // Respond with a valid CORS response mimicking a Django server
        request.respond({
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*', // Replace '*' with your allowed origin
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400', // Cache the preflight request for 1 day
            'Content-Length': '0',
          },
        });
      }
      else if (request.url().endsWith('login') ) {
        request.respond({
          status: 200,
          headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          },
          contentType: 'application/json',
          body: JSON.stringify({
            user: {
              id: 153,
              username: 'b@b.com',
            },
            token:
              'f4a727bdc2216d3acb8a4e88e5ed5d1f87bba6a2f57262a2a27a0675fbb25acb',
            profile: {
              id: 102,
              name: 'a b',
              uid: '',
              email: '',
              phone: '',
              address: '',
              user: 153,
              role: 1,
              validated: true,
            },
          }),
        });
        request.responseForRequest();

      } else {
        request.continue();
      }
    });
    await page.goto(appUrl);

    const inputs = await page.$$('[data-testid="text-input-form-field-controlled"]');
    const emailInput = inputs[0];
    const passwordInput = inputs[1];
    await emailInput.click();
    await page.keyboard.type(email, { delay: 100 });
    await passwordInput.click();
    await page.keyboard.type(password, { delay: 100 });

    const button = await page.$('[data-testid="cta-primary"]') as ElementHandle
    await button.click();
    await page.waitForNavigation({
      timeout:1000
    });
    expect(page.url()).toBe(appUrl);
  });
  it('logs in and when login fails.', async () => {

    await page.setRequestInterception(true);
    page.on('request', (request) => {

      if (request.url().endsWith('/api/auth/customer/login')) {
        request.respond({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({
            error: 'Invalid credentials',
          }),
        });
      } else {
        request.continue();
      }
    });
    await page.goto(appUrl);

    const inputs = await page.$$('[data-testid="text-input-form-field-controlled"]');
    const emailInput = inputs[0];
    const passwordInput = inputs[1];
    await emailInput.click();
    await page.keyboard.type(email, { delay: 100 });
    await passwordInput.click();
    await page.keyboard.type(password, { delay: 100 });

    const button = await page.$('[data-testid="cta-primary"]') as ElementHandle
    await button.click();
    try{
      await page.waitForNavigation({
        timeout:1000
      });
      expect(page.url()).toBe(`${appUrl}login`);

    }catch(e){
      expect(page.url()).toBe(`${appUrl}login`);
    }

  });

});
