async function updateDBScratcherData (array){
  const insertGame = ``
  const insertScratcher = `INSERT INTO scratcher_data (scrape_date,game_id,prize,odds,remaining_prize,total_prize) VALUES (${},${},${},${},${})`

}


module.exports = {}