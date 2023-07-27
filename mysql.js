const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)

async function updateDBScratcherData (cleanData){
  // console.log(cleanData);
  // const insertGameData = `INSERT INTO game (name,scratcher_lotto_id,gametype_id,active) VALUES (${name},${scratcher_id},${1},${1})`
  // const insertScratcherData = `INSERT INTO scratcher_data (scrape_date,game_id,prize,odds,remaining_prize,total_prize) VALUES (${},${},${},${},${})`

  // Return only unique game names into the array
  
  // const uniqueGameData = Object.values(
  //     cleanData.reduce( (c, e) => {
  //       if (!c[e.name]) c[e.name] = e;
  //       return c;
  //     }, {})
  //   );
  
  // Insert into database games that do not exist yet
  uniqueGameData.map(e=>{
    const insertGameData = `INSERT INTO game (name,scratcher_lotto_id,gametype_id,active) VALUES ('${e["name"]}',${e["scratcher_id"]},1,1)`;

    connection.query(`SELECT name FROM game WHERE name='${e["name"]}'`, (err,rows)=>{  
      if (err){
        throw err;
      }
        if(rows.length===0){
        connection.query(insertGameData)
        console.log('insertion into game table done!');   
        }     
      }
    )})

  // cleanData.map(e=>{
  //   console.log(e);
  //   connection.query(`SELECT game_id FROM game WHERE name='${e["name"]}'`, (err,rows)=>{  
  //     const insertScratcherData = `INSERT INTO scratcher_data (scrape_date,game_id,prize,odds,remaining_prize,total_prize) VALUES ((TIMESTAMP(NOW())),${rows[0]["game_id"]},${e["prize"]},${e["odds"]},${e["tickets_left"]},${e["tickets_remaining"]})`

  //     if (err){
  //       throw err;
  //     }
  //       console.log(insertScratcherData);
  //       connection.query(insertScratcherData)
  //     }
  //   )
  // })


}


module.exports = { updateDBScratcherData }