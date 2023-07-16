const playwright = require('playwright');
const { extractData } = require('./pullData.js')

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

    async function main(){
      const lottoURL = await getURL()
      await extractData(lottoURL)
    }

    main()