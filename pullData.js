const playwright = require('playwright');
async function main() {
    const browser = await playwright.chromium.launch({
        headless: true // setting this to true will not run the UI
    });
    const scrapedData = []
    const page = await browser.newPage();
    await page.goto('https://www.calottery.com/scratchers/$5/triple-play-1571');
    await page.waitForTimeout(3000)	
    
    const rowCount = await page.locator('table').locator('tr').count()
    console.log(rowCount);

    for(let i=0;i<rowCount;i++){
    scrapedData.push(
      await page.locator('table').locator('tr').nth(i).innerText()
      )
    }
    

    console.log(scrapedData, 'testing')

    await browser.close();
}

main();