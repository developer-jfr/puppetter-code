const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.seed-db.com/accelerators/view?acceleratorid=6301622233726976"
  );

  const info = await page.evaluate(() => {
    const list = [];
    const items = document.querySelectorAll(
      'div[class="col-md-12"] > .table-responsive > .tablesorter > tbody > tr[role="row"]'
    );

    for (const item of items) {
      list.push({
        name: item.querySelector("td:nth-child(2) > strong")?.innerText || "",
        location: item.querySelector("td.hidethiswhensmall:nth-child(3)")?.innerText || "",
        cohort_date: item.querySelector("td.hidethiswhensmall:nth-child(4) > span")?.innerText || "",
        cos: item.querySelector('td:nth-child(5) > span')?.innerText || "",
        exit_value: item.querySelector("td.hidethiswhenverysmall:nth-child(6) > span")?.innerText || "",
        funding_total: item.querySelector("td:nth-child(7) > span")?.innerText || ""
      });
    }

    return list;
  });

  console.log(info);

  fs.appendFile("./table.json", JSON.stringify(info), (err) =>
    err ? console.log(err) : null
  );

  await browser.close();
})();
