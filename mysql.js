const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)

async function updateDBScratcherData (cleanData){
  // console.log(cleanData);
  // const insertGameData = `INSERT INTO game (name,scratcher_lotto_id,gametype_id,active) VALUES (${name},${scratcher_id},${1},${1})`
  // const insertScratcherData = `INSERT INTO scratcher_data (scrape_date,game_id,prize,odds,remaining_prize,total_prize) VALUES (${},${},${},${},${})`

  const uniqueGameData = Object.values(
      cleanData.reduce( (c, e) => {
        console.log(c[e.name],'reduce');
        if (!c[e.name]) c[e.name] = e;
        return c;
      }, {})
    );

    // console.log(uniqueGameData);


  await cleanData.map(e=>{
    const insertGameData = `INSERT INTO game (name,scratcher_lotto_id,gametype_id,active) VALUES ('${e["name"]}',${e["scratcher_id"]},1,1)`;

    const unique = (arr, key) => {
      const keys = new Set();
      return arr.filter(e => !keys.has(e[key]) && keys.add(e[key]));
    };


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

    // console.log(e["name"]);
    

    // const insertGameData = `INSERT INTO game (name,scratcher_lotto_id,gametype_id,active) VALUES ('${e["name"]}',${e["scratcher_id"]},1,1);`

    // connection.query(insertGameData)

  // })
    // connection.query("SELECT * FROM game", (err,rows)=>{
    //   if (err){
    //     return err
    //   }
    //   console.log(rows);
    // });


}


module.exports = { updateDBScratcherData }