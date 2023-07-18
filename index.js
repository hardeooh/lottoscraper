const playwright = require('playwright');
require('dotenv').config()
const mysql = require('mysql2')
const express = require('express')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
connection.end()

const app = express();
const port = 3000;


const { getURL, extractData } = require('./pullData.js')



    async function main(){
      const lottoURL = await getURL()
      await extractData(lottoURL)
    }

    main()
