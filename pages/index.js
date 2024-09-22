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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Head>
        <title>Roblox Game Visitor Count</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white shadow-xl rounded-xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Roblox Game Stats</h1>
        <div className="mb-6">
          <input
            type="text"
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            placeholder="Enter Place ID"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
          />
        </div>
        <button
          onClick={fetchGameInfo}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Info'}
        </button>

        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}

        {gameInfo && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-900">{gameInfo.name}</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-indigo-100 p-6 rounded-lg text-center">
                <p className="text-lg font-medium text-gray-700">Live Player Count</p>
                <p className="text-4xl font-extrabold text-indigo-600">{gameInfo.playing}</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg text-center">
                <p className="text-lg font-medium text-gray-700">Total Visits</p>
                <p className="text-4xl font-extrabold text-green-600">{gameInfo.visits.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 p-6 rounded-lg text-center">
                <p className="text-lg font-medium text-gray-700">Favorites</p>
                <p className="text-4xl font-extrabold text-yellow-600">{gameInfo.favoritedCount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
