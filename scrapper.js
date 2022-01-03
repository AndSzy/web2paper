const puppeteer = require('puppeteer');

async function printPDF (url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });
  const pdf = await page.pdf({ format: 'a4' });
  await browser.close();
  return pdf;
};


module.exports = { printPDF }