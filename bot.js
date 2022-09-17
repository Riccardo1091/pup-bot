const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  // Attivazione browser
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  // Navigazione verso pagina prodotto
  await page.goto('http://testbuy.netsons.org/prodotto/bello-figo-js/', {waitUntil: 'networkidle2'})
  // Aggiunta carrello
  await page.click('[name="add-to-cart"]')
  // Navigazione verso checkout
  await page.waitForSelector('.woocommerce-message a')
    //await page.waitForFunction('document.querySelector(".woocommerce-message a").href.includes("carrello")');
  await page.goto('http://testbuy.netsons.org/carrello/')
  // Click bottone checkout
  await page.click('a.checkout-button', {waitUntil: 'networkidle0'})
  // Input nome
  await page.waitForSelector('input#billing_first_name')
  await page.type('input#billing_first_name', 'Riccardo')
  // Input cognome
  await page.type('input#billing_last_name', 'yoyo')
  // Input indirizzo
  await page.type('input#billing_address_1', 'via test, 69')
  // Input CAP
  await page.type('input#billing_postcode', '72222')
  // Input città
  await page.type('input#billing_city', 'Roma')
  // Input select provincia
  await page.waitForFunction('document.querySelector("#select2-billing_state-container").textContent="Roma"')
    //await page.type('input#select2-billing_state-results', 'Roma')
  // Input telefono
  await page.type('#billing_phone', '3333333333')
  // Input email
  await page.type('input#billing_email', process.env.PAYPAL_EMAIL)
  // Invia ordine
  const frame = await page.waitForSelector('iframe[title="PayPal"]')
  const contenutoFrame = await frame.contentFrame()
  await contenutoFrame.waitForSelector('div.paypal-button-number-0')
  await contenutoFrame.click('div.paypal-button-number-0')
  // Popup paypal
  const pages = await browser.pages()
  const popup = pages[pages.length - 1]
  await popup.waitForSelector('#password')
  await popup.type('#password', process.env.PAYPAL_PASSWORD)
  // Login paypal
  await popup.click('#btnLogin', {waitUntil: 'networkidle0'})
  // Conferma acquisto paypal
  await popup.waitForSelector('input#password')
  await popup.type('input#password', process.env.PAYPAL_PASSWORD)
  // Chiudere browser
  await browser.close();
})();