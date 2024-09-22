import axios from 'axios';

export default async function handler(req, res) {
  const { placeId } = req.query;
  
  try {
    const universeResponse = await axios.get(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);
    const universeId = universeResponse.data.universeId;
    
    const gameResponse = await axios.get(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const gameData = gameResponse.data.data[0];
    
    res.status(200).json({
      playing: gameData.playing,
      visits: gameData.visits,
      name: gameData.name,
      favoritedCount: gameData.favoritedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching game data' });
  }
}

