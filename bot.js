const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://testbuy.netsons.org/prodotto/bello-figo-js/', {waitUntil: 'networkidle2'})
  await page.click('[name="add-to-cart"]', {waitUntil: 'networkidle2'})
  await page.goto('http://testbuy.netsons.org/carrello/', {waitUntil: 'networkidle2'})
  await page.waitForSelector('a.checkout-button')
  await page.click('a.checkout-button')

  //await browser.close();
})();