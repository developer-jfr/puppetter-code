const puppeteer = require("puppeteer");
const fs = require("fs");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://www.seed-db.com/accelerators/view?acceleratorid=350001"
  );

  const info = await page.evaluate(() => {
    const list = [];
    const items = document.querySelectorAll('div[class="col-md-12"]');

    for (const item of items) {
      list.push({
        id: Date.now().toString(),
        program: item.querySelector(".row:nth-child(1) .col-md-4 h1")
          ?.innerText,
        link: item.querySelector(".row:nth-child(1) .col-md-4 p a")?.innerText,
        creating: item.querySelector(
          ".row:nth-child(1) .col-md-4 p:nth-child(3)"
        )?.innerText,
        location: item.querySelector(
          ".row:nth-child(1) .col-md-4 p:nth-child(4)"
        )?.innerText,
        description: item.querySelector(
          ".row:nth-child(2) .col-md-6:nth-child(2) p:nth-child(1)"
        )?.innerText,
        description_two: item.querySelector(
          ".row:nth-child(2) .col-md-6:nth-child(2) p:nth-child(2)"
        )?.innerText,
        description_three: item.querySelector(
          ".row:nth-child(2) .col-md-6:nth-child(2) p:nth-child(3)"
        )?.innerText,
        statistics: item.querySelector(
          ".row:nth-child(2) .col-md-6:nth-child(2) h3"
        )?.innerText,
        startups_funded: item.querySelector(
          ".row:nth-child(2) .col-md-6:nth-child(2) p:nth-child(7)"
        )?.innerText,
        exicts: item.querySelector(
          ".row:nth-child(2) .col-md-6:nth-child(2) p:nth-child(8)"
        )?.innerText,
        total_exicts: item.querySelector(
          ".row:nth-child(2) .col-md-6:nth-child(2) p:nth-child(9)"
        )?.innerText,
        total_funding_raising: item.querySelector(
          ".row:nth-child(2) .col-md-6:nth-child(2) p:nth-child(10)"
        )?.innerText,
        admistrated: item.querySelector(
            ".row:nth-child(2) .col-md-6:nth-child(2) p:nth-child(12)"
          )?.innerText,
        table: [],
      });
    }

    return list;
  });

  console.log(info);

  fs.appendFile("./info.json", JSON.stringify(info), (err) =>
    err ? console.log(err) : null
  );

  await browser.close();
})();
