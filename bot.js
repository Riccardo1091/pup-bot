const puppeteer = require('puppeteer');
require('dotenv').config();

(async () => {
  // Attivazione browser
  const browser = await puppeteer.launch({headless: true, args: [
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--no-sandbox",
    "--no-first-run",
    "--no-zygote",
    "--single-process",
  ]});
  const page = await browser.newPage();
  // Navigazione verso pagina prodotto
  await page.goto('http://testbuy.netsons.org/prodotto/bello-figo-js/')
  // Aggiunta carrello
  await page.waitForSelector('[name="add-to-cart"]')
  await page.click('[name="add-to-cart"]')
  // Navigazione verso checkout
  await page.waitForSelector('.woocommerce-message a')
  await page.goto('http://testbuy.netsons.org/carrello/')
  // Click bottone checkout
  await page.click('a.checkout-button')
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
  // Conferma Login
  await popup.click('#btnLogin')
  // Conferma acquisto paypal
  await popup.waitForSelector('#payment-submit-btn')
  await popup.click('#payment-submit-btn', { waitUntil: "domcontentloaded" })
  // Chiudere browser
  await page.waitForNavigation()
  await browser.close();
})();