const playwright = require('playwright');

//Assign date object to take timestamp for scraping
const dateObject = new Date();
const date = (`0${dateObject.getDate()}`).slice(-2);
const month = (`0${dateObject.getMonth() + 1}`).slice(-2);
const year = dateObject.getFullYear();
const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
const seconds = dateObject.getSeconds();

//Retrieve game URLs from CAlotto table 
async function getScratcherURL() {
  const browser = await playwright.chromium.launch({
      headless: true // setting this to true will not run the UI
  });
  const page = await browser.newPage();
  await page.goto('https://www.calottery.com/scratchers#endTable');
  await page.waitForSelector('.react-accordion')	
  const hrefs = await page.evaluate(() => {
    return Array.from(document.links).map(item => item.href).filter(item => item.indexOf('$') > -1);
    });
  hrefs.sort()
  const unique_hrefs = hrefs.filter((e,i,a)=> a.indexOf(e) === i)
  await browser.close();
  return unique_hrefs
} 

//Go to each scratcher URL and extract game and odds data
async function extractScratcherData(urlArray) {
  const browser = await playwright.chromium.launch({
      headless: true // setting this to true will not run the UI
  });
  const page = await browser.newPage();
  const prizeCount = []
  const scrapedData = []
  console.log(`${urlArray.length} games found`);
  //Go through URL generated by getURL and count prize rows
  for(let i=0;i<2;i++){
    await page.goto(await urlArray[i]);
    await page.waitForSelector('.footer--icon')	
    const rowCount = await page.locator('table').locator('tr').count();
    prizeCount.push(await page.locator('table').locator('tr').count())
    console.log(rowCount, `rows being added from ${urlArray[i]}`);
    
    //Push each row data into an array
    for(let i=0;i<rowCount;i++){
      scrapedData.push(
        `${year}-${month}-${date} ${hours}:${minutes}:${seconds}\t${await page.locator('.breadcrumb-item').nth(2).innerText()}\t${await page.locator('h1').innerText()}\t${await page.locator('.scratchers-game-detail__info-price').innerText()}\t${await page.locator('table').locator('tr').nth(i).innerText()}\t${rowCount}`
      )
    }
  }
  await browser.close();
  console.log(prizeCount.reduce((a,b)=>a+b),`total rows being cleaned up`)
  return scrapedData
}

//Take array of scratcher data and modify each element to get it ready for insertion into DB
function cleanScratcherData(scratcherArray) {
  const cleanData = []
  const arraySplit = scratcherArray
    .map(data => data.split('\t'))
    .filter(data => data[4] != 'Prizes') //remove row headers

  //Modify each element to return cleaned up data as an object
  for(let i=0;i<arraySplit.length;i++){
    const separateString = arraySplit[i][6].split(' of ')
    let prizeData = 0
    if (arraySplit[i][4] === 'Ticket'){
      prizeData = arraySplit[i][3].slice(arraySplit[i][3].indexOf('$')+1)
    } else {prizeData = arraySplit[i][4].slice(arraySplit[i][4].indexOf('$')+1)} 

    cleanData[i] = {
      time: arraySplit[i][0], 
      scratcher_id: arraySplit[i][1].slice(-5,-1),
      name: arraySplit[i][2],
      price: arraySplit[i][3].slice(arraySplit[i][3].indexOf('$')+1),
      prize: prizeData,
      odds: arraySplit[i][5],
      tickets_left: separateString[0],
      tickets_remaining: separateString[1]
    }
  }
  return cleanData
}

module.exports = { getScratcherURL, extractScratcherData, cleanScratcherData }