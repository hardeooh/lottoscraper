const playwright = require('playwright');
require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
connection.end()

const { getURL, extractData } = require('./pullData.js')



    async function main(){
      const lottoURL = await getURL()
      await extractData(lottoURL)
    }

    main()
