import { TIMEOUT } from '../utils/constants';
import puppeteer, { Browser, Page } from 'puppeteer';
import { ResponsePool } from '../utils/response-pool';
import { login } from '../actions/login';


jest.setTimeout(TIMEOUT);
describe('Book',() => {

  let browser:Browser;
  let page: Page;
  let responsePool: ResponsePool;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();
    responsePool = new ResponsePool();

    await page.setRequestInterception(true);
    await page.on('request', (request) => {
      const response = responsePool.handle(request.url(),request.method());
      if (response) {
        request.respond(response);
        request.responseForRequest();
      }else{
        request.continue();
      }
    });
  });

  afterEach(async () => {
    await browser.close();
  });

  it('grooming appointment.',async () => {
    await login(page, responsePool);
  });
})
