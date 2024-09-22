import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { FaUsers, FaEye, FaHeart } from 'react-icons/fa';

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
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [gameInfo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center">
      <Head>
        <title>Roblox Game Visitor Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-850 shadow-2xl rounded-2xl p-8 max-w-lg w-full transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-white">
          Roblox Game Stats
        </h1>
        
        <p className="text-center text-lg text-gray-300 mb-6">
          Enter the Place ID to view live statistics of your favorite Roblox game!
        </p>
        
        <div className="relative mb-6">
          <input
            type="text"
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            placeholder="Enter Place ID"
            className="w-full border border-gray-600 p-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-lg placeholder-gray-400 bg-gray-800 text-white"
          />
        </div>

        <button
          onClick={fetchGameInfo}
          className="w-full bg-indigo-600 text-white p-4 rounded-full font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 ease-in-out shadow-lg"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Info'}
        </button>

        {error && (
          <p className="mt-4 text-red-500 text-center font-medium">{error}</p>
        )}

        {gameInfo && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center text-gray-200 mb-4">{gameInfo.name}</h2>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-indigo-700 p-6 rounded-xl flex items-center justify-between shadow-lg">
                <div className="text-left">
                  <p className="text-lg font-medium text-gray-200">Live Player Count</p>
                  <p className="text-4xl font-extrabold text-white">{gameInfo.playing}</p>
                </div>
                <FaUsers className="text-4xl text-indigo-300" />
              </div>

              <div className="bg-green-700 p-6 rounded-xl flex items-center justify-between shadow-lg">
                <div className="text-left">
                  <p className="text-lg font-medium text-gray-200">Total Visits</p>
                  <p className="text-4xl font-extrabold text-white">{gameInfo.visits.toLocaleString()}</p>
                </div>
                <FaEye className="text-4xl text-green-300" />
              </div>

              <div className="bg-yellow-700 p-6 rounded-xl flex items-center justify-between shadow-lg">
                <div className="text-left">
                  <p className="text-lg font-medium text-gray-200">Favorites</p>
                  <p className="text-4xl font-extrabold text-white">{gameInfo.favoritedCount.toLocaleString()}</p>
                </div>
                <FaHeart className="text-4xl text-yellow-300" />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Roblox Stats. All rights reserved.</p>
        <p>Built with ❤️ for Roblox fans.</p>
      </footer>
    </div>
  );
}
