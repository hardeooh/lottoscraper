   const playwright = require('playwright');
    async function main() {
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

        console.log(unique_hrefs, unique_hrefs.length)
        console.log(hrefs.indexOf('https://www.calottery.com/scratchers/$1/ladybug-bucks-1573'))
        console.log("hello world")
        await browser.close();
    }

    main();