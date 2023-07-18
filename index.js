const { getURL, extractData } = require('./pullData.js')

const playwright = require('playwright');
require('dotenv').config()
const mysql = require('mysql2')
const express = require('express')
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')

connection.connect()

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
      const lottoURL = await getURL()
      await extractData(lottoURL)
    }

    // main()
