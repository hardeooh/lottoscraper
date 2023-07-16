const playwright = require('playwright');

async function getURL() {
  const browser = await playwright.chromium.launch({
      headless: true // setting this to true will not run the UI
  });
  const page = await browser.newPage();
  await page.goto('https://www.calottery.com/scratchers#endTable');
  await page.waitForTimeout(3000)	
  const hrefs = await page.evaluate(() => {
    return Array.from(document.links).map(item => item.href).filter(item => item.indexOf('$') > -1);
    });
  hrefs.sort()
  const unique_hrefs = hrefs.filter((e,i,a)=> a.indexOf(e) === i)
  await browser.close();
  return unique_hrefs
}

async function extractData(urlArray) {
    const browser = await playwright.chromium.launch({
        headless: true // setting this to true will not run the UI
    });
    const scrapedData = []
    console.log(urlArray, urlArray.length);
    for(let i=0;i<1;i++){
      const page = await browser.newPage();
      await page.goto(await urlArray[i]);
      await page.waitForTimeout(1000);	
      const rowCount = await page.locator('table').locator('tr').count();
      console.log(rowCount, `counting on ${urlArray[i]}`);
  
      for(let i=0;i<rowCount;i++){
        scrapedData.push(
          `${await page.locator('h1').innerText()}\t${await page.locator('.scratchers-game-detail__info-price').innerText()}\t${await page.locator('table').locator('tr').nth(i).innerText()}`
        )
      }
      
      
    }
    await browser.close();
    console.log(scrapedData, 'pullData')
}

module.exports = { getURL, extractData }