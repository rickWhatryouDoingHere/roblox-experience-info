import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function Home() {
  const [placeId, setPlaceId] = useState('');
  const [gameInfo, setGameInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGameInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/gameInfo?placeId=${placeId}`);
      setGameInfo(response.data);
    } catch (error) {
      console.error('Error fetching game info:', error);
      setError('Failed to fetch game information. Please check the Place ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (gameInfo) {
      interval = setInterval(() => {
        fetchGameInfo();
      }, 5000); // Update every 5 seconds
    }
    return () => clearInterval(interval);
  }, [gameInfo]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Roblox Game Visitor Count</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Roblox Game Visitor Count</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <input
              type="text"
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              placeholder="Enter Place ID"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={fetchGameInfo} 
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Info'}
          </button>

          {error && (
            <p className="mt-4 text-red-500">{error}</p>
          )}

          {gameInfo && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">{gameInfo.name}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-4 rounded-md">
                  <p className="text-lg font-semibold">Live Player Count</p>
                  <p className="text-3xl font-bold text-blue-600">{gameInfo.playing}</p>
                </div>
                <div className="bg-green-100 p-4 rounded-md">
                  <p className="text-lg font-semibold">Total Visits</p>
                  <p className="text-3xl font-bold text-green-600">{gameInfo.visits.toLocaleString()}</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-md">
                  <p className="text-lg font-semibold">Favorites</p>
                  <p className="text-3xl font-bold text-yellow-600">{gameInfo.favoritedCount.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
