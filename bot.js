const puppeteer = require('puppeteer');

(async () => {
  // Attivazione Browser
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  // Navigazione verso pagina prodotto
  await page.goto('http://testbuy.netsons.org/prodotto/bello-figo-js/', {waitUntil: 'networkidle0'})
  // Aggiunta carrello
  await page.click('[name="add-to-cart"]', {waitUntil: 'networkidle2'})
  // Navigazione verso checkout
  await page.goto('http://testbuy.netsons.org/carrello/', {waitUntil: 'networkidle0'})
  // Click bottone checkout
  await page.click('a.checkout-button', {waitUntil: 'networkidle0'})
  // Input Nome
  await page.waitForSelector('input#billing_first_name')
  await page.type('input#billing_first_name', 'Riccardo')
  // Input Cognome
  await page.waitForSelector('input#billing_last_name')
  await page.type('input#billing_last_name', 'yoyo')
  // Input Cognome
  await page.waitForSelector('input#billing_last_name')
  await page.type('input#billing_address_1', 'via test, 69')

  //await browser.close();
})();