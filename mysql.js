async function updateDBScratcherData (array){
  const insertGameData = `INSERT INTO game (name,scratcher_lotto_id,gametype_id,active) VALUES (${},${},${},${})`
  const insertScratcherData = `INSERT INTO scratcher_data (scrape_date,game_id,prize,odds,remaining_prize,total_prize) VALUES (${},${},${},${},${})`

}


module.exports = {}