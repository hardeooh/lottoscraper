   const playwright = require('playwright');
    async function main() {
        const browser = await playwright.chromium.launch({
            headless: true // setting this to true will not run the UI
        });

        const page = await browser.newPage();
        await page.goto('https://www.calottery.com/scratchers#endTable');
        	
        const hrefs = await page.evaluate(() => {
          return Array.from(document.links).map(item => item.href).filter(item => item.indexOf('$') > -1);
          });
        
        hrefs.sort()

        console.log(hrefs, hrefs.length)
        console.log("hello world")
        await browser.close();
    }

    main();