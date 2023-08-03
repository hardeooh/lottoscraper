const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)

async function updateScratcherGameData(cleanData){

  // Return only unique game names into the array
  const uniqueGameData = cleanData.filter((e,i,a)=>
    a.findIndex(v => v.name ===e.name && v.scratcher_id === e.scratcher_id) === i
  )
  console.log(uniqueGameData.length);
  
  // Insert into database games that do not exist yet
  await uniqueGameData.map(e=>{
    const insertGameData = `INSERT INTO game (name,scratcher_lotto_id,gametype_id,active) VALUES ('${e["name"]}',${e["scratcher_id"]},1,1);`;
  
    connection.query(`SELECT name FROM game WHERE name='${e["name"]}';`, (err,rows)=>{  
      if (err){
        throw err;
      }
      if(rows.length===0){
        connection.query(insertGameData)
        }     
      }
    )
  })

}

async function updateScratcherRowData(cleanData){

  await cleanData.map(e=>{
    connection.query(`SELECT game_id FROM game WHERE name='${e["name"]}' AND scratcher_lotto_id='${e["scratcher_id"]}';`, (err,rows)=>{  
      const insertScratcherData = `INSERT INTO scratcher_data (scrape_date,game_id,prize,odds,remaining_prize,total_prize) VALUES ((TIMESTAMP(NOW())),${rows[0]["game_id"]},${e["prize"]},${e["odds"]},${e["tickets_left"]},${e["tickets_remaining"]});`

      if (err){
        console.log('problem updating scratcher row data');
        throw err;
      }
        connection.query(insertScratcherData)
      }
    )})
  }

module.exports = { updateScratcherGameData, updateScratcherRowData }