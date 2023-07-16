const playwright = require('playwright');
const { getURL, extractData } = require('./pullData.js')

    async function main(){
      const lottoURL = await getURL()
      await extractData(lottoURL)
    }

    main()