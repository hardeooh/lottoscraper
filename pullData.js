const playwright = require('playwright');
async function extractData(urlArray) {
    const browser = await playwright.chromium.launch({
        headless: true // setting this to true will not run the UI
    });
    const scrapedData = []
    console.log(urlArray, urlArray.length);
    for(let i=0;i<3;i++){
      const page = await browser.newPage();
      await page.goto(await urlArray[i]);
      await page.waitForTimeout(3000);	
      const rowCount = await page.locator('table').locator('tr').count();
      console.log(rowCount);
  
      for(let i=0;i<rowCount;i++){
        scrapedData.push(
        await page.locator('table').locator('tr').nth(i).innerText()
        )
      }  
    }
    await browser.close();
    console.log(scrapedData, 'pullData')
}

module.exports = { extractData }