const puppeteer = require('puppeteer');

(async () => {
  // Attivazione browser
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  // Navigazione verso pagina prodotto
  await page.goto('http://testbuy.netsons.org/prodotto/bello-figo-js/', {waitUntil: 'networkidle2'})
  // Aggiunta carrello
  await page.click('[name="add-to-cart"]', {waitUntil: 'networkidle0'})
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
  await page.waitForSelector('input.select2-search__field')
  await page.type('input.select2-search__field', 'Roma')
  // Input telefono
  await page.waitForSelector('#billing_phone')
  await page.type('#billing_phone', '3333333333')
  // Input email
  await page.type('input#billing_email', 'riccardo.rugi@gmail.com')
  // Invia ordine
  await page.click('a#place_order', {waitUntil: 'networkidle0'})


  //await browser.close();
})();