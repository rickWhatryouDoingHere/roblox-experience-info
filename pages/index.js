import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { FaUsers, FaEye, FaHeart } from 'react-icons/fa';
import CountUp from 'react-countup';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-300 flex flex-col items-center justify-center py-10">
      <Head>
        <title>Roblox Game Visitor Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full mx-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Roblox Game Stats
        </h1>
        
        <p className="text-center text-md text-gray-600 mb-4">
          Enter the Place ID to view live statistics of your favorite Roblox game!
        </p>
        
        <div className="relative mb-4">
          <input
            type="text"
            value={placeId}
            onChange={(e) => setPlaceId(e.target.value)}
            placeholder="Enter Place ID"
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md text-lg placeholder-gray-400"
          />
        </div>

        <button
          onClick={fetchGameInfo}
          className={`w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Info'}
        </button>

        {error && (
          <p className="mt-4 text-red-500 text-center font-medium">{error}</p>
        )}

        {gameInfo && (
          <div className="mt-6 grid grid-cols-1 gap-4">
            {[
              { label: 'Live Player Count', value: gameInfo.playing, icon: <FaUsers className="text-blue-600" /> },
              { label: 'Total Visits', value: gameInfo.visits, icon: <FaEye className="text-green-600" /> },
              { label: 'Favorites', value: gameInfo.favoritedCount, icon: <FaHeart className="text-yellow-600" /> },
            ].map(({ label, value, icon }, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg flex items-center justify-between shadow-sm transition-transform transform hover:scale-105">
                <div className="text-left">
                  <p className="text-md font-medium text-gray-700">{label}</p>
                  <CountUp start={0} end={value} duration={1} delay={0} className="text-3xl font-bold text-gray-800" />
                </div>
                <div className="text-4xl">{icon}</div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="mt-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Roblox Stats. All rights reserved.</p>
        <p>Built with ❤️ for Roblox fans.</p>
      </footer>
    </div>
  );
}
