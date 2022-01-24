const puppeteer = require('puppeteer');
const delay = require('./delay.js');
const readlineSync = require('readline-sync');

console.log('Bem vindo ao WebExtractor!');

async function webScrappingFunc() {
  const stockCode = readlineSync.question('Digite o código da Ação que você deseja consultar: ');


  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://fundamentus.com.br/');

  await page.click('#completar');
  await page.keyboard.type(stockCode);

  await delay(1000);

  await page.keyboard.press('Enter');


  const stockPrice = await page.$('body > div.center > div.conteudo.clearfix > table:nth-child(2) > tbody > tr:nth-child(1) > td.data.destaque.w3 > span');

  await page.on('load', () => {
    console.log(stockPrice)

  })






  // await browser.close();

};

webScrappingFunc();

