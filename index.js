const { getScratcherURL, extractScratcherData, cleanScratcherData } = require('./pullData.js')
const { updateScratcherGameData, updateScratcherRowData } = require('./mysql.js')
const cron = require('node-cron');
const playwright = require('playwright');
require('dotenv').config()
const mysql = require('mysql2')
const express = require('express')

const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
connection.connect()

const url = 'https://www.calottery.com/scratchers#endTable'

const app = new express();
const port = process.env.port || 3000;
app.listen(port, ()=>{
  console.log('Server is Running');
})

app.get('/api/gt', (req,res)=>{
  const query = 'SELECT * FROM game_type';
  connection.query(query, (err,rows)=>{
    if(err) throw err;
    res.send(rows)
  })
})


    async function main(){
      
      const lottoURL = await getScratcherURL(url)
      const dirtyScratcherData = await extractScratcherData(lottoURL)
      const dataForDB = cleanScratcherData(dirtyScratcherData)
      await updateScratcherGameData(dataForDB)
      setTimeout(() => {
        updateScratcherRowData(dataForDB)
      }, 5000);
      console.log(dataForDB.length,`total rows without headers`);
    }
    main();

    // cron.schedule('*/8 * * * *', () => {
    //   console.log('running a task every 10 minutes');
    //   main();      
    // });
