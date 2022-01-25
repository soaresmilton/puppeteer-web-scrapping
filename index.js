const puppeteer = require('puppeteer');
const delay = require('./utils/delay');

console.log('Bem vindo ao WebExtractor!');
console.log('Aguarde enquanto o robô extrai as informações.');

async function webStractor() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://br.investing.com/equities/brazil');


  await page.click('#onetrust-accept-btn-handler');
  await delay(5000);
  await page.keyboard.press('Escape');


  const stockNames = await page.evaluate(() => {
    const stocksNamesElement = document.querySelectorAll("tr td.bold.left.noWrap.elp.plusIconTd a");

    let stockNames = [];

    stocksNamesElement.forEach(name => stockNames.push(name.innerText));

    return stockNames;

  });

  const stocksLastPrice = await page.evaluate(() => {
    const stockSpanElement = document.querySelectorAll('span.alertBellGrayPlus.js-plus-icon.genToolTip.oneliner');

    let stocksIDs = [];

    stockSpanElement.forEach(spanTag => {
      const dataAttr = spanTag.getAttribute("data-id");
      stocksIDs.push(dataAttr);
    });


    let arrOfStocksLastPrice = [];

    stocksIDs.forEach(id => {
      let lastPriceStockElement = document.querySelector(`#pair_${id} > td.pid-${id}-last`);
      arrOfStocksLastPrice.push(lastPriceStockElement.innerText);
    })

    return arrOfStocksLastPrice;

  });


  let stocksList = [];

  for (let i = 0; i < stockNames.length; i++) {
    stocksList.push({
      stock: stockNames[i],
      price: stocksLastPrice[i]
    });
  };

  console.log(stocksList);

  await browser.close();

  console.log('Fim da execução do programa');
}

webStractor();
