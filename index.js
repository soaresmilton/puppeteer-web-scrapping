const puppeteer = require('puppeteer');
const delay = require('./delay.js')

async function webScrappingFunc() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://fundamentus.com.br/');

  await page.click('#completar');
  const stock = await page.keyboard.type('ITSA4');

  await delay(5000);


  // await browser.close();

};

webScrappingFunc();



