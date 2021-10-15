const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.seed-db.com/accelerators");


  const data = await page.evaluate(() => {
    const list = []
    const items = document.querySelectorAll('tbody tr[role="row"]')

    for (const item of items) {
   
      list.push({
        company: item.querySelector("tr a strong").innerHTML,
        position: item.querySelector("tr a strong").innerHTML,
        
      })
    }

    return list
  })



  
  await browser.close();
})();
